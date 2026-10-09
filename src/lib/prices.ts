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

export const defaultRyhmaliikuntaInfo: RyhmaliikuntaInfo = {
  intro:
    "Tunnit pidetään 4:llä, Aerial Bungee 3:lla ja joogat 6:lla. Varaus & peruutus viimeistään edellisenä iltana klo 20 mennessä. Ilmoittaudu Nimenhuudossa tai lähetä nimi & sähköposti tekstiviestillä numeroon 040-1402849.",
  classes: [
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
  ],
  outro:
    "Ohjaajat: Jari Kotkansalo, Ulla Paaso, Eija Liikonen. Fitness sisältää kuntosalin 4–24 + jumpat + Aerial Bungee 55 + Cross Training + joogat. Ryhmäliikunta sisältää jumpat + Kangoo Jumps + joogat.",
};

type StoredPrices = Omit<PricesData, "servicePrices" | "ryhmaliikuntaInfo"> & {
  servicePrices?: Partial<ServicePrices> | null;
  ryhmaliikuntaInfo?: Partial<RyhmaliikuntaInfo> | null;
};

export function normalizePrices(data: StoredPrices): PricesData {
  const info = data.ryhmaliikuntaInfo ?? {};
  return {
    ...data,
    servicePrices: {
      ...defaultServicePrices,
      ...(data.servicePrices ?? {}),
    },
    ryhmaliikuntaInfo: {
      intro: info.intro ?? defaultRyhmaliikuntaInfo.intro,
      classes: Array.isArray(info.classes)
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
  const { servicePrices, ryhmaliikuntaInfo } = normalized;
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
