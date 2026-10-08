import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";
import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor, MotionLink } from "@/components/MotionPress";
import { Reveal } from "@/components/Reveal";
import { ScheduleTable } from "@/components/ScheduleTable";
import { UpcomingClasses } from "@/components/UpcomingClasses";
import { getUpcomingNimenhuutoEvents } from "@/lib/nimenhuuto";
import { getPrices } from "@/lib/prices";
import { getSchedules } from "@/lib/schedules";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ryhmäliikunta Hollola",
  description:
    "Kuntokeskus Loiston ryhmäliikunta – Aerial Bungee, jooga, Kangoo ja paljon muuta. Ilmoittaudu tunneille Nimenhuudossa.",
};

export const dynamic = "force-dynamic";

export default async function RyhmaliikuntaPage() {
  const [{ autumn }, prices, upcoming] = await Promise.all([
    getSchedules(),
    getPrices(),
    getUpcomingNimenhuutoEvents(),
  ]);

  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[52vh] overflow-hidden bg-ink text-white md:min-h-[60vh]"
        contentClassName="container-page relative flex min-h-[52vh] flex-col justify-end pb-10 pt-28 md:min-h-[60vh] md:pb-14"
        veilClassName="hero-veil-strong"
        image={
          <Image
            src="/images/lavis.jpg"
            alt="Lavis-lavatanssijumppa Kuntokeskus Loistossa"
            fill
            priority
            quality={90}
            className="object-cover object-[center_40%]"
            sizes="100vw"
          />
        }
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright drop-shadow-sm">
            {autumn.eyebrow}
          </p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.05rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-tight drop-shadow-md">
            {autumn.title}
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white md:text-lg drop-shadow-sm">
            {autumn.lead}
          </p>
        </HeroLine>
        <HeroLine>
          <p className="mt-4 text-sm font-semibold tracking-wide text-accent-bright md:text-base drop-shadow-sm">
            Ryhmäliikunta alk. {prices.headline.highlightRyhmaliikunta} · Fitness
            alk. {prices.headline.highlightFitness}
          </p>
        </HeroLine>
        <HeroLine>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionAnchor
              href={site.nimenhuutoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent"
            >
              Ilmoittaudu tunneille
            </MotionAnchor>
            <MotionLink href="#tulevat-tunnit" className="btn-ghost">
              Tulevat tunnit
            </MotionLink>
          </div>
        </HeroLine>
      </HeroMotion>

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <div className="prose-loisto">
              <p>{prices.ryhmaliikuntaInfo.intro}</p>
              <ul>
                {prices.ryhmaliikuntaInfo.classes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>{prices.ryhmaliikuntaInfo.outro}</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <HoverCard className="panel panel-pad">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Hinnat
              </p>
              <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                Ryhmäliikunta alk. {prices.headline.highlightRyhmaliikunta}
              </h2>
              <p className="mt-2 text-lg font-semibold text-ink">
                Fitness alk. {prices.headline.highlightFitness}
              </p>
              <p className="mt-3 text-muted leading-relaxed">
                Katso koko hinnasto tai ilmoittaudu tunneille Nimenhuudossa.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/hinnat"
                  className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                >
                  Hinnasto
                </Link>
                <a
                  href={site.nimenhuutoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold"
                >
                  Nimenhuuto
                </a>
              </div>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <section
        id="tulevat-tunnit"
        className="border-t border-[var(--line)] bg-mist/40 section-pad scroll-mt-28"
      >
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Nimenhuuto</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Tulevat tunnit
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Päivittyy automaattisesti Aerodiggarit-kalenterista. Ilmoittaudu
              viimeistään edellisenä iltana klo{"\u00a0"}20.
            </p>
          </Reveal>
          <div className="mt-8">
            <UpcomingClasses feed={upcoming} />
          </div>
          <Reveal>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MotionAnchor
                href={site.nimenhuutoEventsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                Kaikki tunnit Nimenhuudossa
              </MotionAnchor>
              <a
                href={site.nimenhuutoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-ink underline decoration-[var(--line)] underline-offset-4 hover:decoration-accent"
              >
                aerodiggarit.nimenhuuto.com →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="viikko-ohjelma"
        className="border-t border-[var(--line)] section-pad scroll-mt-28"
      >
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {autumn.scheduleTitle}
            </h2>
            {autumn.scheduleNote ? (
              <p className="mt-3 max-w-2xl text-muted">{autumn.scheduleNote}</p>
            ) : null}
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Tyypillinen viikko. Tarkat päivät ja ilmoittautuminen ovat
              yllä Nimenhuudossa.
            </p>
            <div className="mt-5">
              <Link
                href="/ryhmaliikunta/tulosta"
                className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
              >
                Tulosta A4-viikko-ohjelma
              </Link>
            </div>
          </Reveal>
          <div className="mt-8">
            <ScheduleTable days={autumn.days} />
          </div>
        </div>
      </section>

      <ContactCTA
        title="Varaa paikka jumpalle"
        text="Ilmoittaudu Nimenhuudossa tai soita / tekstaa – autamme alkuun."
        primaryLabel="Ilmoittaudu tunneille"
        primaryHref={site.nimenhuutoUrl}
        secondaryLabel={`Soita ${site.phone}`}
        secondaryHref={site.phoneHref}
        showMessageOptions={false}
      />
    </>
  );
}
