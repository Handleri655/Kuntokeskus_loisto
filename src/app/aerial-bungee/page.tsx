import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Aerial Bungee",
  description:
    "Aerial Bungee Kuntokeskus Loistossa – bungee-valjastreeniä alkeista koreografiaan.",
};

const videos = [
  {
    label: "Fitness & kuntoilu",
    href: "https://www.youtube.com/shorts/f7wbZ0R632s",
  },
  {
    label: "Bungee Fitness – Feel the Freedom",
    href: "https://youtu.be/WtmBovYMlU4",
  },
  { label: "Video 2", href: "https://youtu.be/HlwFRsQm5JY" },
  { label: "Video 3", href: "https://youtu.be/HB_8-Z7kiGI" },
  { label: "Tanssityyli 1", href: "https://youtu.be/CvDm_tG2F78" },
  { label: "Tanssityyli 2", href: "https://youtu.be/rNwqpz6SzJo" },
];

export default function AerialBungeePage() {
  return (
    <>
      <PageHero
        eyebrow="Aerial Bungee"
        title="Ilmalento alkaa"
        lead="Bungee-valjastreeni kehittää kehonhallintaa, aerobista kuntoa ja räjähtävää voimaa – nivelystävällisesti ja kiehtovasti."
        image="/images/training.jpg"
        imageAlt="Dynaamista treeniä"
      />

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <div className="prose-loisto">
              <p>
                Aerial Bungee on uudenlainen harjoitusmuoto, jossa yhdistyvät
                valjaat ja joustava bungee-köysi. Innovatiivinen liikuntatapa
                avaa mahdollisuuden rytmiseen liikuntaan, jossa voit kehittyä
                myös akrobatian, tanssin ja luovan ilmaisun osa-alueella.
              </p>
              <p>
                Olitpa etsimässä uutta hikitreeniä, haluat laajentaa
                liikeilmaisusi rajoja tai toimia jotain täysin uutta – Aerial
                Bungee on täydellinen valinta. Valjaat sopivat niin
                vasta-alkajille kuin kokeneillekin harrastajille.
              </p>
              <p>
                Treeni vahvistaa kokonaisvaltaisesti lihaksistoa, polttaa
                kaloreita ja parantaa kuntoa. Aerial Bungee on erittäin
                tehokasta aerobista harjoittelua – valjaita voi käyttää myös
                rentoutumiseen ja stressin lievittämiseen.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="panel panel-dark panel-pad">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-bright">
                Tunnit & hinnat
              </p>
              <ul className="mt-5 space-y-4 text-white/85">
                <li>
                  <strong className="text-white">Intensiivikurssi 75′</strong>
                  <br />
                  Torstaisin klo 19.15–20.30 – alkeet / turvallisuus / säädöt –
                  32 €. Käytävä ennen pe Aerial Bungee 55 -tuntia. Välillä myös
                  pe:sin.
                </li>
                <li>
                  <strong className="text-white">Aerial Bungee 55</strong>
                  <br />
                  Pe 18–18.55 (alkeet/keskitaso) – Fitness-kortti tai
                  määräkortti 5× 75 € / 3× 60 €
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white section-pad">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Taso 1 – ilmalento alkaa
            </h2>
            <div className="prose-loisto mt-4">
              <p>
                Saat perustietoa Aerial Bungeesta ja harjoittelusta. Opit
                kiinnittämään valjaat oikein ja turvallisesti; ohjaaja auttaa
                säätämään bungee-köyden ja valjaat juuri sinulle sopivaksi.
              </p>
              <p>
                Aerial Bungee on nivelystävällistä, sykettä nostavaa
                intervalli­treeniä. Köysi avustaa ja myös vastustaa liikettä.
                Ääriasunnoissa tarvitaan hyvää keskivartalon hallintaa ja
                tasapainoa. Kivaa & kiehtovaa kuntoilua – myös taitoa vaativaa ja
                erittäin monipuolista.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Taso 2 – ohjaus & koreografia
            </h2>
            <div className="prose-loisto mt-4">
              <p>
                Tehdään selkeää koreografiaa yhdistelemällä eri liikkeitä ja
                pitempiä liikeyhdistelmiä. Musiikki tukee tekemistä; alkuun
                liikkeet tehdään sopivan rauhallisesti – ja oikein.
              </p>
              <p>
                Tasolla 2 korostuvat ohjaamisen periaatteet ja artistinen
                suorittaminen (tanssi, temput/sirkus, fitness/kuntoilu).
                Seuraavalle tasolle siirryttäessä fyysiset ja haastavammat
                liikkeet korostuvat.
              </p>
              <p className="text-sm text-muted">Terkuin Jari Kotkansalo</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Tsekkaa videot
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <a
                  key={video.href}
                  href={video.href}
                  target="_blank"
                  rel="noreferrer"
                  className="service-tile !gap-0 !p-5 text-sm font-medium"
                >
                  {video.label} →
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA title="Ilmoittaudu Aerial Bungeeseen" />
    </>
  );
}
