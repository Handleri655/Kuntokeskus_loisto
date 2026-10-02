export const site = {
  name: "Kuntokeskus Loisto",
  legalName: "Kuntokeskus Loisto Oy",
  tagline: "Hollolan kuntokeskus vuodesta 1992",
  phone: "040-1402849",
  phoneHref: "tel:0401402849",
  smsHref: "sms:0401402849",
  jariPhone: "041-5077919",
  jariPhoneHref: "tel:0415077919",
  jariSmsHref: "sms:0415077919",
  email: "jari.kotkansalo@gmail.com",
  emailHref: "mailto:jari.kotkansalo@gmail.com",
  address: "Keskuskatu 4, 15870 Hollola",
  mapsUrl:
    "https://maps.google.com/?q=Keskuskatu+4,+15870+Hollola,+Finland",
  paymentMethods: ["Edenred", "E-passi", "Smartum"],
  bankAccount: "OP FI37 5311 0020 1134 71",
  jariSite: "https://www.tmijarik.fi",
  nimenhuutoUrl: "https://aerodiggarit.nimenhuuto.com",
  keycardHours: "04–24",
  keycardEntryBy: "klo 23",
  founded: "1992",
  googleReviewsUrl:
    "https://www.google.com/search?q=Kuntokeskus+Loisto+Hollola",
} as const;

/** Google-arvosteluja – näytetään ilman nimiä */
export const googleReviews = [
  {
    text: "Tuttu ja rustiikkisen kodikas perinteinen sali.",
  },
  {
    text: "Mukava ja asiantunteva henkilökunta. Hyvät uusitut laitteet ja siistit tilat.",
  },
  {
    text: "Sopivan kokoinen sali ja sydämellinen omistaja.",
  },
  {
    text: "Paikka rauhallinen ja mukava käydä.",
  },
  {
    text: "Hyvää asiakaspalvelua!",
  },
  {
    text: "Siisti ja kaikki tarvittava löytyy.",
  },
] as const;

/** Top-level nav links (desktop) */
export const nav = [
  { href: "/kuntosali", label: "Kuntosali" },
  { href: "/ryhmaliikunta", label: "Ryhmäliikunta" },
  { href: "/hinnat", label: "Hinnat" },
  { href: "/tarjoukset", label: "Tarjoukset" },
  { href: "/loisto", label: "Meistä" },
  { href: "/info", label: "Yhteystiedot" },
] as const;

/** Services dropdown */
export const servicesNav = [
  { href: "/aerial-bungee", label: "Aerial Bungee" },
  { href: "/cross-training", label: "Cross Training" },
  { href: "/kangoo", label: "Kangoo Power / Jumps" },
  { href: "/personal-training", label: "Personal Training" },
  { href: "/jooga", label: "Jooga" },
  { href: "/aanimaljarentoutus", label: "Äänimaljarentoutus" },
  { href: "/hyvinvointi", label: "Hyvinvointi" },
  { href: "/painonpudotus", label: "Painonpudotus" },
  { href: "/solarium", label: "Solarium" },
] as const;

/** @deprecated use servicesNav — kept for any leftover imports */
export const moreNav = servicesNav;

export const whyLoisto = [
  {
    title: "Yli 30 vuotta Hollolassa",
    text: `Kuntokeskus Loisto on palvellut Hollolassa vuodesta ${site.founded}. Paikallinen sali, jonka tunnet – ei ketjua.`,
  },
  {
    title: "Monipuoliset treenimahdollisuudet",
    text: "Kuntosali, ryhmäliikunta, Aerial Bungee, Cross Training, Kangoo ja PT samassa talossa Keskuskadulla.",
  },
  {
    title: "Tukea tavoitteisiin",
    text: "Et jää yksin. Jari Kotkansalon ohjauksella saat apua harjoitteluun, hyvinvointiin ja tavoitteidesi saavuttamiseen.",
  },
] as const;

export const dutyHours = [
  { day: "Maanantai", hours: "09:45–12:00 & 15:00–18:00" },
  { day: "Tiistai", hours: "17:15–20:30" },
  { day: "Keskiviikko", hours: "15:00–18:00 & 19:10–20:30" },
  { day: "Torstai", hours: "15:00–18:00" },
  { day: "Perjantai", hours: "09:45–12:00" },
  { day: "Lauantai–Sunnuntai", hours: "Suljettu" },
] as const;

export const openingHours = [
  { day: "Maanantai", hours: "09:45–12:00 & 15:00–18:00" },
  { day: "Tiistai", hours: "17:15–20:30" },
  { day: "Keskiviikko", hours: "15:00–18:00 & 19:10–20:30" },
  { day: "Torstai", hours: "15:00–18:00" },
  { day: "Perjantai", hours: "09:45–12:00" },
  { day: "Lauantai–Sunnuntai", hours: "Suljettu" },
] as const;

export const services = [
  {
    href: "/aerial-bungee",
    title: "Aerial Bungee",
    text: "Valjastreeniä Loistossa – keventää nivelet ja nostaa treenin uudelle tasolle.",
  },
  {
    href: "/cross-training",
    title: "Cross Training",
    text: "Voimaa ja kestävyyttä ohjatusti. Sopii juuri sinulle, aloittelijasta edistyneeseen.",
  },
  {
    href: "/kangoo",
    title: "Kangoo Power / Jumps",
    text: "Hyppykenkätreeniä ainoana Hollolassa – tehokasta, nivelystävällistä ja hauskaa.",
  },
  {
    href: "/personal-training",
    title: "Personal Training",
    text: "Jarin yksilöohjaus: fysioterapiaosaaminen ja treeniohjelma samassa paketissa.",
  },
  {
    href: "/aanimaljarentoutus",
    title: "Äänimaljarentoutus",
    text: "Syvärentoutusta äänimaljoin – palautumiseen arjen keskellä.",
  },
  {
    href: "/kuntosali",
    title: "Kuntosali",
    text: `Oma avainkortti, sali auki ${site.keycardHours}. Treenaa milloin sinulle sopii.`,
  },
] as const;
