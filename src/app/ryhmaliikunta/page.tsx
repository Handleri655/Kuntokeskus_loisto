import type { Metadata } from "next";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ScheduleTable } from "@/components/ScheduleTable";
import { getSchedules } from "@/lib/schedules";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ryhmäliikunta",
  description:
    "Kuntokeskus Loiston ryhmäliikunta – Aerial Bungee, jooga, Kangoo ja paljon muuta.",
};

export const dynamic = "force-dynamic";

export default async function RyhmaliikuntaPage() {
  const { autumn } = await getSchedules();

  return (
    <>
      <PageHero
        eyebrow={autumn.eyebrow}
        title={autumn.title}
        lead={autumn.lead}
        image="/images/group-fitness.jpg"
        imageAlt="Ryhmäliikuntatunti"
      />

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <div className="prose-loisto">
              <p>
                Jumpata pidetään 4:llä, Aerial Bungee 3:lla ja joogat 6:lla.
                Varaus & peruutus viimeistään edellisenä iltana klo 20
                mennessä. Lähetä nimi & sähköposti tekstiviestillä numeroon{" "}
                {site.phone} – saat varauslinkin sähköpostitse, tai soita.
              </p>
              <ul>
                <li>
                  <strong>Hatha-jooga 75</strong> ma 19.15–20.30 &{" "}
                  <strong>Voima-jooga 60</strong> ke 19.15–20.15
                </li>
                <li>
                  <strong>Cross Training</strong> pe 16.45–17.45 –
                  Fitness-kortilla mukaan tai kerta/kurssimaksu
                </li>
                <li>
                  <strong>HIIT+Core 45 & Kahvakuula 45</strong> lauantaisin
                </li>
                <li>
                  <strong>Aerial Bungee intensiivi 75</strong> to 19.15–20.30 –
                  32 €
                </li>
                <li>
                  <strong>Aerial Bungee 55</strong> pe 18–18.55 –
                  Fitness-kortilla mukaan
                </li>
                <li>
                  <strong>Äänimaljarentoutus</strong> pe klo 18–19 (kuun
                  viimeinen pe) – jäsen 14 €, ei-jäsen 19 €
                </li>
              </ul>
              <p>
                Ohjaajat: Jari Kotkansalo, Ulla Paaso, Eija Liikonen. Fitness
                sisältää kuntosalin 4–24 + jumpata + Aerial Bungee 55 + Cross
                Training + joogat. Ryhmäliikunta sisältää jumpata + Kangoo Jumps
                + joogat.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="panel panel-pad">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Kesäohjelma
              </p>
              <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
                Voimassa 16.8.26 asti
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                Kesän ryhmäliikunta 15 h/vko – Aerial Bungee 50, Cross Training,
                Kangoo ja tutut jumpat.
              </p>
              <Link
                href="/ryhmaliikunta/kesa"
                className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
              >
                Katso kesäohjelma
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-mist/40 section-pad">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {autumn.scheduleTitle}
            </h2>
            {autumn.scheduleNote ? (
              <p className="mt-3 max-w-2xl text-muted">{autumn.scheduleNote}</p>
            ) : null}
          </Reveal>
          <div className="mt-8">
            <ScheduleTable days={autumn.days} />
          </div>
        </div>
      </section>

      <ContactCTA title="Varaa paikka jumpalle" />
    </>
  );
}
