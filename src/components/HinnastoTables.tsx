import {
  parseMembershipPrice,
  type ParsedPriceGroup,
} from "@/lib/membership-price";
import type { MembershipRow } from "@/lib/prices";
import { site } from "@/lib/site";

type CategoryKey = "kuntosali" | "ryhmaliikunta" | "fitness";

const categories: {
  key: CategoryKey;
  title: string;
  note: string;
}[] = [
  {
    key: "kuntosali",
    title: "Kuntosali",
    note: `Avainkortilla treeni klo ${site.keycardHours}.`,
  },
  {
    key: "ryhmaliikunta",
    title: "Ryhmäliikunta",
    note: "Jumpat, Kangoo ja joogat kortilla.",
  },
  {
    key: "fitness",
    title: "Fitness",
    note: "Kuntosali + jumpat + Aerial Bungee 55 + Cross Training.",
  },
];

export function HinnastoTables({ rows }: { rows: MembershipRow[] }) {
  return (
    <div className="mt-8 md:mt-10">
      <nav
        aria-label="Hinnaston kategoriat"
        className="mb-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => (
          <a
            key={category.key}
            href={`#hinta-${category.key}`}
            className="min-h-11 shrink-0 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white"
          >
            {category.title}
          </a>
        ))}
      </nav>

      <div className="grid gap-5 md:gap-8">
        {categories.map((category) => (
          <CategoryTable key={category.key} category={category} rows={rows} />
        ))}
      </div>
    </div>
  );
}

function CategoryTable({
  category,
  rows,
}: {
  category: (typeof categories)[number];
  rows: MembershipRow[];
}) {
  return (
    <div
      id={`hinta-${category.key}`}
      className={`scroll-mt-28 overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm ${
        category.key === "fitness" ? "ring-1 ring-accent/25" : ""
      }`}
    >
      <div className="border-b border-[var(--line)] bg-[linear-gradient(90deg,rgba(224,122,40,0.14),transparent)] px-4 py-4 md:px-7 md:py-5">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          {category.title}
        </p>
        <p className="mt-1.5 text-sm leading-snug text-muted">{category.note}</p>
      </div>

      <div className="hidden gap-4 border-b border-[var(--line)] px-7 py-3 md:grid md:grid-cols-[minmax(7.5rem,0.7fr)_1fr_1.2fr]">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Kortti
        </p>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Normaalihinta
        </p>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
          Opiskelija, eläkeläinen ja työtön
        </p>
      </div>

      <ul className="divide-y divide-[var(--line)]">
        {rows.map((row) => {
          const parsed = parseMembershipPrice(row[category.key]);
          const isBestValue = row.product === "12 kk" && !parsed.empty;
          const hasReduced = Boolean(parsed.reduced);
          const monthly = parsed.regular?.monthly ?? null;

          return (
            <li
              key={`${category.key}-${row.product}`}
              className={isBestValue ? "bg-[rgba(224,122,40,0.06)]" : undefined}
            >
              {/* Mobile card */}
              <div className="px-4 py-4 md:hidden">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold tracking-tight">
                      {row.product}
                    </p>
                    {isBestValue ? (
                      <p className="mt-1 inline-flex rounded-full bg-accent/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-accent">
                        Edullisin €/kk
                      </p>
                    ) : null}
                  </div>
                  {monthly && !hasReduced ? (
                    <p className="font-display shrink-0 text-[1.7rem] font-semibold leading-none tracking-tight text-accent">
                      {monthly}
                    </p>
                  ) : null}
                </div>

                {parsed.empty ? (
                  <p className="mt-3 font-medium text-muted">—</p>
                ) : hasReduced ? (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <PriceCard
                      label="Normaali"
                      group={parsed.regular}
                      tone="plain"
                    />
                    <PriceCard
                      label="Alennettu"
                      group={parsed.reduced}
                      tone="accent"
                    />
                  </div>
                ) : monthly && parsed.regular ? (
                  <p className="mt-2 text-sm text-muted">
                    Kokonaishinta {parsed.regular.primary}
                  </p>
                ) : parsed.regular ? (
                  <p className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
                    {parsed.regular.primary}
                  </p>
                ) : null}
              </div>

              {/* Desktop row */}
              <div className="hidden gap-3 px-7 py-6 md:grid md:grid-cols-[minmax(7.5rem,0.7fr)_1fr_1.2fr] md:items-start">
                <div>
                  <p className="font-display text-lg font-semibold tracking-tight">
                    {row.product}
                  </p>
                  {isBestValue ? (
                    <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-accent">
                      Edullisin €/kk
                    </p>
                  ) : null}
                </div>
                <div>
                  {parsed.empty || !parsed.regular ? (
                    <p className="font-medium text-muted">—</p>
                  ) : (
                    <PriceLines group={parsed.regular} />
                  )}
                </div>
                <div>
                  {parsed.reduced ? (
                    <div className="rounded-xl bg-[rgba(224,122,40,0.1)] px-4 py-3 ring-1 ring-accent/15">
                      <PriceLines group={parsed.reduced} strong />
                    </div>
                  ) : (
                    <p className="font-medium text-muted">—</p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PriceCard({
  label,
  group,
  tone,
}: {
  label: string;
  group: ParsedPriceGroup | null;
  tone: "plain" | "accent";
}) {
  return (
    <div
      className={`rounded-xl px-3 py-3 ${
        tone === "accent"
          ? "bg-[rgba(224,122,40,0.12)] ring-1 ring-accent/20"
          : "bg-mist/80"
      }`}
    >
      <p
        className={`text-[0.65rem] font-bold uppercase tracking-[0.12em] ${
          tone === "accent" ? "text-accent" : "text-muted"
        }`}
      >
        {label}
      </p>
      {group ? (
        <PriceLines group={group} strong={tone === "accent"} />
      ) : (
        <p className="mt-1 font-medium text-muted">—</p>
      )}
    </div>
  );
}

function PriceLines({
  group,
  strong = false,
}: {
  group: ParsedPriceGroup;
  strong?: boolean;
}) {
  const monthly = group.monthly;

  if (monthly) {
    return (
      <div className="mt-1">
        <p className="font-display text-xl font-semibold leading-none tracking-tight text-accent md:text-2xl">
          {monthly}
        </p>
        <p className="mt-1 text-xs leading-snug text-muted md:text-sm">
          Kokonaishinta {group.primary}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-1">
      <p
        className={`font-display font-semibold tracking-tight ${
          strong ? "text-xl text-ink md:text-2xl" : "text-lg text-ink md:text-xl"
        }`}
      >
        {group.primary}
      </p>
    </div>
  );
}
