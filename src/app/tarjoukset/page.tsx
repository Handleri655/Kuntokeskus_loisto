import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { HoverCard } from "@/components/HoverCard";
import { Reveal } from "@/components/Reveal";
import { getPrices } from "@/lib/prices";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tarjoukset",
  description:
    "Tutustumistreenit, vuoden superetu, PT-edut ja hoitosarjat Kuntokeskus Loistossa Hollolassa. Kuntosali alk. 33 €/kk.",
};

export const dynamic = "force-dynamic";

export default async function TarjouksetPage() {
  const { offers, headline } = await getPrices();

  return (
    <>
      <PageHero
        eyebrow="Tarjoukset"
        title="Tarjoukset Loistossa"
        lead="Tutustumistreenit, vuoden superetu, PT-edut ja hyvinvointitarjoukset – kaikki yhdestä paikasta."
        image="/images/hero-hinnat.jpg"
        imageAlt="Treenitarjoukset Kuntokeskus Loistossa"
      />

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <HoverCard className="panel panel-pad">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Tutustumistreenit
                </p>
                <span className="inline-flex rounded-full bg-[#f3e2a8] px-3 py-1 text-xs font-bold tracking-[0.12em] text-ink">
                  {offers.trialBadge}
                </span>
              </div>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Uusi asiakas – treenaa puoleen hintaan
              </h2>
              <p className="mt-3 text-muted leading-relaxed">{offers.trialNote}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {offers.trialPrices.map((item) => (
                  <HoverCard key={item.title} className="price-tile">
                    <p className="text-sm text-muted">{item.title}</p>
                    <p className="font-display mt-2 text-3xl font-semibold tracking-tight">
                      {item.price}
                    </p>
                  </HoverCard>
                ))}
              </div>
            </HoverCard>
          </Reveal>

          <Reveal delay={0.06}>
            <HoverCard className="panel panel-dark panel-pad">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-bright">
                Personal Training
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight">
                {offers.ptTitle}
              </h2>
              <p className="mt-3 text-white/75 leading-relaxed">{offers.ptText}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/painonpudotus"
                  className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
                >
                  Lue lisää PT-tarjouksesta
                </Link>
                <Link
                  href="/personal-training"
                  className="inline-flex rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white"
                >
                  PT-palvelut
                </Link>
              </div>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-mist/40 section-pad">
        <div className="container-page">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {offers.yearBadge}
            </p>
            <h2 className="font-display mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Ihan kaikille – rajoitetun ajan
            </h2>
            <p className="mt-4 max-w-2xl text-muted leading-relaxed">
              {offers.yearNote}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {offers.yearPrices.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <HoverCard className="price-tile h-full">
                  <p className="text-sm text-muted">{item.title}</p>
                  <p className="font-display mt-2 text-4xl font-semibold tracking-tight">
                    {item.price}
                  </p>
                  <p className="mt-3 text-sm text-muted">{item.note}</p>
                </HoverCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <HoverCard className="panel panel-pad mt-8 border-[#e8d59a] bg-[linear-gradient(135deg,#fff8e8,#ffffff_55%)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                Nyt kaupan päälle
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                {offers.bonusTitle}
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {offers.bonuses.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl bg-white/80 px-4 py-3 text-sm font-medium text-ink-soft"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <Reveal>
            <HoverCard className="panel panel-pad h-full">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Aerial Bungee
                </p>
                <span className="inline-flex rounded-full bg-signal px-3 py-1 text-xs font-bold tracking-[0.12em] text-white">
                  {offers.aerialBadge}
                </span>
              </div>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight">
                Intensiivi 75
              </h2>
              <p className="mt-3 text-muted leading-relaxed">{offers.aerialText}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/aerial-bungee"
                  className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                >
                  Aerial Bungee
                </Link>
                <Link
                  href="/ryhmaliikunta"
                  className="inline-flex rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold"
                >
                  Ryhmäliikunta 16 h/vko
                </Link>
              </div>
            </HoverCard>
          </Reveal>

          <Reveal delay={0.05}>
            <HoverCard className="panel panel-soft panel-pad h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Uutuuksia
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight">
                Trenditreenejä Hollolassa
              </h2>
              <ul className="mt-5 space-y-3 text-ink-soft">
                <li>Aerial Bungee</li>
                <li>Cross Training</li>
                <li>Kangoo Jumps</li>
                <li>Power- & Hatha-jooga</li>
              </ul>
              <p className="mt-5 text-sm text-muted">
                Ryhmäliikuntaa aamu- ja iltatunteina – 16 h / vko. Superedut alk.{" "}
                {headline.highlightKuntosali}.
              </p>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white section-pad">
        <div className="container-page">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Hyvinvointi
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Superedulliset hoitosarjat
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Hieronta, Footbalance, fysioterapia, kuppaus, kuumakivi ja
              faskiakäsittely – edut voimassa rajoitetusti.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {offers.treatments.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <HoverCard className="panel panel-pad h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    {item.offer}
                  </p>
                  <h3 className="font-display mt-2 text-xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-display mt-2 text-2xl font-semibold text-ink">
                    {item.price}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.note}</p>
                </HoverCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/hyvinvointi"
                className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
              >
                Hyvinvointipalvelut
              </Link>
              <a
                href={site.jariPhoneHref}
                className="inline-flex rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold"
              >
                Varaa hoito: {site.jariPhone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Tarjouslehti
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Sama sisältö selkeänä sivuna
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              {site.address} · {site.phone}
              <br />
              Jari Kotkansalo – työfysioterapeutti, kuntohoitaja, personal
              trainer · {site.jariPhone}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/hinnat"
                className="inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
              >
                Koko hinnasto
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold"
              >
                Soita {site.phone}
              </a>
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

      <ContactCTA title="Kysy sopivaa tarjousta" />
    </>
  );
}
