import type { Metadata } from "next";
import Image from "next/image";
import { ContactCTA } from "@/components/ContactCTA";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";
import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor, MotionLink } from "@/components/MotionPress";
import { FlyerLightbox } from "@/components/FlyerLightbox";
import { OfferBoard } from "@/components/OfferBoard";
import { Reveal } from "@/components/Reveal";
import { flyerSrc, getFlyer } from "@/lib/flyer";
import { membershipCellParts } from "@/lib/membership-price";
import { getPrices } from "@/lib/prices";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tarjoukset Hollola",
  description:
    "Tutustumistreenit, vuoden superetu, PT-edut ja hoitosarjat Kuntokeskus Loistossa Hollolassa. Kuntosali alk. 33 €/kk.",
  alternates: { canonical: "/tarjoukset" },
};

export const dynamic = "force-dynamic";

function trialWasPrices(
  rows: Awaited<ReturnType<typeof getPrices>>["membershipRows"],
): string[] {
  const month = rows.find((row) => /^1\s*kk$/i.test(row.product));
  if (!month) return [];
  return [
    membershipCellParts(month.kuntosali).regular,
    membershipCellParts(month.ryhmaliikunta).regular,
    membershipCellParts(month.fitness).regular,
  ];
}

export default async function TarjouksetPage() {
  const [prices, flyer] = await Promise.all([getPrices(), getFlyer()]);
  const { offers, personalTraining, membershipRows } = prices;
  const flyerImageSrc = flyerSrc(flyer);
  const ptDiscount = offers.ptText.match(/−\s*\d+\s*%/)?.[0]?.replace(/\s+/g, " ");

  const jumps = [
    { href: "#tutustuminen", label: offers.trialBadge },
    { href: "#vuosietu", label: "Vuoden etu" },
    {
      href: "#pt",
      label: ptDiscount
        ? `PT ${ptDiscount}`
        : `PT ${personalTraining.pt10Offer}`,
    },
    { href: "#aerial", label: "Aerial" },
    { href: "#hyvinvointi", label: "Hoidot" },
  ];

  return (
    <>
      <HeroMotion
        className="relative isolate overflow-hidden bg-ink text-white"
        contentClassName="container-page relative z-10 flex flex-col justify-end pb-10 pt-28 md:pb-12"
        image={
          <Image
            src="/images/hero-hinnat.jpg"
            alt="Treenitarjoukset Kuntokeskus Loistossa"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
        }
      >
        <HeroLine>
          <p className="eyebrow text-accent-bright">Tarjoukset · Hollola</p>
        </HeroLine>
        <HeroLine>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2rem,4.6vw,3.2rem)] font-semibold leading-[1.05] tracking-tight">
            Kaikki edut{" "}
            <span className="text-accent-bright">yhdellä silmäyksellä</span>
          </h1>
        </HeroLine>
        <HeroLine>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Alennus ja hinta ovat jokaisessa tarjouksessa isolla. Valitse etu
            ja hyppää suoraan siihen.
          </p>
        </HeroLine>
        <HeroLine>
          <div className="mt-7 flex flex-wrap gap-2">
            {jumps.map((item) => (
              <MotionAnchor
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-accent hover:border-accent"
              >
                {item.label}
              </MotionAnchor>
            ))}
          </div>
        </HeroLine>
      </HeroMotion>

      <OfferBoard
        offers={offers}
        pt={personalTraining}
        trialWas={trialWasPrices(membershipRows)}
      />

      <section
        id="lehti"
        className="border-y border-[var(--line)] bg-mist/40 py-10 md:py-14"
      >
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-accent">Tarjouslehti</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Sama etu myös printtinä
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
              Verkkosivun tarjoukset päivittyvät hallinnasta. Lehti on
              ajankohtainen kooste samoista eduista.
            </p>
            <p className="mt-4 text-sm text-muted">
              {site.address} · {site.phone}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <MotionLink href="/hinnat" className="btn-accent">
                Koko hinnasto
              </MotionLink>
              <MotionAnchor href={site.phoneHref} className="btn-primary">
                Soita {site.phone}
              </MotionAnchor>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <HoverCard className="panel overflow-hidden p-2">
              <FlyerLightbox
                src={flyerImageSrc}
                alt="Kuntokeskus Loiston tarjouslehti"
              />
            </HoverCard>
          </Reveal>
        </div>
      </section>

      <ContactCTA
        title="Löysitkö sopivan tarjouksen?"
        text="Varaa paikkasi tai kysy lisää – autamme mielellämme."
        primaryLabel={`Soita ${site.phone}`}
        secondaryLabel="Lähetä sähköposti"
        secondaryHref={site.emailHref}
      />
    </>
  );
}
