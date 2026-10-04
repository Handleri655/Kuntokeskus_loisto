import type { Metadata } from "next";
import Image from "next/image";
import { ContactCTA } from "@/components/ContactCTA";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";
import { HinnastoTables, ReducedPriceSection } from "@/components/HinnastoTables";
import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor } from "@/components/MotionPress";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { getPrices } from "@/lib/prices";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hinnat Hollola",
  description:
    "Kuntokeskus Loiston hinnasto – kuntosali, ryhmäliikunta ja Fitness. Ei liittymismaksuja. Kuntosali alk. 33 €/kk.",
  alternates: { canonical: "/hinnat" },
};

export const dynamic = "force-dynamic";

export default async function HinnatPage() {
  const prices = await getPrices();
  const { headline, membershipRows, extras } = prices;

  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[52vh] overflow-hidden bg-ink text-white md:min-h-[60vh]"
        contentClassName="container-page relative flex min-h-[52vh] flex-col justify-end pb-10 pt-28 md:min-h-[60vh] md:pb-14"
        image={
          <Image
            src="/images/hero-hinnat.jpg"
            alt="Treenikortit ja hinnasto Kuntokeskus Loistossa"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
        }
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">{headline.eyebrow}</p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.05rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-tight">
            Hollolan{" "}
            <span className="text-accent-bright">edulliset treenit</span>
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Selkeä hinnoittelu ilman liittymismaksuja. Valitse itsellesi sopiva
            tapa treenata.
          </p>
        </HeroLine>
        <HeroLine>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold tracking-wide text-accent-bright md:text-base">
            <span>Kuntosali alk. {headline.highlightKuntosali}</span>
            <span>Ryhmäliikunta alk. {headline.highlightRyhmaliikunta}</span>
            <span>Fitness alk. {headline.highlightFitness}</span>
          </div>
        </HeroLine>
        <HeroLine>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionAnchor href="#kortit" className="btn-accent">
              Tutustu kortteihin
            </MotionAnchor>
            <MotionAnchor href="#alennetut" className="btn-ghost">
              Opiskelija, eläkeläinen, työtön
            </MotionAnchor>
          </div>
        </HeroLine>
      </HeroMotion>

      <section id="kortit" className="section-pad scroll-mt-28">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Hinnasto</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Valitse kortti
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
              Normaalihinta ja alennettu hinta ovat omissa sarakkeissaan.
              Alennus on sama opiskelijalle, eläkeläiselle ja työttömälle.
              Fitness sisältää kuntosalin {site.keycardHours}, Aerial Bungee
              55, Cross Trainingin ja kaikki jumpata.
            </p>
          </Reveal>

          <HinnastoTables rows={membershipRows} />
        </div>
      </section>

      <ReducedPriceSection rows={membershipRows} />

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Lisätietoa</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Lisätietoa hinnoista
            </h2>
          </Reveal>
          <Stagger
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            delay={0.04}
          >
            {[
              ...extras,
              {
                title: "Maksutavat",
                text: `Pankki- ja luottokortit, käteinen, Smartum, Edenred, E-passi. Tilille: ${site.bankAccount}`,
              },
            ].map((item) => (
              <StaggerItem key={item.title} hover>
                <HoverCard className="panel panel-pad h-full">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    {item.text}
                  </p>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-narrow">
          <Reveal>
            <p className="eyebrow text-accent">Ehdot</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Hyvä tietää
            </h2>
            <ul className="mt-8 space-y-4 text-ink-soft">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Ei liittymismaksuja.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Opiskelija, eläkeläinen ja työtön: sama alennettu hinta, omassa
                sarakkeessaan ja{" "}
                <a
                  href="#alennetut"
                  className="font-semibold text-ink underline decoration-[var(--line)] underline-offset-4 hover:decoration-accent"
                >
                  alennettujen hintojen taulukossa
                </a>
                .
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Fitness-kortti sisältää kuntosalin {site.keycardHours}, Aerial
                Bungee 55, Cross Trainingin ja kaikki jumpata.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                6–12 kk kortit voit maksaa myös osamaksulla. 10× / 20× voimassa
                3 kk / 6 kk.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Maksutavat: pankki- ja luottokortit, käteinen, Smartum, Edenred,
                E-passi.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <ContactCTA
        title="Et tiedä, mikä kortti sopii sinulle?"
        text="Autamme valitsemaan sinulle sopivimman vaihtoehdon."
        primaryLabel="Kysy sopivaa korttia"
        phoneSecondaryLabel={`Soita ${site.phone}`}
      />
    </>
  );
}
