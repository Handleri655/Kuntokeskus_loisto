import { site } from "@/lib/site";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["ExerciseGym", "LocalBusiness"],
    name: site.name,
    legalName: site.legalName,
    url: "https://kuntokeskusloisto.fi",
    image: "https://kuntokeskusloisto.fi/images/kuntosali-01.jpg",
    logo: "https://kuntokeskusloisto.fi/apple-touch-icon.png",
    telephone: "+358401402849",
    email: site.email,
    foundingDate: site.founded,
    currenciesAccepted: "EUR",
    paymentAccepted: "Käteinen, pankkikortti, luottokortti, Edenred, E-passi",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Keskuskatu 4",
      postalCode: "15870",
      addressLocality: "Hollola",
      addressCountry: "FI",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 60.98711,
      longitude: 25.51023,
    },
    hasMap: site.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days,
        opens: "04:00",
        closes: "23:59",
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Hollola",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
