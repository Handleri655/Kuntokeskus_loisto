import Image from "next/image";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { Reveal } from "@/components/Reveal";
import { getPrices } from "@/lib/prices";
import { services, site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const prices = await getPrices();

  return (
    <>
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-white">
        <Image
          src="/images/hero-gym.jpg"
          alt="Kuntosaliharjoittelua Kuntokeskus Loistossa"
          fill
          priority
          className="animate-drift object-cover"
          sizes="100vw"
        />
        <div className="hero-veil absolute inset-0" />
        <div className="grain absolute inset-0" />
        <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-16 pt-36 md:pb-24">
          <p className="animate-rise text-xs font-semibold uppercase tracking-[0.24em] text-accent-bright">
            Hollola · vuodesta {site.founded}
          </p>
          <h1 className="animate-rise-delay-1 font-display mt-4 max-w-5xl text-[clamp(3.4rem,10vw,7.5rem)] font-semibold leading-[0.92] tracking-tight">
            Kuntokeskus
            <br />
            Loisto
          </h1>
          <p className="animate-rise-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
            Kuntosali, ryhmäliikunta ja hyvinvointi – hauskaa treeniä
            kaikenikäisille. Avainkortilla salille joka päivä klo{" "}
            {site.keycardHours}.
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <Link
              href="/ryhmaliikunta"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white/90"
            >
              Ryhmäliikunta 17.8. →
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Soita {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-white">
        <div className="container-page grid gap-6 py-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[var(--line)]">
          {[
            {
              label: "Edenred · E-passi · Smartum",
              text: "Liikunta & hyvinvointi",
            },
            {
              label: `Avainkortilla ${site.keycardHours}`,
              text: "Kuntosali joka päivä",
            },
            {
              label: "Ei liittymismaksuja",
              text: "Hollolan edullisimmat treenit",
            },
          ].map((item) => (
            <div key={item.label} className="md:px-8">
              <div className="font-display text-lg font-semibold tracking-tight">
                {item.label}
              </div>
              <p className="mt-1 text-sm text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Tsekkaa
            </p>
            <h2 className="font-display mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Treenejä, jotka tekevät mieli tehdä uudestaan
            </h2>
            <p className="mt-4 max-w-2xl text-muted leading-relaxed">
              Aerial Bungee, Cross Training, Kangoo, PT, äänimaljarentoutus ja
              paljon muuta – sama sisältö, uudet premium-sivut.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.href} delay={i * 0.05}>
                <Link href={service.href} className="service-tile group">
                  <div>
                    <div className="service-index">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                      {service.text}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-accent transition group-hover:translate-x-1">
                    Lue lisää →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/group-fitness.jpg"
            alt="Ryhmäliikuntaa"
            fill
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,14,18,0.92),rgba(12,14,18,0.55))]" />
        </div>
        <div className="container-page relative section-pad grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
              Ryhmäliikunta
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Uusi ohjelma 17.8.26 alkaen – 16 h / vko
            </h2>
            <p className="mt-4 max-w-xl text-white/75 leading-relaxed">
              Aerial Bungee, Kangoo Jumps, Hatha- & voima­jooga, Cross Training,
              äänimalja, Lavis, Pump Up, Step-RVP-HIIT ja paljon muuta.
              Kesäohjelma voimassa 16.8.26 asti.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/ryhmaliikunta"
                className="inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink"
              >
                Syksyn ohjelma
              </Link>
              <Link
                href="/ryhmaliikunta/kesa"
                className="inline-flex rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white"
              >
                Kesä 16.8. asti
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="panel panel-dark panel-pad backdrop-blur-md">
              <p className="text-sm text-white/60">Varaus & peruutus</p>
              <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
                Edellisenä iltana klo 20 mennessä
              </p>
              <p className="mt-4 text-white/75 leading-relaxed">
                Lähetä nimi & sähköposti tekstiviestillä numeroon {site.phone} –
                saat varauslinkin jumpille.
              </p>
              <p className="mt-6 text-sm text-white/55">
                Ohjaajat: Jari Kotkansalo, Ulla Paaso, Eija Liikonen
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:aspect-[5/4]">
              <Image
                src="/images/hierontatuoli.jpg"
                alt="Hierontatuoli Kuntokeskus Loistossa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Hierontatuoli & solarium
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Palautumista treenien rinnalle
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Uusi laadukas hierontatuoli ja solarium magneettikortilla /
              ajanvarauksella. Hyvinvointipalveluissa myös hieronta,
              kuivakuppaus, kuumakivihieronta, fysioterapia ja Footbalance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/solarium"
                className="inline-flex rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white"
              >
                Solarium
              </Link>
              <Link
                href="/hyvinvointi"
                className="inline-flex rounded-full border border-[var(--line)] px-6 py-3.5 text-sm font-semibold text-ink"
              >
                Hyvinvointi
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted">
              Superedulliset hoitosarjat + lisäetu 51–100 €{" "}
              <span className="text-ink">(lisäetu voimassa 10.8.26 asti)</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Tarjoukset
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Hollolan halvimmat treenit
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Tutustumistreenit, vuoden superetu alk.{" "}
              {prices.headline.highlightKuntosali}, PT-edut ja hoitosarjat.
              Fitness sisältää kuntosalin 4–24, jumpata, Aerial Bungee ja Cross
              Trainingin.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tarjoukset"
                className="inline-flex rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-bright"
              >
                Katso tarjoukset
              </Link>
              <Link
                href="/hinnat"
                className="inline-flex rounded-full border border-[var(--line)] px-6 py-3.5 text-sm font-semibold text-ink"
              >
                Koko hinnasto
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-3">
              {prices.homeHighlights.map((card) => (
                <div key={card.title} className="price-tile">
                  <p className="text-sm text-muted">{card.title}</p>
                  <p className="font-display mt-2 text-3xl font-semibold tracking-tight">
                    {card.price}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">
                    {card.note}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
