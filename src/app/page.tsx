import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";
import { HoverLink } from "@/components/HoverLink";
import { MotionAnchor, MotionLink } from "@/components/MotionPress";
import { HoverCard } from "@/components/HoverCard";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { gymActionPhotos } from "@/lib/gym-photos";
import { getPrices } from "@/lib/prices";
import { googleReviews, services, site, whyLoisto } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kuntosali Hollola | Kuntokeskus Loisto",
  description:
    "Kuntokeskus Loisto tarjoaa kuntosalin, ryhmäliikuntaa, Aerial Bungeeta, Cross Trainingia ja Personal Trainingia Hollolassa. Avainkortilla sali klo 04–24. Ei liittymismaksuja.",
  alternates: { canonical: "/" },
};

const featured = services.slice(0, 4);
const [featuredReview, ...otherReviews] = googleReviews;

export default async function HomePage() {
  const prices = await getPrices();

  return (
    <>
      <HeroMotion
        className="relative isolate min-h-[88svh] overflow-hidden bg-ink text-white"
        contentClassName="container-page relative flex min-h-[88svh] flex-col justify-end pb-12 pt-32 md:pb-16"
        image={
          <Image
            src="/images/hero-gym.jpg"
            alt="Kuntosaliharjoittelua Kuntokeskus Loistossa Hollolassa"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
        }
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">
            Hollola · vuodesta {site.founded}
          </p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.6rem,8vw,5rem)] font-semibold leading-[1.02] tracking-tight">
            Kuntokeskus
            <br />
            <span className="text-accent-bright">Loisto</span>
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-lg font-medium text-white/90 md:text-xl">
            Kuntosali, ryhmäliikunta ja personal training Hollolassa
          </p>
        </HeroLine>
        <HeroLine>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
            Treenaa omalla tavalla – kuntosalilla, ryhmässä tai valmentajan kanssa.
          </p>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 text-sm font-semibold tracking-wide text-accent-bright md:text-base">
            Alk. {prices.headline.highlightKuntosali} · Ei liittymismaksua ·
            Avainkortilla {site.keycardHours}
          </p>
        </HeroLine>
        <HeroLine>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionLink href="/hinnat" className="btn-accent">
              Katso hinnat
            </MotionLink>
            <MotionAnchor href={site.phoneHref} className="btn-ghost">
              Aloita treenaaminen
            </MotionAnchor>
          </div>
        </HeroLine>
      </HeroMotion>

      <section className="border-b border-[var(--line)] bg-[var(--white)]/85 backdrop-blur-sm">
        <div className="container-page grid gap-5 py-7 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[var(--line)] md:py-9">
          {[
            "Edenred · E-passi",
            `Avainkortilla ${site.keycardHours}`,
            "Ei liittymismaksuja",
          ].map((label) => (
            <div key={label} className="md:px-8">
              <p className="font-display text-lg font-semibold tracking-tight md:text-xl">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad pb-0">
        <div className="container-page">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {gymActionPhotos.map((photo) => (
              <Link
                key={photo.src}
                href="/kuntosali#laitteet"
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Palvelut</p>
            <h2 className="font-display mt-2 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.15rem]">
              Valmennusta ja palautumista
            </h2>
          </Reveal>

          <Stagger className="mt-8 border-t border-[var(--line)]">
            {featured.map((service) => (
              <StaggerItem key={service.href}>
                <HoverLink href={service.href} className="service-row group">
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-muted leading-relaxed">
                      {service.text}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-accent transition group-hover:translate-x-1">
                    Avaa →
                  </span>
                </HoverLink>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <Link
              href="/ryhmaliikunta"
              className="mt-8 inline-flex text-sm font-semibold text-ink underline decoration-[var(--line)] underline-offset-4 transition hover:decoration-accent"
            >
              Katso koko ryhmäliikuntaohjelma
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-pad section-band border-y border-[var(--line)]">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Miksi Loisto?</p>
            <h2 className="font-display mt-2 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.15rem]">
              Miksi juuri Loistoon?
            </h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-4 md:grid-cols-3" delay={0.05}>
            {whyLoisto.map((item) => (
              <StaggerItem key={item.title} hover>
                <HoverCard className="panel panel-pad h-full">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-muted leading-relaxed">{item.text}</p>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Google-arvostelut</p>
            <h2 className="font-display mt-2 max-w-2xl text-3xl font-semibold tracking-tight md:text-[2.15rem]">
              Mitä asiakkaat sanovat
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <HoverCard className="quote-featured h-full pl-6 md:pl-8">
                <p
                  className="font-display text-accent-bright"
                  aria-hidden="true"
                >
                  ★★★★★
                </p>
                <p className="font-display mt-4 text-xl leading-snug tracking-tight md:text-2xl">
                  “{featuredReview.text}”
                </p>
                <p className="mt-6 text-sm text-white/45">Google-arvostelu</p>
              </HoverCard>
            </Reveal>

            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" delay={0.06}>
              {otherReviews.slice(0, 4).map((review) => (
                <StaggerItem key={review.text} hover>
                  <HoverCard className="panel panel-pad h-full">
                    <p
                      className="text-sm tracking-tight text-accent"
                      aria-hidden="true"
                    >
                      ★★★★★
                    </p>
                    <p className="mt-3 text-ink-soft leading-relaxed">
                      “{review.text}”
                    </p>
                  </HoverCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal>
            <div className="mt-8">
              <MotionAnchor
                href={site.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white/70 px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
              >
                Lue lisää Googlella →
              </MotionAnchor>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative min-h-[48vh] overflow-hidden bg-ink text-white md:min-h-[54vh]">
        <Image
          src="/images/lavis.jpg"
          alt="Lavis-lavatanssijumppa Kuntokeskus Loistossa"
          fill
          quality={90}
          className="object-cover object-[center_40%]"
          sizes="100vw"
        />
        <div className="hero-veil-strong absolute inset-0" />
        <div className="container-page relative flex min-h-[48vh] flex-col justify-end pb-10 pt-24 md:min-h-[54vh] md:pb-14">
          <Reveal>
            <p className="eyebrow text-accent-bright drop-shadow-sm">
              Ryhmäliikunta
            </p>
            <h2 className="font-display mt-2 max-w-3xl text-3xl font-semibold tracking-tight drop-shadow-md md:text-4xl">
              16 tuntia viikossa
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-white drop-shadow-sm">
              Aerial Bungee, Kangoo, jooga, Cross Training ja tutut jumpat.
              Varaa edellisenä iltana klo 20 mennessä.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MotionLink href="/ryhmaliikunta" className="btn-accent">
                Viikko-ohjelma
              </MotionLink>
              <MotionLink href="/ryhmaliikunta/kesa" className="btn-ghost">
                Kesäohjelma
              </MotionLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad section-band">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-end">
          <Reveal>
            <p className="eyebrow text-accent">Hinnat & tarjoukset</p>
            <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight md:text-[2.15rem]">
              Kuntosali alk.{" "}
              <span className="text-accent">{prices.headline.highlightKuntosali}</span>
            </h2>
            <p className="mt-4 max-w-md text-muted leading-relaxed">
              Ei liittymismaksuja. Fitness sisältää salin, jumpat, Aerial
              Bungeen ja Cross Trainingin.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MotionLink href="/tarjoukset" className="btn-accent">
                Katso tarjoukset
              </MotionLink>
              <MotionLink
                href="/hinnat"
                className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white/80 px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
              >
                Hinnasto
              </MotionLink>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Stagger className="grid gap-3 sm:grid-cols-3">
              {prices.homeHighlights.map((card) => (
                <StaggerItem key={card.title} hover>
                  <HoverCard className="price-tile h-full">
                    <p className="relative z-[1] text-sm text-muted">{card.title}</p>
                    <p className="relative z-[1] font-display mt-3 text-3xl font-semibold tracking-tight">
                      {card.price}
                    </p>
                    <p className="relative z-[1] mt-2 text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                      {card.note}
                    </p>
                  </HoverCard>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </section>

      <ContactCTA
        title="Tule tutustumaan"
        text="Soita tai poikkea Keskuskatu 4:ään Hollolassa. Autamme alkuun – ilman liittymismaksua."
      />
    </>
  );
}
