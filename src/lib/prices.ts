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
  };
  homeHighlights: PriceItem[];
};

const STORAGE_KEY = "loisto:prices";
const SEED_FILE = "data/prices.json";

export async function getPrices(): Promise<PricesData> {
  return readStoredJson<PricesData>(STORAGE_KEY, SEED_FILE);
}

export async function savePrices(data: PricesData): Promise<PricesData> {
  const next: PricesData = {
    ...data,
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
