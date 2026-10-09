"use client";

import { FlyerImageEditor } from "@/components/admin/FlyerImageEditor";
import { Card, Checkbox, Field, ItemBox, TextArea } from "@/components/admin/fields";
import {
  createEmptyCustomSection,
  type CustomOfferCard,
  type CustomOfferSection,
} from "@/lib/offers-client";
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

function SectionMetaFields({
  titleLabel,
  title,
  onTitleChange,
  description,
  onDescriptionChange,
}: {
  titleLabel?: string;
  title: string;
  onTitleChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-4 rounded-xl border border-dashed border-accent/30 bg-[rgba(224,122,40,0.04)] p-4 md:grid-cols-2">
      <Field
        label={titleLabel ?? "Osion nimi hallinnassa / sivulla"}
        value={title}
        onChange={onTitleChange}
      />
      <TextArea
        label="Osion kuvaus"
        hint="Näkyy hallinnan kortin otsikon alla. Voit muokata vapaasti."
        value={description}
        rows={2}
        onChange={onDescriptionChange}
      />
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

  function updateCustom(index: number, next: CustomOfferSection) {
    const customSections = [...offers.customSections];
    customSections[index] = next;
    patch({ customSections });
  }

  function updateCustomCard(
    sectionIndex: number,
    cardIndex: number,
    next: CustomOfferCard,
  ) {
    const section = offers.customSections[sectionIndex];
    const cards = [...section.cards];
    cards[cardIndex] = next;
    updateCustom(sectionIndex, { ...section, cards });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-accent/25 bg-[rgba(224,122,40,0.06)] px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-ink">Omat tarjousosiot</p>
          <p className="mt-0.5 text-sm text-muted">
            Lisää kokonaan uusi osio tarjoukset-sivulle (otsikko, teksti ja
            kortit).
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            patch({
              customSections: [
                ...offers.customSections,
                createEmptyCustomSection(),
              ],
            })
          }
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent/90"
        >
          + Lisää uusi tarjousosio
        </button>
      </div>

      <Card
        title={offers.trialEyebrow || "Tutustumistreenit"}
        description={offers.trialSectionDescription}
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
        <SectionMetaFields
          title={offers.trialEyebrow}
          onTitleChange={(value) => patch({ trialEyebrow: value })}
          description={offers.trialSectionDescription}
          onDescriptionChange={(value) =>
            patch({ trialSectionDescription: value })
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
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
                label="Tarjoushinta"
                value={item.price}
                onChange={(value) =>
                  updateTrial(index, { ...item, price: value })
                }
              />
              <Field
                label="Normaalihinta (yliviivattu)"
                hint="Esim. 49 €. Jätä tyhjäksi, jos et halua yliviivausta."
                value={item.was || ""}
                onChange={(value) =>
                  updateTrial(index, { ...item, was: value })
                }
              />
            </ItemBox>
          ))}
        </div>
      </Card>

      <Card
        title={offers.yearBadge || "Vuoden superetu"}
        description={offers.yearSectionDescription}
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
        <SectionMetaFields
          title={offers.yearBadge}
          onTitleChange={(value) => patch({ yearBadge: value })}
          description={offers.yearSectionDescription}
          onDescriptionChange={(value) =>
            patch({ yearSectionDescription: value })
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
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
          label="Kuvausteksti sivulla"
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
        title={offers.ptEyebrow || "PT-kampanja"}
        description={offers.ptSectionDescription}
        appearsOn="/tarjoukset"
      >
        <VisibilityToggle
          checked={offers.visibility.pt}
          onChange={(value) => setVisibility("pt", value)}
        />
        <SectionMetaFields
          title={offers.ptEyebrow}
          onTitleChange={(value) => patch({ ptEyebrow: value })}
          description={offers.ptSectionDescription}
          onDescriptionChange={(value) =>
            patch({ ptSectionDescription: value })
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
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

      <Card
        title={offers.aerialEyebrow || "Aerial Bungee"}
        description={offers.aerialSectionDescription}
        appearsOn="/tarjoukset"
      >
        <VisibilityToggle
          checked={offers.visibility.aerial}
          onChange={(value) => setVisibility("aerial", value)}
        />
        <SectionMetaFields
          title={offers.aerialEyebrow}
          onTitleChange={(value) => patch({ aerialEyebrow: value })}
          description={offers.aerialSectionDescription}
          onDescriptionChange={(value) =>
            patch({ aerialSectionDescription: value })
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
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
        title={offers.treatmentsEyebrow || "Hoitosarjat"}
        description={offers.treatmentsSectionDescription}
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
        <SectionMetaFields
          title={offers.treatmentsEyebrow}
          onTitleChange={(value) => patch({ treatmentsEyebrow: value })}
          description={offers.treatmentsSectionDescription}
          onDescriptionChange={(value) =>
            patch({ treatmentsSectionDescription: value })
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
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
          label="Kuvausteksti sivulla"
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

      {offers.customSections.map((section, sectionIndex) => (
        <Card
          key={section.id}
          title={section.eyebrow || "Oma tarjousosio"}
          description={section.description}
          appearsOn="/tarjoukset"
          tone="accent"
          actions={
            <div className="flex flex-wrap gap-2">
              <CardActions
                addLabel="+ Lisää kortti"
                onAdd={() =>
                  updateCustom(sectionIndex, {
                    ...section,
                    cards: [
                      ...section.cards,
                      {
                        title: "Uusi kortti",
                        offer: "Tarjous",
                        price: "",
                        note: "",
                        hidden: false,
                      },
                    ],
                  })
                }
              />
              <button
                type="button"
                onClick={() =>
                  patch({
                    customSections: offers.customSections.filter(
                      (_, i) => i !== sectionIndex,
                    ),
                  })
                }
                className="rounded-full border border-signal/40 px-3 py-1.5 text-xs font-semibold text-signal transition hover:bg-[rgba(212,84,42,0.08)]"
              >
                Poista osio
              </button>
            </div>
          }
        >
          <VisibilityToggle
            checked={!section.hidden}
            onChange={(visible) =>
              updateCustom(sectionIndex, { ...section, hidden: !visible })
            }
          />
          <SectionMetaFields
            title={section.eyebrow}
            onTitleChange={(value) =>
              updateCustom(sectionIndex, { ...section, eyebrow: value })
            }
            description={section.description}
            onDescriptionChange={(value) =>
              updateCustom(sectionIndex, { ...section, description: value })
            }
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Pääotsikko"
              value={section.heading}
              onChange={(value) =>
                updateCustom(sectionIndex, { ...section, heading: value })
              }
            />
            <Field
              label="Tarjousmerkki"
              value={section.badge}
              onChange={(value) =>
                updateCustom(sectionIndex, { ...section, badge: value })
              }
            />
            <Field
              label="Hyppylinkin teksti"
              value={section.jumpLabel}
              onChange={(value) =>
                updateCustom(sectionIndex, { ...section, jumpLabel: value })
              }
            />
            <label className="grid gap-1.5 text-sm">
              <span className="font-semibold text-ink">Ulkoasu</span>
              <select
                value={section.tone}
                onChange={(e) =>
                  updateCustom(sectionIndex, {
                    ...section,
                    tone: e.target.value === "dark" ? "dark" : "light",
                  })
                }
                className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-[0.95rem] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              >
                <option value="light">Vaalea</option>
                <option value="dark">Tumma</option>
              </select>
            </label>
          </div>
          <TextArea
            label="Kuvausteksti sivulla"
            value={section.lead}
            onChange={(value) =>
              updateCustom(sectionIndex, { ...section, lead: value })
            }
          />
          <div className="space-y-4">
            {section.cards.map((card, cardIndex) => (
              <ItemBox
                key={`${section.id}-card-${cardIndex}`}
                className={`md:grid-cols-2 ${card.hidden ? "opacity-60" : ""}`}
              >
                <div className="md:col-span-2">
                  <ItemToolbar
                    hidden={Boolean(card.hidden)}
                    onHiddenChange={(hidden) =>
                      updateCustomCard(sectionIndex, cardIndex, {
                        ...card,
                        hidden,
                      })
                    }
                    onRemove={() =>
                      updateCustom(sectionIndex, {
                        ...section,
                        cards: section.cards.filter((_, i) => i !== cardIndex),
                      })
                    }
                    canRemove={section.cards.length > 1}
                  />
                </div>
                <Field
                  label="Otsikko"
                  value={card.title}
                  onChange={(value) =>
                    updateCustomCard(sectionIndex, cardIndex, {
                      ...card,
                      title: value,
                    })
                  }
                />
                <Field
                  label="Tarjousmerkintä"
                  value={card.offer}
                  onChange={(value) =>
                    updateCustomCard(sectionIndex, cardIndex, {
                      ...card,
                      offer: value,
                    })
                  }
                />
                <Field
                  label="Hinta"
                  value={card.price}
                  onChange={(value) =>
                    updateCustomCard(sectionIndex, cardIndex, {
                      ...card,
                      price: value,
                    })
                  }
                />
                <Field
                  label="Huomautus"
                  value={card.note}
                  onChange={(value) =>
                    updateCustomCard(sectionIndex, cardIndex, {
                      ...card,
                      note: value,
                    })
                  }
                />
              </ItemBox>
            ))}
          </div>
        </Card>
      ))}

      <FlyerImageEditor />
    </div>
  );
}
