import { sanitizeMembershipCell } from "@/lib/membership-price";
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
  /** Yliviivattu vertailuhinta (esim. 49 €). Tyhjä = ei näytetä. */
  was?: string;
  /** Piilotettu tarjoukset-sivulta (säilytetään hallinnassa) */
  hidden?: boolean;
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
  /** Piilotettu tarjoukset-sivulta (säilytetään hallinnassa) */
  hidden?: boolean;
};

export type OfferSectionKey =
  | "trial"
  | "year"
  | "pt"
  | "aerial"
  | "treatments";

export type OfferVisibility = Record<OfferSectionKey, boolean>;

export type CustomOfferCard = {
  title: string;
  offer: string;
  price: string;
  note: string;
  hidden?: boolean;
};

export type CustomOfferSection = {
  id: string;
  eyebrow: string;
  heading: string;
  lead: string;
  badge: string;
  jumpLabel: string;
  /** Hallinnan kortin lyhyt kuvaus */
  description: string;
  tone: "dark" | "light";
  hidden?: boolean;
  cards: CustomOfferCard[];
};

export type OffersData = {
  trialBadge: string;
  trialNote: string;
  trialEyebrow: string;
  trialHeading: string;
  /** Hallinnan osion lyhyt kuvaus (muokattava) */
  trialSectionDescription: string;
  trialPrices: PriceItem[];
  ptTitle: string;
  ptText: string;
  ptEyebrow: string;
  ptSectionDescription: string;
  yearBadge: string;
  yearNote: string;
  yearHeading: string;
  yearSectionDescription: string;
  yearPrices: PriceItem[];
  bonusTitle: string;
  bonuses: string[];
  aerialBadge: string;
  aerialText: string;
  aerialEyebrow: string;
  aerialHeading: string;
  aerialSectionDescription: string;
  treatmentsEyebrow: string;
  treatmentsHeading: string;
  treatmentsLead: string;
  treatmentsSectionDescription: string;
  jumpYear: string;
  jumpAerial: string;
  jumpTreatments: string;
  treatments: TreatmentItem[];
  visibility: OfferVisibility;
  /** Vapaasti lisättävät uudet tarjousosiot */
  customSections: CustomOfferSection[];
};

export type ServicePrices = {
  aerialIntensivi: string;
  aerial5x: string;
  aerial3x: string;
  crossKerta: string;
  cross6x: string;
  aanimaljaMember: string;
  aanimaljaGuest: string;
  painonpudotusIntensiivi: string;
  painonpudotusDuo: string;
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
  offers: OffersData;
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
  /** Palvelusivujen erillishinnat (Aerial, Cross, äänimalja jne.) */
  servicePrices: ServicePrices;
  /** Ryhmäliikuntasivun esittelyteksti */
  ryhmaliikuntaInfo: RyhmaliikuntaInfo;
};

export type RyhmaliikuntaInfo = {
  intro: string;
  classes: string[];
  outro: string;
};

const STORAGE_KEY = "loisto:prices";
const SEED_FILE = "data/prices.json";

export const defaultServicePrices: ServicePrices = {
  aerialIntensivi: "32 €",
  aerial5x: "75 €",
  aerial3x: "60 €",
  crossKerta: "14 €",
  cross6x: "72 €",
  aanimaljaMember: "14 €",
  aanimaljaGuest: "19 €",
  painonpudotusIntensiivi: "360 €/hlö",
  painonpudotusDuo: "315 €/hlö",
};

const legacyRyhmaliikuntaIntro =
  /(?:tunnit|jumpat|jumpata) pidetään 4:llä/i;

const legacyRyhmaliikuntaClasses = [
  "Hatha-jooga 75 ma 19.15–20.30",
  "Äänimaljarentoutus 60 ti 17.30–18.30 (joka 2. ti)",
  "Aerial Bungee 55 ti 19.45–20.40 – Fitness-kortilla mukaan",
  "Retro-jumppa ke 16.45–18.00",
  "Aerial Bungee intensiivi 75 to 19.15–20.30 – 32 €",
  "Step + RVP pe 16.45–17.30",
  "Kangoo Jumps + Core 45 pe 17.40–18.25",
  "Cross Training 60 pe 18.45–19.45",
  "HIIT + Core 45 la 11.30–12.15",
  "Kahvakuula 45 la 12.25–13.15",
];

export const defaultRyhmaliikuntaInfo: RyhmaliikuntaInfo = {
  intro:
    "Ryhmäliikunta 12.10.2026 alkaen, 16 h/vko. Lähetä nimi, puhelinnumero ja sähköposti numeroon 040-1402849, niin saat jumppa-varauslinkin sähköpostiisi. Varaa paikka jumppiin viimeistään edellisenä iltana klo 20 mennessä – samoin peruutukset.",
  classes: [
    "Ma 10.00–10.55 Kuntosali Circuit",
    "Ma 18.00–18.55 Pump Up Ohjelma 1",
    "Ma 19.15–20.30 Hatha-jooga 75 – Ulla P.",
    "Ti 16.15–17.15 Yritystunti",
    "Ti 17.30–18.30 Äänimaljarentoutus (joka 2. ti) – Eija L.",
    "Ti 19.45–20.40 Aerial Bungee 55 normi",
    "Ke 10.00–10.55 Hyvä ryhti + lihashuolto",
    "Ke 16.45–18.00 Retro-jumppa 75 (step + rasvanpoltto + lihaskunto + lihashuolto) – Ulla P.",
    "Ke 18.15–19.15 Yritystunti",
    "To 17.00–17.50 Lavis",
    "To 18.00–18.55 Pump Up Ohjelma 2",
    "To 19.15–20.30 Aerial Bungee 75 intensiivi",
    "Pe 10.00–10.55 TBC-kierto + hulahoop",
    "Pe 16.45–17.30 Step + RVP",
    "Pe 17.40–18.25 Kangoo Jumps + Core",
    "Pe 18.45–19.45 Cross Training (6×-kurssi)",
    "La 11.30–12.15 HIIT + Core 45",
    "La 12.25–13.10 Kahvakuula 45",
    "Su – ei jumppia",
  ],
  outro:
    "Ohjaajat: Jari Kotkansalo, Ulla Paaso, Eija Liikonen. Fitness sisältää kuntosalin 4–24 + jumpat + Aerial Bungee 55 + Cross Training + joogat. Ryhmäliikunta sisältää jumpat + Kangoo Jumps + joogat.",
};

export const defaultOfferVisibility: OfferVisibility = {
  trial: true,
  year: true,
  pt: true,
  aerial: true,
  treatments: true,
};

export const defaultOfferCopy = {
  trialEyebrow: "Tutustumistreenit",
  trialHeading: "Uusi asiakas – treenaa puoleen hintaan",
  trialSectionDescription: "1 kk -tarjous uusille asiakkaille.",
  ptEyebrow: "Personal Training",
  ptSectionDescription:
    "Personal Training -osio. Tarjoushinnat muokataan PT-hinnat -välilehdellä.",
  yearHeading: "Ihan kaikille – rajoitetun ajan",
  yearSectionDescription: "6–12 kk kuukausihinnat ja kaupan päälle -edut.",
  aerialEyebrow: "Aerial Bungee",
  aerialHeading: "Intensiivi 75",
  aerialSectionDescription: "Aerial Bungee -tarjous tarjoukset-sivulla.",
  treatmentsEyebrow: "Hyvinvointi",
  treatmentsHeading: "Superedulliset hoitosarjat",
  treatmentsLead:
    "Hieronta, Footbalance, fysioterapia, kuppaus, kuumakivi ja faskiakäsittely – edut voimassa rajoitetusti.",
  treatmentsSectionDescription: "Hyvinvointitarjoukset.",
  jumpYear: "Vuoden etu",
  jumpAerial: "Aerial",
  jumpTreatments: "Hoidot",
} as const;

type StoredOffers = Partial<
  Omit<
    OffersData,
    | "visibility"
    | "treatments"
    | "trialPrices"
    | "yearPrices"
    | "bonuses"
    | "customSections"
  >
> & {
  trialPrices?: PriceItem[] | null;
  yearPrices?: PriceItem[] | null;
  treatments?: TreatmentItem[] | null;
  bonuses?: string[] | null;
  visibility?: Partial<OfferVisibility> | null;
  customSections?: CustomOfferSection[] | null;
};

type StoredPrices = Omit<
  PricesData,
  "servicePrices" | "ryhmaliikuntaInfo" | "offers"
> & {
  servicePrices?: Partial<ServicePrices> | null;
  ryhmaliikuntaInfo?: Partial<RyhmaliikuntaInfo> | null;
  offers?: StoredOffers | null;
};

function normalizePriceItems(items: PriceItem[] | null | undefined): PriceItem[] {
  if (!Array.isArray(items)) return [];
  return items.map((item) => ({
    title: item.title ?? "",
    price: item.price ?? "",
    note: item.note,
    was: typeof item.was === "string" ? item.was : undefined,
    hidden: Boolean(item.hidden),
  }));
}

function normalizeTreatments(
  items: TreatmentItem[] | null | undefined,
): TreatmentItem[] {
  if (!Array.isArray(items)) return [];
  return items.map((item) => ({
    title: item.title ?? "",
    offer: item.offer ?? "",
    price: item.price ?? "",
    note: item.note ?? "",
    hidden: Boolean(item.hidden),
  }));
}

function normalizeCustomCards(
  items: CustomOfferCard[] | null | undefined,
): CustomOfferCard[] {
  if (!Array.isArray(items)) return [];
  return items.map((item) => ({
    title: item.title ?? "",
    offer: item.offer ?? "",
    price: item.price ?? "",
    note: item.note ?? "",
    hidden: Boolean(item.hidden),
  }));
}

function normalizeCustomSections(
  items: CustomOfferSection[] | null | undefined,
): CustomOfferSection[] {
  if (!Array.isArray(items)) return [];
  return items.map((item, index) => ({
    id: item.id || `osio-${index + 1}`,
    eyebrow: item.eyebrow ?? "Tarjous",
    heading: item.heading ?? "",
    lead: item.lead ?? "",
    badge: item.badge ?? "",
    jumpLabel: item.jumpLabel ?? item.eyebrow ?? "Tarjous",
    description: item.description ?? "",
    tone: item.tone === "dark" ? "dark" : "light",
    hidden: Boolean(item.hidden),
    cards: normalizeCustomCards(item.cards),
  }));
}

function defaultTrialWasPrice(title: string): string | undefined {
  const t = title.toLowerCase();
  if (t.includes("fitness")) return "80 €";
  if (t.includes("ryhmä")) return "62 €";
  if (t.includes("kuntosali") || t.includes("sali")) return "49 €";
  return undefined;
}

export function normalizeOffers(offers: StoredOffers | null | undefined): OffersData {
  const src = offers ?? {};
  const visibility = {
    ...defaultOfferVisibility,
    ...(src.visibility ?? {}),
  };
  return {
    trialBadge: src.trialBadge ?? "",
    trialNote: src.trialNote ?? "",
    trialEyebrow: src.trialEyebrow ?? defaultOfferCopy.trialEyebrow,
    trialHeading: src.trialHeading ?? defaultOfferCopy.trialHeading,
    trialSectionDescription:
      src.trialSectionDescription ?? defaultOfferCopy.trialSectionDescription,
    trialPrices: normalizePriceItems(src.trialPrices).map((item) => ({
      ...item,
      was:
        typeof item.was === "string"
          ? item.was
          : (defaultTrialWasPrice(item.title) ?? ""),
    })),
    ptTitle: src.ptTitle ?? "",
    ptText: src.ptText ?? "",
    ptEyebrow: src.ptEyebrow ?? defaultOfferCopy.ptEyebrow,
    ptSectionDescription:
      src.ptSectionDescription ?? defaultOfferCopy.ptSectionDescription,
    yearBadge: src.yearBadge ?? "",
    yearNote: src.yearNote ?? "",
    yearHeading: src.yearHeading ?? defaultOfferCopy.yearHeading,
    yearSectionDescription:
      src.yearSectionDescription ?? defaultOfferCopy.yearSectionDescription,
    yearPrices: normalizePriceItems(src.yearPrices),
    bonusTitle: src.bonusTitle ?? "",
    bonuses: Array.isArray(src.bonuses) ? src.bonuses.filter(Boolean) : [],
    aerialBadge: src.aerialBadge ?? "",
    aerialText: src.aerialText ?? "",
    aerialEyebrow: src.aerialEyebrow ?? defaultOfferCopy.aerialEyebrow,
    aerialHeading: src.aerialHeading ?? defaultOfferCopy.aerialHeading,
    aerialSectionDescription:
      src.aerialSectionDescription ?? defaultOfferCopy.aerialSectionDescription,
    treatmentsEyebrow:
      src.treatmentsEyebrow ?? defaultOfferCopy.treatmentsEyebrow,
    treatmentsHeading:
      src.treatmentsHeading ?? defaultOfferCopy.treatmentsHeading,
    treatmentsLead: src.treatmentsLead ?? defaultOfferCopy.treatmentsLead,
    treatmentsSectionDescription:
      src.treatmentsSectionDescription ??
      defaultOfferCopy.treatmentsSectionDescription,
    jumpYear: src.jumpYear ?? defaultOfferCopy.jumpYear,
    jumpAerial: src.jumpAerial ?? defaultOfferCopy.jumpAerial,
    jumpTreatments: src.jumpTreatments ?? defaultOfferCopy.jumpTreatments,
    treatments: normalizeTreatments(src.treatments),
    visibility: {
      trial: visibility.trial !== false,
      year: visibility.year !== false,
      pt: visibility.pt !== false,
      aerial: visibility.aerial !== false,
      treatments: visibility.treatments !== false,
    },
    customSections: normalizeCustomSections(src.customSections),
  };
}

export function normalizePrices(data: StoredPrices): PricesData {
  const info = data.ryhmaliikuntaInfo ?? {};
  return {
    ...data,
    membershipRows: data.membershipRows.map((row) => ({
      ...row,
      kuntosali: sanitizeMembershipCell(row.kuntosali),
      ryhmaliikunta: sanitizeMembershipCell(row.ryhmaliikunta),
      fitness: sanitizeMembershipCell(row.fitness),
    })),
    offers: normalizeOffers(data.offers),
    servicePrices: {
      ...defaultServicePrices,
      ...(data.servicePrices ?? {}),
    },
    ryhmaliikuntaInfo: {
      intro:
        info.intro && !legacyRyhmaliikuntaIntro.test(info.intro)
          ? info.intro
          : defaultRyhmaliikuntaInfo.intro,
      classes:
        Array.isArray(info.classes) &&
        info.classes.join("\n") !== legacyRyhmaliikuntaClasses.join("\n")
          ? info.classes
          : defaultRyhmaliikuntaInfo.classes,
      outro: info.outro ?? defaultRyhmaliikuntaInfo.outro,
    },
  };
}

/** @deprecated use normalizePrices */
export function withServicePrices(data: StoredPrices): PricesData {
  return normalizePrices(data);
}

export async function getPrices(): Promise<PricesData> {
  const data = await readStoredJson<StoredPrices>(STORAGE_KEY, SEED_FILE);
  return normalizePrices(data);
}

export async function savePrices(data: PricesData): Promise<PricesData> {
  const program = getGymProgramPrices(data.personalTraining);
  const normalized = normalizePrices(data);
  const { servicePrices, ryhmaliikuntaInfo, offers } = normalized;
  const extras = data.extras.map((item) => {
    if (/ohjelmat/i.test(item.title)) {
      return {
        ...item,
        text: `Kuntosaliohjelma ${program.ohjelma1} / ${program.ohjelma2} / ${program.ohjelma3} · kuntotesti ${program.kuntotesti} · kehonkoostumus ${program.kehonkoostumus}`,
      };
    }
    if (/aerial/i.test(item.title)) {
      return {
        ...item,
        text: `Alkeet/perusteet 75 min ${servicePrices.aerialIntensivi} · 5×55 min ${servicePrices.aerial5x} · 3×55 min ${servicePrices.aerial3x}`,
      };
    }
    return item;
  });

  const next: PricesData = {
    ...data,
    offers,
    extras,
    servicePrices,
    ryhmaliikuntaInfo,
    personalTraining: {
      ...data.personalTraining,
      kuntotesti: program.kuntotesti,
      kehonkoostumus: program.kehonkoostumus,
    },
    updatedAt: new Date().toISOString(),
  };
  return writeStoredJson(STORAGE_KEY, SEED_FILE, next);
}

export { visibleItems } from "@/lib/offers-client";

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
