import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { Reveal } from "@/components/Reveal";
import { getPrices } from "@/lib/prices";
import { services, site, whyLoisto } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kuntosali Hollola | Kuntokeskus Loisto",
  description:
    "Kuntokeskus Loisto tarjoaa kuntosalin, ryhmäliikuntaa, Aerial Bungeeta, Cross Trainingia ja Personal Trainingia Hollolassa. Avainkortilla sali klo 04–24. Ei liittymismaksuja.",
  alternates: { canonical: "/koti" },
};

const featured = services.slice(0, 4);

export default async function HomePage() {
  const prices = await getPrices();

  return (
    <>
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-white">
        <Image
          src="/images/hero-gym.jpg"
          alt="Kuntosaliharjoittelua Kuntokeskus Loistossa Hollolassa"
          fill
          priority
          className="animate-drift object-cover object-center"
          sizes="100vw"
        />
        <div className="hero-veil absolute inset-0" />
        <div className="grain absolute inset-0" />
        <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-14 pt-32 md:pb-20">
          <p className="eyebrow animate-rise text-accent-bright">
            Hollola · vuodesta {site.founded}
          </p>
          <h1 className="animate-rise-delay-1 font-display mt-5 max-w-5xl text-[clamp(3.4rem,11vw,7.5rem)] font-semibold leading-[0.9] tracking-tight">
            Kuntokeskus
            <br />
            <span className="text-accent-bright">Loisto</span>
          </h1>
          <p className="animate-rise-delay-2 mt-5 max-w-xl text-lg font-medium text-white/90 md:text-xl">
            Kuntosali, ryhmäliikunta ja personal training Hollolassa
          </p>
          <p className="animate-rise-delay-2 mt-3 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
            Treenaa omalla tavalla – salilla, ryhmässä tai valmentajan kanssa.
          </p>
          <p className="animate-rise-delay-2 mt-5 text-sm font-semibold tracking-wide text-accent-bright md:text-base">
            Alk. {prices.headline.highlightKuntosali} · Ei liittymismaksua ·
            Avainkortilla {site.keycardHours}
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <Link href="/hinnat" className="btn-accent">
              Katso hinnat
            </Link>
            <a href={site.phoneHref} className="btn-ghost">
              Aloita treenaaminen
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-white">
        <div className="container-page grid gap-5 py-7 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[var(--line)] md:py-8">
          {[
            "Edenred · E-passi · Smartum",
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

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Palvelut</p>
            <h2 className="font-display mt-3 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
              Treenaa juuri sinulle sopivalla tavalla
            </h2>
          </Reveal>

          <div className="mt-10 border-t border-[var(--line)]">
            {featured.map((service, i) => (
              <Reveal key={service.href} delay={i * 0.04}>
                <Link href={service.href} className="service-row group">
                  <span className="service-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-muted leading-relaxed">
                      {service.text}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-accent transition group-hover:translate-x-1">
                    Avaa →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

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

      <section className="border-y border-[var(--line)] bg-white section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent">Miksi Loisto?</p>
            <h2 className="font-display mt-3 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
              Miksi juuri Loistoon?
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {whyLoisto.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <p className="font-display text-sm font-bold tracking-[0.16em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-muted leading-relaxed">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[70vh] overflow-hidden bg-ink text-white md:min-h-[75vh]">
        <Image
          src="/images/group-fitness.jpg"
          alt="Ryhmäliikuntaa Kuntokeskus Loistossa"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="hero-veil absolute inset-0" />
        <div className="container-page relative flex min-h-[70vh] flex-col justify-end pb-14 pt-28 md:min-h-[75vh] md:pb-20">
          <Reveal>
            <p className="eyebrow text-accent-bright">Ryhmäliikunta</p>
            <h2 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              16 tuntia viikossa
            </h2>
            <p className="mt-4 max-w-lg text-white/75 leading-relaxed">
              Aerial Bungee, Kangoo, jooga, Cross Training ja tutut jumpat.
              Varaa edellisenä iltana klo 20 mennessä.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ryhmaliikunta" className="btn-accent">
                Viikko-ohjelma
              </Link>
              <Link href="/ryhmaliikunta/kesa" className="btn-ghost">
                Kesäohjelma
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-end">
          <Reveal>
            <p className="eyebrow text-accent">Hinnat & tarjoukset</p>
            <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Kuntosali alk.{" "}
              <span className="text-accent">{prices.headline.highlightKuntosali}</span>
            </h2>
            <p className="mt-4 max-w-md text-muted leading-relaxed">
              Ei liittymismaksuja. Fitness sisältää salin, jumpata, Aerial
              Bungeen ja Cross Trainingin.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tarjoukset" className="btn-accent">
                Katso tarjoukset
              </Link>
              <Link
                href="/hinnat"
                className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-mist"
              >
                Hinnasto
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-3 sm:grid-cols-3">
              {prices.homeHighlights.map((card) => (
                <div key={card.title} className="price-tile">
                  <p className="text-sm text-muted">{card.title}</p>
                  <p className="font-display mt-3 text-3xl font-semibold tracking-tight">
                    {card.price}
                  </p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                    {card.note}
                  </p>
                </div>
              ))}
            </div>
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
