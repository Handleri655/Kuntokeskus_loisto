import { Reveal } from "@/components/Reveal";
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
    note: "Jumpata, Kangoo ja joogat kortilla.",
  },
  {
    key: "fitness",
    title: "Fitness",
    note: "Kuntosali + jumpata + Aerial Bungee 55 + Cross Training.",
  },
];

export function HinnastoTables({ rows }: { rows: MembershipRow[] }) {
  return (
    <div className="mt-10 grid gap-8">
      {categories.map((category) => (
        <CategoryTable key={category.key} category={category} rows={rows} />
      ))}
    </div>
  );
}

export function ReducedPriceSection({ rows }: { rows: MembershipRow[] }) {
  const reducedRows = rows.filter((row) =>
    categories.some((category) => parseMembershipPrice(row[category.key]).reduced),
  );

  return (
    <section
      id="alennetut"
      className="border-t border-[var(--line)] bg-mist/50 section-pad scroll-mt-28"
    >
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent">Alennetut hinnat</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-[2.5rem]">
            Opiskelija, eläkeläinen ja työtön
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Sama alennettu hinta kaikille kolmelle. Taulukossa näkyvät vain ne
            kortit, joissa alennus on voimassa.
          </p>
        </Reveal>

        <div className="panel mt-10 overflow-hidden">
          <div className="hidden gap-4 border-b border-[var(--line)] bg-[linear-gradient(90deg,rgba(224,122,40,0.12),transparent)] px-5 py-4 md:grid md:grid-cols-[minmax(7.5rem,0.7fr)_repeat(3,1fr)] md:px-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Kortti
            </p>
            {categories.map((category) => (
              <p
                key={category.key}
                className="text-xs font-bold uppercase tracking-[0.14em] text-accent"
              >
                {category.title}
              </p>
            ))}
          </div>
          <ul className="divide-y divide-[var(--line)]">
            {reducedRows.map((row) => (
              <li
                key={`reduced-${row.product}`}
                className="grid gap-4 px-5 py-5 md:grid-cols-[minmax(7.5rem,0.7fr)_repeat(3,1fr)] md:items-start md:px-7 md:py-6"
              >
                <p className="font-display text-lg font-semibold tracking-tight">
                  {row.product}
                </p>
                {categories.map((category) => {
                  const parsed = parseMembershipPrice(row[category.key]);
                  return (
                    <div key={`${row.product}-${category.key}`}>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted md:hidden">
                        {category.title}
                      </p>
                      <ReducedCell group={parsed.reduced} />
                    </div>
                  );
                })}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
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
      className={`panel overflow-hidden ${
        category.key === "fitness" ? "ring-1 ring-accent/25" : ""
      }`}
    >
      <div className="border-b border-[var(--line)] bg-[linear-gradient(90deg,rgba(224,122,40,0.12),transparent)] px-5 py-5 md:px-7">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          {category.title}
        </p>
        <p className="mt-2 text-sm text-muted">{category.note}</p>
      </div>
      <div className="hidden gap-4 border-b border-[var(--line)] px-5 py-3 md:grid md:grid-cols-[minmax(7.5rem,0.7fr)_1fr_1.2fr] md:px-7">
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

          return (
            <li
              key={`${category.key}-${row.product}`}
              className={`grid gap-3 px-5 py-5 md:grid-cols-[minmax(7.5rem,0.7fr)_1fr_1.2fr] md:items-start md:px-7 md:py-6 ${
                isBestValue ? "bg-[rgba(224,122,40,0.06)]" : ""
              }`}
            >
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
              <PriceBlock
                label="Normaalihinta"
                group={parsed.regular}
                empty={parsed.empty}
              />
              <div className={parsed.reduced ? undefined : "hidden md:block"}>
                <PriceBlock
                  label="Opiskelija, eläkeläinen ja työtön"
                  group={parsed.reduced}
                  empty={parsed.empty}
                  reduced
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PriceBlock({
  label,
  group,
  empty,
  reduced = false,
}: {
  label: string;
  group: ParsedPriceGroup | null;
  empty: boolean;
  reduced?: boolean;
}) {
  const hasPrice = Boolean(group);

  return (
    <div
      className={`rounded-xl px-3 py-3 md:px-4 ${
        reduced && hasPrice
          ? "bg-[rgba(224,122,40,0.1)] ring-1 ring-accent/15"
          : reduced
            ? "bg-transparent"
            : "bg-white/60 md:bg-transparent"
      }`}
    >
      <p
        className={`text-[0.65rem] font-bold uppercase tracking-[0.12em] md:hidden ${
          reduced && hasPrice ? "text-accent" : "text-muted"
        }`}
      >
        {label}
      </p>
      {empty || !group ? (
        <p className={`font-medium text-muted ${reduced ? "mt-1 md:mt-0" : "mt-1 md:mt-0"}`}>
          —
        </p>
      ) : (
        <PriceLines group={group} strong={reduced} />
      )}
    </div>
  );
}

function ReducedCell({ group }: { group: ParsedPriceGroup | null }) {
  if (!group) {
    return <p className="font-medium text-muted">—</p>;
  }

  return (
    <div className="rounded-xl bg-[rgba(224,122,40,0.1)] px-3 py-3 ring-1 ring-accent/15 md:bg-transparent md:px-0 md:py-0 md:ring-0">
      <PriceLines group={group} strong />
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
  return (
    <div className="mt-1 md:mt-0">
      <p
        className={`font-display font-semibold tracking-tight ${
          strong ? "text-xl text-ink md:text-2xl" : "text-lg text-ink md:text-xl"
        }`}
      >
        {group.primary}
      </p>
      {group.monthly ? (
        <p className="mt-0.5 text-sm font-semibold text-accent">{group.monthly}</p>
      ) : null}
    </div>
  );
}
