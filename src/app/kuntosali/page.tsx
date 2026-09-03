import type { Metadata } from "next";
import Image from "next/image";
import { ContactCTA } from "@/components/ContactCTA";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";
import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor, MotionLink } from "@/components/MotionPress";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { findGymPrice, getGymProgramPrices, getPrices } from "@/lib/prices";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kuntosali Hollola",
  description:
    "Kuntosali Hollolassa – Kuntokeskus Loisto. Laadukkaat laitteet, avainkortilla treeni klo 04–24, laiteopastus ja yksilölliset ohjelmat. Ei liittymismaksuja.",
};

export const dynamic = "force-dynamic";

const highlights = [
  {
    title: "04–24",
    text: "Treenaa sinulle sopivaan aikaan avainkortilla.",
  },
  {
    title: "Yksilöllinen ohjaus",
    text: "Apua harjoitteluun ja laitteisiin tarvittaessa.",
  },
  {
    title: "Monipuoliset välineet",
    text: "Laitteet, vapaat painot ja aerobinen harjoittelu.",
  },
] as const;

const whyCards = [
  {
    title: "Monipuolinen kuntosali",
    text: "Laitteet, vapaat painot ja aerobisen harjoittelun välineet erilaisiin tavoitteisiin – aloittelijasta kokeneeseen.",
  },
  {
    title: "Harjoittelu sinun tavoitteillasi",
    text: "Voimaa, lihasmassaa, parempaa kuntoa tai aktiivisempi arki. Ohjelma rakennetaan sen mukaan, mitä sinä tarvitset.",
  },
  {
    title: "Apua alkuun",
    text: "Et tarvitse valmiiksi kuntosalikokemusta. Laiteopastus ja yksilöllinen ohjelma auttavat turvallisesti liikkeelle.",
  },
] as const;

const passCards = [
  {
    key: "kertamaksu",
    title: "Kerta",
    note: "Tutustu saliin",
    candidates: ["Kertamaksu", "Kerta"],
  },
  {
    key: "10x",
    title: "10×-kortti",
    note: "Joustava määrä",
    candidates: ["10×-kortti", "10x-kortti", "10×", "10x"],
  },
  {
    key: "12kk",
    title: "12 kk",
    note: "Edullisin €/kk",
    candidates: ["12 kk", "12kk"],
  },
] as const;

export default async function KuntosaliPage() {
  const prices = await getPrices();
  const program = getGymProgramPrices(prices.personalTraining);

  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[78vh] overflow-hidden bg-ink text-white md:min-h-[85vh]"
        contentClassName="container-page relative flex min-h-[78vh] flex-col justify-end pb-12 pt-28 md:min-h-[85vh] md:pb-16"
        image={
          <Image
            src="/images/gym-floor.jpg"
            alt="Kuntosalilaitteita Kuntokeskus Loistossa Hollolassa"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        }
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">Kuntosali · Hollola</p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[0.95] tracking-tight">
            Kuntosali Hollolassa –{" "}
            <span className="text-accent-bright">treenaa omalla tavalla</span>
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Monipuolinen sali aloittelijalle ja kokeneelle. Laadukkaat laitteet,
            vapaat painot ja tarvittaessa henkilökohtaista ohjausta – avainkortilla{" "}
            {site.keycardHours}.
          </p>
        </HeroLine>
        <HeroLine>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionLink href="/hinnat" className="btn-accent">
              Katso hinnasto
            </MotionLink>
            <MotionAnchor href={site.phoneHref} className="btn-ghost">
              Kysy laiteopastusta
            </MotionAnchor>
          </div>
        </HeroLine>
      </HeroMotion>

      <section className="border-b border-[var(--line)] bg-white">
        <div className="container-page grid gap-6 py-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[var(--line)] md:py-10">
          {highlights.map((item) => (
            <div key={item.title} className="md:px-8">
              <p className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                {item.title}
              </p>
              <p className="mt-2 text-muted leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Miksi Loisto?</p>
            <h2 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              Kuntosali, jossa sinun ei tarvitse treenata yksin
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
              Hyvä kuntosali ei ole vain kokoelma laitteita. Se on paikka, jossa
              harjoittelu tuntuu mielekkäältä – ja jossa saat tarvittaessa apua
              tavoitteisiisi. Loisto on palvellut Hollolassa vuodesta{" "}
              {site.founded}.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 md:grid-cols-3" delay={0.05}>
            {whyCards.map((card, i) => (
              <StaggerItem key={card.title} hover>
                <HoverCard className="panel panel-pad h-full">
                  <p className="font-display text-sm font-bold tracking-[0.16em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-muted leading-relaxed">{card.text}</p>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Hinnat</p>
            <h2 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              Valitse sinulle sopiva treenimäärä
            </h2>
            <p className="mt-4 max-w-2xl text-muted leading-relaxed">
              Ei liittymismaksuja. Kuntosali alk.{" "}
              <strong className="text-ink">{prices.headline.highlightKuntosali}</strong>
              . Suluissa opiskelija-, eläkeläis- ja työtön-hinta.
            </p>
          </Reveal>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-3" delay={0.04}>
            {passCards.map((card) => (
              <StaggerItem key={card.key} hover>
                <HoverCard className="price-tile h-full">
                  <p className="text-sm text-muted">{card.title}</p>
                  <p className="font-display mt-3 text-3xl font-semibold tracking-tight">
                    {findGymPrice(prices.membershipRows, [...card.candidates])}
                  </p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                    {card.note}
                  </p>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.05}>
            <HoverCard className="panel mt-8 overflow-x-auto">
              <div className="border-b border-[var(--line)] px-5 py-4">
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  Kuntosali-hinnasto
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Sama taulukko kuin Hinnat-sivulla (kuntosali-sarake). Päivittyy
                  hallinnasta.
                </p>
              </div>
              <table className="data-table min-w-[420px] w-full text-left">
                <thead>
                  <tr>
                    <th>Tuote</th>
                    <th>Kuntosali</th>
                  </tr>
                </thead>
                <tbody>
                  {prices.membershipRows.map((row) => (
                    <tr key={row.product}>
                      <td className="font-semibold text-ink">{row.product}</td>
                      <td>{row.kuntosali}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </HoverCard>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <HoverCard className="panel panel-pad">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  Ohjelmat & testit
                </h3>
                <ul className="prose-loisto mt-4">
                  <li>
                    <strong className="text-ink">Kuntosaliohjelma</strong> — 1
                    päivän jako {program.ohjelma1} · 2 päivän jako{" "}
                    {program.ohjelma2} · 3 päivän jako {program.ohjelma3}
                  </li>
                  <li>
                    <strong className="text-ink">Kuntotesti</strong> —{" "}
                    {program.kuntotesti} (n. 45–50 min + palaute)
                  </li>
                  <li>
                    <strong className="text-ink">Kehonkoostumusmittaus</strong> —{" "}
                    {program.kehonkoostumus} (mittaus + palaute)
                  </li>
                </ul>
              </HoverCard>
              <HoverCard className="panel panel-dark panel-pad">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-white">
                  Valmis aloittamaan?
                </h3>
                <p className="mt-3 text-white/75 leading-relaxed">
                  Soita tai poikkea paikalle – autamme kortin valinnassa ja
                  tarvittaessa laiteopastuksessa.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <MotionAnchor href={site.phoneHref} className="btn-accent">
                    Soita {site.phone}
                  </MotionAnchor>
                  <MotionLink href="/hinnat" className="btn-ghost">
                    Koko hinnasto
                  </MotionLink>
                </div>
              </HoverCard>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Yksilöllinen ohjelma
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Alkuhaastattelu, laiteopastus ja käytännön harjoittelu. Ohjelma voi
              olla kiinteytys-, lihasmassa-, kestävyys- tai voimapainotteinen –
              tai muuta treeniäsi tukeva.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Kuntotestaus
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Aerobinen kunto, lihaskunto, liikkuvuus ja
              kehonkoostumusmittaus. Testien pohjalta laaditaan tarvittaessa
              harjoitteluohjelma.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Laitteet & treeni
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Treenaa laitteilla, vapailla painoilla tai aerobisilla
              välineillä. Suosittelemme yksilöllistä ohjelmaa – näin tilanteesi
              kartoitetaan ja tulokset tulevat nopeammin.
            </p>
          </Reveal>
        </div>
      </section>

      <ContactCTA
        title="Tule tutustumaan saliin"
        text="Soita tai poikkea Keskuskatu 4:ään. Kysy laiteopastusta tai sopivaa korttia – ilman liittymismaksua."
      />
    </>
  );
}
