import { unstable_cache } from "next/cache";
import { site } from "@/lib/site";

const HELSINKI = "Europe/Helsinki";
const LOOKAHEAD_DAYS = 14;
const REVALIDATE_SECONDS = 30 * 60;
const EVENT_URL = /https:\/\/aerodiggarit\.nimenhuuto\.com\/events\/\d+/i;
const SHOUT_PREFIX =
  /^(?:(?:LA|PE|TI|KE|TO|MA|SU)[-–])?(?:HUOM!?[\s!]*AIKA!?|SUPERUUTUUS!?|UUTUUS!?|UUSI(?:\s+SPECIAL)?\s+OHJELMA!?)\s*[:!]?\s*/i;
const TIME_RANGE =
  /^(\d{1,2}(?:[.:]\d{2})?)\s*[-–]\s*(\d{1,2}(?:[.:]\d{2})?)\s*/;
const INSTRUCTOR_TAIL =
  /\s*(?:[-–]\s*)?(?:ohjaaja:?\s*)?(Jari|Ulla P\.?|Ulla|Eija)\.?\s*$/i;
const DATE_ARROW_TAIL = /\s+\d{1,2}\.\d{1,2}(?:\.\d{2,4})?\s*(?:->|→)?\s*$/;

const CLASS_HINTS: { pattern: RegExp; name: string }[] = [
  { pattern: /cross\s*training/i, name: "Cross Training" },
  {
    pattern:
      /aerial\s*bungee.*intensiivi|intensiivi.*aerial|aerial\s*bungee\s*75/i,
    name: "Aerial Bungee intensiivi 75",
  },
  { pattern: /aerial\s*bungee\s*55/i, name: "Aerial Bungee 55" },
  { pattern: /aerial\s*bungee/i, name: "Aerial Bungee" },
  { pattern: /kahvakuula/i, name: "Kahvakuula 45" },
  { pattern: /hiit\s*\+?\s*core/i, name: "HIIT+Core 45" },
  { pattern: /pump\s*up/i, name: "Pump Up!" },
  { pattern: /hatha/i, name: "Hatha-jooga 75" },
  { pattern: /voima[\s-]*jooga/i, name: "Voima-jooga 60" },
  { pattern: /äänimalja|aanimalja/i, name: "Äänimaljarentoutus" },
  { pattern: /kangoo/i, name: "Kangoo Jumps + Core 45" },
  { pattern: /step.*rvp|step-askellus/i, name: "Step-askellus + RVP 45" },
  { pattern: /\blavis\b/i, name: "Lavis-kuntotanssi" },
  { pattern: /circuit|k-sali/i, name: "Kuntosali – kiertoharjoittelu" },
  { pattern: /\btbc\b/i, name: "TBC-kuntopiiri" },
  { pattern: /hyvä\s*ryhti|hyva\s*ryhti/i, name: "Hyvä ryhti + Core + lihashuolto" },
  { pattern: /kiinteytys/i, name: "Kiinteytys-mix" },
  { pattern: /yritysjumppa/i, name: "Yritysjumppa" },
];

export type NimenhuutoClass = {
  time: string;
  name: string;
  note?: string;
  instructor?: string;
  href?: string;
};

export type NimenhuutoDay = {
  date: string;
  label: string;
  classes: NimenhuutoClass[];
};

export type NimenhuutoFeed = {
  status: "ok" | "empty" | "error";
  days: NimenhuutoDay[];
};

type ParsedEvent = {
  date: string;
  start: string;
  end?: string;
  name: string;
  note?: string;
  instructor?: string;
  href?: string;
  subject: string;
};

const loadUpcomingNimenhuutoEvents = unstable_cache(
  async (): Promise<NimenhuutoFeed> => {
    const response = await fetch(site.nimenhuutoCsvUrl, {
      cache: "no-store",
      headers: {
        Accept: "text/csv,text/plain;q=0.9,*/*;q=0.8",
        "User-Agent": "KuntokeskusLoisto/1.0",
      },
    });
    if (!response.ok) {
      throw new Error(`Nimenhuuto CSV ${response.status}`);
    }
    const days = upcomingFromCsv(await response.text());
    return { status: days.length ? "ok" : "empty", days };
  },
  ["nimenhuuto-upcoming-v2"],
  { revalidate: REVALIDATE_SECONDS, tags: ["nimenhuuto"] },
);

export async function getUpcomingNimenhuutoEvents(): Promise<NimenhuutoFeed> {
  try {
    return await loadUpcomingNimenhuutoEvents();
  } catch (error) {
    console.error("[nimenhuuto]", error);
    return { status: "error", days: [] };
  }
}

export function upcomingFromCsv(csv: string): NimenhuutoDay[] {
  const now = helsinkiStamp();
  const until = addCalendarDays(now.date, LOOKAHEAD_DAYS);
  const events = parseEvents(csv).filter((event) => {
    if (event.date < now.date || event.date > until) return false;
    if (event.date === now.date && event.start <= now.time) return false;
    return true;
  });

  const unique = dedupe(events);
  unique.sort((a, b) =>
    a.date === b.date
      ? a.start.localeCompare(b.start) || a.name.localeCompare(b.name, "fi")
      : a.date.localeCompare(b.date),
  );

  const byDate = new Map<string, NimenhuutoClass[]>();
  for (const event of unique) {
    const list = byDate.get(event.date) ?? [];
    list.push({
      time: event.end ? `${formatClock(event.start)}–${formatClock(event.end)}` : formatClock(event.start),
      name: event.name,
      note: event.note,
      instructor: event.instructor,
      href: event.href,
    });
    byDate.set(event.date, list);
  }

  return [...byDate.entries()].map(([date, classes]) => ({
    date,
    label: formatDayLabel(date, now.date),
    classes,
  }));
}

function parseEvents(csv: string): ParsedEvent[] {
  const rows = parseCsv(csv.replace(/^\uFEFF/, ""));
  if (rows.length < 2) return [];
  const header = rows[0].map((cell) => cell.trim().toLowerCase());
  const col = (name: string) => header.indexOf(name);

  const subjectIdx = col("subject");
  const dateIdx = col("start date");
  const timeIdx = col("start time");
  const descriptionIdx = col("description");
  if (subjectIdx < 0 || dateIdx < 0 || timeIdx < 0) return [];

  const events: ParsedEvent[] = [];
  for (const row of rows.slice(1)) {
    const subject = row[subjectIdx]?.trim() ?? "";
    const date = normalizeDate(row[dateIdx] ?? "");
    const start = normalizeTime(row[timeIdx] ?? "");
    if (!subject || !date || !start) continue;

    const description = descriptionIdx >= 0 ? row[descriptionIdx] ?? "" : "";
    const cleaned = cleanSubject(subject);
    events.push({
      date,
      start,
      end: cleaned.end,
      name: cleaned.name,
      note: cleaned.note,
      instructor: cleaned.instructor ?? extractInstructor(description),
      href: extractEventUrl(description) ?? extractEventUrl(subject),
      subject,
    });
  }
  return events;
}

function cleanSubject(raw: string): {
  name: string;
  instructor?: string;
  note?: string;
  end?: string;
} {
  let text = raw.replace(/^Aerodiggarit:\s*/i, "").trim();
  const instructor = extractInstructor(text);
  if (instructor) {
    text = text.replace(INSTRUCTOR_TAIL, "").trim();
  }

  const noteBits: string[] = [];
  if (/fitness-kortilla/i.test(text)) noteBits.push("Fitness-kortilla mukaan");
  if (/\balkeet\b/i.test(text) && /keskitaso/i.test(text)) {
    noteBits.push("Alkeet / keskitaso");
  } else if (/\balkeet\b/i.test(text)) {
    noteBits.push("Alkeet");
  }

  text = text.replace(SHOUT_PREFIX, "").trim();
  let end: string | undefined;
  const timeMatch = text.match(TIME_RANGE);
  if (timeMatch) {
    end = normalizeTime(timeMatch[2]) ?? undefined;
    text = text.slice(timeMatch[0].length).trim();
  }
  text = text.replace(DATE_ARROW_TAIL, "").trim();
  text = text.replace(/\s*(?:->|→)\s*$/, "").trim();

  const hinted = CLASS_HINTS.find((hint) => hint.pattern.test(text));
  const name = hinted ? hinted.name : prettifyName(text);

  return {
    name: name || "Ryhmäliikunta",
    instructor,
    note: noteBits.length ? noteBits.join(" · ") : undefined,
    end,
  };
}

function extractInstructor(text: string): string | undefined {
  const match = text.match(INSTRUCTOR_TAIL) ?? text.match(/ohjaaja:?\s*(Jari|Ulla P\.?|Ulla|Eija)/i);
  if (!match) return undefined;
  const value = match[1].trim();
  if (/^jari$/i.test(value)) return "Jari";
  if (/^ulla/i.test(value)) return "Ulla P.";
  if (/^eija$/i.test(value)) return "Eija";
  return value;
}

function prettifyName(raw: string): string {
  let name = raw
    .replace(/\s*[-–]?\s*FITNESS-kortilla.*$/i, "")
    .replace(/\s*\([^)]{12,}\)\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  const letters = [...name].filter((char) => /\p{L}/u.test(char));
  const upper = letters.filter(
    (char) => char === char.toUpperCase() && char !== char.toLowerCase(),
  ).length;
  if (letters.length && upper / letters.length >= 0.65) {
    name = name.toLocaleLowerCase("fi");
    name = name.replace(/(^|[\s/+&-])(\p{L})/gu, (_, prefix: string, char: string) => {
      return prefix + char.toLocaleUpperCase("fi");
    });
    name = name
      .replace(/\bHiit\b/gi, "HIIT")
      .replace(/\bRvp\b/gi, "RVP")
      .replace(/\bTbc\b/gi, "TBC");
  }
  return name.replace(/\s+/g, " ").trim();
}

function extractEventUrl(text: string): string | undefined {
  return text.match(EVENT_URL)?.[0];
}

function dedupe(events: ParsedEvent[]): ParsedEvent[] {
  const best = new Map<string, ParsedEvent>();
  for (const event of events) {
    const key = `${event.date}|${event.start}|${event.name.toLocaleLowerCase("fi")}`;
    const current = best.get(key);
    if (!current || event.subject.length < current.subject.length) {
      best.set(key, event);
    }
  }
  return [...best.values()];
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') {
      quoted = true;
      continue;
    }
    if (char === ",") {
      row.push(field);
      field = "";
      continue;
    }
    if (char === "\n") {
      row.push(field);
      field = "";
      if (row.some((cell) => cell.length)) rows.push(row);
      row = [];
      continue;
    }
    if (char !== "\r") field += char;
  }

  if (field.length || row.length) {
    row.push(field);
    if (row.some((cell) => cell.length)) rows.push(row);
  }
  return rows;
}

function helsinkiStamp(date = new Date()): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: HELSINKI,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    date: `${get("year")}-${get("month").padStart(2, "0")}-${get("day").padStart(2, "0")}`,
    time: `${get("hour").padStart(2, "0")}:${get("minute").padStart(2, "0")}`,
  };
}

function addCalendarDays(ymd: string, days: number): string {
  const [year, month, day] = ymd.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + days));
  return next.toISOString().slice(0, 10);
}

function formatDayLabel(date: string, today: string): string {
  const tomorrow = addCalendarDays(today, 1);
  const weekdayRaw = new Intl.DateTimeFormat("fi-FI", {
    weekday: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
  const datePart = new Intl.DateTimeFormat("fi-FI", {
    day: "numeric",
    month: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
  const weekday = weekdayRaw.charAt(0).toUpperCase() + weekdayRaw.slice(1);
  const label = `${weekday} ${datePart}`;
  if (date === today) return `Tänään · ${label}`;
  if (date === tomorrow) return `Huomenna · ${label}`;
  return label;
}

function formatClock(time: string): string {
  const [hours, minutes] = time.split(":");
  return `${Number(hours)}.${minutes}`;
}

function normalizeDate(value: string): string | null {
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  const fi = trimmed.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (!fi) return null;
  return `${fi[3]}-${fi[2].padStart(2, "0")}-${fi[1].padStart(2, "0")}`;
}

function normalizeTime(value: string): string | null {
  const match = value.trim().replace(".", ":").match(/^(\d{1,2})(?::(\d{2}))?$/);
  if (!match) return null;
  return `${match[1].padStart(2, "0")}:${match[2] ?? "00"}`;
}
