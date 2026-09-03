import type { Metadata } from "next";
import Image from "next/image";
import { ContactCTA } from "@/components/ContactCTA";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";
import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor } from "@/components/MotionPress";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Äänimaljarentoutus Hollola",
  description:
    "Äänimaljarentoutus Kuntokeskus Loistossa Hollolassa – perjantaisin klo 18–19. Jäsen 14 €, ei-jäsen 19 €. Varaa paikkasi.",
  alternates: { canonical: "/aanimaljarentoutus" },
};

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
    title: "Saavu ja asetu mukavasti",
    text: "Makuulle alustalle tai istumaan – ota mukaan alusta, huopa ja tyyny.",
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

export default function AanimaljarentoutusPage() {
  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[78vh] overflow-hidden bg-ink text-white md:min-h-[85vh]"
        contentClassName="container-page relative flex min-h-[78vh] flex-col justify-end pb-12 pt-28 md:min-h-[85vh] md:pb-16"
        image={
          <Image
            src="/images/jooga.jpg"
            alt="Rauhallinen rentoutumistila äänimaljarentoutukseen"
            fill
            priority
            className="object-cover object-[center_40%]"
            sizes="100vw"
          />
        }
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">
            Äänimaljarentoutus · Hollola
          </p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.2rem,5.8vw,4.25rem)] font-semibold leading-[0.95] tracking-tight">
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
            Perjantaisin klo 18–19 · Jäsen 14 € · Ei-jäsen 19 €
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
                  Perjantaisin klo 18–19
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  Kuun viimeinen perjantai
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-white/55">Jäsen</p>
                    <p className="font-display mt-1 text-4xl font-semibold tracking-tight">
                      14 €
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/55">Ei-jäsen</p>
                    <p className="font-display mt-1 text-4xl font-semibold tracking-tight">
                      19 €
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
        text="Äänimaljarentoutus perjantaisin klo 18–19. Jäsenille 14 € · Ei-jäsenille 19 €."
        primaryLabel="Varaa paikkasi"
        secondaryLabel="Lähetä sähköposti"
        secondaryHref={site.emailHref}
      />
    </>
  );
}
