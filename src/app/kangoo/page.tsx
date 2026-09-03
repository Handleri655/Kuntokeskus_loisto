import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { HoverCard } from "@/components/HoverCard";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Kangoo Power / Jumps",
  description:
    "Kangoo Power -intervallitunti Kuntokeskus Loistossa – ainoana Hollolassa.",
};

const benefits = [
  "Luurankolihasten vahvistuminen",
  "Suojaa niveliä kovalla alustalla harjoitellessa",
  "Parantaa kehonkoostumusta & lihasmassaa, vähentää rasvakudosta",
  "Happimäärä kudoksissa lisääntyy & hengityskapasiteetti paranee",
  "Parantaa imunestekiertoa",
  "Vähentää valtimopainetta ponnistuksen aikana",
  "Lisää punasolujen määrää & avustaa sydänkuntoutuksessa",
  "Lepoaineenvaihdunta paranee & treenin jälkeinen kalorinkulutus tehostuu",
  "Ehkäisee kroonista turvotusta",
  "Parantaa sydämen ja lihaksiston kestävyyttä",
  "Sydämen leposyketaajuus laskee",
  "Laskee kolesteroli- ja triglyseridiarvoja",
  "Lihaskoordinaatio ja tasapaino paranevat",
  "Vähentää ja lievittää kiputiloja",
  "Henkinen hyvinvointi paranee",
  "Hidastaa ikääntymiseen liittyvää lihaskatoa",
];

export default function KangooPage() {
  return (
    <>
      <PageHero
        eyebrow="Kangoo Power / Jumps"
        title="Hyppy vai herkku?"
        lead="Kangoo Power -intervallitunti – vuoden kovin uutuus. Kulutus 500–900 kcal/h. Ainoana meillä Hollolassa."
        image="/images/group-fitness.jpg"
        imageAlt="Intervallitreeniä"
      />

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <div className="prose-loisto">
              <p>
                KangooJumps™ / Kangoo Power® -intervallitunti on hyppykenkätreeni,
                jossa ylös–alas-suuntainen liike painovoimaa vastaan tuottaa
                erityisen tehokasta aerobic-harjoittelua ilman turhaa kuormaa
                nivelille.
              </p>
              <p>
                Tehokasta sykkeennostoa & intervallitreeniä – core- /
                lihaskunto-osuus erikseen. Tunneilla tuotettava liike on yksi
                eniten hyötyä tuottavista aerobic-harjoittelumuodoista.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://youtu.be/qncTqCEHhG4"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                >
                  Video (winner 2019)
                </a>
                <a
                  href="https://www.facebook.com/kangooclubfitsuomi/videos/580024389253456/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold"
                >
                  Facebook-video
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <HoverCard className="panel panel-pad">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Kangoo Power
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight">
                Pudota painoa
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                Intervallitunti, joka tuntuu kevyemmältä nivelille – mutta
                treenaa kovaa.
              </p>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-mist/40 section-pad">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Terveys- & kuntoiluhyödyt
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Ylös–alas-suuntaisen hyppyenergia­treenin tuottamia hyötyjä:
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {benefits.map((item, i) => (
              <Reveal key={item} delay={Math.min(i * 0.02, 0.2)}>
                <HoverCard
                  subtle
                  className="panel px-5 py-4 text-sm leading-relaxed text-ink-soft"
                >
                  <span className="mr-2 font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </HoverCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ContactCTA title="Kysy Kangoo-tunneista" />
    </>
  );
}
