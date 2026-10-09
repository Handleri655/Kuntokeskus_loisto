/** Client-safe offer helpers (no Node fs / Redis). */

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
  description: string;
  tone: "dark" | "light";
  hidden?: boolean;
  cards: CustomOfferCard[];
};

export function newOfferSectionId() {
  return `osio-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function createEmptyCustomSection(): CustomOfferSection {
  return {
    id: newOfferSectionId(),
    eyebrow: "Uusi tarjous",
    heading: "Kirjoita otsikko",
    lead: "",
    badge: "",
    jumpLabel: "Uusi",
    description: "Oma tarjousosio tarjoukset-sivulla.",
    tone: "light",
    hidden: false,
    cards: [
      {
        title: "Uusi kortti",
        offer: "Tarjous",
        price: "",
        note: "",
        hidden: false,
      },
    ],
  };
}

export function visibleItems<T extends { hidden?: boolean }>(items: T[]): T[] {
  return items.filter((item) => !item.hidden);
}
