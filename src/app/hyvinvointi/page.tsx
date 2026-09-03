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
  title: "Hyvinvointi Hollola",
  description:
    "Hieronta, kuivakuppaus, kuumakivihieronta, fysioterapia, faskiakäsittely, Footbalance ja hierontatuoli Hollolassa – Jari Kotkansalo.",
  alternates: { canonical: "/hyvinvointi" },
};

export const dynamic = "force-dynamic";

const services = [
  {
    title: "Hieronta",
    text: "Lihashuoltoa ja palautumista – yksilöllisesti tarpeesi mukaan.",
  },
  {
    title: "Kuivakuppaus",
    text: "Kuppauskäsittely osana lihashuoltoa ja hoitoa.",
  },
  {
    title: "Kuumakivihieronta",
    text: "Lämmittävä hieronta kuumakivillä.",
  },
  {
    title: "Fysioterapia & faskiakäsittely",
    text: "Työfysioterapeutin käsittelyä ja faskiatyötä.",
  },
  {
    title: "Footbalance-pohjalliset",
    text: "Yksilölliset Medical & Sport -pohjalliset.",
  },
  {
    title: "Hierontatuoli",
    text: "Hierontatuoli kuntokeskuksessa – nopea lihashuolto treenin yhteydessä.",
  },
] as const;

export default async function HyvinvointiPage() {
  const prices = await getPrices();
  const chair = prices.extras.find((item) =>
    /hierontatuoli/i.test(item.title),
  );
  const treatments = prices.offers.treatments;

  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[78vh] overflow-hidden bg-ink text-white md:min-h-[85vh]"
        contentClassName="container-page relative flex min-h-[78vh] flex-col justify-end pb-12 pt-28 md:min-h-[85vh] md:pb-16"
        image={
          <Image
            src="/images/hero-hyvinvointi.jpg"
            alt="Hieronta ja hyvinvointipalvelut Kuntokeskus Loistossa"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
        }
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">Hyvinvointi · Hollola</p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.3rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">
            Hyvinvointia, palautumista ja{" "}
            <span className="text-accent-bright">lihashuoltoa</span>
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Hierontaa, kuivakuppausta, kuumakivihierontaa, fysioterapiaa ja
            Footbalance-palveluita Hollolassa.
          </p>
        </HeroLine>
        <HeroLine>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionAnchor href={site.jariPhoneHref} className="btn-accent">
              Varaa hoitoaika
            </MotionAnchor>
            <MotionLink href="#palvelut" className="btn-ghost">
              Katso palvelut
            </MotionLink>
          </div>
        </HeroLine>
      </HeroMotion>

      <section id="palvelut" className="section-pad scroll-mt-28">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Palvelut</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Mitä tarjoamme
            </h2>
          </Reveal>
          <Stagger
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            delay={0.04}
          >
            {services.map((item) => (
              <StaggerItem key={item.title} hover>
                <HoverCard className="panel panel-pad flex h-full flex-col">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-soft">
                    {item.text}
                  </p>
                  <MotionAnchor
                    href={site.jariPhoneHref}
                    className="mt-5 inline-flex text-sm font-semibold text-accent"
                  >
                    Varaa aika →
                  </MotionAnchor>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section
        id="hinnat"
        className="section-pad section-band border-y border-[var(--line)] scroll-mt-28"
      >
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Hinnat</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Hinnat & hoitosarjat
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
              Hierontatuolin hinnat kuntokeskuksessa. Hoitosarjojen edut
              päivittyvät hallinnasta – tarkista myös{" "}
              <a
                href="/tarjoukset"
                className="font-semibold text-ink underline decoration-[var(--line)] underline-offset-4 hover:decoration-accent"
              >
                tarjoukset
              </a>
              .
            </p>
          </Reveal>

          {chair ? (
            <Reveal>
              <HoverCard className="panel panel-dark panel-pad mt-10 max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-bright">
                  Hierontatuoli
                </p>
                <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                  {chair.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-white/85">
                  {chair.text}
                </p>
              </HoverCard>
            </Reveal>
          ) : null}

          <Stagger
            className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            delay={0.04}
          >
            {treatments.map((item) => (
              <StaggerItem key={item.title} hover>
                <HoverCard className="panel panel-pad h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    {item.offer}
                  </p>
                  <h3 className="font-display mt-2 text-xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-display mt-3 text-2xl font-semibold tracking-tight">
                    {item.price}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.note}</p>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem]">
              <Image
                src="/images/portal-jari.jpg"
                alt="Jari Kotkansalo – työfysioterapeutti ja personal trainer"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="eyebrow text-accent">Ammattitaito</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Ammattitaitoasi kehonhuoltoon
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Hyvinvointipalveluista vastaa työfysioterapeutti, kuntohoitaja ja
              personal trainer Jari Kotkansalo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MotionAnchor href={site.jariPhoneHref} className="btn-primary">
                Soita {site.jariPhone}
              </MotionAnchor>
              <MotionAnchor
                href={site.jariSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white/80 px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
              >
                www.tmijarik.fi
              </MotionAnchor>
            </div>
            <p className="mt-6 text-sm text-muted">Terkuin Jari Kotkansalo</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-accent">Hierontatuoli</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Hierontatuoli salilla
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
              {chair?.text ?? "Hierontatuoli kuntokeskuksessa."} Kysy käyttöä
              paikan päällä.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.35rem]">
              <Image
                src="/images/hierontatuoli.jpg"
                alt="Hierontatuoli Kuntokeskus Loistossa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA
        title="Kaipaatko apua kehonhuoltoon?"
        text="Varaa aika helposti puhelimitse tai kysy sopivasta palvelusta."
        primaryLabel={`Soita Jarille ${site.jariPhone}`}
        primaryHref={site.jariPhoneHref}
        secondaryLabel="www.tmijarik.fi"
        secondaryHref={site.jariSite}
        secondaryExternal
        hideInfoLink
      />
    </>
  );
}
