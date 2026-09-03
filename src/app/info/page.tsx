import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { HoverCard } from "@/components/HoverCard";
import { Reveal } from "@/components/Reveal";
import { dutyHours, openingHours, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Päivystys & info",
  description:
    "Kuntokeskus Loiston päivystysajat, yhteystiedot ja ohjeet Hollolassa.",
};

export default function InfoPage() {
  return (
    <>
      <PageHero
        eyebrow="Päivystys & info"
        title="Infoa meistä"
        lead="Kuntosali, solarium, ryhmäliikunta, personal training, painonpudotus & hyvinvointipalvelut – Hollolan kuntakeskuksessa vuodesta 1992."
        image="/images/hero-gym.jpg"
        imageAlt="Kuntokeskus Loisto"
      />

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <Reveal>
            <HoverCard className="panel panel-pad">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Päivystys paikalla
              </h2>
              <ul className="mt-6 space-y-3">
                {dutyHours.map((row) => (
                  <li
                    key={row.day}
                    className="flex justify-between gap-4 border-b border-[var(--line)] pb-3 text-sm last:border-0"
                  >
                    <span className="font-medium">{row.day}</span>
                    <span className="text-muted">{row.hours}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">
                Päivystys paikalla myös erikseen sovittaessa.
              </p>
            </HoverCard>
          </Reveal>
          <Reveal delay={0.05}>
            <HoverCard className="panel panel-dark panel-pad">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Yhteystiedot
              </h2>
              <ul className="mt-6 space-y-4 text-white/80">
                <li>
                  <a href={site.phoneHref} className="text-white hover:underline">
                    {site.phone}
                  </a>
                  <div className="text-sm text-white/55">Kuntokeskus Loisto</div>
                </li>
                <li>
                  <a
                    href={site.jariPhoneHref}
                    className="text-white hover:underline"
                  >
                    {site.jariPhone}
                  </a>
                  <div className="text-sm text-white/55">
                    Jari Kotkansalo – fysioterapia, hieronta, Footbalance, PT,
                    faskiakäsittely
                  </div>
                </li>
                <li>
                  <a href={site.mapsUrl} className="text-white hover:underline">
                    {site.address}
                  </a>
                  <div className="text-sm text-white/55">
                    Ilmainen pysäköinti
                  </div>
                </li>
                <li>
                  Avainkortilla treenaat {site.keycardHours} joka päivä
                </li>
              </ul>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-mist/40 section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <div className="prose-loisto">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                Tervetuloa kuntokeskukseen
              </h2>
              <p className="mt-4">
                Aerodiggarit eli uudemmalta nimeltään Kuntokeskus Loisto tarjoaa
                palveluita kaikenikäisille kuntoilijoille. Tarjoamme
                liikunta-alan palveluita ”tavallisille” ihmisille: miehille ja
                naisille, vasta-alkajille tai liikuntaa enemmän harrastaneille.
              </p>
              <p>
                Nauti helppokulkuisuudesta – ilmainen pysäköinti kuuluu
                Kuntokeskus Loisto Oy:ssä asioiville. Tule nauttimaan
                laadukkaista palveluista, energisoivista treeneistä ja
                ammattitaitoisesta henkilökunnasta.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <HoverCard className="panel panel-pad">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                Aukioloajat
              </h3>
              <ul className="mt-5 space-y-3">
                {openingHours.map((row) => (
                  <li
                    key={row.day}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span className="font-medium">{row.day}</span>
                    <span className="text-muted">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <ContactCTA title="Ota yhteyttä" />
    </>
  );
}
