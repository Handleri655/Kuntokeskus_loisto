import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import "./portal.css";

const portalDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-portal-display",
  weight: ["500", "600", "700"],
});

const portalBody = Sora({
  subsets: ["latin"],
  variable: "--font-portal-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Valitse sivusto | T:mi Jari Kotkansalo & Kuntokeskus Loisto",
  description:
    "Valitse T:mi Jari Kotkansalon hyvinvointipalvelut tai Kuntokeskus Loiston treenimaailma.",
  openGraph: {
    title: "T:mi Jari Kotkansalo & Kuntokeskus Loisto",
    description:
      "Valitse: fysioterapia & hieronta tai kuntosali & ryhmäliikunta Hollolassa.",
  },
};

export default function PortalPage() {
  return (
    <div className={`portal-body ${portalDisplay.variable} ${portalBody.variable}`}>
      <a className="skip-link" href="#valinta">
        Siirry valintaan
      </a>

      <main id="valinta" className="portal">
        <header className="portal-top">
          <p className="portal-eyebrow">Hollola &amp; Vääksy</p>
          <h1 className="portal-title">
            Minne <em>haluat</em> mennä?
          </h1>
        </header>

        <div className="portal-choices">
          <a
            className="portal-choice portal-choice-jari"
            href="https://tmijarik.vercel.app/koti.html"
          >
            <span className="portal-choice-bg" aria-hidden="true" />
            <span className="portal-choice-veil" aria-hidden="true" />
            <span className="portal-choice-content">
              <span className="portal-choice-kicker">Hyvinvointi &amp; hoito</span>
              <span className="portal-choice-name">T:mi Jari Kotkansalo</span>
              <span className="portal-choice-text">
                Fysioterapia · hieronta · Footbalance · PT
              </span>
              <span className="portal-choice-cta">
                <span>Siirry sivustolle</span>
              </span>
            </span>
          </a>

          <a className="portal-choice portal-choice-loisto" href="/koti">
            <span className="portal-choice-bg" aria-hidden="true" />
            <span className="portal-choice-veil" aria-hidden="true" />
            <span className="portal-choice-content">
              <span className="portal-choice-kicker">Treeni &amp; kuntosali</span>
              <span className="portal-choice-name">Kuntokeskus Loisto</span>
              <span className="portal-choice-text">
                Sali · ryhmäliikunta · Aerial Bungee · PT
              </span>
              <span className="portal-choice-cta">
                <span>Siirry sivustolle</span>
              </span>
            </span>
          </a>
        </div>
      </main>
    </div>
  );
}
