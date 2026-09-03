"use client";

import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor, MotionLink } from "@/components/MotionPress";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

type ContactCTAProps = {
  title?: string;
  text?: string;
};

export function ContactCTA({
  title = "Valmis aloittamaan?",
  text = "Soita tai poikkea paikalle. Autamme sinut alkuun.",
}: ContactCTAProps) {
  return (
    <section className="section-pad">
      <Reveal>
        <HoverCard className="panel panel-dark container-page px-6 py-12 md:px-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1.3fr_0.9fr] md:items-end">
            <div>
              <p className="eyebrow text-accent-bright">Yhteys</p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                {title}
              </h2>
              <p className="mt-4 max-w-md text-white/70 leading-relaxed">{text}</p>
            </div>
            <div className="flex flex-col gap-3">
              <MotionAnchor
                href={site.phoneHref}
                className="btn-accent text-center"
                fullWidth
              >
                Soita {site.phone}
              </MotionAnchor>
              <MotionAnchor
                href={site.emailHref}
                className="btn-ghost text-center"
                fullWidth
              >
                Lähetä sähköposti
              </MotionAnchor>
              <MotionLink
                href="/info"
                fullWidth
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-white/5"
              >
                Päivystys & info
              </MotionLink>
            </div>
          </div>
        </HoverCard>
      </Reveal>
    </section>
  );
}
