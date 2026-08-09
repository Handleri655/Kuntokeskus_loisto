export const site = {
  name: "Kuntokeskus Loisto",
  legalName: "Kuntokeskus Loisto Oy",
  tagline: "Hollolan kuntokeskus vuodesta 1992",
  phone: "040-1402849",
  phoneHref: "tel:0401402849",
  jariPhone: "041-5077919",
  jariPhoneHref: "tel:0415077919",
  email: "jari.kotkansalo@gmail.com",
  emailHref: "mailto:jari.kotkansalo@gmail.com",
  address: "Keskuskatu 4, 15870 Hollola",
  mapsUrl:
    "https://maps.google.com/?q=Keskuskatu+4,+15870+Hollola,+Finland",
  paymentMethods: ["Edenred", "E-passi", "Smartum"],
  bankAccount: "OP FI37 5311 0020 1134 71",
  jariSite: "https://www.tmijarik.fi",
  keycardHours: "04–24",
  founded: "1992",
} as const;

export const nav = [
  { href: "/kuntosali", label: "Kuntosali" },
  { href: "/ryhmaliikunta", label: "Ryhmäliikunta" },
  { href: "/aerial-bungee", label: "Aerial Bungee" },
  { href: "/personal-training", label: "PT" },
  { href: "/tarjoukset", label: "Tarjoukset" },
  { href: "/hinnat", label: "Hinnat" },
  { href: "/hyvinvointi", label: "Hyvinvointi" },
  { href: "/info", label: "Info" },
] as const;

export const moreNav = [
  { href: "/cross-training", label: "Cross Training" },
  { href: "/kangoo", label: "Kangoo Power / Jumps" },
  { href: "/aanimaljarentoutus", label: "Äänimaljarentoutus" },
  { href: "/jooga", label: "Jooga" },
  { href: "/painonpudotus", label: "Painonpudotus" },
  { href: "/solarium", label: "Solarium" },
  { href: "/jari", label: "Henkilökuva" },
  { href: "/loisto", label: "Loisto" },
] as const;

export const dutyHours = [
  { day: "Maanantai", hours: "09:45–12:00 & 15:00–17:15" },
  { day: "Tiistai", hours: "17:00–20:30" },
  { day: "Keskiviikko", hours: "14:00–17:00 & 19:15–20:30" },
  { day: "Torstai", hours: "14:00–17:15" },
  { day: "Perjantai", hours: "09:45–12:00" },
  { day: "Lauantai–Sunnuntai", hours: "Suljettu" },
] as const;

export const openingHours = [
  { day: "Maanantai", hours: "09:45–17:15" },
  { day: "Tiistai", hours: "17:00–20:30" },
  { day: "Keskiviikko", hours: "14:00–20:30" },
  { day: "Torstai", hours: "14:00–17:15" },
  { day: "Perjantai", hours: "09:45–12:00" },
  { day: "Lauantai–Sunnuntai", hours: "Suljettu" },
] as const;

export const services = [
  {
    href: "/aerial-bungee",
    title: "Aerial Bungee",
    text: "Valjastreeniä, joka tuntuu vapaudelta.",
  },
  {
    href: "/cross-training",
    title: "Cross Training",
    text: "Voimaa, kestävyyttä ja vartalon hallintaa.",
  },
  {
    href: "/kangoo",
    title: "Kangoo Power / Jumps",
    text: "Intervallitreeniä hyppykengillä – ainoana Hollolassa.",
  },
  {
    href: "/personal-training",
    title: "Personal Training",
    text: "Yksilölliset ohjelmat ja tavoitteellinen ohjaus.",
  },
  {
    href: "/aanimaljarentoutus",
    title: "Äänimaljarentoutus",
    text: "Lempeää hyvinvointia äänien maailmassa.",
  },
  {
    href: "/kuntosali",
    title: "Kuntosali",
    text: "Avainkortilla sali joka päivä klo 04–24.",
  },
] as const;
