import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
    default: `${site.name} Oy | Hollola`,
    template: `%s | ${site.name}`,
  },
  description:
    "Kuntokeskus Loisto – kuntosali, ryhmäliikunta, Aerial Bungee, PT, solarium ja hyvinvointipalvelut Hollolassa. Avainkortilla treenaat klo 04–24.",
  metadataBase: new URL("https://kuntokeskusloisto.fi"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col text-[17px] antialiased md:text-[18px]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
