import Link from "next/link";
import { site } from "@/lib/site";

type ContactCTAProps = {
  title?: string;
  text?: string;
};

export function ContactCTA({
  title = "Valmis aloittamaan?",
  text = "Soita, lähetä viesti tai poikkea paikalle. Autamme sinut alkuun – olitpa vasta-alkaja tai kokenut treenaaja.",
}: ContactCTAProps) {
  return (
    <section className="section-pad">
      <div className="panel panel-dark container-page px-6 py-12 text-white md:px-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
              Yhteys
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-white/75 leading-relaxed">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-stretch">
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white/90"
            >
              Soita {site.phone}
            </a>
            <a
              href={site.emailHref}
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Lähetä sähköposti
            </a>
            <Link
              href="/info"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Päivystys & info
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
