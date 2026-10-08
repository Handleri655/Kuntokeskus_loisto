import type { Metadata } from "next";
import Image from "next/image";
import { ContactCTA } from "@/components/ContactCTA";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";
import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor } from "@/components/MotionPress";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { getPrices } from "@/lib/prices";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Äänimaljarentoutus Hollola",
  description:
    "Äänimaljarentoutus Kuntokeskus Loistossa Hollolassa – tiistaisin klo 17.30–18.30 (joka toinen tiistai).",
  alternates: { canonical: "/aanimaljarentoutus" },
};

export const dynamic = "force-dynamic";

const expectations = [
  "Rauhallinen hetki pois arjen kiireestä",
  "Kehon ja mielen rentoutumista",
  "Rauhallisia ääniä ja värähtelyjä",
  "Mahdollisuus pysähtyä ja hengähtää",
  "Lempeämpi olo rentoutuksen jälkeen",
] as const;

const steps = [
  {
    number: "01",
    title: "Lämmin vaatetus päälle",
    text: "Saavu ja asetu mukavasti – ota mukaan alusta, huopa ja tyyny. Pukeudu lämpimästi.",
  },
  {
    number: "02",
    title: "Äänimaljojen rauhalliset äänet alkavat",
    text: "Tunti sisältää äänimaljoja sekä mm. tingshaa, rumpua, sadekeppiä, gongia ja koshia.",
  },
  {
    number: "03",
    title: "Rentoudu ja anna hetken viedä",
    text: "Noin 60 minuuttia rauhallista äänirentoutusta – ei tarvitse osata mitään.",
  },
  {
    number: "04",
    title: "Palaa rauhassa arkeen",
    text: "Nouse hitaasti. Juominen rentoutuksen jälkeen on hyvä idea.",
  },
] as const;

export default async function AanimaljarentoutusPage() {
  const { servicePrices } = await getPrices();

  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[54vh] overflow-hidden bg-ink text-white md:min-h-[62vh]"
        contentClassName="container-page relative flex min-h-[54vh] flex-col justify-end pb-10 pt-28 md:min-h-[62vh] md:pb-14"
        image={
          <Image
            src="/images/aanimalja-01.jpg"
            alt="Äänimaljoja ja soittimia äänimaljarentoutuksessa"
            fill
            priority
            className="object-cover object-[center_40%]"
            sizes="100vw"
          />
        }
        veilClassName="hero-veil-strong"
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">
            Äänimaljarentoutus · Hollola
          </p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2rem,4.8vw,3.3rem)] font-semibold leading-[1.05] tracking-tight">
            Lempeää hyvinvointia{" "}
            <span className="text-accent-bright">äänien maailmassa</span>
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Rauhallinen rentoutushetki äänimaljojen äärellä. Sopii, kun kaipaat
            pysähtymistä ja irtiottoa arjesta.
          </p>
        </HeroLine>
        <HeroLine>
          <p className="mt-4 text-sm font-semibold tracking-wide text-accent-bright md:text-base">
            Tiistaisin klo 17.30–18.30 · Jäsen{" "}
            {servicePrices.aanimaljaMember} · Ei-jäsen{" "}
            {servicePrices.aanimaljaGuest}
          </p>
        </HeroLine>
        <HeroLine>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionAnchor href={site.phoneHref} className="btn-accent">
              Varaa äänimaljarentoutus
            </MotionAnchor>
            <MotionAnchor href="#kaytanto" className="btn-ghost">
              Käytännön tiedot
            </MotionAnchor>
          </div>
        </HeroLine>
      </HeroMotion>

      <section className="section-pad">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="eyebrow text-accent">Rentoutus</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Mitä äänimaljarentoutus on?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Äänimaljarentoutus perustuu rauhallisiin ääniin ja värähtelyyn.
              Se voi auttaa rauhoittumaan, hiljentämään mieltä ja pysähtymään
              arjen keskellä.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Monet kokevat hoidon jälkeen olonsa levollisemmaksi. Emme lupaa
              lääketieteellisiä vaikutuksia – kyseessä on rentouttava
              hyvinvointituokio.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-page">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem] sm:col-span-2">
              <Image
                src="/images/aanimalja-01.jpg"
                alt="Äänimaljoja, gongi ja rumpu rentoutustunnilla"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] lg:aspect-auto lg:min-h-full">
              <Image
                src="/images/aanimalja-03.jpg"
                alt="Ohjaaja äänimaljojen ja soittimien äärellä"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
              <Image
                src="/images/aanimalja-02.jpg"
                alt="Ohjaaja soittaa gongia äänimaljarentoutuksessa"
                fill
                className="object-cover object-[center_30%]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] sm:col-span-2">
              <Image
                src="/images/aanimalja-04.jpg"
                alt="Gongi ja äänimaljat äänimaljarentoutuksessa"
                fill
                className="object-cover object-[center_25%]"
                sizes="(max-width: 640px) 100vw, 66vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Kokemus</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Mitä voit odottaa?
            </h2>
          </Reveal>
          <Stagger
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            delay={0.04}
          >
            {expectations.map((item) => (
              <StaggerItem key={item} hover>
                <HoverCard className="panel panel-pad h-full">
                  <p className="leading-relaxed text-ink-soft">{item}</p>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Kulku</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Miten tunti etenee?
            </h2>
          </Reveal>
          <Stagger
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            delay={0.04}
          >
            {steps.map((step) => (
              <StaggerItem key={step.number} hover>
                <HoverCard className="panel panel-pad h-full">
                  <p className="font-display text-sm font-bold tracking-[0.16em] text-accent">
                    {step.number}
                  </p>
                  <h3 className="font-display mt-3 text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {step.text}
                  </p>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal>
            <p className="eyebrow text-accent">Kenelle</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Kenelle äänimaljarentoutus sopii?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Sopii esimerkiksi sinulle, joka kaipaat rauhallista hetkeä,
              palautumista ja irtiottoa arjen kiireestä. Tunti on lempeä – ei
              tarvitse aiempaa kokemusta.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Sopii perusterveille. Ei suositella raskauden ensimmäisen
              kolmanneksen aikana tai syöpää sairastaville. Jos sinulla on
              vakavia mielenterveyshaasteita kuten psykoositaipumusta tai
              skitsofreniaa, tämä ei välttämättä ole sinulle.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
              <Image
                src="/images/yoga.jpg"
                alt="Rauhallinen rentoutuminen"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="kaytanto" className="section-pad scroll-mt-28">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Käytäntö</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Käytännön tiedot
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <HoverCard className="panel panel-dark panel-pad h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-bright">
                  Aika & hinta
                </p>
                <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                  Tiistaisin klo 17.30–18.30
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  Joka toinen tiistai
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-white/55">Jäsen</p>
                    <p className="font-display mt-1 text-4xl font-semibold tracking-tight">
                      {servicePrices.aanimaljaMember}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/55">Ei-jäsen</p>
                    <p className="font-display mt-1 text-4xl font-semibold tracking-tight">
                      {servicePrices.aanimaljaGuest}
                    </p>
                  </div>
                </div>
              </HoverCard>
            </Reveal>

            <Reveal delay={0.05}>
              <HoverCard className="panel panel-pad h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Mukaan & ilmoittautuminen
                </p>
                <ul className="mt-5 space-y-4 text-ink-soft">
                  <li>
                    <strong className="text-ink">Mukaan:</strong> alusta, huopa
                    ja tyyny.
                  </li>
                  <li>
                    <strong className="text-ink">Kesto:</strong> noin 60 minuuttia.
                  </li>
                  <li>
                    <strong className="text-ink">Paikka:</strong> {site.address}
                  </li>
                  <li>
                    <strong className="text-ink">Ilmoittautuminen:</strong> soita
                    tai lähetä sähköposti – kysy vapaita paikkoja.
                  </li>
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <MotionAnchor href={site.phoneHref} className="btn-primary">
                    Soita {site.phone}
                  </MotionAnchor>
                  <MotionAnchor
                    href={site.emailHref}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-ink transition hover:bg-mist"
                  >
                    Lähetä sähköposti
                  </MotionAnchor>
                </div>
              </HoverCard>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactCTA
        title="Anna itsellesi tunti rauhaa"
        text={`Äänimaljarentoutus tiistaisin klo 17.30–18.30 (joka toinen tiistai). Jäsenille ${servicePrices.aanimaljaMember} · Ei-jäsenille ${servicePrices.aanimaljaGuest}.`}
        primaryLabel="Varaa paikkasi"
        showMessageOptions
      />
    </>
  );
}
