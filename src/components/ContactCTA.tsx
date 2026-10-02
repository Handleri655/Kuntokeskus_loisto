"use client";

import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor, MotionLink } from "@/components/MotionPress";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

type ContactCTAProps = {
  title?: string;
  text?: string;
  /** Primary button label; defaults to phone CTA */
  primaryLabel?: string;
  /** Primary link href; defaults to main gym phone */
  primaryHref?: string;
  primaryExternal?: boolean;
  /** If set, secondary is a phone link with this label (same primaryHref) */
  phoneSecondaryLabel?: string;
  /** Custom secondary (e.g. external site); overrides email / phoneSecondary */
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryExternal?: boolean;
  hideInfoLink?: boolean;
  /** Show text / call / email contact options */
  showMessageOptions?: boolean;
  smsHref?: string;
};

export function ContactCTA({
  title = "Valmis aloittamaan?",
  text = "Soita, tekstaa tai lähetä sähköposti. Autamme sinut alkuun.",
  primaryLabel,
  primaryHref = site.phoneHref,
  primaryExternal,
  phoneSecondaryLabel,
  secondaryLabel,
  secondaryHref,
  secondaryExternal,
  hideInfoLink,
  showMessageOptions,
  smsHref = site.smsHref,
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
              {showMessageOptions ? (
                <>
                  <MotionAnchor
                    href={primaryHref}
                    className="btn-accent text-center"
                    fullWidth
                    {...(primaryExternal || primaryHref.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {primaryLabel ?? `Soita ${site.phone}`}
                  </MotionAnchor>
                  <MotionAnchor
                    href={smsHref}
                    className="btn-ghost text-center"
                    fullWidth
                  >
                    Tekstaa
                  </MotionAnchor>
                  <MotionAnchor
                    href={site.emailHref}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-white/5"
                    fullWidth
                  >
                    Lähetä sähköposti
                  </MotionAnchor>
                </>
              ) : (
                <>
                  <MotionAnchor
                    href={primaryHref}
                    className="btn-accent text-center"
                    fullWidth
                    {...(primaryExternal || primaryHref.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {primaryLabel ?? `Soita ${site.phone}`}
                  </MotionAnchor>
                  {secondaryHref && secondaryLabel ? (
                    <MotionAnchor
                      href={secondaryHref}
                      className="btn-ghost text-center"
                      fullWidth
                      {...(secondaryExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {secondaryLabel}
                    </MotionAnchor>
                  ) : phoneSecondaryLabel ? (
                    <MotionAnchor
                      href={primaryHref}
                      className="btn-ghost text-center"
                      fullWidth
                    >
                      {phoneSecondaryLabel}
                    </MotionAnchor>
                  ) : (
                    <MotionAnchor
                      href={site.emailHref}
                      className="btn-ghost text-center"
                      fullWidth
                    >
                      Lähetä sähköposti
                    </MotionAnchor>
                  )}
                </>
              )}
              {hideInfoLink ? null : (
                <MotionLink
                  href="/info"
                  fullWidth
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-white/5"
                >
                  Päivystys & info
                </MotionLink>
              )}
            </div>
          </div>
        </HoverCard>
      </Reveal>
    </section>
  );
}
