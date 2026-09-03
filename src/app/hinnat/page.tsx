import type { Metadata } from "next";
import Image from "next/image";
import { ContactCTA } from "@/components/ContactCTA";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";
import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor, MotionLink } from "@/components/MotionPress";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import type { MembershipRow } from "@/lib/prices";
import { getPrices } from "@/lib/prices";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hinnat Hollola",
  description:
    "Kuntokeskus Loiston hinnasto – kuntosali, ryhmäliikunta ja Fitness. Ei liittymismaksuja. Kuntosali alk. 33 €/kk.",
  alternates: { canonical: "/hinnat" },
};

export const dynamic = "force-dynamic";

type CategoryKey = "kuntosali" | "ryhmaliikunta" | "fitness";

/** Display-only parse – does not change price meaning */
function parsePriceCell(raw: string) {
  if (!raw || raw === "—") {
    return { primary: "—", monthly: null as string | null, reduced: null as string | null };
  }

  const monthlyMatch = raw.match(/tai\s+([\d,.]+\s*€\/kk)/i);
  const reducedMatch = raw.match(/\(([^)]+)\)\s*$/);
  let primary = raw;
  if (monthlyMatch) {
    primary = raw.slice(0, monthlyMatch.index).trim();
  } else if (reducedMatch && !monthlyMatch) {
    primary = raw.slice(0, reducedMatch.index).trim();
  }

  // Fitness 3 kk style: "162 € tai 54 €/kk (74 € / 69 €)"
  let reduced = reducedMatch ? reducedMatch[1].trim() : null;
  if (monthlyMatch && reducedMatch) {
    reduced = reducedMatch[1].trim();
  }

  return {
    primary,
    monthly: monthlyMatch ? monthlyMatch[1].trim() : null,
    reduced,
  };
}

function categoryPrice(row: MembershipRow, key: CategoryKey) {
  return row[key];
}

const categories: {
  key: CategoryKey;
  title: string;
  note: string;
}[] = [
  {
    key: "kuntosali",
    title: "Kuntosali",
    note: `Avainkortilla treeni klo ${site.keycardHours}.`,
  },
  {
    key: "ryhmaliikunta",
    title: "Ryhmäliikunta",
    note: "Jumpata, Kangoo ja joogat kortilla.",
  },
  {
    key: "fitness",
    title: "Fitness",
    note: "Kuntosali + jumpata + Aerial Bungee 55 + Cross Training.",
  },
];

export default async function HinnatPage() {
  const prices = await getPrices();
  const { headline, membershipRows, extras } = prices;

  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[72vh] overflow-hidden bg-ink text-white md:min-h-[78vh]"
        contentClassName="container-page relative flex min-h-[72vh] flex-col justify-end pb-12 pt-28 md:min-h-[78vh] md:pb-16"
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
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.3rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">
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
            <MotionLink href="#kortit" className="btn-accent">
              Tutustu kortteihin
            </MotionLink>
            <MotionAnchor href={site.phoneHref} className="btn-ghost">
              Kysy sopivaa korttia
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
              Suluissa opiskelijat, eläkeläiset ja työtön-hinta. Fitness-kortti
              sisältää kuntosalin {site.keycardHours}, Aerial Bungee 55, Cross
              Trainingin ja kaikki jumpata.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {categories.map((cat, catIndex) => (
              <Reveal key={cat.key} delay={catIndex * 0.05}>
                <HoverCard
                  className={`panel panel-pad h-full ${
                    cat.key === "fitness" ? "ring-1 ring-accent/25" : ""
                  }`}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                    {cat.title}
                  </p>
                  <p className="mt-2 text-sm text-muted">{cat.note}</p>
                  <ul className="mt-6 space-y-4">
                    {membershipRows.map((row) => {
                      const raw = categoryPrice(row, cat.key);
                      const parsed = parsePriceCell(raw);
                      const isBestValue = row.product === "12 kk" && raw !== "—";

                      return (
                        <li
                          key={`${cat.key}-${row.product}`}
                          className={`border-b border-[var(--line)] pb-4 last:border-0 last:pb-0 ${
                            isBestValue
                              ? "rounded-xl bg-[rgba(212,168,75,0.08)] -mx-2 px-2 pt-2"
                              : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-ink">
                                {row.product}
                              </p>
                              {isBestValue ? (
                                <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-accent">
                                  Edullisin €/kk
                                </p>
                              ) : null}
                            </div>
                            <div className="text-right">
                              <p className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                                {parsed.primary}
                              </p>
                              {parsed.monthly ? (
                                <p className="mt-0.5 text-sm font-semibold text-accent">
                                  {parsed.monthly}
                                </p>
                              ) : null}
                              {parsed.reduced ? (
                                <p className="mt-1 text-xs text-muted">
                                  Opisk. / eläkel. / työtön: {parsed.reduced}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </HoverCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
                Suluissa olevat hinnat: opiskelijat, eläkeläiset ja työtön-hinta.
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
