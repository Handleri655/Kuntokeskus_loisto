import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Äänimaljarentoutus",
  description:
    "Äänimaljarentoutus Kuntokeskus Loistossa – lempeää hyvinvointia äänien maailmassa.",
};

export default function AanimaljarentoutusPage() {
  return (
    <>
      <PageHero
        eyebrow="Äänimaljarentoutus"
        title="Lempeää hyvinvointia äänien maailmassa"
        lead="Perjantaisin klo 18–19.00 (kuun viimeinen pe). Jäsen 14 €, ei-jäsen 19 €."
        image="/images/yoga.jpg"
        imageAlt="Rentoutumista"
      />

      <section className="section-pad">
        <div className="container-narrow prose-loisto">
          <Reveal>
            <p>
              Äänimaljarentoutus perustuu harmonisiin ääniin ja värähtelyyn,
              jotka auttavat kehoa ja mieltä rauhoittumaan. Äänimaljojen sointi
              voi hidastaa aivorytmejä rentoutumista tukevalle alfa- ja
              theta-taajuudelle, mikä auttaa hiljentämään mieltä ja syventämään
              levon tunnetta.
            </p>
            <p>
              Rentoutuksen aikana parasympaattinen hermosto aktivoituu. Tämä voi
              näkyä sykkeen ja verenpaineen laskuna, hengityksen syvenemisenä
              sekä lihasjännityksen helpottumisena. Äänivärähtelyt tukevat kehon
              luonnollista palautumista ja voivat auttaa irrottautumaan
              stressistä sekä ylivireystilasta.
            </p>
            <h2 className="font-display mt-10 text-3xl font-semibold tracking-tight text-ink">
              Hyötyjä voivat olla esimerkiksi
            </h2>
            <ul>
              <li>stressin ja jännityksen lievittyminen</li>
              <li>hermoston rauhoittuminen</li>
              <li>syvempi rentoutumisen tunne</li>
              <li>unen laadun paraneminen</li>
              <li>ahdistuksen ja levottomuuden helpottuminen</li>
              <li>keskittymiskyvyn ja läsnäolon vahvistuminen</li>
              <li>kehon ja mielen tasapainon tukeminen</li>
              <li>lihasjännitysten ja fyysisen kuormituksen helpottuminen</li>
            </ul>
            <p>
              Tutkimusten mukaan äänimaljarentoutus voi lisätä hyvänolon tunnetta
              ja auttaa kehoa siirtymään palautumisen tilaan. Monet kokevat
              hoidon jälkeen olonsa levolliseksi, kevyemmäksi ja energisemmäksi.
            </p>
            <p>
              Äänimaljarentoutus ryhmässä kestää n. 60 minuuttia. Osallistujat
              makaavat alustalla tai istuvat mukavasti. Hyvän olon ja asennon
              saamiseksi tarvitaan alusta, huopa ja tyyny. Veden juominen
              äänimaljarentoutuksen jälkeen on tärkeää.
            </p>
            <p>
              Äänimaljarentoutuksessa soitan äänimaljoja, tingshaa, rumpua,
              sadekeppiä, gongia ja koshia. Sopii kaikille perusterveille.
            </p>
            <p className="text-sm text-muted">
              Ei suositella raskauden ensimmäisen kolmanneksen aikana tai syöpää
              sairastaville. Jos sinulla on vakavia mielenterveyshaasteita kuten
              psykoositaipumusta tai skitsofreniaa, tämä ei välttämättä ole
              sinulle.
            </p>
          </Reveal>
        </div>
      </section>

      <ContactCTA title="Varaa äänimaljarentoutus" />
    </>
  );
}
