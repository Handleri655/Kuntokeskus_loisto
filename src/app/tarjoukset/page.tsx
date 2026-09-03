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
  title: "Tarjoukset Hollola",
  description:
    "Tutustumistreenit, vuoden superetu, PT-edut ja hoitosarjat Kuntokeskus Loistossa Hollolassa. Kuntosali alk. 33 €/kk.",
  alternates: { canonical: "/tarjoukset" },
};

export const dynamic = "force-dynamic";

const trends = [
  { href: "/aerial-bungee", title: "Aerial Bungee" },
  { href: "/cross-training", title: "Cross Training" },
  { href: "/kangoo", title: "Kangoo Jumps" },
  { href: "/jooga", title: "Power- & Hatha-jooga" },
] as const;

export default async function TarjouksetPage() {
  const { offers, headline } = await getPrices();

  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[58vh] overflow-hidden bg-ink text-white md:min-h-[62vh]"
        contentClassName="container-page relative flex min-h-[58vh] flex-col justify-end pb-10 pt-28 md:min-h-[62vh] md:pb-14"
        image={
          <Image
            src="/images/hero-hinnat.jpg"
            alt="Treenitarjoukset Kuntokeskus Loistossa"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
        }
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">Tarjoukset · Hollola</p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.3rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">
            Tarjoukset{" "}
            <span className="text-accent-bright">Loistossa</span>
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Hyödynnä ajankohtaiset edut ja löydä itsellesi sopiva tapa aloittaa
            treeni tai hyvinvointipalvelut.
          </p>
        </HeroLine>
        <HeroLine>
          <div className="mt-7 flex flex-wrap gap-3">
            <MotionLink href="#tutustuminen" className="btn-accent">
              Katso tarjoukset
            </MotionLink>
            <MotionAnchor href={site.phoneHref} className="btn-ghost">
              Soita {site.phone}
            </MotionAnchor>
          </div>
        </HeroLine>
      </HeroMotion>

      <section id="tutustuminen" className="section-pad scroll-mt-28">
        <div className="container-page">
          <Reveal>
            <HoverCard className="panel panel-pad overflow-hidden md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Tutustumistreenit
                </p>
                <span className="inline-flex rounded-full bg-[rgba(212,168,75,0.25)] px-3 py-1 text-xs font-bold tracking-[0.12em] text-ink">
                  {offers.trialBadge}
                </span>
              </div>
              <h2 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
                Uusi asiakas – treenaa puoleen hintaan
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {offers.trialNote}
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {offers.trialPrices.map((item) => (
                  <div key={item.title} className="price-tile">
                    <p className="relative z-[1] text-sm text-muted">
                      {item.title}
                    </p>
                    <p className="relative z-[1] font-display mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <MotionAnchor href={site.phoneHref} className="btn-accent">
                  Hyödynnä tarjous
                </MotionAnchor>
              </div>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <section className="section-pad section-band border-y border-[var(--line)] pt-0">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">{offers.yearBadge}</p>
            <h2 className="font-display mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-[2.75rem]">
              Ihan kaikille – rajoitetun ajan
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
              {offers.yearNote}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {offers.yearPrices.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <HoverCard className="price-tile h-full py-8">
                  <p className="relative z-[1] text-sm text-muted">{item.title}</p>
                  <p className="relative z-[1] font-display mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                    {item.price}
                  </p>
                  <p className="relative z-[1] mt-3 text-sm text-muted">
                    {item.note}
                  </p>
                </HoverCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <HoverCard className="panel panel-pad mt-8">
              <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {offers.bonusTitle}
              </h3>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {offers.bonuses.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-ink-soft leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-5 lg:grid-cols-2">
          <Reveal>
            <HoverCard className="panel panel-dark panel-pad flex h-full flex-col">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-bright">
                Personal Training
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight">
                {offers.ptTitle}
              </h2>
              <p className="mt-4 flex-1 leading-relaxed text-white/75">
                {offers.ptText}
              </p>
              <div className="mt-8">
                <MotionLink href="/personal-training" className="btn-accent">
                  Tutustu PT-palveluihin
                </MotionLink>
              </div>
            </HoverCard>
          </Reveal>

          <Reveal delay={0.05}>
            <HoverCard className="panel panel-pad flex h-full flex-col">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Aerial Bungee
                </p>
                <span className="inline-flex rounded-full bg-signal px-3 py-1 text-xs font-bold tracking-[0.12em] text-white">
                  {offers.aerialBadge}
                </span>
              </div>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight">
                Intensiivi 75
              </h2>
              <p className="mt-4 flex-1 leading-relaxed text-ink-soft">
                {offers.aerialText}
              </p>
              <div className="mt-8">
                <MotionLink href="/aerial-bungee" className="btn-primary">
                  Tutustu Aerial Bungee -tunteihin
                </MotionLink>
              </div>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Uutuuksia</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Trenditreenejä Hollolassa
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
              Ryhmäliikuntaa aamu- ja iltatunteina – 16 h / vko. Superedut alk.{" "}
              {headline.highlightKuntosali}.
            </p>
          </Reveal>
          <Stagger
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            delay={0.04}
          >
            {trends.map((item) => (
              <StaggerItem key={item.href} hover>
                <HoverCard subtle>
                  <MotionLink
                    href={item.href}
                    className="panel panel-pad flex h-full items-center justify-between gap-3 font-display text-xl font-semibold tracking-tight"
                  >
                    {item.title}
                    <span className="text-accent">→</span>
                  </MotionLink>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Hyvinvointi</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Superedulliset hoitosarjat
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
              Hieronta, Footbalance, fysioterapia, kuppaus, kuumakivi ja
              faskiakäsittely – edut voimassa rajoitetusti.
            </p>
          </Reveal>

          <Stagger
            className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            delay={0.04}
          >
            {offers.treatments.map((item) => (
              <StaggerItem key={item.title} hover>
                <HoverCard className="panel panel-pad h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    {item.offer}
                  </p>
                  <h3 className="font-display mt-2 text-xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-display mt-4 text-3xl font-semibold tracking-tight">
                    {item.price}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.note}</p>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              <MotionLink href="/hyvinvointi" className="btn-primary">
                Hyvinvointipalvelut
              </MotionLink>
              <MotionAnchor
                href={site.jariPhoneHref}
                className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white/80 px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
              >
                Varaa hoito: {site.jariPhone}
              </MotionAnchor>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-page grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-accent">Tarjouslehti</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Tarjouslehti
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
              Katso kaikki ajankohtaiset tarjoukset yhdestä tarjouslehdestä.
            </p>
            <p className="mt-4 text-sm text-muted">
              {site.address} · {site.phone}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <MotionLink href="/hinnat" className="btn-accent">
                Koko hinnasto
              </MotionLink>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <HoverCard className="panel overflow-hidden p-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.1rem]">
                <Image
                  src="/images/tarjoukset-flyer.png"
                  alt="Kuntokeskus Loiston tarjouslehti"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <ContactCTA
        title="Löysitkö sopivan tarjouksen?"
        text="Varaa paikkasi tai kysy lisää – autamme mielellämme."
        primaryLabel={`Soita ${site.phone}`}
        secondaryLabel="Lähetä sähköposti"
        secondaryHref={site.emailHref}
      />
    </>
  );
}
