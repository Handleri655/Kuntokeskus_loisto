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
  title: "Kangoo Power Hollola",
  description:
    "Kangoo Power -intervallitunti Kuntokeskus Loistossa Hollolassa. Katso tunnit, hinnat ja kokeile vauhdikasta hyppykenkätreeniä.",
  alternates: { canonical: "/kangoo" },
};

export const dynamic = "force-dynamic";

const benefits = [
  {
    title: "Tehokas treeni",
    text: "Nosta sykettä ja harjoita koko kehoa.",
  },
  {
    title: "Kestävyyskunto",
    text: "Kehitä aerobista kuntoa vauhdikkaalla intervalliharjoittelulla.",
  },
  {
    title: "Koko keho töihin",
    text: "Monipuoliset liikkeet haastavat useita lihasryhmiä.",
  },
  {
    title: "Koordinaatio",
    text: "Kehitä kehonhallintaa ja liikkeen hallintaa.",
  },
  {
    title: "Nivelystävällisempi liikkuminen",
    text: "Jousitettu kenkä tekee harjoittelusta erilaisen tavan liikkua.",
  },
  {
    title: "Ennen kaikkea hauskaa",
    text: "Treenaa energisesti musiikin ja liikkeen mukana.",
  },
] as const;

const audience = [
  {
    title: "Aloittelijalle",
    text: "Voit tulla mukaan ilman pitkää kokemusta.",
  },
  {
    title: "Aktiiviliikkujalle",
    text: "Lisää treeniisi vauhtia ja vaihtelua.",
  },
  {
    title: "Uutta kokeilevalle",
    text: "Jos tavallinen kuntotreeni kyllästyttää, kokeile jotain erilaista.",
  },
] as const;

/** Oikeat, olemassa olevat videot – ei placeholdereita */
const videos = [
  {
    label: "Kangoo Power – video (winner 2019)",
    href: "https://youtu.be/qncTqCEHhG4",
  },
  {
    label: "Facebook-video",
    href: "https://www.facebook.com/kangooclubfitsuomi/videos/580024389253456/",
  },
] as const;

function findMembershipPrice(
  rows: { product: string; ryhmaliikunta: string }[],
  product: string,
) {
  return rows.find((row) => row.product === product)?.ryhmaliikunta ?? null;
}

export default async function KangooPage() {
  const prices = await getPrices();
  const kerta = findMembershipPrice(prices.membershipRows, "Kertamaksu");
  const x10 = findMembershipPrice(prices.membershipRows, "10×-kortti");
  const month = findMembershipPrice(prices.membershipRows, "1 kk");

  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[78vh] overflow-hidden bg-ink text-white md:min-h-[85vh]"
        contentClassName="container-page relative flex min-h-[78vh] flex-col justify-end pb-12 pt-28 md:min-h-[85vh] md:pb-16"
        image={
          <Image
            src="/images/group-fitness.jpg"
            alt="Kangoo Power -intervallitreeniä Kuntokeskus Loistossa Hollolassa"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
        }
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">
            Kangoo Power · Hollola
          </p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.4rem,6.5vw,4.75rem)] font-semibold leading-[0.95] tracking-tight">
            Hyppy vai{" "}
            <span className="text-accent-bright">herkku?</span>
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Kangoo Power -intervallitunti yhdistää tehokkaan treenin, liikkeen
            ilon ja koko kehon harjoittelun – Hollolassa.
          </p>
        </HeroLine>
        <HeroLine>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionLink href="#tunnit-hinnat" className="btn-accent">
              Katso tunnit & hinnat
            </MotionLink>
            <MotionAnchor href={site.phoneHref} className="btn-ghost">
              Kysy lisää
            </MotionAnchor>
          </div>
        </HeroLine>
      </HeroMotion>

      <section className="section-pad">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal>
            <p className="eyebrow text-accent">Kangoo Power</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Mikä Kangoo Power on?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Kangoo Power on vauhdikas intervallitunti, jossa jousitetut
              Kangoo-kengät tekevät liikkumisesta tehokasta ja elämyksellistä.
              Harjoittelu yhdistää sykettä nostavan aerobisen treenin, koko
              kehon liikkeet ja hauskan tekemisen.
            </p>
            <p className="mt-4 text-sm font-semibold text-ink">
              Ainoana Hollolassa.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <HoverCard className="panel panel-dark panel-pad h-full">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-bright">
                Intervallitunti
              </p>
              <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                Syke ylös, treeni tuntuu
              </h3>
              <p className="mt-4 leading-relaxed text-white/75">
                Kangoo Jumps -tunnilla treenataan hyppykengillä: tehokasta
                sykkeennostoa ja core- / lihaskunto-osuus erikseen.
              </p>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Hyödyt</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Miksi kokeilla Kangoota?
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
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Kenelle</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Oletko valmis kokeilemaan jotain erilaista?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Kangoo sopii sinulle, jos haluat tehokasta ja vauhdikasta
              liikuntaa, vaihtelua tavalliseen treeniin tai uuden tavan nostaa
              sykettä.
            </p>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3" delay={0.05}>
            {audience.map((item) => (
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

      <section
        id="tunnit-hinnat"
        className="section-pad section-band border-y border-[var(--line)] scroll-mt-28"
      >
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Aikataulu</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Tunnit & hinnat
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
              Kangoo kuuluu ryhmäliikuntaan. Hinnat ovat samat kuin
              hinnastossa – ei erillistä Kangoo-lisämaksua.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <HoverCard className="panel panel-pad h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Viikko-ohjelma
                </p>
                <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                  Kangoo Jumps + Core + venyttely 40
                </h3>
                <p className="mt-3 text-lg text-ink-soft">
                  Tiistaisin klo 20.20–21.00
                </p>
                <p className="mt-2 text-sm text-muted">
                  Intervallitunti · ohjaaja Jari
                </p>
              </HoverCard>
            </Reveal>

            <Reveal delay={0.06}>
              <HoverCard className="panel panel-pad h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Kesäohjelma
                </p>
                <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                  Kangoo Jumps + Core 45
                </h3>
                <p className="mt-3 text-lg text-ink-soft">
                  Tiistaisin klo 18.10–18.55
                </p>
                <p className="mt-2 text-sm text-muted">
                  Tarkista voimassaolo{" "}
                  <a
                    href="/ryhmaliikunta/kesa"
                    className="font-semibold text-ink underline decoration-[var(--line)] underline-offset-4 hover:decoration-accent"
                  >
                    kesäohjelmasta
                  </a>
                  .
                </p>
              </HoverCard>
            </Reveal>
          </div>

          <Stagger
            className="mt-5 grid gap-4 sm:grid-cols-3"
            delay={0.04}
          >
            {kerta ? (
              <StaggerItem hover>
                <HoverCard className="price-tile h-full">
                  <p className="relative z-[1] text-sm text-muted">Kertamaksu</p>
                  <p className="relative z-[1] font-display mt-3 text-3xl font-semibold tracking-tight">
                    {kerta}
                  </p>
                  <p className="relative z-[1] mt-2 text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                    Ryhmäliikunta
                  </p>
                </HoverCard>
              </StaggerItem>
            ) : null}
            {x10 ? (
              <StaggerItem hover>
                <HoverCard className="price-tile h-full">
                  <p className="relative z-[1] text-sm text-muted">10×-kortti</p>
                  <p className="relative z-[1] font-display mt-3 text-3xl font-semibold tracking-tight">
                    {x10}
                  </p>
                  <p className="relative z-[1] mt-2 text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                    Ryhmäliikunta
                  </p>
                </HoverCard>
              </StaggerItem>
            ) : null}
            {month ? (
              <StaggerItem hover>
                <HoverCard className="price-tile h-full">
                  <p className="relative z-[1] text-sm text-muted">1 kk</p>
                  <p className="relative z-[1] font-display mt-3 text-3xl font-semibold tracking-tight">
                    {month}
                  </p>
                  <p className="relative z-[1] mt-2 text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                    Ryhmäliikunta
                  </p>
                </HoverCard>
              </StaggerItem>
            ) : null}
          </Stagger>

          <Reveal>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
              Ryhmäliikunta-kortti sisältää jumpata ja Kangoo Jumpsin.
              Fitness-kortilla mukaan myös Aerial Bungee ja Cross Training.
              Katso koko{" "}
              <a
                href="/hinnat"
                className="font-semibold text-ink underline decoration-[var(--line)] underline-offset-4 hover:decoration-accent"
              >
                hinnasto
              </a>{" "}
              tai{" "}
              <a
                href="/ryhmaliikunta"
                className="font-semibold text-ink underline decoration-[var(--line)] underline-offset-4 hover:decoration-accent"
              >
                viikko-ohjelma
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Video</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Katso Kangoo käytännössä
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
              Näillä videoilla saat käsityksen hyppykenkätreenistä.
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

      <ContactCTA
        title="Valmis kokeilemaan Kangooa?"
        text="Kysy seuraavista tunneista ja tule kokeilemaan vauhdikasta treeniä Hollolassa."
        primaryLabel="Kysy seuraavista tunneista"
        phoneSecondaryLabel={`Soita ${site.phone}`}
      />
    </>
  );
}
