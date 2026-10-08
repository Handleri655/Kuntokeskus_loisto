import type { MetadataRoute } from "next";
import { nav, servicesNav } from "@/lib/site";

const base = "https://kuntokeskusloisto.fi";

const extra = ["/jari", "/ryhmaliikunta/kesa"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>([
    "/",
    ...extra,
    ...nav.map((item) => item.href),
    ...servicesNav.map((item) => item.href),
  ]);

  const now = new Date();

  return [...paths].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
