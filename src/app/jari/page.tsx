import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Henkilökuva – Jari Kotkansalo",
  description:
    "Jari Kotkansalo – työfysioterapeutti, kuntohoitaja, personal trainer ja ryhmäliikuntaohjaaja Kuntokeskus Loistossa.",
};

export default function JariPage() {
  return (
    <>
      <PageHero
        eyebrow="Henkilökuva"
        title="Moi! Olen Jari Kotkansalo"
        lead="Työfysioterapeutti–kuntohoitaja–personal trainer–ryhmäliikuntaohjaaja. Työskentelen Kuntokeskus Loistossa Hollolassa – tervetuloa!"
        image="/images/training.jpg"
        imageAlt="Valmennusta"
      />

      <section className="section-pad">
        <div className="container-narrow prose-loisto">
          <Reveal>
            <p>
              T:mi Jari Kotkansalo – taustaa. Olen terveydenhuollon ja
              liikunta-alan konkari ja alan ammattilainen. Olen tehnyt töitä
              hierojana ja työfysioterapeuttina reilut 25 vuotta, joten kokemusta
              ja osaamista on kertynyt vuosien varrella.
            </p>
            <p>
              Koen olevani oikealla alalla auttaessa ihmisiä kuntoilun,
              hyvinvoinnin ja terveyden edistämisessä. Ammatillinen osaamiseni ja
              pitkä liikuntataustani (kuntosaliharjoittelu, ryhmäliikunnan ohjaus
              v. 92 alk.) on eduksi henkilökohtaisessa asiakasohjauksessa.
            </p>
            <p>
              Kaikki ovat tervetulleita treenaamaan kanssani – ja myös
              asiakkaiksi fysioterapiaan ja hierontaan!
            </p>

            <h2 className="font-display mt-10 text-3xl font-semibold tracking-tight text-ink">
              Ammatillinen koulutus
            </h2>
            <ul>
              <li>Kuntohoitaja 1994</li>
              <li>Fysioterapeutti 1997 – Helsingin IV terveydenhuolto-oppilaitos</li>
              <li>Työfysioterapeutti – Työterveyslaitos 2002</li>
            </ul>

            <h2 className="font-display mt-10 text-3xl font-semibold tracking-tight text-ink">
              Työpaikat (viimeisimmät)
            </h2>
            <ul>
              <li>
                <strong>Kuntokeskus Loisto (Aerodiggarit)</strong> – yrittäjä /
                työfysioterapeutti, kuntohoitaja, PT, ryhmäliikuntaohjaaja
                1.11.2019 alk.
              </li>
              <li>
                <strong>Tmi Jari Kotkansalo / fysikaalinen hoitolaitos</strong> –
                Orivesi 7/2017–10/2019 (fysioterapia, hieronta, Footbalance,
                ryhmäliikunta & painonpudotusryhmät, PT)
              </li>
              <li>
                Työfysioterapeutti, Fazer Makeiset Oy, Työterveysasema Vaarala
                2012–2017
              </li>
              <li>
                Työfysioterapeutti, Tornion kaupungin terveyskeskus 2009–2011
              </li>
              <li>
                Työfysioterapeutti, Rovaniemen kaupungin työterveyspalvelut
                2008–2009
              </li>
              <li>
                Fysioterapeutti, Kauniaisten terveyskeskus 2001–2007
              </li>
              <li>
                Kuntokeskusvastaava / ft / hieroja / ohjaaja, Physio Phoenix
                Kemi 2007–2011
              </li>
              <li>
                Fysioterapeutti, kuntoutusvastaava – Mäntyrinteen palvelukeskus
                Vihti 2000–2001
              </li>
            </ul>
            <p className="text-sm text-muted">
              Lisäksi paljon terveys- ja liikunta-alan kursseja vuosien varrella.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={site.jariSite}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white no-underline"
              >
                www.tmijarik.fi
              </a>
              <a
                href={site.jariPhoneHref}
                className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-ink no-underline"
              >
                {site.jariPhone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA title="Varaa aika Jarille" />
    </>
  );
}
