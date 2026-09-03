import type { Metadata } from "next";
import Image from "next/image";
import { ContactCTA } from "@/components/ContactCTA";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";
import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor, MotionLink } from "@/components/MotionPress";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { getPrices } from "@/lib/prices";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Painonpudotus Hollola",
  description:
    "Yksilöllinen painonpudotusohjelma Kuntokeskus Loistossa – PT-valmennus, ravinto-ohjaus ja Body for LIFE -kurssi. Katso hinnat ja aloita.",
  alternates: { canonical: "/painonpudotus" },
};

export const dynamic = "force-dynamic";

const goals = [
  "pudottaa painoa?",
  "parantaa kuntoa?",
  "saada selkeä harjoittelusuunnitelma?",
  "saada tukea ruokavalioon?",
  "päästä tavoitteisiin ammattilaisen avulla?",
] as const;

const benefits = [
  {
    title: "Yksilöllinen suunnitelma",
    text: "Tavoitteidesi, lähtötilanteesi ja arkesi huomioiva kokonaisuus.",
  },
  {
    title: "Ohjatut PT-tapaamiset",
    text: "Opit harjoittelemaan tehokkaasti ja turvallisesti.",
  },
  {
    title: "Harjoitusohjelmat",
    text: "Selkeät ohjeet myös omatoimiseen harjoitteluun.",
  },
  {
    title: "Ravinto-ohjaus",
    text: "Tukea ruokavalion rakentamiseen painonpudotuksen tueksi.",
  },
  {
    title: "Seuranta ja tuki",
    text: "Et joudu tekemään muutosta yksin.",
  },
] as const;

export default async function PainonpudotusPage() {
  const { personalTraining: pt } = await getPrices();

  const packages = [
    {
      title: "PT 10× 55 min",
      sessions: "10 tapaamista",
      price: `nyt ${pt.pt10Offer}`,
      old: `${pt.pt10} (−25 %)`,
      text: "Sis. alkuhaastattelun, terveyskyselyn, kehonkoostumusmittaukset + vartalomitat, ruokavalion, kunto-ohjelmat ja yksilölliset tavoitteet.",
    },
    {
      title: "PT intensiivi 5×",
      sessions: "5 tapaamista",
      price: "nyt 360 €/hlö",
      old: `${pt.pt10Offer} (−20 %)`,
      text: "Tai duo-tarjous −30 % nyt 315 €/hlö. Sis. 5× PT (tai 4× + ryhmäliikunta-kortti 8×) + materiaalit, mittaus & kunto-ohjelmat 3 kpl.",
    },
    {
      title: "PT 15× 55 min",
      sessions: "15 tapaamista",
      price: `nyt ${pt.pt15Offer}`,
      old: `${pt.pt15} (−20 %)`,
      text: "Enemmän ohjausta ja tapaamisia – yksilölliset ajat ammattilaisen kanssa.",
    },
  ] as const;

  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[78vh] overflow-hidden bg-ink text-white md:min-h-[85vh]"
        contentClassName="container-page relative flex min-h-[78vh] flex-col justify-end pb-12 pt-28 md:min-h-[85vh] md:pb-16"
        image={
          <Image
            src="/images/gym-floor.jpg"
            alt="Painonpudotusohjelma ja harjoittelu Kuntokeskus Loistossa"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
        }
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">
            Painonpudotus · Hollola
          </p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.2rem,5.8vw,4.25rem)] font-semibold leading-[0.95] tracking-tight">
            Painonpudotusohjelma, joka tehdään{" "}
            <span className="text-accent-bright">sinun tavoitteidesi mukaan</span>
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Yksilöllinen harjoittelu, ravinto-ohjaus ja selkeä suunnitelma
            painonpudotuksen tueksi.
          </p>
        </HeroLine>
        <HeroLine>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionAnchor href={site.phoneHref} className="btn-accent">
              Aloita painonpudotusohjelma
            </MotionAnchor>
            <MotionAnchor href="#hinnasto" className="btn-ghost">
              Katso hinnat
            </MotionAnchor>
          </div>
        </HeroLine>
      </HeroMotion>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Kenelle</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Onko tavoitteesi…
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <li key={goal}>
                <HoverCard className="panel panel-pad h-full">
                  <p className="font-display text-lg font-semibold tracking-tight text-ink">
                    …{goal}
                  </p>
                </HoverCard>
              </li>
            ))}
          </ul>
          <Reveal>
            <p className="mt-8 max-w-2xl leading-relaxed text-ink-soft">
              Tavoitteena on turvallinen ja pitkäjänteinen painonpudotus.
              Tavoitteet asetetaan yksilöllisesti – lähtötilanteesi ja arkesi
              huomioiden.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="hinnasto"
        className="section-pad section-band border-y border-[var(--line)] scroll-mt-28"
      >
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Hinnasto</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Valitse sopiva paketti
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
              Hinnat ovat samat kuin PT-hinnastossa. Duo-paketissa kaksi henkilöä
              treenaa kimpassa – molemmilla omat treeniohjelmat.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {packages.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.05}>
                <HoverCard className="panel panel-pad flex h-full flex-col">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    {card.old}
                  </p>
                  <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{card.sessions}</p>
                  <p className="font-display mt-4 text-4xl font-semibold tracking-tight text-ink">
                    {card.price}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                    {card.text}
                  </p>
                  <MotionAnchor
                    href={site.phoneHref}
                    className="btn-primary mt-6 w-full text-center"
                  >
                    Kysy paketista
                  </MotionAnchor>
                </HoverCard>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              <MotionAnchor href={site.phoneHref} className="btn-accent">
                Kysy sopivasta valmennuksesta
              </MotionAnchor>
              <MotionLink
                href="/personal-training"
                className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white/80 px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
              >
                PT-hinnasto
              </MotionLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Sisältö</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Mitä saat ohjelmassa?
            </h2>
          </Reveal>
          <Stagger
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            delay={0.04}
          >
            {benefits.map((item) => (
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
          <Reveal>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
              Paketteihin voi kuulua eri treeniohjelmia kuntosalille (esim.
              kiinteytys, perusohjelma, kuntoharjoittelijan ohjelma) sekä
              ryhmäliikuntaa kortilla.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-page">
          <Reveal>
            <HoverCard className="panel panel-dark panel-pad overflow-hidden md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-bright">
                    Ryhmäkurssi
                  </p>
                  <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                    Body for LIFE
                  </h2>
                  <p className="mt-2 text-lg text-white/80">
                    10 viikon intensiivinen painonpudotuskurssi
                  </p>
                  <ul className="mt-6 space-y-2 text-white/75">
                    <li>Painonhallintatapaamiset</li>
                    <li>Luento</li>
                    <li>Kehonkoostumusmittaukset</li>
                    <li>Treenit</li>
                    <li>Ryhmäliikuntaa viikossa – valitse omasi</li>
                    <li>8×-treenikortti sisältyy kurssihintaan</li>
                  </ul>
                  <p className="mt-6 text-sm text-white/50">
                    Vetäjä: työfysioterapeutti ja personal trainer Jari
                    Kotkansalo.
                  </p>
                </div>
                <div>
                  <MotionAnchor
                    href={site.phoneHref}
                    className="btn-accent w-full text-center"
                  >
                    Kysy seuraavasta ryhmästä
                  </MotionAnchor>
                </div>
              </div>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <ContactCTA
        title="Aloita painonpudotusohjelma"
        text="Soita tai kysy sopivasta paketista. Mietitään yhdessä, millainen valmennus sopii juuri sinulle."
        primaryLabel="Aloita painonpudotusohjelma"
        phoneSecondaryLabel={`Soita ${site.phone}`}
      />
    </>
  );
}
