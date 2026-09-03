import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Kuntosali Hollola",
  description:
    "Kuntosali Hollolassa – Kuntokeskus Loisto. Yksilölliset ohjelmat, kuntotestaus ja avainkortilla treeni klo 04–24. Ei liittymismaksuja.",
};

export default function KuntosaliPage() {
  return (
    <>
      <PageHero
        eyebrow="Kuntosali"
        title="Monipuolista lihaskunto­harjoittelua"
        lead="Yksilölliset kunto- ja treeniohjelmat, kuntotestaus ja asiantunteva ohjaus. Avainkortilla treenaat joka päivä klo 04–24."
        image="/images/gym-floor.jpg"
        imageAlt="Kuntosalilaitteita"
      />

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="panel panel-dark panel-pad">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-bright">
                Hinnat
              </p>
              <ul className="mt-5 space-y-4 text-white/85">
                <li>
                  <strong className="text-white">Kuntosaliohjelma</strong>
                  <br />
                  1 pvän jako 40 € · 2 pvän jako 75 € · 3 pvän jako 95 €
                </li>
                <li>
                  <strong className="text-white">Kuntotesti</strong>
                  <br />
                  70 € (n. 45–50 min + palaute)
                </li>
                <li>
                  <strong className="text-white">Kehonkoostumusmittaus</strong>
                  <br />
                  25 € (mittaus + palaute / analyysi)
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="prose-loisto">
              <p>
                Kuntosaliharjoittelulla on terveydellesi suuri merkitys.
                Harjoittelulla on tutkimusten mukaan tehokas ennaltaehkäisevä
                vaikutus sydän- ja verisuonitautien sekä tuki- ja
                liikuntaelimistön sairauksien syntyyn, ja se on korvaamaton apu
                erilaisten vammojen kuntoutuksessa. Haluatko hoikentua ja
                kiinteytyä, hankkia lihaksiisi erottuvuutta, kestävyyttä, voimaa
                tai lisää lihasmassaa? Kaikki on mahdollista – valinta on sinun.
              </p>
              <p>
                Asiantunteva asiakaspalvelu: oikein suunnitellulla ja
                toteutetulla kuntosaliharjoittelulla pääset tavoitteisiisi
                tehokkaasti ja turvallisesti. Hyvinvointivalmentaja opastaa ja
                laatii sinulle henkilökohtaisen kunto-ohjelman asetettujen
                tavoitteiden mukaan – neuvomalla ja ohjaamalla käytännössä
                kuntosalilla.
              </p>
              <p>
                Hyvinvointivalmentaja on koulutettu alan ammattilainen. Hän
                opastaa kädestä pitäen vasta-alkajia alkuun esim.
                laiteopastuksella, laatimalla yksilöllisen harjoitteluohjelman
                tai vaikkapa yksilöllisen liikunta- ja hyvinvointiohjelman (sis.
                myös aerobisen harjoittelun ruokavalioineen).
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white section-pad">
        <div className="container-narrow prose-loisto">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Yksilöllinen harjoitteluohjelma
            </h2>
            <p className="mt-4">
              Sisältää asiakkaan alkuhaastattelun, teoriaosuuden,
              laiteopastuksen ja käytännön harjoittelun. Ohjelma voi olla
              kiinteytys-, lihasmassa-, lihaskestävyys- tai perusvoimaa
              kehittävä – tai muuta harjoittelua tukeva.
            </p>
            <h3 className="font-display mt-10 text-2xl font-semibold tracking-tight">
              Kuntotestaus
            </h3>
            <p>
              Asiakkaalle voidaan tehdä kuntotestit sisältäen esim. aerobisen
              kunnon testauksen (step-askellustesti), lihaskuntotestit, yleisen
              liikkuvuustestin (tai tarkempi ft-tutkimus) sekä
              kehonkoostumusmittauksen. Kuntotestauksen pohjalta laaditaan
              tarvittaessa yksilöllinen harjoitteluohjelma.
            </p>
            <h3 className="font-display mt-10 text-2xl font-semibold tracking-tight">
              Laitteet & harjoittelu
            </h3>
            <p>
              Harjoittelun voi toteuttaa kuntosalilaitteilla, vapailla painoilla
              sekä aerobisen harjoittelun laitteilla. Laitteilla voit kohdentaa
              harjoituksen tietylle lihasryhmälle esim. kuntoutusmielessä – tai
              treenata vapailla painoilla lisäten hermojärjestelmän
              aktiviteettia.
            </p>
            <p>
              Ryhmämuotoinen kuntosaliharjoittelu tai circuit training -tyyppinen
              harjoittelu on myös mahdollista. Suosittelemme kuitenkin
              yksilöllisen harjoitteluohjelman laadintaa ja ohjausta, jolloin
              tilanteesi kartoitetaan ja saavutat tuloksia nopeammin.
            </p>
          </Reveal>
        </div>
      </section>

      <ContactCTA title="Varaa laiteopastus tai ohjelma" />
    </>
  );
}
