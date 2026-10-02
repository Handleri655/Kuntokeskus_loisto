import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { HoverCard } from "@/components/HoverCard";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cross Training",
  description:
    "Cross Training -tunnit Kuntokeskus Loistossa – voimaa, kestävyyttä ja vartalon hallintaa. Lauantaisin alk. klo 11.30.",
};

export default function CrossTrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Cross Training"
        title="Tehokasta kierto­harjoittelua"
        lead="Lauantaisin alk. klo 11.30–12.30 (2.10.26 alk.). Muista varata paikka."
        image="/images/training.jpg"
        imageAlt="Cross Training -treeni"
      />

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <HoverCard className="panel panel-dark panel-pad">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-bright">
                Tunnit & hinta
              </p>
              <ul className="mt-5 space-y-3 text-white/85">
                <li>Lauantai klo 11.30–12.30</li>
                <li>Kertamaksu 14 €</li>
                <li>6× kurssi 72 €</li>
                <li>
                  Fitness-kuukausikortilla mukaan ilmaiseksi (vähintään 3 kk
                  kortti)
                </li>
              </ul>
              <p className="mt-6 text-sm text-white/60">
                Vetäjä: työfysioterapeutti, kuntohoitaja ja personal trainer Jari
                · {site.jariPhone}
              </p>
            </HoverCard>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="prose-loisto">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                Mitä Cross Training on?
              </h2>
              <p className="mt-4">
                Cross Training -harjoittelussa yhdistyvät kuntosali-,
                toiminnallinen-, vartalon hallinta-, kestävyys- ja
                nopeusharjoittelu sekä moninivel-liikkeet. Valmennukseen tuleva
                voi odottaa kehitystä voimatasoissa, kestävyyskunnossa,
                koordinaatiossa ja vartalon hallinnassa.
              </p>
              <p>
                Tavoitteena on parantaa fyysistä kuntoa monipuolisesti: voimaa,
                kestävyyttä, nopeutta, notkeutta, koordinaatiota ja tasapainoa.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white section-pad">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Mitä saat
            </h2>
            <ul className="prose-loisto mt-4">
              <li>
                Saadut hyödyt auttavat arjessa sekä työelämässä – kuntoa, voimaa
                ja jaksamista
              </li>
              <li>Yhteisöllisyys – treenaat yhdessä motivoivassa ryhmässä</li>
              <li>Kunto: lisää energiaa ja kestävyyttä</li>
              <li>Monipuolisuus: laaja kirjo harjoitteita</li>
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Kenelle sopii?
            </h2>
            <div className="prose-loisto mt-4">
              <p>
                Sopii tavoitteelliselle treenaajalle – aloittelijalle tai
                aktiivitreenaajalle. Aloittelija pääsee heti kiinni
                tuloksekkaaseen harjoitteluun; aktiivitreenaajan kanssa voidaan
                keskittyä tietyn osa-alueen kehittämiseen (Personal Training).
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA
        title="Varaa paikka Cross Trainingiin"
        showMessageOptions
      />
    </>
  );
}
