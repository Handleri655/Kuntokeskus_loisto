import Link from "next/link";
import { moreNav, nav, openingHours, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-page section-pad grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Kuntokeskus Loisto
          </div>
          <p className="mt-4 max-w-md text-white/70 leading-relaxed">
            Yksityinen kunto- ja aerobicsali Hollolan kuntakeskuksessa vuodesta{" "}
            {site.founded}. Palveluita kaikenikäisille – yksin tai yhdessä.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {site.paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/75"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            Sivut
          </h2>
          <ul className="mt-4 grid gap-2 text-sm text-white/80">
            {[...nav, ...moreNav.slice(0, 4)].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            Yhteystiedot
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>
              <a href={site.mapsUrl} className="transition hover:text-white">
                {site.address}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="transition hover:text-white">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="transition hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="text-white/55">
              Ilmainen pysäköinti · Avainkortilla kuntosali {site.keycardHours}
            </li>
          </ul>
          <div className="mt-6 space-y-1.5 text-sm text-white/55">
            {openingHours.slice(0, 5).map((row) => (
              <div key={row.day} className="flex justify-between gap-4">
                <span>{row.day}</span>
                <span>{row.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p>Treenaa kovaa Hollolassa.</p>
            <Link
              href="/admin"
              className="text-white/35 transition hover:text-white/70"
            >
              Hallinta
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
