import { readStoredJson, writeStoredJson } from "@/lib/storage";

export type MembershipRow = {
  product: string;
  kuntosali: string;
  ryhmaliikunta: string;
  fitness: string;
};

export type PriceItem = {
  title: string;
  price: string;
  note?: string;
};

export type ExtraItem = {
  title: string;
  text: string;
};

export type TreatmentItem = {
  title: string;
  offer: string;
  price: string;
  note: string;
};

export type PricesData = {
  updatedAt: string;
  headline: {
    eyebrow: string;
    title: string;
    lead: string;
    highlightKuntosali: string;
    highlightRyhmaliikunta: string;
    highlightFitness: string;
  };
  membershipRows: MembershipRow[];
  extras: ExtraItem[];
  offers: {
    trialBadge: string;
    trialNote: string;
    trialPrices: PriceItem[];
    ptTitle: string;
    ptText: string;
    yearBadge: string;
    yearNote: string;
    yearPrices: PriceItem[];
    bonusTitle: string;
    bonuses: string[];
    aerialBadge: string;
    aerialText: string;
    treatments: TreatmentItem[];
  };
  personalTraining: {
    ohjelma1: string;
    ohjelma2: string;
    ohjelma3: string;
    ruokavalio: string;
    pt2: string;
    pt5: string;
    pt10: string;
    pt10Offer: string;
    pt15: string;
    pt15Offer: string;
    /** Optional – used on /kuntosali; fallbacks if missing in older CMS data */
    kuntotesti?: string;
    kehonkoostumus?: string;
  };
  homeHighlights: PriceItem[];
};

const STORAGE_KEY = "loisto:prices";
const SEED_FILE = "data/prices.json";

export async function getPrices(): Promise<PricesData> {
  return readStoredJson<PricesData>(STORAGE_KEY, SEED_FILE);
}

export async function savePrices(data: PricesData): Promise<PricesData> {
  const program = getGymProgramPrices(data.personalTraining);
  const extras = data.extras.map((item) => {
    if (!/ohjelmat/i.test(item.title)) return item;
    return {
      ...item,
      text: `Kuntosaliohjelma ${program.ohjelma1} / ${program.ohjelma2} / ${program.ohjelma3} · kuntotesti ${program.kuntotesti} · kehonkoostumus ${program.kehonkoostumus}`,
    };
  });

  const next: PricesData = {
    ...data,
    extras,
    personalTraining: {
      ...data.personalTraining,
      kuntotesti: program.kuntotesti,
      kehonkoostumus: program.kehonkoostumus,
    },
    updatedAt: new Date().toISOString(),
  };
  return writeStoredJson(STORAGE_KEY, SEED_FILE, next);
}

export function isPricesData(value: unknown): value is PricesData {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<PricesData>;
  return (
    Array.isArray(data.membershipRows) &&
    Array.isArray(data.extras) &&
    !!data.headline &&
    !!data.offers &&
    !!data.personalTraining &&
    Array.isArray(data.homeHighlights)
  );
}

/** Normalize product labels for matching admin edits (× vs x, spacing). */
export function normalizeProductName(value: string) {
  return value.toLowerCase().replace(/×/g, "x").replace(/\s+/g, "");
}

/** Find kuntosali price from the same membership table as /hinnat. */
export function findGymPrice(
  rows: MembershipRow[],
  candidates: string[],
): string {
  for (const candidate of candidates) {
    const needle = normalizeProductName(candidate);
    const row = rows.find((item) =>
      normalizeProductName(item.product).includes(needle),
    );
    if (row?.kuntosali) return row.kuntosali;
  }
  return "—";
}

export function getGymProgramPrices(pt: PricesData["personalTraining"]) {
  return {
    ohjelma1: pt.ohjelma1,
    ohjelma2: pt.ohjelma2,
    ohjelma3: pt.ohjelma3,
    kuntotesti: pt.kuntotesti ?? "70 €",
    kehonkoostumus: pt.kehonkoostumus ?? "25 €",
  };
}
