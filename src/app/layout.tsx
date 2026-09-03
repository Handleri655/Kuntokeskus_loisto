import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Kuntosali Hollola | Kuntokeskus Loisto",
    template: `%s | ${site.name}`,
  },
  description:
    "Kuntokeskus Loisto tarjoaa kuntosalin, ryhmäliikuntaa, Aerial Bungeeta, Cross Trainingia ja Personal Trainingia Hollolassa. Avainkortilla sali klo 04–24. Ei liittymismaksuja.",
  metadataBase: new URL("https://kuntokeskusloisto.fi"),
  openGraph: {
    title: "Kuntosali Hollola | Kuntokeskus Loisto",
    description:
      "Kuntosali, ryhmäliikunta ja personal training Hollolassa vuodesta 1992.",
    locale: "fi_FI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col text-[16.5px] antialiased md:text-[17px]">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
