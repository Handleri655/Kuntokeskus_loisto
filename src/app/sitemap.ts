import type { MetadataRoute } from "next";
import { nav, servicesNav } from "@/lib/site";

const base = "https://kuntokeskusloisto.fi";

const extra = [
  "/koti",
  "/jari",
  "/ryhmaliikunta/kesa",
] as const;

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
    changeFrequency: path === "/koti" || path === "/" ? "weekly" : "monthly",
    priority: path === "/koti" ? 1 : path === "/" ? 0.9 : 0.7,
  }));
}
