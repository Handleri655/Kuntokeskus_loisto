import type { Metadata } from "next";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ScheduleTable } from "@/components/ScheduleTable";
import { getSchedules } from "@/lib/schedules";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kesän ryhmäliikunta",
  description:
    "Kuntokeskus Loiston kesän ryhmäliikunta – Aerial Bungee, Kangoo ja jumpata.",
};

export const dynamic = "force-dynamic";

export default async function KesaRyhmaliikuntaPage() {
  const { summer } = await getSchedules();

  return (
    <>
      <PageHero
        eyebrow={summer.eyebrow}
        title={summer.title}
        lead={summer.lead}
        image="/images/training.jpg"
        imageAlt="Treeniä Kuntokeskus Loistossa"
      />

      <section className="section-pad">
        <div className="container-page prose-loisto max-w-3xl">
          <Reveal>
            <p>
              Jumpata pidetään 4:llä & Aerial Bungee -tunnit 3:lla. Ohjaajat:
              Jari Kotkansalo, Sari Hätönen. Varaus & peruutus viimeistään
              edellisenä iltana klo 20 mennessä – lähetä koko nimi &
              sähköposti tekstiviestillä {site.phone}.
            </p>
            <p>
              Fitness-kortti sis. kuntosalin + kaikki jumpata + Aerial Bungee 50
              & Cross Training -tunnin. Ryhmäliikunta-kortti sis. kaikki jumpata
              + Kangoo Jumpsin. Maksuvälineenä käy liikuntaraha, pankkikortti,
              käteinen – myös Edenred, Smartum ja E-passi.
            </p>
            <Link
              href="/ryhmaliikunta"
              className="mt-2 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white no-underline"
            >
              Syksyn ohjelma →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-mist/40 section-pad">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {summer.scheduleTitle}
            </h2>
            {summer.scheduleNote ? (
              <p className="mt-3 max-w-2xl text-muted">{summer.scheduleNote}</p>
            ) : null}
          </Reveal>
          <div className="mt-8">
            <ScheduleTable days={summer.days} />
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
