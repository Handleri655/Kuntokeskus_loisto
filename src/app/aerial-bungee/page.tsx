import type { Metadata } from "next";
import Image from "next/image";
import { ContactCTA } from "@/components/ContactCTA";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";
import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor, MotionLink } from "@/components/MotionPress";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aerial Bungee Hollola",
  description:
    "Tutustu Kuntokeskus Loiston Aerial Bungee -tunteihin Hollolassa. Katso tunnit, hinnat ja eri tasot sekä ilmoittaudu mukaan.",
  alternates: { canonical: "/aerial-bungee" },
};

const benefits = [
  {
    title: "Kehonhallinta",
    text: "Harjoittelu haastaa kehonhallintaa ja koordinaatiota.",
  },
  {
    title: "Kunto",
    text: "Vauhdikas harjoittelu nostaa sykettä ja kehittää kuntoa.",
  },
  {
    title: "Musiikki & liike",
    text: "Musiikki ja koreografia tekevät harjoittelusta elämyksellistä.",
  },
  {
    title: "Uusi tapa treenata",
    text: "Kokeile jotain erilaista ja löydä uusi tapa liikkua.",
  },
] as const;

const levels = [
  {
    number: "01",
    title: "Ilmalento alkaa",
    text: "Perusteet, turvallisuus ja säädöt. Opit kiinnittämään valjaat oikein; ohjaaja säätää bungee-köyden ja valjaat sinulle sopiviksi.",
  },
  {
    number: "02",
    title: "Ohjaus & koreografia",
    text: "Selkeää koreografiaa ja pidempiä liikeyhdistelmiä. Musiikki tukee tekemistä; liikkeet tehdään alkuun rauhallisesti ja oikein.",
  },
] as const;

/** Vain nimetyt, olemassa olevat videot – ei placeholdereita */
const videos = [
  {
    label: "Fitness & kuntoilu",
    href: "https://www.youtube.com/shorts/f7wbZ0R632s",
  },
  {
    label: "Bungee Fitness – Feel the Freedom",
    href: "https://youtu.be/WtmBovYMlU4",
  },
] as const;

const faq = [
  {
    q: "Tarvitsenko aiempaa kokemusta?",
    a: "Et tarvitse. Aerial Bungee sopii sekä liikuntaa jo harrastaville että uutta lajia kokeileville. Harjoittelu alkaa perusteista.",
  },
  {
    q: "Miten Aerial Bungee -tunti etenee?",
    a: "Aluksi käydään läpi valjaiden kiinnitys ja bungee-köyden säätö. Sen jälkeen harjoitellaan oman tason mukaan – alkeista kohti vauhdikkaampaa tekemistä.",
  },
  {
    q: "Voinko aloittaa tasolta 1?",
    a: "Kyllä. Taso 1 on lähtökohta: perusteet, turvallisuus ja säädöt. Intensiivikurssi (75 min) käydään ennen pe Aerial Bungee 55 -tuntia.",
  },
] as const;

export default function AerialBungeePage() {
  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[78vh] overflow-hidden bg-ink text-white md:min-h-[85vh]"
        contentClassName="container-page relative flex min-h-[78vh] flex-col justify-end pb-12 pt-28 md:min-h-[85vh] md:pb-16"
        image={
          <Image
            src="/images/training.jpg"
            alt="Aerial Bungee -harjoittelua Kuntokeskus Loistossa Hollolassa"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
        }
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">
            Aerial Bungee · Hollola
          </p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.4rem,6.5vw,4.75rem)] font-semibold leading-[0.95] tracking-tight">
            Aerial Bungee Hollolassa –{" "}
            <span className="text-accent-bright">Ilmalento alkaa</span>
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Bungee-valjastreeni yhdistää vauhdikkaan liikunnan, musiikin ja
            uudenlaisen tavan treenata. Kehitä kehonhallintaa ja kuntoa samalla,
            kun nautit liikkeestä.
          </p>
        </HeroLine>
        <HeroLine>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionAnchor href={site.phoneHref} className="btn-accent">
              Ilmoittaudu mukaan
            </MotionAnchor>
            <MotionLink href="#tunnit-hinnat" className="btn-ghost">
              Katso tunnit ja hinnat
            </MotionLink>
          </div>
        </HeroLine>
      </HeroMotion>

      <section className="section-pad">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal>
            <p className="eyebrow text-accent">Aerial Bungee</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Mitä Aerial Bungee on?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Aerial Bungee on vauhdikas harjoitusmuoto, jossa yhdistyvät
              valjaat, joustava bungee-köysi ja musiikki. Harjoittelu kehittää
              kehonhallintaa ja aerobista kuntoa sekä tarjoaa uudenlaisen tavan
              liikkua.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] md:aspect-[5/4]">
              <Image
                src="/images/training.jpg"
                alt="Bungee-valjastreeniä Loistossa"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Hyödyt</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Miksi kokeilla Aerial Bungeeta?
            </h2>
          </Reveal>
          <Stagger
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
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
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Kenelle</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Kenelle Aerial Bungee sopii?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Aerial Bungee sopii sekä liikuntaa jo harrastaville että uutta
              lajia kokeileville. Harjoittelu alkaa perusteista ja etenee oman
              osaamisen mukaan.
            </p>
          </Reveal>

          <Stagger className="mt-10 grid gap-5 md:grid-cols-2" delay={0.05}>
            {levels.map((level) => (
              <StaggerItem key={level.number} hover>
                <HoverCard className="panel panel-pad h-full">
                  <p className="font-display text-sm font-bold tracking-[0.16em] text-accent">
                    Taso {level.number}
                  </p>
                  <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                    {level.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-ink-soft">
                    {level.text}
                  </p>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-6 text-sm text-muted">Terkuin Jari Kotkansalo</p>
        </div>
      </section>

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Video</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Katso Aerial Bungee käytännössä
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
              Näillä videoilla saat käsityksen siitä, miltä bungee-treeni
              näyttää.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {videos.map((video) => (
              <Reveal key={video.href}>
                <HoverCard subtle>
                  <a
                    href={video.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-[var(--line)] bg-white/80 px-6 py-5 text-base font-semibold text-ink transition hover:border-accent/35"
                  >
                    <span>{video.label}</span>
                    <span className="shrink-0 text-accent">Avaa →</span>
                  </a>
                </HoverCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="tunnit-hinnat" className="section-pad scroll-mt-28">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Aikataulu</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Tunnit & hinnat
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
              Hinnat ovat samat kuin hinnastossa. Fitness-kortilla pääset mukaan
              Aerial Bungee 55 -tunneille.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <HoverCard className="panel panel-pad h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Intensiivikurssi
                </p>
                <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                  Aerial Bungee intensiivi 75′
                </h3>
                <p className="mt-3 text-ink-soft">
                  Torstaisin klo 19.15–20.30
                </p>
                <p className="mt-2 text-sm text-muted">
                  Alkeet · turvallisuus · säädöt. Käytävä ennen pe Aerial Bungee
                  55 -tuntia. Välillä myös pe:sin.
                </p>
                <p className="font-display mt-8 text-4xl font-semibold tracking-tight md:text-5xl">
                  32 €
                </p>
              </HoverCard>
            </Reveal>

            <Reveal delay={0.06}>
              <HoverCard className="panel panel-pad h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Aerial Bungee
                </p>
                <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                  Aerial Bungee 55
                </h3>
                <p className="mt-3 text-ink-soft">Pe 18–18.55</p>
                <p className="mt-2 text-sm text-muted">
                  Alkeet / keskitaso. Fitness-kortilla tai määräkortilla.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted">5× 55 min</p>
                    <p className="font-display mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
                      75 €
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted">3× 55 min</p>
                    <p className="font-display mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
                      60 €
                    </p>
                  </div>
                </div>
              </HoverCard>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-6 text-sm text-muted">
              Lisätietoja myös{" "}
              <a
                href="/hinnat"
                className="font-semibold text-ink underline decoration-[var(--line)] underline-offset-4 hover:decoration-accent"
              >
                hinnastosivulla
              </a>{" "}
              ja{" "}
              <a
                href="/tarjoukset"
                className="font-semibold text-ink underline decoration-[var(--line)] underline-offset-4 hover:decoration-accent"
              >
                tarjouksissa
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pt-0">
        <Reveal>
          <HoverCard className="panel panel-dark container-page px-6 py-10 md:px-10 md:py-12">
            <div className="grid gap-8 md:grid-cols-[1.2fr_auto] md:items-center">
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  Valmis kokeilemaan?
                </h2>
                <p className="mt-3 max-w-md text-white/75 leading-relaxed">
                  Tutustu Aerial Bungeeseen ja kysy vapaita paikkoja.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <MotionAnchor href={site.phoneHref} className="btn-accent">
                  Ilmoittaudu mukaan
                </MotionAnchor>
                <MotionAnchor
                  href={site.phoneHref}
                  className="btn-ghost whitespace-nowrap"
                >
                  Soita {site.phone}
                </MotionAnchor>
              </div>
            </div>
          </HoverCard>
        </Reveal>
      </section>

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-narrow">
          <Reveal>
            <p className="eyebrow text-accent">FAQ</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Usein kysyttyä
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {faq.map((item) => (
              <Reveal key={item.q}>
                <details className="group rounded-[1.25rem] border border-[var(--line)] bg-white/80 px-5 py-4 open:bg-white md:px-6">
                  <summary className="cursor-pointer list-none font-display text-lg font-semibold tracking-tight marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {item.q}
                      <span className="shrink-0 text-accent transition group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 pb-1 leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
          {/* "Mitä mukaan?" ei ole projektissa varmennettu – jätetty pois. */}
        </div>
      </section>

      <ContactCTA
        title="Kokeile jotain erilaista"
        text="Kiinnostuitko Aerial Bungeesta? Ota yhteyttä ja kysy seuraavista tunneista."
        primaryLabel="Ilmoittaudu Aerial Bungeeseen"
        phoneSecondaryLabel={`Soita ${site.phone}`}
      />
    </>
  );
}
