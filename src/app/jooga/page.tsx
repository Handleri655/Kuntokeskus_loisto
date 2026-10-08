import type { Metadata } from "next";
import Image from "next/image";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { HoverCard } from "@/components/HoverCard";
import { Reveal } from "@/components/Reveal";
import { findGymPrice, getPrices } from "@/lib/prices";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jooga",
  description:
    "Hatha-jooga ja voima-jooga Kuntokeskus Loistossa – ohjaajana Ulla.",
};

export const dynamic = "force-dynamic";

export default async function JoogaPage() {
  const prices = await getPrices();
  const kerta =
    prices.membershipRows.find((row) =>
      /kertamaksu/i.test(row.product),
    )?.ryhmaliikunta ?? findGymPrice(prices.membershipRows, ["Kertamaksu"]);

  return (
    <>
      <PageHero
        eyebrow="Jooga"
        title="Hatha & voima­jooga"
        lead="Lempeää palautumista ja vahvistavaa harjoittelua – jokaiselle sopivalla tavalla. Ohjaajana koulutettu joogaohjaaja Ulla."
        image="/images/yoga.jpg"
        imageAlt="Joogaharjoittelua"
        veilClassName="hero-veil-strong"
      />

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <Reveal>
            <HoverCard className="panel panel-pad">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Maanantai
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight">
                Lempeä hatha-jooga
              </h2>
              <p className="mt-2 text-sm font-semibold text-ink">
                Ma klo 19.15–20.30 · 75 min
              </p>
              <div className="prose-loisto mt-4">
                <p>
                  Jokaiselle sopivaa lempeää joogaa, jossa painopiste
                  palautumisella ja rentoutumisella. Mukaan mahtuu myös
                  vahvistavia sekä liikkuvuutta ja tasapainoa kehittäviä
                  liikkeitä.
                </p>
              </div>
            </HoverCard>
          </Reveal>
          <Reveal delay={0.06}>
            <HoverCard className="panel panel-pad">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Keskiviikko
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight">
                Voima-jooga
              </h2>
              <p className="mt-2 text-sm font-semibold text-ink">
                Ke klo 19.15–20.15
              </p>
              <div className="prose-loisto mt-4">
                <p>
                  Erittäin voimakasta ja vahvistavaa joogaa, jossa on mahdollista
                  kehittää lihasvoimaa, tasapainoa, aerobista kuntoa ja
                  joustavuutta. Teemme voimajoogan 1-sarjan asanoita tarvittaessa
                  sovellettuina – jokainen voi valita sopivan version.
                </p>
              </div>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-mist/40 section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <div className="prose-loisto">
              <p>
                Kuukausikortilla pääset ilmaiseksi mukaan (Ryhmäliikunta /
                Fitness) tai 10×-kortilla (1 krt) tai kertamaksulla {kerta}.
              </p>
              <p>
                Varaa paikka: {site.phone} – ilmoita koko nimi ja
                puhelinnumerosi. Muistathan varata paikan myös keskiviikon
                voima-jooga-tunnille.
              </p>
              <p className="text-sm text-muted">
                Nähdään :) Terkuin Ulla – joogaohjaaja
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/jooga.jpg"
                alt="Joogamatolla"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA title="Varaa joogapaikka" />
    </>
  );
}
