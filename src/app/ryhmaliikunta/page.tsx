import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";
import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor, MotionLink } from "@/components/MotionPress";
import { Reveal } from "@/components/Reveal";
import { ScheduleTable } from "@/components/ScheduleTable";
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
  const [{ autumn }, prices] = await Promise.all([getSchedules(), getPrices()]);

  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[72vh] overflow-hidden bg-ink text-white md:min-h-[78vh]"
        contentClassName="container-page relative flex min-h-[72vh] flex-col justify-end pb-12 pt-28 md:min-h-[78vh] md:pb-16"
        image={
          <Image
            src="/images/group-fitness.jpg"
            alt="Ryhmäliikuntatunti Kuntokeskus Loistossa"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
        }
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">{autumn.eyebrow}</p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.3rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">
            {autumn.title}
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            {autumn.lead}
          </p>
        </HeroLine>
        <HeroLine>
          <p className="mt-4 text-sm font-semibold tracking-wide text-accent-bright md:text-base">
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
            <MotionLink href="#viikko-ohjelma" className="btn-ghost">
              Viikko-ohjelma
            </MotionLink>
          </div>
        </HeroLine>
      </HeroMotion>

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <div className="prose-loisto">
              <p>
                Jumpata pidetään 4:llä, Aerial Bungee 3:lla ja joogat 6:lla.
                Varaus & peruutus viimeistään edellisenä iltana klo 20
                mennessä. Ilmoittaudu Nimenhuudossa tai lähetä nimi & sähköposti
                tekstiviestillä numeroon {site.phone}.
              </p>
              <ul>
                <li>
                  <strong>Hatha-jooga 75</strong> ma 19.15–20.30 &{" "}
                  <strong>Voima-jooga 60</strong> ke 19.15–20.15
                </li>
                <li>
                  <strong>Cross Training</strong> la 11.30–12.30 (2.10. alk.)
                </li>
                <li>
                  <strong>HIIT+Core 45 & Kahvakuula 45</strong> pe
                  16.45–17.30 / 17.40–18.25
                </li>
                <li>
                  <strong>Aerial Bungee intensiivi 75</strong> to 19.15–20.30 –
                  32 €
                </li>
                <li>
                  <strong>Aerial Bungee 55</strong> pe 18.45–19.40 –
                  Fitness-kortilla mukaan
                </li>
                <li>
                  <strong>Äänimaljarentoutus</strong> ti 17.30–18.30 (joka toinen
                  tiistai)
                </li>
              </ul>
              <p>
                Ohjaajat: Jari Kotkansalo, Ulla Paaso, Eija Liikonen. Fitness
                sisältää kuntosalin 4–24 + jumpata + Aerial Bungee 55 + Cross
                Training + joogat. Ryhmäliikunta sisältää jumpata + Kangoo Jumps
                + joogat.
              </p>
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
        id="viikko-ohjelma"
        className="border-t border-[var(--line)] bg-mist/40 section-pad scroll-mt-28"
      >
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {autumn.scheduleTitle}
            </h2>
            {autumn.scheduleNote ? (
              <p className="mt-3 max-w-2xl text-muted">{autumn.scheduleNote}</p>
            ) : null}
          </Reveal>
          <div className="mt-8">
            <ScheduleTable days={autumn.days} />
          </div>
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              <MotionAnchor
                href={site.nimenhuutoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                Ilmoittaudu Nimenhuudossa
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
