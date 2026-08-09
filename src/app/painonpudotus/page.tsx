import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getPrices } from "@/lib/prices";

export const metadata: Metadata = {
  title: "Painonpudotus",
  description:
    "Kunnonkohotus- & intensiivi-painonpudotusohjelmat Kuntokeskus Loistossa.",
};

export const dynamic = "force-dynamic";

export default async function PainonpudotusPage() {
  const { personalTraining: pt } = await getPrices();

  return (
    <>
      <PageHero
        eyebrow="Painonpudotus"
        title="Kunnonkohotus & intensiivi"
        lead="Tavoitteesi asetetaan yksilöllisesti. Superedut voimassa 31.3.2026 asti."
        image="/images/gym-floor.jpg"
        imageAlt="Harjoittelua tavoitteiden mukaan"
      />

      <section className="section-pad">
        <div className="container-page grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "PT 10× 55 min",
              price: `nyt ${pt.pt10Offer}`,
              old: `${pt.pt10} (−25 %)`,
              text: "Sis. alkuhaastattelun, terveyskyselyn, kehonkoostumusmittaukset + vartalomitat, ruokavalion, kunto-ohjelmat ja yksilölliset tavoitteet.",
            },
            {
              title: "PT intensiivi 5×",
              price: "nyt 360 €/hlö",
              old: `${pt.pt10Offer} (−20 %)`,
              text: "Tai duo-tarjous −30 % nyt 315 €/hlö. Sis. 5× PT (tai 4× + ryhmäliikunta-kortti 8×) + materiaalit, mittaus & kunto-ohjelmat 3 kpl.",
            },
            {
              title: "PT 15× 55 min",
              price: `nyt ${pt.pt15Offer}`,
              old: `${pt.pt15} (−20 %)`,
              text: "Enemmän ohjausta ja tapaamisia – yksilölliset ajat ammattilaisen kanssa.",
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 0.05}>
              <div className="panel panel-pad flex h-full flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {card.old}
                </p>
                <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                  {card.title}
                </h2>
                <p className="font-display mt-2 text-3xl font-semibold text-accent">
                  {card.price}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {card.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white section-pad">
        <div className="container-narrow prose-loisto">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
              Mitä saat
            </h2>
            <ul>
              <li>yleiskuntosi kohoaa ja edistät terveyttäsi</li>
              <li>pudotat painoa 3–6 kg/kk</li>
              <li>yksilölliset tavoitteet / terveysperusteet / toiveet</li>
              <li>
                eri treeniohjelmat kuntosalille 3 kpl (kiinteytys, perusohjelma,
                kuntoharjoittelijan ohjelma)
              </li>
              <li>
                ryhmäliikunta-kortilla tutustut eri treenimuotoihin (syke,
                lihaskunto, circuit, lihashuolto)
              </li>
              <li>saat hyvinvointia ja jaksat töissä paremmin</li>
            </ul>
            <p>
              Duo-paketti: 2 hlöä treenaa kimpassa – molemmilla omat
              treeniohjelmat, treeni trainerin kanssa yhtä aikaa.
            </p>
            <h3 className="font-display mt-10 text-2xl font-semibold tracking-tight text-ink">
              Body for LIFE – kevyempään kuntoon
            </h3>
            <p>
              Ryhmämuotoinen intensiivi-painonpudotus – 10 vkon kurssi!
              Painonhallintatapaamiset / luento / kehonkoostumusmittaukset +
              treenit. 8×-treenikortti sisältyy kurssihintaan. Ryhmäliikuntaa
              viikossa, josta valita omasi.
            </p>
            <p className="text-sm text-muted">
              Ammattitaitoinen vetäjä: työfysioterapeutti, personal trainer,
              weight trainer Jari laatii sinulle henkilökohtaiset kunto- ja
              painonpudotustavoitteet.
            </p>
          </Reveal>
        </div>
      </section>

      <ContactCTA title="Aloita painonpudotusohjelma" />
    </>
  );
}
