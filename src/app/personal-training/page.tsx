import type { Metadata } from "next";
import Image from "next/image";
import { ContactCTA } from "@/components/ContactCTA";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";
import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor, MotionLink } from "@/components/MotionPress";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { getGymProgramPrices, getPrices } from "@/lib/prices";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Personal Training Hollola",
  description:
    "Personal Training, kuntotestaus ja yksilölliset ohjelmat Kuntokeskus Loistossa – valmentajana Jari Kotkansalo. Varaa PT-tapaaminen.",
  alternates: { canonical: "/personal-training" },
};

export const dynamic = "force-dynamic";

const benefits = [
  {
    title: "Tavoitteellinen harjoittelu",
    text: "Suunnitelma, joka etenee tavoitteidesi mukaan.",
  },
  {
    title: "Oikea tekniikka",
    text: "Opit tekemään liikkeet turvallisesti ja tehokkaasti.",
  },
  {
    title: "Lihasmassan kasvatus",
    text: "Kehitä voimaa ja rakenna lihasmassaa suunnitelmallisesti.",
  },
  {
    title: "Painonpudotus",
    text: "Selkeä harjoittelu ja arjen ohjaus tavoitteesi tueksi.",
  },
  {
    title: "Kestävyys ja kunto",
    text: "Paranna kuntoa ja jaksamista monipuolisella harjoittelulla.",
  },
  {
    title: "Henkilökohtainen tuki",
    text: "Et joudu miettimään kaikkea yksin.",
  },
] as const;

export default async function PersonalTrainingPage() {
  const { personalTraining: pt } = await getPrices();
  const program = getGymProgramPrices(pt);

  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[54vh] overflow-hidden bg-ink text-white md:min-h-[62vh]"
        contentClassName="container-page relative flex min-h-[54vh] flex-col justify-end pb-10 pt-28 md:min-h-[62vh] md:pb-14"
        image={
          <Image
            src="/images/jari-pt.jpg"
            alt="Personal trainer Jari Kotkansalo Kuntokeskus Loistossa"
            fill
            priority
            quality={90}
            className="object-cover object-[center_18%]"
            sizes="100vw"
          />
        }
        veilClassName="hero-veil-strong"
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">
            Personal Training · Hollola
          </p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.05rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
            Valmentajasi{" "}
            <span className="text-accent-bright">Jari</span>
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-3 text-sm font-semibold tracking-wide text-white/75 md:text-base">
            Työfysioterapeutti · Kuntohoitaja · Personal trainer
          </p>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Yksilöllistä valmennusta työfysioterapeutilta, kuntohoitajalta ja
            personal trainerilta – tavoitteellisesti ja toimivasti.
          </p>
        </HeroLine>
        <HeroLine>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionAnchor href={site.phoneHref} className="btn-accent">
              Varaa PT-tapaaminen
            </MotionAnchor>
            <MotionAnchor href={site.phoneHref} className="btn-ghost">
              Soita {site.phone}
            </MotionAnchor>
          </div>
        </HeroLine>
      </HeroMotion>

      <section className="section-pad">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.35rem]">
              <Image
                src="/images/jari-pt.jpg"
                alt="Jari Kotkansalo – personal trainer Kuntokeskus Loistossa"
                fill
                quality={90}
                className="object-cover object-[center_15%]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="eyebrow text-accent">Valmentaja</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Jari Kotkansalo
            </h2>
            <p className="mt-3 text-sm font-semibold tracking-wide text-ink-soft">
              Työfysioterapeutti · Kuntohoitaja · Personal trainer
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Selvitetään lähtötilanteesi ja tehdään harjoittelusta
              tavoitteellista. Aloita kuntotestillä – sen pohjalta laaditaan
              henkilökohtainen harjoitteluohjelma.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
              Testiin voi kuulua esimerkiksi aerobisen kunnon testaus
              (step-askellus), lihaskuntotestit, liikkuvuustesti ja
              kehonkoostumusmittaus.
            </p>
            <HoverCard className="panel panel-pad mt-8 max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                Hinnat
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3">
                  <div>
                    <p className="font-display text-lg font-semibold tracking-tight">
                      Kuntotesti
                    </p>
                    <p className="mt-0.5 text-sm text-muted">
                      Suunnitellaan tavoitteidesi mukaan
                    </p>
                  </div>
                  <p className="font-display shrink-0 text-2xl font-semibold tracking-tight">
                    {program.kuntotesti}
                  </p>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-lg font-semibold tracking-tight">
                      Kehonkoostumus
                    </p>
                    <p className="mt-0.5 text-sm text-muted">Mittaus erikseen</p>
                  </div>
                  <p className="font-display shrink-0 text-2xl font-semibold tracking-tight">
                    {program.kehonkoostumus}
                  </p>
                </div>
              </div>
              <MotionAnchor
                href={site.phoneHref}
                className="btn-primary mt-6 w-full text-center"
              >
                Varaa PT-tapaaminen
              </MotionAnchor>
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <section
        id="hinnasto"
        className="section-pad section-band border-y border-[var(--line)] scroll-mt-28"
      >
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Hinnasto</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              PT-valmennuksen hinnasto
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
              Hinnat päivittyvät hallinnasta. ≤10× voimassa 6 kk · yli 10×
              voimassa 12 kk.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <Reveal>
              <HoverCard className="panel panel-pad h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Ohjelmat
                </p>
                <h3 className="font-display mt-3 text-xl font-semibold tracking-tight">
                  Kuntosali- / harjoitteluohjelma
                </h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-baseline justify-between gap-3 border-b border-[var(--line)] pb-3">
                    <span className="text-ink-soft">1 päivän jako</span>
                    <span className="font-display text-2xl font-semibold tracking-tight">
                      {pt.ohjelma1}
                    </span>
                  </li>
                  <li className="flex items-baseline justify-between gap-3 border-b border-[var(--line)] pb-3">
                    <span className="text-ink-soft">2 päivän jako</span>
                    <span className="font-display text-2xl font-semibold tracking-tight">
                      {pt.ohjelma2}
                    </span>
                  </li>
                  <li className="flex items-baseline justify-between gap-3">
                    <span className="text-ink-soft">3 päivän jako</span>
                    <span className="font-display text-2xl font-semibold tracking-tight">
                      {pt.ohjelma3}
                    </span>
                  </li>
                </ul>
              </HoverCard>
            </Reveal>

            <Reveal delay={0.05}>
              <HoverCard className="panel panel-pad h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Ruokavalio
                </p>
                <h3 className="font-display mt-3 text-xl font-semibold tracking-tight">
                  Ruokavalio-ohjelma
                </h3>
                <p className="mt-6 font-display text-4xl font-semibold tracking-tight">
                  {pt.ruokavalio}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Yksilöllisen ravinto-ohjelman laadinta asiakkaan tavoitteiden
                  pohjalta. Sisältää laadinnan ja ohjausajan.
                </p>
              </HoverCard>
            </Reveal>

            <Reveal delay={0.1}>
              <HoverCard className="panel panel-dark panel-pad h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-bright">
                  PT-tapaamiset
                </p>
                <h3 className="font-display mt-3 text-xl font-semibold tracking-tight">
                  55 min / kerta
                </h3>
                <ul className="mt-6 space-y-4 text-white/85">
                  <li className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-3">
                    <span>2×</span>
                    <span className="font-display text-2xl font-semibold text-white tracking-tight">
                      {pt.pt2}
                    </span>
                  </li>
                  <li className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-3">
                    <span>5×</span>
                    <span className="font-display text-2xl font-semibold text-white tracking-tight">
                      {pt.pt5}
                    </span>
                  </li>
                  <li className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-3">
                    <span>10×</span>
                    <span className="text-right">
                      <span className="block font-display text-2xl font-semibold text-white tracking-tight">
                        nyt {pt.pt10Offer}
                      </span>
                      <span className="text-sm text-white/45 line-through">
                        {pt.pt10}
                      </span>
                    </span>
                  </li>
                  <li className="flex items-baseline justify-between gap-3">
                    <span>15×</span>
                    <span className="text-right">
                      <span className="block font-display text-2xl font-semibold text-white tracking-tight">
                        nyt {pt.pt15Offer}
                      </span>
                      <span className="text-sm text-white/45 line-through">
                        {pt.pt15}
                      </span>
                    </span>
                  </li>
                </ul>
              </HoverCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Hyödyt</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Mitä saat PT-valmennuksesta?
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

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Palvelut</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Valitse sinulle sopiva kokonaisuus
            </h2>
          </Reveal>

          <Stagger className="mt-10 grid gap-5 md:grid-cols-3" delay={0.05}>
            <StaggerItem hover>
              <HoverCard className="panel panel-pad flex h-full flex-col">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  Harjoitteluohjelma
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-soft">
                  Yksilöllinen kuntosali- tai harjoitteluohjelma 1–3 päivän
                  jaolla.
                </p>
                <p className="font-display mt-5 text-2xl font-semibold tracking-tight">
                  alk. {pt.ohjelma1}
                </p>
                <MotionAnchor
                  href={site.phoneHref}
                  className="mt-6 inline-flex text-sm font-semibold text-accent"
                >
                  Kysy ohjelmasta →
                </MotionAnchor>
              </HoverCard>
            </StaggerItem>

            <StaggerItem hover>
              <HoverCard className="panel panel-pad flex h-full flex-col">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  Ruokavalio
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-soft">
                  Yksilöllisen ravinto-ohjelman laadinta asiakkaan tavoitteiden
                  pohjalta.
                </p>
                <p className="font-display mt-5 text-2xl font-semibold tracking-tight">
                  {pt.ruokavalio}
                </p>
                <MotionAnchor
                  href={site.phoneHref}
                  className="mt-6 inline-flex text-sm font-semibold text-accent"
                >
                  Kysy ruokavaliosta →
                </MotionAnchor>
              </HoverCard>
            </StaggerItem>

            <StaggerItem hover>
              <HoverCard className="panel panel-pad flex h-full flex-col">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  Painonpudotus
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-soft">
                  Kunnonkohotus- ja intensiivipaketit – katso sisällöt ja
                  tarjoushinnat omalta sivulta.
                </p>
                <p className="font-display mt-5 text-2xl font-semibold tracking-tight">
                  PT 10× nyt {pt.pt10Offer}
                </p>
                <MotionLink
                  href="/painonpudotus"
                  className="mt-6 inline-flex text-sm font-semibold text-accent"
                >
                  Avaa painonpudotus →
                </MotionLink>
              </HoverCard>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <ContactCTA
        title="Otetaan seuraava askel yhdessä."
        text="Tekstaa, soita tai lähetä sähköposti – mietitään yhdessä sopiva valmennus."
        primaryLabel="Varaa PT-tapaaminen"
        showMessageOptions
      />
    </>
  );
}
