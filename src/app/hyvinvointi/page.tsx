import type { Metadata } from "next";
import Image from "next/image";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hyvinvointi",
  description:
    "Hieronta, kuivakuppaus, kuumakivihieronta, fysioterapia, faskiakäsittely ja Footbalance – Jari Kotkansalo.",
};

export default function HyvinvointiPage() {
  return (
    <>
      <PageHero
        eyebrow="Hyvinvointi"
        title="Hoitoja & lihashuoltoa"
        lead="Hieronta · kuivakuppaus · kuumakivihieronta · fysioterapia & faskiakäsittely · Footbalance-pohjalliset."
        image="/images/hero-hyvinvointi.jpg"
        imageAlt="Hieronta ja hyvinvointipalvelut"
      />

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <div className="prose-loisto">
              <p>
                Panostamme harjoittelun ohella lihashuoltoon ja palautumiseen.
                Hyvinvointipalveluista vastaa työfysioterapeutti, kuntohoitaja ja
                personal trainer Jari Kotkansalo.
              </p>
              <ul>
                <li>Hieronta</li>
                <li>Kuivakuppaus</li>
                <li>Kuumakivihieronta</li>
                <li>Fysioterapia & faskiakäsittely</li>
                <li>Footbalance-pohjalliset</li>
                <li>Hierontatuoli kuntokeskuksessa</li>
              </ul>
              <p>
                Superedulliset hoitosarjat + lisäetu 51–100 € (lisäetu voimassa
                10.8.26 asti). Hierontatuoli 1 kerta 9 € · 10× 69 €.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={site.jariPhoneHref}
                  className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                >
                  Soita {site.jariPhone}
                </a>
                <a
                  href={site.jariSite}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold"
                >
                  www.tmijarik.fi
                </a>
              </div>
              <p className="mt-4 text-sm text-muted">Terkuin Jari Kotkansalo</p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/hierontatuoli.jpg"
                alt="Laadukas hierontatuoli"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA
        title="Varaa hoitoaika"
        text={`Soita Jarille ${site.jariPhone} tai varaa kautta ${site.jariSite.replace("https://", "")}.`}
      />
    </>
  );
}
