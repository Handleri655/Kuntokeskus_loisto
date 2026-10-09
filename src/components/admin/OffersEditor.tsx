"use client";

import { FlyerImageEditor } from "@/components/admin/FlyerImageEditor";
import { Card, Checkbox, Field, ItemBox, TextArea } from "@/components/admin/fields";
import type { OffersData, PriceItem, TreatmentItem } from "@/lib/prices";

type Props = {
  offers: OffersData;
  onChange: (offers: OffersData) => void;
};

function VisibilityToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <Checkbox
      label="Näytä osio sivulla"
      checked={checked}
      onChange={onChange}
      hint="Poista rasti, jos koko osio piilotetaan tarjoukset-sivulta."
    />
  );
}

function CardActions({
  onAdd,
  addLabel,
}: {
  onAdd: () => void;
  addLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="rounded-full border border-accent/40 bg-[rgba(224,122,40,0.08)] px-3 py-1.5 text-xs font-semibold text-accent transition hover:bg-[rgba(224,122,40,0.16)]"
    >
      {addLabel}
    </button>
  );
}

function ItemToolbar({
  hidden,
  onHiddenChange,
  onRemove,
  canRemove,
}: {
  hidden: boolean;
  onHiddenChange: (hidden: boolean) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
      <Checkbox
        label={hidden ? "Piilotettu sivulta" : "Näkyy sivulla"}
        checked={!hidden}
        onChange={(visible) => onHiddenChange(!visible)}
      />
      <button
        type="button"
        onClick={onRemove}
        disabled={!canRemove}
        className="rounded-full border border-signal/30 px-3 py-1 text-xs font-semibold text-signal transition hover:bg-[rgba(212,84,42,0.08)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Poista kortti
      </button>
    </div>
  );
}

export function OffersEditor({ offers, onChange }: Props) {
  function patch(partial: Partial<OffersData>) {
    onChange({ ...offers, ...partial });
  }

  function setVisibility(key: keyof OffersData["visibility"], value: boolean) {
    patch({
      visibility: { ...offers.visibility, [key]: value },
    });
  }

  function updateTrial(index: number, next: PriceItem) {
    const trialPrices = [...offers.trialPrices];
    trialPrices[index] = next;
    patch({ trialPrices });
  }

  function updateYear(index: number, next: PriceItem) {
    const yearPrices = [...offers.yearPrices];
    yearPrices[index] = next;
    patch({ yearPrices });
  }

  function updateTreatment(index: number, next: TreatmentItem) {
    const treatments = [...offers.treatments];
    treatments[index] = next;
    patch({ treatments });
  }

  return (
    <div className="space-y-4">
      <Card
        title="Tutustumistreenit"
        description="1 kk -tarjous uusille asiakkaille. Voit lisätä, piilottaa tai poistaa hintakortteja."
        appearsOn="/tarjoukset"
        actions={
          <CardActions
            addLabel="+ Lisää kortti"
            onAdd={() =>
              patch({
                trialPrices: [
                  ...offers.trialPrices,
                  { title: "Uusi tuote", price: "", hidden: false },
                ],
              })
            }
          />
        }
      >
        <VisibilityToggle
          checked={offers.visibility.trial}
          onChange={(value) => setVisibility("trial", value)}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Osion yläotsikko"
            value={offers.trialEyebrow}
            onChange={(value) => patch({ trialEyebrow: value })}
          />
          <Field
            label="Tarjousmerkki / hyppylinkki"
            hint="Esim. 1 kk −50 %"
            value={offers.trialBadge}
            onChange={(value) => patch({ trialBadge: value })}
          />
          <Field
            label="Pääotsikko"
            value={offers.trialHeading}
            onChange={(value) => patch({ trialHeading: value })}
          />
          <Field
            label="Huomautus"
            value={offers.trialNote}
            onChange={(value) => patch({ trialNote: value })}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {offers.trialPrices.map((item, index) => (
            <ItemBox
              key={`trial-${index}`}
              className={item.hidden ? "opacity-60" : ""}
            >
              <ItemToolbar
                hidden={Boolean(item.hidden)}
                onHiddenChange={(hidden) =>
                  updateTrial(index, { ...item, hidden })
                }
                onRemove={() =>
                  patch({
                    trialPrices: offers.trialPrices.filter((_, i) => i !== index),
                  })
                }
                canRemove={offers.trialPrices.length > 1}
              />
              <Field
                label="Tuote"
                value={item.title}
                onChange={(value) =>
                  updateTrial(index, { ...item, title: value })
                }
              />
              <Field
                label="Hinta"
                value={item.price}
                onChange={(value) =>
                  updateTrial(index, { ...item, price: value })
                }
              />
            </ItemBox>
          ))}
        </div>
      </Card>

      <Card
        title="Vuoden superetu"
        description="6–12 kk kuukausihinnat ja kaupan päälle -edut."
        appearsOn="/tarjoukset"
        actions={
          <CardActions
            addLabel="+ Lisää kortti"
            onAdd={() =>
              patch({
                yearPrices: [
                  ...offers.yearPrices,
                  {
                    title: "Uusi tuote",
                    price: "",
                    note: "",
                    hidden: false,
                  },
                ],
              })
            }
          />
        }
      >
        <VisibilityToggle
          checked={offers.visibility.year}
          onChange={(value) => setVisibility("year", value)}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Osion yläotsikko"
            value={offers.yearBadge}
            onChange={(value) => patch({ yearBadge: value })}
          />
          <Field
            label="Hyppylinkin teksti"
            hint="Esim. Vuoden etu"
            value={offers.jumpYear}
            onChange={(value) => patch({ jumpYear: value })}
          />
          <Field
            label="Pääotsikko"
            value={offers.yearHeading}
            onChange={(value) => patch({ yearHeading: value })}
          />
          <Field
            label="Kaupan päälle -otsikko"
            value={offers.bonusTitle}
            onChange={(value) => patch({ bonusTitle: value })}
          />
        </div>
        <TextArea
          label="Kuvausteksti"
          value={offers.yearNote}
          onChange={(value) => patch({ yearNote: value })}
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {offers.yearPrices.map((item, index) => (
            <ItemBox
              key={`year-${index}`}
              className={item.hidden ? "opacity-60" : ""}
            >
              <ItemToolbar
                hidden={Boolean(item.hidden)}
                onHiddenChange={(hidden) =>
                  updateYear(index, { ...item, hidden })
                }
                onRemove={() =>
                  patch({
                    yearPrices: offers.yearPrices.filter((_, i) => i !== index),
                  })
                }
                canRemove={offers.yearPrices.length > 1}
              />
              <Field
                label="Tuote"
                value={item.title}
                onChange={(value) =>
                  updateYear(index, { ...item, title: value })
                }
              />
              <Field
                label="Hinta"
                value={item.price}
                onChange={(value) =>
                  updateYear(index, { ...item, price: value })
                }
              />
              <Field
                label="Huomautus"
                value={item.note || ""}
                onChange={(value) =>
                  updateYear(index, { ...item, note: value })
                }
              />
            </ItemBox>
          ))}
        </div>
        <TextArea
          label="Kaupan päälle -edut"
          hint="Kirjoita yksi etu per rivi."
          value={offers.bonuses.join("\n")}
          rows={4}
          onChange={(value) =>
            patch({
              bonuses: value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean),
            })
          }
        />
      </Card>

      <Card
        title="PT-kampanja"
        description="Personal Training -osio. Tarjoushinnat muokataan PT-hinnat -välilehdellä."
        appearsOn="/tarjoukset"
      >
        <VisibilityToggle
          checked={offers.visibility.pt}
          onChange={(value) => setVisibility("pt", value)}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Osion yläotsikko"
            value={offers.ptEyebrow}
            onChange={(value) => patch({ ptEyebrow: value })}
          />
          <Field
            label="Otsikko"
            value={offers.ptTitle}
            onChange={(value) => patch({ ptTitle: value })}
          />
        </div>
        <TextArea
          label="Teksti"
          hint="Jos tekstissä on −25 %, se näkyy myös hyppylinkissä."
          value={offers.ptText}
          onChange={(value) => patch({ ptText: value })}
        />
      </Card>

      <Card title="Aerial Bungee -tarjous" appearsOn="/tarjoukset">
        <VisibilityToggle
          checked={offers.visibility.aerial}
          onChange={(value) => setVisibility("aerial", value)}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Osion yläotsikko"
            value={offers.aerialEyebrow}
            onChange={(value) => patch({ aerialEyebrow: value })}
          />
          <Field
            label="Hyppylinkin teksti"
            value={offers.jumpAerial}
            onChange={(value) => patch({ jumpAerial: value })}
          />
          <Field
            label="Pääotsikko"
            value={offers.aerialHeading}
            onChange={(value) => patch({ aerialHeading: value })}
          />
          <Field
            label="Tarjousmerkki"
            hint="Esim. −50 % 10.9. asti"
            value={offers.aerialBadge}
            onChange={(value) => patch({ aerialBadge: value })}
          />
        </div>
        <TextArea
          label="Teksti"
          value={offers.aerialText}
          onChange={(value) => patch({ aerialText: value })}
        />
      </Card>

      <Card
        title="Hoitosarjat"
        description="Hyvinvointitarjoukset. Lisää uusia kortteja tai piilota / poista vanhoja."
        appearsOn="/tarjoukset"
        actions={
          <CardActions
            addLabel="+ Lisää kortti"
            onAdd={() =>
              patch({
                treatments: [
                  ...offers.treatments,
                  {
                    title: "Uusi hoito",
                    offer: "Tarjous",
                    price: "",
                    note: "",
                    hidden: false,
                  },
                ],
              })
            }
          />
        }
      >
        <VisibilityToggle
          checked={offers.visibility.treatments}
          onChange={(value) => setVisibility("treatments", value)}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Osion yläotsikko"
            value={offers.treatmentsEyebrow}
            onChange={(value) => patch({ treatmentsEyebrow: value })}
          />
          <Field
            label="Hyppylinkin teksti"
            value={offers.jumpTreatments}
            onChange={(value) => patch({ jumpTreatments: value })}
          />
          <Field
            label="Pääotsikko"
            value={offers.treatmentsHeading}
            onChange={(value) => patch({ treatmentsHeading: value })}
          />
        </div>
        <TextArea
          label="Kuvausteksti"
          value={offers.treatmentsLead}
          onChange={(value) => patch({ treatmentsLead: value })}
        />
        <div className="space-y-4">
          {offers.treatments.map((item, index) => (
            <ItemBox
              key={`treatment-${index}`}
              className={`md:grid-cols-2 ${item.hidden ? "opacity-60" : ""}`}
            >
              <div className="md:col-span-2">
                <ItemToolbar
                  hidden={Boolean(item.hidden)}
                  onHiddenChange={(hidden) =>
                    updateTreatment(index, { ...item, hidden })
                  }
                  onRemove={() =>
                    patch({
                      treatments: offers.treatments.filter((_, i) => i !== index),
                    })
                  }
                  canRemove={offers.treatments.length > 1}
                />
              </div>
              <Field
                label="Otsikko"
                value={item.title}
                onChange={(value) =>
                  updateTreatment(index, { ...item, title: value })
                }
              />
              <Field
                label="Tarjousmerkintä"
                value={item.offer}
                onChange={(value) =>
                  updateTreatment(index, { ...item, offer: value })
                }
              />
              <Field
                label="Hinta"
                value={item.price}
                onChange={(value) =>
                  updateTreatment(index, { ...item, price: value })
                }
              />
              <Field
                label="Huomautus"
                hint="Voit kirjoittaa esim. Norm. 245 € – se näkyy yliviivattuna."
                value={item.note}
                onChange={(value) =>
                  updateTreatment(index, { ...item, note: value })
                }
              />
            </ItemBox>
          ))}
        </div>
      </Card>

      <FlyerImageEditor />
    </div>
  );
}
