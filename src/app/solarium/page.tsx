import type { Metadata } from "next";
import Image from "next/image";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Solarium",
  description:
    "Solarium Kuntokeskus Loistossa – magneettikortilla / ajanvarauksella, ikäraja 18 vuotta.",
};

export default function SolariumPage() {
  return (
    <>
      <PageHero
        eyebrow="Solarium"
        title="Tervetuloa nauttimaan solariumista"
        lead="Toimii magneettikortilla / ajanvarauksella. Henkilökohtainen. Ikäraja 18 vuotta. 1 kerta 9 € · 10× 69 €."
        image="/images/hero-solarium.jpg"
        imageAlt="Lämmin auringonvalo"
      />

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Ensimmäisellä kerralla
            </h2>
            <ul className="prose-loisto mt-4">
              <li>Suosittelemme 5 min solariumaikaa</li>
              <li>Poista kaikki kosmetiikka</li>
              <li>
                Suihkuta makuualusta, tyyny ja suojalasit desinfiointiaineella
                ja kuivaa paperilla
              </li>
              <li>
                Halutessasi huuhdo desinfiointiaine vedellä ja kuivaa uudelleen
              </li>
              <li>Käy makuulle ja vedä yläosa ala-asentoon</li>
              <li>Jos 3 min ei ole vielä kulunut, paina vihreää nappia</li>
              <li>Aseta suojalasit silmien suojaksi</li>
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/solarium.jpg"
                alt="Rentouttava hyvinvointi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white section-pad">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Hyödyt
            </h2>
            <ul className="prose-loisto mt-4">
              <li>Nauti auringonvalosta sateellakin</li>
              <li>Hanki rajaton rusketus</li>
              <li>Pohjarusketus aurinkolomalle</li>
              <li>Ylläpidä rusketusta matkan / kesän jälkeen</li>
              <li>Pimeinä vuodenaikoina valo piristää</li>
              <li>Saat aimo annoksen energiaa ja uutta puhtia</li>
              <li>Rentouttaa · stressi hellittää · lämpö hivelee ihoa</li>
              <li>D-vitamiinin tuotanto lisääntyy</li>
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Turvallisuus
            </h2>
            <div className="prose-loisto mt-4">
              <p>
                Solarium sammuu automaattisesti kun aika päättyy. Laite hurisee
                toiminnon jälkeen 3 min (jäähtyy). Puhdista makuualusta, tyyny ja
                suojalasit desinfiointiaineella käytön jälkeen.
              </p>
              <p>
                Solariumia voi käyttää vuoden aikana 20–25 kertaa, korkeintaan
                275 minuuttia. Käyttäjän tulee olla täyttänyt 18 vuotta.
              </p>
              <p>
                Jos olit ensimmäistä kertaa, toivotamme sinut tervetulleeksi n.
                2 vrk kuluttua uudelleen!
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA title="Kysy solariumkorttia" />
    </>
  );
}
