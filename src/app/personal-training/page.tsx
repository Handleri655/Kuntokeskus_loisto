import type { Metadata } from "next";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getPrices } from "@/lib/prices";

export const metadata: Metadata = {
  title: "Personal Training",
  description:
    "Personal Training, kuntotestaus ja yksilölliset ohjelmat Kuntokeskus Loistossa – Jari Kotkansalo.",
};

export const dynamic = "force-dynamic";

const reasons = [
  "Tarvitsetko motivaattoria saamaan itsesi liikkeelle?",
  "Onko kuntokeskusympäristö outo paikka sinulle?",
  "Tarvitsetko opastusta oikeanlaisissa suoritustekniikoissa?",
  "Haluatko monipuolisen ja juuri sinulle tehdyn lihaskunto- tai kestävyyskunto-ohjelman?",
  "Onko sinulla tavoitteita, joihin et ole vielä päässyt?",
  "Etsitkö henkilöä, joka auttaisi sinua elämäntapamuutoksessa?",
  "Laihdutus, kiinteytys, lihasmassan hankinta tai lajikohtainen harjoittelu?",
  "Oikeanlainen ruokavalio tavoitteellesi?",
  "Tarvitsetko omanlaisen harjoitteluohjelman esim. liikuntarajoitteesi tai sairautesi takia?",
  "Haluatko asiantuntijan luennoimaan liikunnasta, ruokavaliosta ja terveydestä?",
];

export default async function PersonalTrainingPage() {
  const { personalTraining: pt } = await getPrices();

  return (
    <>
      <PageHero
        eyebrow="Personal Training"
        title="Valmentajasi Jari"
        lead="Yksilölliset tapaamiset, kuntotestaus, ohjelmat ja ruokavalio – tavoitteet asetetaan sinun mukaasi."
        image="/images/training.jpg"
        imageAlt="Personal training -ohjausta"
      />

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="panel panel-dark panel-pad">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-bright">
                Hinnasto
              </p>
              <ul className="mt-5 space-y-4 text-sm text-white/85">
                <li>
                  <strong className="text-white">Kuntosali-/harjoitteluohjelma</strong>
                  <br />
                  1 pvän jako {pt.ohjelma1} · 2 pvän {pt.ohjelma2} · 3 pvän{" "}
                  {pt.ohjelma3}
                </li>
                <li>
                  <strong className="text-white">Ruokavalio-ohjelma</strong>
                  <br />
                  {pt.ruokavalio} sis. laadinnan + ohjausaika
                </li>
                <li>
                  <strong className="text-white">PT-tapaamiset 55 min</strong>
                  <br />
                  2× {pt.pt2} · 5× {pt.pt5} · 10× {pt.pt10}{" "}
                  <span className="text-accent-bright">nyt {pt.pt10Offer}</span>
                  <br />
                  15× {pt.pt15}{" "}
                  <span className="text-accent-bright">nyt {pt.pt15Offer}</span>
                </li>
                <li className="text-white/55">
                  ≤10× voimassa 6 kk · yli 10× voimassa 12 kk
                </li>
              </ul>
              <Link
                href="/painonpudotus"
                className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
              >
                Painonpudotus & intensiivi
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="prose-loisto">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                Kuntotestaus
              </h2>
              <p className="mt-4">
                Asiakkaalle voidaan tehdä kuntotestit sisältäen esim. aerobisen
                kunnon testauksen (step-askellustesti), lihaskuntotestit,
                yleisen liikkuvuustestin (tai tarkempi ft-tutkimus) ja
                kehonkoostumusmittauksen. Pohjalta laaditaan tarvittaessa
                yksilöllinen harjoitteluohjelma.
              </p>
              <p>
                Tervehdys uudet asiakkaat! Oletko kiinnostunut Personal Training
                -palveluista? Tässä muutama ajatus, jotka voivat olla syy
                tapaamiselle:
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-mist/40 section-pad">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Miksi PT?
            </h2>
          </Reveal>
          <ol className="mt-8 grid gap-3 md:grid-cols-2">
            {reasons.map((reason, i) => (
              <Reveal key={reason} delay={Math.min(i * 0.03, 0.2)}>
                <li className="panel px-5 py-4 text-sm leading-relaxed text-ink-soft">
                  <span className="mr-2 font-semibold text-accent">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {reason}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <ContactCTA title="Varaa PT-tapaaminen" />
    </>
  );
}
