import { HoverCard } from "@/components/HoverCard";
import { MotionAnchor, MotionLink } from "@/components/MotionPress";
import type { PricesData } from "@/lib/prices";
import { visibleItems } from "@/lib/prices";
import { site } from "@/lib/site";

type OfferBoardProps = {
  offers: PricesData["offers"];
  pt: PricesData["personalTraining"];
  /** [kuntosali, ryhmäliikunta, fitness] 1 kk normal prices */
  trialWas: string[];
};

function OfferBadge({
  children,
  tone = "accent",
}: {
  children: React.ReactNode;
  tone?: "accent" | "signal" | "light";
}) {
  const tones = {
    accent: "bg-accent text-white",
    signal: "bg-signal text-white",
    light: "bg-[rgba(224,122,40,0.18)] text-ink",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold tracking-[0.08em] md:text-base ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function DealPrice({
  price,
  was,
  light,
}: {
  price: string;
  was?: string;
  light?: boolean;
}) {
  const longPrice = price.length > 12;
  return (
    <div className="min-w-0">
      <p
        className={`font-display font-semibold tracking-tight break-words ${
          light ? "text-accent-bright" : "text-ink"
        } ${
          longPrice
            ? "text-[clamp(1.35rem,3.5vw,2rem)] leading-snug"
            : "text-[clamp(2.15rem,5vw,3.4rem)] leading-none"
        }`}
      >
        {price}
      </p>
      {was ? (
        <p
          className={`mt-2 text-sm font-semibold line-through ${
            light ? "text-white/40" : "text-muted"
          }`}
        >
          {was}
        </p>
      ) : null}
    </div>
  );
}

function normalFromNote(note: string): { was: string | null; rest: string } {
  const match = note.match(/Norm\.\s*[\d,.]+\s*€/i);
  if (!match) return { was: null, rest: note };
  const was = match[0].replace(/^Norm\.\s*/i, "").trim();
  const rest = note
    .replace(match[0], "")
    .replace(/^[·\s]+|[·\s]+$/g, "")
    .replace(/\s*·\s*/g, " · ")
    .trim();
  return { was, rest };
}

function ptDiscount(text: string): string | null {
  const match = text.match(/−\s*\d+\s*%/);
  return match ? match[0].replace(/\s+/g, " ").trim() : null;
}

/** Capitalize the first letter of a phrase (and after . ! ? ·). */
function capitalizePhrase(value: string): string {
  return value.replace(
    /(^|[.!?·]\s+)(\p{Ll})/gu,
    (_, prefix: string, letter: string) => {
      return `${prefix}${letter.toLocaleUpperCase("fi-FI")}`;
    },
  );
}

function trialWasForTitle(title: string, trialWas: string[]): string | undefined {
  const t = title.toLowerCase();
  if (t.includes("fitness")) return trialWas[2];
  if (t.includes("ryhmä")) return trialWas[1];
  if (t.includes("kuntosali") || t.includes("sali")) return trialWas[0];
  return undefined;
}

export function OfferBoard({ offers, pt, trialWas }: OfferBoardProps) {
  const ptBadge = ptDiscount(offers.ptText);
  const { visibility } = offers;
  const trialPrices = visibleItems(offers.trialPrices);
  const yearPrices = visibleItems(offers.yearPrices);
  const treatments = visibleItems(offers.treatments);
  const showPtAerial = visibility.pt || visibility.aerial;

  return (
    <div className="container-page space-y-8 py-10 md:space-y-10 md:py-14">
      {visibility.trial ? (
        <section id="tutustuminen" className="scroll-mt-32">
          <HoverCard className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(150deg,#12151a_0%,#171b22_48%,#1a1710_130%)] text-white shadow-[0_28px_50px_-34px_rgba(0,0,0,0.6)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[rgba(224,122,40,0.16)] px-6 py-4 md:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-bright">
                {offers.trialEyebrow}
              </p>
              {offers.trialBadge ? (
                <OfferBadge>{offers.trialBadge}</OfferBadge>
              ) : null}
            </div>
            <div className="px-6 py-8 md:px-10 md:py-10">
              <h2 className="font-display max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
                {offers.trialHeading}
              </h2>
              {offers.trialNote ? (
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
                  {capitalizePhrase(offers.trialNote)}
                </p>
              ) : null}
              {trialPrices.length > 0 ? (
                <div
                  className={`mt-8 grid gap-3 ${
                    trialPrices.length >= 3
                      ? "sm:grid-cols-3"
                      : trialPrices.length === 2
                        ? "sm:grid-cols-2"
                        : ""
                  }`}
                >
                  {trialPrices.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6"
                    >
                      <p className="text-sm font-semibold text-white/65">
                        {item.title}
                      </p>
                      <div className="mt-3">
                        <DealPrice
                          price={item.price}
                          was={
                            item.was?.trim() ||
                            trialWasForTitle(item.title, trialWas)
                          }
                          light
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="mt-8">
                <MotionAnchor href={site.phoneHref} className="btn-accent">
                  Hyödynnä tarjous
                </MotionAnchor>
              </div>
            </div>
          </HoverCard>
        </section>
      ) : null}

      {visibility.year ? (
        <section id="vuosietu" className="scroll-mt-32">
          <div className="overflow-hidden rounded-[1.6rem] border border-accent/25 bg-[linear-gradient(180deg,rgba(224,122,40,0.1),rgba(255,255,255,0.92))]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-accent/15 px-6 py-4 md:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                {offers.yearBadge}
              </p>
              {offers.bonusTitle ? (
                <OfferBadge tone="light">{offers.bonusTitle}</OfferBadge>
              ) : null}
            </div>
            <div className="px-6 py-8 md:px-10 md:py-10">
              <h2 className="font-display max-w-3xl text-3xl font-semibold tracking-tight md:text-[2.75rem]">
                {offers.yearHeading}
              </h2>
              {offers.yearNote ? (
                <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
                  {capitalizePhrase(offers.yearNote)}
                </p>
              ) : null}
              {yearPrices.length > 0 ? (
                <div
                  className={`mt-8 grid gap-3 ${
                    yearPrices.length >= 3
                      ? "md:grid-cols-3"
                      : yearPrices.length === 2
                        ? "md:grid-cols-2"
                        : ""
                  }`}
                >
                  {yearPrices.map((item) => (
                    <HoverCard
                      key={item.title}
                      className="rounded-2xl border border-accent/20 bg-white px-5 py-6 shadow-sm"
                    >
                      <p className="text-sm font-semibold text-muted">
                        {item.title}
                      </p>
                      <div className="mt-3">
                        <DealPrice price={item.price} />
                      </div>
                      {item.note ? (
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {item.note}
                        </p>
                      ) : null}
                    </HoverCard>
                  ))}
                </div>
              ) : null}
              {offers.bonuses.length > 0 ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {offers.bonuses.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-accent/15 bg-white/80 px-4 py-4"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                      <p className="font-semibold leading-snug text-ink">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-3">
                <MotionAnchor href={site.phoneHref} className="btn-accent">
                  Kysy vuoden edusta
                </MotionAnchor>
                <MotionLink
                  href="/hinnat"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-mist"
                >
                  Vertaa hinnastoon
                </MotionLink>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {showPtAerial ? (
        <section
          id="pt"
          className={`grid scroll-mt-32 gap-4 ${
            visibility.pt && visibility.aerial ? "lg:grid-cols-2" : ""
          }`}
        >
          {visibility.pt ? (
            <HoverCard className="flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(150deg,#12151a_0%,#171b22_48%,#1a1710_130%)] text-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[rgba(224,122,40,0.16)] px-6 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-bright">
                  {offers.ptEyebrow}
                </p>
                {ptBadge ? <OfferBadge>{ptBadge}</OfferBadge> : null}
              </div>
              <div className="flex flex-1 flex-col px-6 py-8">
                <h2 className="font-display text-3xl font-semibold tracking-tight">
                  {capitalizePhrase(offers.ptTitle)}
                </h2>
                <p className="mt-4 leading-relaxed text-white/75">
                  {capitalizePhrase(offers.ptText)}
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5">
                    <p className="text-sm font-semibold text-white/65">
                      10 kertaa
                    </p>
                    <div className="mt-2">
                      <DealPrice price={pt.pt10Offer} was={pt.pt10} light />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5">
                    <p className="text-sm font-semibold text-white/65">
                      15 kertaa
                    </p>
                    <div className="mt-2">
                      <DealPrice price={pt.pt15Offer} was={pt.pt15} light />
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <MotionLink href="/personal-training" className="btn-accent">
                    Tutustu PT-palveluihin
                  </MotionLink>
                </div>
              </div>
            </HoverCard>
          ) : null}

          {visibility.aerial ? (
            <div id="aerial" className="h-full scroll-mt-32">
              <HoverCard className="flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-accent/25 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-accent/15 bg-[rgba(224,122,40,0.08)] px-6 py-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                    {offers.aerialEyebrow}
                  </p>
                  {offers.aerialBadge ? (
                    <OfferBadge tone="signal">{offers.aerialBadge}</OfferBadge>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col px-6 py-8">
                  <h2 className="font-display text-3xl font-semibold tracking-tight">
                    {offers.aerialHeading}
                  </h2>
                  <p className="mt-4 flex-1 leading-relaxed text-ink-soft">
                    {capitalizePhrase(offers.aerialText)}
                  </p>
                  <div className="mt-8">
                    <MotionLink href="/aerial-bungee" className="btn-primary">
                      Tutustu Aerial Bungee -tunteihin
                    </MotionLink>
                  </div>
                </div>
              </HoverCard>
            </div>
          ) : null}
        </section>
      ) : null}

      {visibility.treatments ? (
        <section id="hyvinvointi" className="scroll-mt-32">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-accent">{offers.treatmentsEyebrow}</p>
              <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
                {offers.treatmentsHeading}
              </h2>
              {offers.treatmentsLead ? (
                <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
                  {offers.treatmentsLead}
                </p>
              ) : null}
            </div>
            <MotionLink href="/hyvinvointi" className="btn-primary">
              Hyvinvointipalvelut
            </MotionLink>
          </div>

          {treatments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {treatments.map((item) => {
                const { was, rest } = normalFromNote(item.note);
                return (
                  <HoverCard key={item.title}>
                    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-accent/20 bg-white shadow-sm">
                      <p className="bg-accent px-5 py-3 text-center text-lg font-bold tracking-wide text-white">
                        {capitalizePhrase(item.offer)}
                      </p>
                      <div className="flex min-w-0 flex-1 flex-col px-5 py-6">
                        <h3 className="font-display text-xl font-semibold tracking-tight text-balance break-words">
                          {capitalizePhrase(item.title)}
                        </h3>
                        <div className="mt-4">
                          <DealPrice
                            price={capitalizePhrase(item.price)}
                            was={was ?? undefined}
                          />
                        </div>
                        {rest ? (
                          <p className="mt-3 text-sm leading-relaxed text-muted">
                            {capitalizePhrase(rest)}
                          </p>
                        ) : null}
                      </div>
                    </article>
                  </HoverCard>
                );
              })}
            </div>
          ) : null}

          <div className="mt-6">
            <MotionAnchor href={site.jariPhoneHref} className="btn-accent">
              Varaa hoito: {site.jariPhone}
            </MotionAnchor>
          </div>
        </section>
      ) : null}

      {offers.customSections
        .filter((section) => !section.hidden)
        .map((section) => {
          const cards = visibleItems(section.cards);
          const dark = section.tone === "dark";
          return (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-32"
            >
              <HoverCard
                className={`overflow-hidden rounded-[1.6rem] border shadow-sm ${
                  dark
                    ? "border-white/10 bg-[linear-gradient(150deg,#12151a_0%,#171b22_48%,#1a1710_130%)] text-white"
                    : "border-accent/25 bg-white"
                }`}
              >
                <div
                  className={`flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4 md:px-10 ${
                    dark
                      ? "border-white/10 bg-[rgba(224,122,40,0.16)]"
                      : "border-accent/15 bg-[rgba(224,122,40,0.08)]"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold uppercase tracking-[0.16em] ${
                      dark ? "text-accent-bright" : "text-accent"
                    }`}
                  >
                    {section.eyebrow}
                  </p>
                  {section.badge ? (
                    <OfferBadge tone={dark ? "accent" : "signal"}>
                      {section.badge}
                    </OfferBadge>
                  ) : null}
                </div>
                <div className="px-6 py-8 md:px-10 md:py-10">
                  <h2 className="font-display max-w-3xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
                    {section.heading}
                  </h2>
                  {section.lead ? (
                    <p
                      className={`mt-4 max-w-2xl leading-relaxed ${
                        dark ? "text-white/75" : "text-ink-soft"
                      }`}
                    >
                      {capitalizePhrase(section.lead)}
                    </p>
                  ) : null}
                  {cards.length > 0 ? (
                    <div
                      className={`mt-8 grid gap-4 ${
                        cards.length >= 3
                          ? "md:grid-cols-3"
                          : cards.length === 2
                            ? "md:grid-cols-2"
                            : ""
                      }`}
                    >
                      {cards.map((item) => {
                        const { was, rest } = normalFromNote(item.note);
                        return (
                          <div
                            key={`${section.id}-${item.title}`}
                            className={`overflow-hidden rounded-2xl border ${
                              dark
                                ? "border-white/10 bg-white/5"
                                : "border-accent/20 bg-mist/40"
                            }`}
                          >
                            {item.offer ? (
                              <p className="bg-accent px-4 py-2.5 text-center text-sm font-bold tracking-wide text-white">
                                {capitalizePhrase(item.offer)}
                              </p>
                            ) : null}
                            <div className="px-5 py-5">
                              <p
                                className={`text-sm font-semibold ${
                                  dark ? "text-white/65" : "text-muted"
                                }`}
                              >
                                {capitalizePhrase(item.title)}
                              </p>
                              <div className="mt-3">
                                <DealPrice
                                  price={capitalizePhrase(item.price)}
                                  was={was ?? undefined}
                                  light={dark}
                                />
                              </div>
                              {rest ? (
                                <p
                                  className={`mt-3 text-sm leading-relaxed ${
                                    dark ? "text-white/55" : "text-muted"
                                  }`}
                                >
                                  {capitalizePhrase(rest)}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                  <div className="mt-8">
                    <MotionAnchor href={site.phoneHref} className="btn-accent">
                      Kysy tarjouksesta
                    </MotionAnchor>
                  </div>
                </div>
              </HoverCard>
            </section>
          );
        })}
    </div>
  );
}
