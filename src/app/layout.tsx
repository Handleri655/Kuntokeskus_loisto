import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const description =
  "Kuntokeskus Loisto tarjoaa kuntosalin, ryhmäliikuntaa, Aerial Bungeeta, Cross Trainingia ja Personal Trainingia Hollolassa. Avainkortilla sali klo 04–24. Ei liittymismaksuja.";

export const metadata: Metadata = {
  title: {
    default: "Kuntosali Hollola | Kuntokeskus Loisto",
    template: `%s | ${site.name}`,
  },
  description,
  metadataBase: new URL("https://kuntokeskusloisto.fi"),
  applicationName: site.name,
  authors: [{ name: site.legalName, url: "https://kuntokeskusloisto.fi" }],
  creator: site.legalName,
  category: "fitness",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    siteName: site.name,
    locale: "fi_FI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1612",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col text-[16.5px] antialiased md:text-[17px]">
        <JsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
