import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api/",
        "/jari",
        "/henkil-esittely",
        "/ryhmaliikunta/kesa",
        "/uusi-ryhm-liikunta",
        "/ryhmaliikunta/tulosta",
      ],
    },
    sitemap: "https://kuntokeskusloisto.fi/sitemap.xml",
  };
}
