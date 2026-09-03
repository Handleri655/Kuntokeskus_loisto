import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { HoverCard } from "@/components/HoverCard";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Meistä",
  description:
    "Kuntokeskus Loisto on palvellut Hollolassa vuodesta 1992. Tutustu saliin, palveluihin ja Jari Kotkansalon osaamiseen.",
};

export default function LoistoPage() {
  return (
    <>
      <PageHero
        eyebrow="Meistä"
        title="Hollolassa vuodesta 1992"
        lead="Kuntosali · ryhmäliikunta · solarium · personal training · painonpudotus. Paikallinen kuntokeskus, jossa treenaat omalla tavallasi."
        image="/images/hero-gym.jpg"
        imageAlt="Kuntokeskus Loisto"
      />

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="prose-loisto">
              <p>
                Kuntokeskus Loisto Oy tarjoaa monipuoliset kuntoilutilat, joissa
                voit treenata tehokkaasti haluamallasi tasolla. Kuntosalia
                täydentää viihtyisä ryhmäliikuntasali, jossa on monipuolinen
                tarjonta motivoivia ryhmäliikuntatunteja.
              </p>
              <p>
                Kuntokeskuksessamme on tila, jossa voit rentoutua treenien
                välillä ja nauttia terveellisiä välipaloja – ja juoda vaikka
                kahvit.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/hinnat"
                  className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white no-underline"
                >
                  Superedut & hinnat
                </Link>
                <Link
                  href="/hyvinvointi"
                  className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-ink no-underline"
                >
                  Hyvinvointipalvelut
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/gym-floor.jpg"
                alt="Kuntosalin tiloja"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white section-pad">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Hyvinvointia & rentoutumista",
              text: "Lihashuoltoon ja palautumiseen panostetaan. Hoitoja tarjoaa työfysioterapeutti, kuntohoitaja ja PT Jari.",
            },
            {
              title: "Kardiotreenejä & painonpudotusta",
              text: "Juoksumatot, kuntopyörät, soutulaitteet, crosstrainerit ja stepper – sydänystävällistä treeniä kalorien polttoon.",
            },
            {
              title: "Voimatreenejä & PT",
              text: "Uusia laitteita hankittu. Kattava valikoima painoharjoittelulaitteita ja vapaita painoja – aloittelijasta kokeneeseen.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <HoverCard className="panel panel-soft panel-pad h-full">
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </HoverCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-narrow prose-loisto text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Kohtaa kuntohuuma Loistossa
            </h2>
            <p className="mt-4">
              Kuntokeskus Loisto Oy on Hollolassa sijaitseva huippuluokan
              kuntokeskus, joka tarjoaa monipuoliset tilat kunnon kohotukseen ja
              hyvinvoinnin edistämiseen. Astu sisään ja koe kuntohuuma itse!
            </p>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
