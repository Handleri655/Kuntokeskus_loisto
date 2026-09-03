import type { Metadata } from "next";
import Image from "next/image";
import { ContactCTA } from "@/components/ContactCTA";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";
import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor } from "@/components/MotionPress";
import { Reveal } from "@/components/Reveal";
import { dutyHours, openingHours, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Yhteystiedot Hollola",
  description:
    "Kuntokeskus Loiston yhteystiedot, aukioloajat ja sijainti Hollolassa. Soita, lähetä sähköpostia tai poikkea Keskuskatu 4:ään.",
  alternates: { canonical: "/info" },
};

export default function InfoPage() {
  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[70vh] overflow-hidden bg-ink text-white md:min-h-[75vh]"
        contentClassName="container-page relative flex min-h-[70vh] flex-col justify-end pb-12 pt-28 md:min-h-[75vh] md:pb-16"
        image={
          <Image
            src="/images/hero-gym.jpg"
            alt="Kuntokeskus Loisto Hollolassa"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
        }
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">Yhteystiedot · Hollola</p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.4rem,6.5vw,4.75rem)] font-semibold leading-[0.95] tracking-tight">
            Ota{" "}
            <span className="text-accent-bright">yhteyttä</span>
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Etsitkö sopivaa jäsenyyttä, haluatko aloittaa treenaamisen tai
            kysyä palveluistamme? Ota yhteyttä – autamme sinut alkuun.
          </p>
        </HeroLine>
        <HeroLine>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionAnchor href={site.phoneHref} className="btn-accent">
              Soita meille
            </MotionAnchor>
            <MotionAnchor href={site.emailHref} className="btn-ghost">
              Lähetä sähköpostia
            </MotionAnchor>
            <MotionAnchor
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Katso sijainti
            </MotionAnchor>
          </div>
        </HeroLine>
      </HeroMotion>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Yhteys</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Yhteystiedot
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <Reveal>
              <HoverCard className="panel panel-pad h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Kuntokeskus Loisto
                </p>
                <a
                  href={site.phoneHref}
                  className="font-display mt-4 block text-3xl font-semibold tracking-tight text-ink transition hover:text-accent"
                >
                  {site.phone}
                </a>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Jäsenyydet, kuntosali, ryhmäliikunta ja yleiset kysymykset.
                </p>
                <MotionAnchor
                  href={site.phoneHref}
                  className="btn-primary mt-6 w-full text-center"
                >
                  Soita
                </MotionAnchor>
              </HoverCard>
            </Reveal>

            <Reveal delay={0.05}>
              <HoverCard className="panel panel-pad h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Hyvinvointipalvelut
                </p>
                <a
                  href={site.jariPhoneHref}
                  className="font-display mt-4 block text-3xl font-semibold tracking-tight text-ink transition hover:text-accent"
                >
                  {site.jariPhone}
                </a>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Jari Kotkansalo – fysioterapia, hieronta, Footbalance, PT ja
                  faskiakäsittely.
                </p>
                <MotionAnchor
                  href={site.jariPhoneHref}
                  className="btn-primary mt-6 w-full text-center"
                >
                  Soita Jarille
                </MotionAnchor>
              </HoverCard>
            </Reveal>

            <Reveal delay={0.1}>
              <HoverCard className="panel panel-dark panel-pad h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-bright">
                  Sähköposti
                </p>
                <a
                  href={site.emailHref}
                  className="mt-4 block break-all text-lg font-semibold text-white transition hover:text-accent-bright"
                >
                  {site.email}
                </a>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  Lähetä viesti – vastaamme mahdollisimman pian.
                </p>
                <MotionAnchor
                  href={site.emailHref}
                  className="btn-accent mt-6 w-full text-center"
                >
                  Lähetä sähköpostia
                </MotionAnchor>
              </HoverCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-page grid gap-5 lg:grid-cols-2">
          <Reveal>
            <HoverCard className="panel panel-pad h-full">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                Aukioloajat
              </p>
              <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Aukioloajat
              </h2>
              <ul className="mt-6 space-y-3">
                {openingHours.map((row) => (
                  <li
                    key={row.day}
                    className="flex justify-between gap-4 border-b border-[var(--line)] pb-3 text-sm last:border-0 last:pb-0 md:text-base"
                  >
                    <span className="font-medium text-ink">{row.day}</span>
                    <span className="shrink-0 text-ink-soft">{row.hours}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-[1.15rem] bg-[rgba(212,168,75,0.12)] px-4 py-4">
                <p className="font-display text-lg font-semibold tracking-tight text-ink">
                  Avainkortilla treenaat {site.keycardHours} joka päivä.
                </p>
              </div>
            </HoverCard>
          </Reveal>

          <Reveal delay={0.05}>
            <HoverCard className="panel panel-pad h-full">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                Päivystys
              </p>
              <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Päivystys paikalla
              </h2>
              <ul className="mt-6 space-y-3">
                {dutyHours.map((row) => (
                  <li
                    key={row.day}
                    className="flex justify-between gap-4 border-b border-[var(--line)] pb-3 text-sm last:border-0 last:pb-0 md:text-base"
                  >
                    <span className="font-medium text-ink">{row.day}</span>
                    <span className="shrink-0 text-right text-ink-soft">
                      {row.hours}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted">
                Päivystys paikalla myös erikseen sovittaessa.
              </p>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal>
            <p className="eyebrow text-accent">Avainkortti</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Treenaa silloin kun sinulle sopii
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Avainkortilla pääset treenaamaan {site.keycardHours} joka päivä.
              Päivystysaikoina henkilökuntamme on paikalla auttamassa ja
              vastaamassa kysymyksiin.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.35rem]">
              <Image
                src="/images/gym-floor.jpg"
                alt="Kuntosali Kuntokeskus Loistossa"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <Reveal>
            <p className="eyebrow text-accent">Sijainti</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Löydä meidät
            </h2>
            <p className="font-display mt-5 text-2xl font-semibold tracking-tight text-ink">
              Keskuskatu 4
              <br />
              15870 Hollola
            </p>
            <p className="mt-4 text-ink-soft">Ilmainen pysäköinti</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MotionAnchor
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                Avaa Google Maps
              </MotionAnchor>
              <MotionAnchor href={site.phoneHref} className="btn-primary">
                Soita {site.phone}
              </MotionAnchor>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="overflow-hidden rounded-[1.35rem] border border-[var(--line)] bg-white shadow-sm">
              <iframe
                title="Kuntokeskus Loisto kartalla"
                src="https://maps.google.com/maps?q=Keskuskatu+4,+15870+Hollola,+Finland&z=15&output=embed"
                className="aspect-[4/3] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA
        title="Valmis aloittamaan?"
        text="Soita tai poikkea paikalle. Autamme sinut alkuun."
        primaryLabel={`Soita ${site.phone}`}
        secondaryLabel="Lähetä sähköpostia"
        secondaryHref={site.emailHref}
      />
    </>
  );
}
