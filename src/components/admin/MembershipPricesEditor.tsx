"use client";

import { Card, Field, ItemBox } from "@/components/admin/fields";
import {
  membershipCellParts,
  withMembershipReduced,
  withMembershipRegular,
} from "@/lib/membership-price";
import type { MembershipRow, PricesData } from "@/lib/prices";

const categories = [
  { key: "kuntosali", label: "Kuntosali" },
  { key: "ryhmaliikunta", label: "Ryhmäliikunta" },
  { key: "fitness", label: "Fitness" },
] as const;

export function MembershipPricesEditor({
  prices,
  setPrices,
}: {
  prices: PricesData;
  setPrices: (next: PricesData) => void;
}) {
  const updateRow = (index: number, next: MembershipRow) => {
    const membershipRows = [...prices.membershipRows];
    membershipRows[index] = next;
    setPrices({ ...prices, membershipRows });
  };

  return (
    <>
      <Card
        title="Normaalihinnat"
        description="Kuntosali, ryhmäliikunta ja Fitness. Kuukausihinta samassa kentässä, esim. 396 € tai 33 €/kk."
        appearsOn="/hinnat, /kuntosali"
      >
        {prices.membershipRows.map((row, index) => (
          <ItemBox key={`regular-${row.product}-${index}`} className="md:grid-cols-4">
            <Field
              label="Tuote"
              value={row.product}
              onChange={(value) => updateRow(index, { ...row, product: value })}
            />
            {categories.map((category) => {
              const parts = membershipCellParts(row[category.key]);
              return (
                <Field
                  key={category.key}
                  label={category.label}
                  value={parts.regular}
                  onChange={(value) =>
                    updateRow(index, {
                      ...row,
                      [category.key]: withMembershipRegular(
                        row[category.key],
                        value,
                      ),
                    })
                  }
                />
              );
            })}
          </ItemBox>
        ))}
      </Card>

      <Card
        title="Opiskelija, eläkeläinen ja työtön"
        description="Sama alennettu hinta kaikille kolmelle. Jätä kenttä tyhjäksi, jos alennusta ei ole."
        appearsOn="/hinnat"
        tone="accent"
      >
        {prices.membershipRows.map((row, index) => (
          <ItemBox
            key={`reduced-${row.product}-${index}`}
            className="border-accent/20 bg-[rgba(224,122,40,0.05)] md:grid-cols-4"
          >
            <div className="grid gap-1.5 text-sm">
              <span className="font-semibold text-ink">Tuote</span>
              <p className="px-1 py-2.5 font-display text-base font-semibold tracking-tight text-ink">
                {row.product}
              </p>
            </div>
            {categories.map((category) => {
              const parts = membershipCellParts(row[category.key]);
              return (
                <Field
                  key={category.key}
                  label={category.label}
                  value={parts.reduced}
                  onChange={(value) =>
                    updateRow(index, {
                      ...row,
                      [category.key]: withMembershipReduced(
                        row[category.key],
                        value,
                      ),
                    })
                  }
                />
              );
            })}
          </ItemBox>
        ))}
      </Card>
    </>
  );
}
