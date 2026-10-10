import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Loisto",
    description:
      "Kuntosali, ryhmäliikunta ja personal training Hollolassa. Avainkortilla sali klo 04–24.",
    start_url: "/",
    display: "standalone",
    background_color: "#1c1612",
    theme_color: "#d56b1f",
    lang: "fi",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
