export type ParsedPriceGroup = {
  primary: string;
  monthly: string | null;
};

export type ParsedMembershipPrice = {
  empty: boolean;
  regular: ParsedPriceGroup | null;
  reduced: ParsedPriceGroup | null;
};

/** Parse CMS price cells such as `564 € tai 47 €/kk (516 € / 43 €)`. */
export function parseMembershipPrice(raw: string): ParsedMembershipPrice {
  const value = raw.trim();
  if (!value || value === "—") {
    return { empty: true, regular: null, reduced: null };
  }

  const reducedMatch = value.match(/\(([^)]+)\)\s*$/);
  let rest = reducedMatch ? value.slice(0, reducedMatch.index).trim() : value;
  const monthlyMatch = rest.match(/tai\s+([\d,.]+\s*€\/kk)/i);
  if (monthlyMatch?.index != null) {
    rest = rest.slice(0, monthlyMatch.index).replace(/\s*tai\s*$/i, "").trim();
  }

  return {
    empty: false,
    regular: {
      primary: rest,
      monthly: monthlyMatch ? monthlyMatch[1].trim() : null,
    },
    reduced: parseReducedGroup(reducedMatch?.[1] ?? null),
  };
}

export function membershipCellParts(raw: string): {
  regular: string;
  reduced: string;
} {
  const parsed = parseMembershipPrice(raw);
  if (parsed.empty) return { regular: "—", reduced: "" };
  return {
    regular: formatPriceGroup(parsed.regular),
    reduced: parsed.reduced ? formatPriceGroup(parsed.reduced) : "",
  };
}

export function withMembershipRegular(cell: string, regularInput: string): string {
  const current = membershipCellParts(cell);
  const incoming = membershipCellParts(regularInput.trim() || "—");
  const reduced = incoming.reduced || current.reduced;
  return joinMembershipCell(incoming.regular, reduced);
}

export function withMembershipReduced(cell: string, reducedInput: string): string {
  const current = membershipCellParts(cell);
  const trimmed = reducedInput.trim();
  if (!trimmed || trimmed === "—") {
    return joinMembershipCell(current.regular, "");
  }
  const incoming = membershipCellParts(trimmed);
  const reduced = incoming.reduced || incoming.regular;
  return joinMembershipCell(current.regular, reduced === "—" ? "" : reduced);
}

function parseReducedGroup(raw: string | null): ParsedPriceGroup | null {
  if (!raw) return null;
  const text = raw.trim();
  if (!text) return null;

  const parts = text.split(/\s*\/\s*/).map((part) => part.trim()).filter(Boolean);
  if (parts.length === 2) {
    const first = euroAmount(parts[0]);
    const second = euroAmount(parts[1]);
    if (first != null && second != null && first >= second * 2) {
      return {
        primary: withEuro(parts[0]),
        monthly: withPerMonth(parts[1]),
      };
    }
  }

  return { primary: text, monthly: null };
}

function joinMembershipCell(regular: string, reduced: string): string {
  const regularText = regular.trim();
  const reducedText = reduced.trim();
  const hasRegular = Boolean(regularText) && regularText !== "—";
  const hasReduced = Boolean(reducedText) && reducedText !== "—";
  if (!hasRegular && !hasReduced) return "—";
  if (!hasReduced) return hasRegular ? regularText : "—";
  const inner = reducedForParens(reducedText);
  if (!hasRegular) return `(${inner})`;
  return `${regularText} (${inner})`;
}

function formatPriceGroup(group: ParsedPriceGroup | null): string {
  if (!group?.primary) return "";
  if (group.monthly) return `${group.primary} tai ${group.monthly}`;
  return group.primary;
}

function reducedForParens(reduced: string): string {
  const parsed = parseMembershipPrice(reduced);
  const group = parsed.regular;
  if (!group?.primary) return reduced.trim();
  if (!group.monthly) return group.primary;
  return `${group.primary} / ${group.monthly.replace(/\s*\/kk$/i, "").trim()}`;
}

function euroAmount(value: string): number | null {
  const match = value.replace(",", ".").match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  return Number(match[1]);
}

function withEuro(value: string): string {
  return /€/.test(value) ? value : `${value} €`;
}

function withPerMonth(value: string): string {
  if (/\/kk/i.test(value)) return value;
  return `${withEuro(value)}/kk`;
}
