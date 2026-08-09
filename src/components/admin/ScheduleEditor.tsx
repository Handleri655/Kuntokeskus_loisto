"use client";

import { useState } from "react";
import { Card, Field, TextArea } from "@/components/admin/fields";
import type { ScheduleBlock, SchedulesData } from "@/lib/schedules";

function emptyClass() {
  return { time: "", name: "", note: "", instructor: "" };
}

function BlockEditor({
  block,
  onChange,
}: {
  block: ScheduleBlock;
  onChange: (block: ScheduleBlock) => void;
}) {
  const [openDay, setOpenDay] = useState(0);

  return (
    <div className="space-y-4">
      <Card
        title="Sivun tekstit"
        description="Nämä näkyvät ryhmäliikuntasivun yläosassa."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Pieni otsikko"
            value={block.eyebrow}
            onChange={(value) => onChange({ ...block, eyebrow: value })}
          />
          <Field
            label="Pääotsikko"
            value={block.title}
            onChange={(value) => onChange({ ...block, title: value })}
          />
          <Field
            label="Aikataulun otsikko"
            value={block.scheduleTitle}
            onChange={(value) => onChange({ ...block, scheduleTitle: value })}
          />
          <Field
            label="Aikataulun huomautus"
            value={block.scheduleNote}
            onChange={(value) => onChange({ ...block, scheduleNote: value })}
          />
        </div>
        <TextArea
          label="Johdantoteksti"
          value={block.lead}
          onChange={(value) => onChange({ ...block, lead: value })}
        />
      </Card>

      <Card
        title="Viikko-ohjelma"
        description="Valitse päivä ja muokkaa sen tunteja."
        actions={
          <button
            type="button"
            className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white"
            onClick={() => {
              onChange({
                ...block,
                days: [
                  ...block.days,
                  { day: "Uusi päivä", classes: [emptyClass()] },
                ],
              });
              setOpenDay(block.days.length);
            }}
          >
            + Päivä
          </button>
        }
      >
        <div className="flex flex-wrap gap-2">
          {block.days.map((day, index) => (
            <button
              key={`${day.day}-${index}`}
              type="button"
              onClick={() => setOpenDay(index)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                openDay === index
                  ? "bg-ink text-white"
                  : "bg-mist text-ink-soft hover:bg-[#dde3e8]"
              }`}
            >
              {day.day || `Päivä ${index + 1}`}
            </button>
          ))}
        </div>

        {block.days[openDay] ? (
          <div className="mt-2 space-y-4 rounded-2xl bg-[#f8fafb] p-4">
            <div className="flex flex-wrap items-end gap-3">
              <div className="min-w-[12rem] flex-1">
                <Field
                  label="Päivän nimi"
                  value={block.days[openDay].day}
                  onChange={(value) => {
                    const days = [...block.days];
                    days[openDay] = { ...days[openDay], day: value };
                    onChange({ ...block, days });
                  }}
                />
              </div>
              <button
                type="button"
                className="rounded-full border border-[var(--line)] bg-white px-4 py-2.5 text-xs font-semibold"
                onClick={() => {
                  const days = [...block.days];
                  days[openDay] = {
                    ...days[openDay],
                    classes: [...days[openDay].classes, emptyClass()],
                  };
                  onChange({ ...block, days });
                }}
              >
                + Tunti
              </button>
              <button
                type="button"
                className="rounded-full border border-signal/30 bg-white px-4 py-2.5 text-xs font-semibold text-signal"
                onClick={() => {
                  if (block.days.length <= 1) return;
                  const days = block.days.filter((_, i) => i !== openDay);
                  onChange({ ...block, days });
                  setOpenDay(Math.max(0, openDay - 1));
                }}
              >
                Poista päivä
              </button>
            </div>

            <div className="space-y-3">
              {block.days[openDay].classes.map((item, classIndex) => (
                <div
                  key={classIndex}
                  className="grid gap-3 rounded-xl border border-[var(--line)] bg-white p-4 md:grid-cols-2"
                >
                  <div className="flex items-center justify-between md:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      Tunti {classIndex + 1}
                    </p>
                    <button
                      type="button"
                      className="text-xs font-semibold text-signal"
                      onClick={() => {
                        const days = [...block.days];
                        days[openDay] = {
                          ...days[openDay],
                          classes: days[openDay].classes.filter(
                            (_, i) => i !== classIndex,
                          ),
                        };
                        onChange({ ...block, days });
                      }}
                    >
                      Poista tunti
                    </button>
                  </div>
                  <Field
                    label="Aika"
                    value={item.time}
                    hint="Esim. 18:00–18:55"
                    onChange={(value) => {
                      const days = [...block.days];
                      const classes = [...days[openDay].classes];
                      classes[classIndex] = { ...item, time: value };
                      days[openDay] = { ...days[openDay], classes };
                      onChange({ ...block, days });
                    }}
                  />
                  <Field
                    label="Tunnin nimi"
                    value={item.name}
                    onChange={(value) => {
                      const days = [...block.days];
                      const classes = [...days[openDay].classes];
                      classes[classIndex] = { ...item, name: value };
                      days[openDay] = { ...days[openDay], classes };
                      onChange({ ...block, days });
                    }}
                  />
                  <Field
                    label="Lisätieto"
                    value={item.note || ""}
                    onChange={(value) => {
                      const days = [...block.days];
                      const classes = [...days[openDay].classes];
                      classes[classIndex] = { ...item, note: value };
                      days[openDay] = { ...days[openDay], classes };
                      onChange({ ...block, days });
                    }}
                  />
                  <Field
                    label="Ohjaaja"
                    value={item.instructor || ""}
                    onChange={(value) => {
                      const days = [...block.days];
                      const classes = [...days[openDay].classes];
                      classes[classIndex] = { ...item, instructor: value };
                      days[openDay] = { ...days[openDay], classes };
                      onChange({ ...block, days });
                    }}
                  />
                </div>
              ))}
              {block.days[openDay].classes.length === 0 ? (
                <p className="text-sm text-muted">
                  Ei tunteja tälle päivälle. Lisää tunti yllä olevasta napista.
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
}

export function ScheduleEditor({
  schedules,
  onChange,
  mode,
}: {
  schedules: SchedulesData;
  onChange: (schedules: SchedulesData) => void;
  mode: "autumn" | "summer";
}) {
  if (mode === "autumn") {
    return (
      <BlockEditor
        block={schedules.autumn}
        onChange={(autumn) => onChange({ ...schedules, autumn })}
      />
    );
  }

  return (
    <BlockEditor
      block={schedules.summer}
      onChange={(summer) => onChange({ ...schedules, summer })}
    />
  );
}
