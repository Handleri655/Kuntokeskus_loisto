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
    changeFrequency: path === "/" || path === "/tarjoukset" ? "weekly" : "monthly",
    priority: priorityFor(path),
  }));
}

function priorityFor(path: string) {
  if (path === "/") return 1;
  if (
    path === "/kuntosali" ||
    path === "/hinnat" ||
    path === "/tarjoukset" ||
    path === "/ryhmaliikunta" ||
    path === "/info"
  ) {
    return 0.9;
  }
  return 0.7;
}
