import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getPrices } from "@/lib/prices";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hinnat",
  description:
    "Kuntokeskus Loiston hinnasto – kuntosali, ryhmäliikunta ja Fitness. Ei liittymismaksuja.",
};

export const dynamic = "force-dynamic";

export default async function HinnatPage() {
  const prices = await getPrices();
  const { headline, membershipRows, extras } = prices;

  return (
    <>
      <PageHero
        eyebrow={headline.eyebrow}
        title={headline.title}
        lead={`${headline.lead} Kuntosali alk. ${headline.highlightKuntosali} · ryhmäliikunta ${headline.highlightRyhmaliikunta} · Fitness ${headline.highlightFitness}.`}
        image="/images/hero-hinnat.jpg"
        imageAlt="Personal training ja treenikortit"
      />

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <div className="prose-loisto max-w-3xl">
              <p>
                Aerodiggarit eli uudemmalta nimeltään Kuntokeskus Loisto tarjoaa
                palveluita kaikenikäisille kuntoilijoille. Olemme vuodesta 1992
                alalla toiminut yksityinen kunto- ja aerobicsali Hollolan
                kuntakeskuksessa. Tule yksin tai ryhmässä – tehdään liikunnasta
                hauska kokemus!
              </p>
              <p>
                Fitness-kortti sis. kuntosalin 4–24, Aerial Bungee 55, Cross
                Training ja kaikki jumpata. Suluissa opiskelijat, eläkeläiset,
                työtön-hinta.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="panel mt-10 overflow-x-auto">
              <table className="data-table min-w-[820px] w-full text-left">
                <thead>
                  <tr>
                    <th>Tuote</th>
                    <th>Kuntosali</th>
                    <th>Ryhmäliikunta</th>
                    <th>Fitness</th>
                  </tr>
                </thead>
                <tbody>
                  {membershipRows.map((row) => (
                    <tr key={row.product}>
                      <td className="font-semibold text-ink">{row.product}</td>
                      <td>{row.kuntosali}</td>
                      <td>{row.ryhmaliikunta}</td>
                      <td>{row.fitness}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-mist/40 section-pad">
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            ...extras,
            {
              title: "Maksutavat",
              text: `Pankki- ja luottokortit, käteinen, Smartum, Edenred, E-passi. Tilille: ${site.bankAccount}`,
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04}>
              <div className="panel panel-pad h-full">
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCTA title="Kysy sopivaa korttia" />
    </>
  );
}
