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
  title: "Solarium / hierontatuoli Hollola",
  description:
    "Solarium ja hierontatuoli Kuntokeskus Loistossa Hollolassa – magneettikortilla tai ajanvarauksella. Ikäraja 18 vuotta. Katso ohjeet ja kysy solariumkorttia.",
  alternates: { canonical: "/solarium" },
};

export const dynamic = "force-dynamic";

const yearRound = [
  "Tasaisen rusketuksen ylläpitämiseen",
  "Rusketuksen hankkimiseen ympäri vuoden",
  "Oma hetki rentoutumiseen",
] as const;

const firstVisit = [
  "Käyttöaika 5–20 min riippuen ihotyypistä.",
  "Solariumissa on ajastin – valitse hoitopituus laitteen ohjeiden mukaan.",
  "Poista kosmetiikka ennen solariumin käyttöä.",
  "Puhdista makuualusta, tyyny ja suojalasit ohjeiden mukaan.",
  "Käytä aina asianmukaisia suojalaseja.",
] as const;

const safety = [
  {
    title: "18 vuoden ikäraja",
    text: "Solariumia saa käyttää vain 18 vuotta täyttänyt henkilö.",
  },
  {
    title: "Suojalasit",
    text: "Käytä aina asianmukaisia suojalaseja.",
  },
  {
    title: "Ensimmäinen käyttökerta",
    text: "Aloita lyhyellä käyttöajalla ja noudata laitteen ohjeita.",
  },
  {
    title: "Käyttömäärät",
    text: "Noudata annettuja käyttörajoituksia ja vältä liian tiheää käyttöä.",
  },
] as const;

const faq = [
  {
    q: "Kauanko ensimmäinen solariumkerta kestää?",
    a: "Ensimmäiseksi kerraksi suosittelemme lyhyttä aikaa. Käyttöaika on yleensä 5–20 minuuttia ihotyypistä riippuen – solariumissa on ajastin.",
  },
  {
    q: "Tarvitsenko omat suojalasit?",
    a: "Käytä aina asianmukaisia suojalaseja. Kysy paikan päältä, miten suojalasit hoidetaan käytössä.",
  },
  {
    q: "Miten solariumkortti toimii?",
    a: "Solarium toimii magneettikortilla tai ajanvarauksella. Kysy korttia ja hintoja meiltä.",
  },
  {
    q: "Kuinka usein solariumia voi käyttää?",
    a: "Vuoden aikana 20–25 kertaa, korkeintaan 275 minuuttia. Ensimmäisen kerran jälkeen voit tulla uudelleen noin 2 vuorokauden kuluttua.",
  },
  {
    q: "Voiko alle 18-vuotias käyttää solariumia?",
    a: "Ei. Käyttäjän tulee olla täyttänyt 18 vuotta.",
  },
] as const;

export default async function SolariumPage() {
  const prices = await getPrices();
  const chairSolarium = prices.extras.find((item) =>
    /solarium/i.test(item.title),
  );
  const chairMassage = prices.extras.find((item) =>
    /hierontatuoli/i.test(item.title),
  );

  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[54vh] overflow-hidden bg-ink text-white md:min-h-[62vh]"
        contentClassName="container-page relative flex min-h-[54vh] flex-col justify-end pb-10 pt-28 md:min-h-[62vh] md:pb-14"
        image={
          <Image
            src="/images/hero-solarium.jpg"
            alt="Solarium Kuntokeskus Loistossa Hollolassa"
            fill
            priority
            quality={92}
            className="object-cover object-[center_45%]"
            sizes="100vw"
          />
        }
        veilClassName="hero-veil-strong"
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">
            Solarium / hierontatuoli · Hollola
          </p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.05rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
            Solarium / hierontatuoli{" "}
            <span className="text-accent-bright">Hollolassa</span>
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Helppo tapa ylläpitää rusketusta ympäri vuoden. Tutustu turvalliseen
            käyttöön ennen ensimmäistä kertaa.
          </p>
        </HeroLine>
        <HeroLine>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionAnchor href={site.phoneHref} className="btn-accent">
              Kysy solariumkorttia
            </MotionAnchor>
            <MotionLink href="#turvallisuus" className="btn-ghost">
              Turvallisuusohjeet
            </MotionLink>
          </div>
        </HeroLine>
      </HeroMotion>

      <section className="section-pad">
        <div className="container-page grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal>
            <p className="eyebrow text-accent">Solarium</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Solarium ympäri vuoden
            </h2>
            <ul className="mt-6 space-y-3">
              {yearRound.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-lg leading-relaxed text-ink-soft"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-xl rounded-[1.25rem] border border-[var(--line)] bg-white/70 px-5 py-4 text-sm leading-relaxed text-ink-soft">
              Solariumin käyttöön liittyy UV-säteilyn terveysriskejä. Noudata
              aina laitteen käyttöohjeita ja annettuja käyttörajoituksia.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <HoverCard className="panel panel-pad h-full">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                Hinnat
              </p>
              <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                {chairSolarium?.title ?? "Solarium"}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                {chairSolarium?.text ?? "1 kerta 9 € · 10× 69 €"}
              </p>
              <p className="mt-4 text-sm text-muted">
                Magneettikortilla tai ajanvarauksella. Henkilökohtainen käyttö.
              </p>
              <MotionAnchor
                href={site.phoneHref}
                className="btn-primary mt-8 w-full text-center"
              >
                Kysy solariumkorttia
              </MotionAnchor>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-12">
          <Reveal>
            <p className="eyebrow text-accent">Aloitus</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Ensimmäinen kerta solariumissa?
            </h2>
            <p className="mt-4 text-lg text-ink-soft">Näin pääset helposti alkuun:</p>
            <ol className="mt-8 space-y-4">
              {firstVisit.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="font-display shrink-0 text-lg font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-ink-soft pt-0.5">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Laitteessa: makuulle, yläosa ala-asentoon, tarvittaessa vihreä
              nappi. Solarium sammuu automaattisesti ajan päättyessä; laite
              jäähtyy vielä noin 3 minuuttia. Puhdista makuualusta, tyyny ja
              suojalasit käytön jälkeen.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
              <Image
                src="/images/hero-solarium.jpg"
                alt="Solariumtila Kuntokeskus Loistossa"
                fill
                quality={90}
                className="object-cover object-[center_40%]"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="turvallisuus" className="section-pad scroll-mt-28">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Turvallisuus</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Turvallisuus ennen kaikkea
            </h2>
          </Reveal>
          <Stagger
            className="mt-10 grid gap-4 sm:grid-cols-2"
            delay={0.04}
          >
            {safety.map((item) => (
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
              Käyttö vuodessa: 20–25 kertaa, korkeintaan 275 minuuttia. Jos olit
              ensimmäistä kertaa, tervetuloa uudelleen noin 2 vuorokauden
              kuluttua.
            </p>
          </Reveal>
        </div>
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
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid items-center gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
          <Reveal>
            <p className="eyebrow text-accent">Hierontatuoli</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Hierontatuoli kuntokeskuksessa
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
              {chairMassage?.text ??
                chairSolarium?.text ??
                "Hierontatuoli kuntokeskuksessa."}{" "}
              Kysy käyttöä paikan päällä.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.35rem] bg-white">
              <Image
                src="/images/hierontatuoli.jpg"
                alt="Hierontatuoli Kuntokeskus Loistossa"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA
        title="Haluatko aloittaa?"
        text="Kysy solariumkortista, hierontatuolista tai varmista käyttöön liittyvät ohjeet. Autamme sinut alkuun."
        primaryLabel={`Soita ${site.phone}`}
        phoneSecondaryLabel="Kysy solariumkorttia"
      />
    </>
  );
}
