import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/PrintButton";
import { getSchedules } from "@/lib/schedules";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tulosta viikko-ohjelma",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ print?: string }>;
};

export default async function RyhmaliikuntaTulostaPage({ searchParams }: Props) {
  const [{ autumn }, params] = await Promise.all([
    getSchedules(),
    searchParams,
  ]);
  const autoPrint = params.print === "1";

  return (
    <div className="print-page min-h-svh bg-paper text-ink">
      <div className="print-toolbar no-print container-page flex flex-wrap items-center justify-between gap-3 py-6">
        <div>
          <p className="eyebrow text-accent">Ryhmäliikunta</p>
          <h1 className="font-display mt-1 text-2xl font-semibold tracking-tight">
            Tulosta viikko-ohjelma
          </h1>
          <p className="mt-1 text-sm text-muted">
            A4-arkki tyypillisestä viikosta. Valitse tulostimessa A4 ja
            reunukset vähintään 8&nbsp;mm.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <PrintButton autoPrint={autoPrint} />
          <Link
            href="/ryhmaliikunta#viikko-ohjelma"
            className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--white)] px-5 py-2.5 text-sm font-semibold text-ink"
          >
            Takaisin
          </Link>
        </div>
      </div>

      <div className="print-sheet mx-auto bg-white text-ink shadow-[0_18px_40px_-28px_rgba(28,22,18,0.45)]">
        <header className="print-sheet__header">
          <div>
            <p className="print-sheet__brand">Kuntokeskus Loisto</p>
            <h2 className="print-sheet__title">Ryhmäliikunta · viikko-ohjelma</h2>
          </div>
          <div className="print-sheet__meta">
            <p>{site.address}</p>
            <p>{site.phone}</p>
            <p>kuntokeskusloisto.fi</p>
          </div>
        </header>

        {(autumn.scheduleTitle || autumn.scheduleNote) && (
          <p className="print-sheet__lead">
            {[autumn.scheduleTitle, autumn.scheduleNote]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}

        <div className="print-sheet__grid">
          {autumn.days.map((day) => (
            <section key={day.day} className="print-day">
              <h3 className="print-day__name">{day.day}</h3>
              <ul className="print-day__list">
                {day.classes.map((item) => (
                  <li
                    key={`${day.day}-${item.time}-${item.name}`}
                    className="print-class"
                  >
                    <span className="print-class__time">{item.time}</span>
                    <span className="print-class__body">
                      <span className="print-class__name">{item.name}</span>
                      {item.note ? (
                        <span className="print-class__note">{item.note}</span>
                      ) : null}
                    </span>
                    {item.instructor ? (
                      <span className="print-class__instructor">
                        {item.instructor}
                      </span>
                    ) : (
                      <span className="print-class__instructor" />
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className="print-sheet__footer">
          <p>
            Varaus &amp; peruutus viimeistään edellisenä iltana klo 20.
            Ilmoittaudu Nimenhuudossa tai soita / tekstaa {site.phone}.
          </p>
          <p>
            Avainkortilla kuntosali {site.keycardHours} · Ei liittymismaksua
          </p>
        </footer>
      </div>
    </div>
  );
}
