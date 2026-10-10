import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/", "/ryhmaliikunta/tulosta"],
    },
    sitemap: "https://kuntokeskusloisto.fi/sitemap.xml",
  };
}
