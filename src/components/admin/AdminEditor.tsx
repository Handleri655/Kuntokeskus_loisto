"use client";

import { useMemo, useState } from "react";
import { ScheduleEditor } from "@/components/admin/ScheduleEditor";
import { Card, Field, TextArea } from "@/components/admin/fields";
import type { PricesData } from "@/lib/prices";
import type { SchedulesData } from "@/lib/schedules";

type Props = {
  initialPrices: PricesData;
  initialSchedules: SchedulesData;
  storageMode: "cloud" | "file";
};

type TabId =
  | "hinnasto"
  | "tarjoukset"
  | "pt"
  | "syksy"
  | "kesa";

const tabs: { id: TabId; label: string; hint: string }[] = [
  { id: "hinnasto", label: "Hinnasto", hint: "Kortit ja lisähinnat" },
  { id: "tarjoukset", label: "Tarjoukset", hint: "Kampanjat ja edut" },
  { id: "pt", label: "PT-hinnat", hint: "Personal training" },
  { id: "syksy", label: "Tunnit (syksy)", hint: "Viikko-ohjelma" },
  { id: "kesa", label: "Tunnit (kesä)", hint: "Kesäohjelma" },
];

export function AdminEditor({
  initialPrices,
  initialSchedules,
  storageMode,
}: Props) {
  const [prices, setPrices] = useState(initialPrices);
  const [schedules, setSchedules] = useState(initialSchedules);
  const [tab, setTab] = useState<TabId>("hinnasto");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const updatedLabel = useMemo(() => {
    try {
      const latest = Math.max(
        new Date(prices.updatedAt).getTime(),
        new Date(schedules.updatedAt).getTime(),
      );
      return new Date(latest).toLocaleString("fi-FI");
    } catch {
      return prices.updatedAt;
    }
  }, [prices.updatedAt, schedules.updatedAt]);

  async function save() {
    setSaving(true);
    setStatus(null);
    setError(null);
    try {
      const [pricesRes, schedulesRes] = await Promise.all([
        fetch("/api/prices", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(prices),
        }),
        fetch("/api/schedules", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(schedules),
        }),
      ]);

      const pricesData = await pricesRes.json();
      const schedulesData = await schedulesRes.json();

      if (!pricesRes.ok) {
        throw new Error(pricesData.error || "Hintojen tallennus epäonnistui");
      }
      if (!schedulesRes.ok) {
        throw new Error(
          schedulesData.error || "Aikataulun tallennus epäonnistui",
        );
      }

      setPrices(pricesData);
      setSchedules(schedulesData);
      setStatus("Tallennettu. Muutokset näkyvät sivuilla heti.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Virhe tallennuksessa");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="pb-10">
      <div className="sticky top-[4.5rem] z-40 -mx-1 mb-6 border-b border-[var(--line)] bg-[rgba(243,245,247,0.92)] px-1 py-4 backdrop-blur-xl md:top-[5.25rem]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Hallinta
            </p>
            <h1 className="font-display mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
              Sivuston sisältö
            </h1>
            <p className="mt-1 text-sm text-muted">
              Viimeksi tallennettu: {updatedLabel}
            </p>
            <p
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                storageMode === "cloud"
                  ? "bg-[rgba(31,138,127,0.12)] text-accent"
                  : "bg-[#ffe8c8] text-[#8a5a00]"
              }`}
            >
              {storageMode === "cloud"
                ? "Pilvitallennus käytössä (Upstash)"
                : "Paikallinen tallennus – lisää Upstash tuotantoon"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Tallennetaan…" : "Tallenna"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-[var(--line)] bg-white px-5 py-2.5 text-sm font-semibold"
            >
              Kirjaudu ulos
            </button>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setTab(item.id);
                setStatus(null);
                setError(null);
              }}
              className={`min-w-[8.5rem] rounded-2xl px-4 py-3 text-left transition ${
                tab === item.id
                  ? "bg-ink text-white shadow-md"
                  : "bg-white text-ink-soft ring-1 ring-[var(--line)] hover:bg-mist"
              }`}
            >
              <div className="text-sm font-semibold">{item.label}</div>
              <div
                className={`mt-0.5 text-xs ${
                  tab === item.id ? "text-white/65" : "text-muted"
                }`}
              >
                {item.hint}
              </div>
            </button>
          ))}
        </div>
      </div>

      {status ? (
        <p className="mb-4 rounded-2xl border border-accent/25 bg-[rgba(31,138,127,0.08)] px-4 py-3 text-sm font-medium text-ink">
          {status}
        </p>
      ) : null}
      {error ? (
        <p className="mb-4 rounded-2xl border border-signal/30 bg-[rgba(228,87,46,0.08)] px-4 py-3 text-sm font-medium text-signal">
          {error}
        </p>
      ) : null}

      {tab === "hinnasto" ? (
        <div className="space-y-4">
          <Card
            title="Hinnastosivun otsikot"
            description="Näkyvät /hinnat-sivulla ja etusivun korostuksissa."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Pieni otsikko"
                value={prices.headline.eyebrow}
                onChange={(value) =>
                  setPrices({
                    ...prices,
                    headline: { ...prices.headline, eyebrow: value },
                  })
                }
              />
              <Field
                label="Pääotsikko"
                value={prices.headline.title}
                onChange={(value) =>
                  setPrices({
                    ...prices,
                    headline: { ...prices.headline, title: value },
                  })
                }
              />
              <Field
                label="Kuntosali (korostus)"
                value={prices.headline.highlightKuntosali}
                onChange={(value) =>
                  setPrices({
                    ...prices,
                    headline: {
                      ...prices.headline,
                      highlightKuntosali: value,
                    },
                  })
                }
              />
              <Field
                label="Ryhmäliikunta (korostus)"
                value={prices.headline.highlightRyhmaliikunta}
                onChange={(value) =>
                  setPrices({
                    ...prices,
                    headline: {
                      ...prices.headline,
                      highlightRyhmaliikunta: value,
                    },
                  })
                }
              />
              <Field
                label="Fitness (korostus)"
                value={prices.headline.highlightFitness}
                onChange={(value) =>
                  setPrices({
                    ...prices,
                    headline: {
                      ...prices.headline,
                      highlightFitness: value,
                    },
                  })
                }
              />
            </div>
            <TextArea
              label="Johdantoteksti"
              value={prices.headline.lead}
              onChange={(value) =>
                setPrices({
                  ...prices,
                  headline: { ...prices.headline, lead: value },
                })
              }
            />
          </Card>

          <Card
            title="Jäsenyystaulukko"
            description="Rivit sivulla /hinnat."
          >
            {prices.membershipRows.map((row, index) => (
              <div
                key={`${row.product}-${index}`}
                className="grid gap-3 rounded-xl bg-[#f8fafb] p-4 md:grid-cols-4"
              >
                <Field
                  label="Tuote"
                  value={row.product}
                  onChange={(value) => {
                    const membershipRows = [...prices.membershipRows];
                    membershipRows[index] = { ...row, product: value };
                    setPrices({ ...prices, membershipRows });
                  }}
                />
                <Field
                  label="Kuntosali"
                  value={row.kuntosali}
                  onChange={(value) => {
                    const membershipRows = [...prices.membershipRows];
                    membershipRows[index] = { ...row, kuntosali: value };
                    setPrices({ ...prices, membershipRows });
                  }}
                />
                <Field
                  label="Ryhmäliikunta"
                  value={row.ryhmaliikunta}
                  onChange={(value) => {
                    const membershipRows = [...prices.membershipRows];
                    membershipRows[index] = { ...row, ryhmaliikunta: value };
                    setPrices({ ...prices, membershipRows });
                  }}
                />
                <Field
                  label="Fitness"
                  value={row.fitness}
                  onChange={(value) => {
                    const membershipRows = [...prices.membershipRows];
                    membershipRows[index] = { ...row, fitness: value };
                    setPrices({ ...prices, membershipRows });
                  }}
                />
              </div>
            ))}
          </Card>

          <Card
            title="Lisähinnat"
            description="Esim. Aerial Bungee, solarium, ohjelmat."
          >
            {prices.extras.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="grid gap-3 rounded-xl bg-[#f8fafb] p-4 md:grid-cols-2"
              >
                <Field
                  label="Otsikko"
                  value={item.title}
                  onChange={(value) => {
                    const extras = [...prices.extras];
                    extras[index] = { ...item, title: value };
                    setPrices({ ...prices, extras });
                  }}
                />
                <Field
                  label="Teksti / hinta"
                  value={item.text}
                  onChange={(value) => {
                    const extras = [...prices.extras];
                    extras[index] = { ...item, text: value };
                    setPrices({ ...prices, extras });
                  }}
                />
              </div>
            ))}
          </Card>

          <Card
            title="Etusivun kolme hintaa"
            description="Näkyvät etusivun tarjousosiossa."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {prices.homeHighlights.map((item, index) => (
                <div
                  key={`home-${index}`}
                  className="grid gap-3 rounded-xl bg-[#f8fafb] p-4"
                >
                  <Field
                    label="Otsikko"
                    value={item.title}
                    onChange={(value) => {
                      const homeHighlights = [...prices.homeHighlights];
                      homeHighlights[index] = { ...item, title: value };
                      setPrices({ ...prices, homeHighlights });
                    }}
                  />
                  <Field
                    label="Hinta"
                    value={item.price}
                    onChange={(value) => {
                      const homeHighlights = [...prices.homeHighlights];
                      homeHighlights[index] = { ...item, price: value };
                      setPrices({ ...prices, homeHighlights });
                    }}
                  />
                  <Field
                    label="Huomautus"
                    value={item.note || ""}
                    onChange={(value) => {
                      const homeHighlights = [...prices.homeHighlights];
                      homeHighlights[index] = { ...item, note: value };
                      setPrices({ ...prices, homeHighlights });
                    }}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : null}

      {tab === "tarjoukset" ? (
        <div className="space-y-4">
          <Card
            title="Tutustumistreenit"
            description="1 kk -tarjous uusille asiakkaille."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Badge"
                value={prices.offers.trialBadge}
                onChange={(value) =>
                  setPrices({
                    ...prices,
                    offers: { ...prices.offers, trialBadge: value },
                  })
                }
              />
              <Field
                label="Huomautus"
                value={prices.offers.trialNote}
                onChange={(value) =>
                  setPrices({
                    ...prices,
                    offers: { ...prices.offers, trialNote: value },
                  })
                }
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {prices.offers.trialPrices.map((item, index) => (
                <div
                  key={`trial-${index}`}
                  className="grid gap-3 rounded-xl bg-[#f8fafb] p-4"
                >
                  <Field
                    label="Tuote"
                    value={item.title}
                    onChange={(value) => {
                      const trialPrices = [...prices.offers.trialPrices];
                      trialPrices[index] = { ...item, title: value };
                      setPrices({
                        ...prices,
                        offers: { ...prices.offers, trialPrices },
                      });
                    }}
                  />
                  <Field
                    label="Hinta"
                    value={item.price}
                    onChange={(value) => {
                      const trialPrices = [...prices.offers.trialPrices];
                      trialPrices[index] = { ...item, price: value };
                      setPrices({
                        ...prices,
                        offers: { ...prices.offers, trialPrices },
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card title="PT-kampanja" description="Tarjoukset-sivun PT-osio.">
            <Field
              label="Otsikko"
              value={prices.offers.ptTitle}
              onChange={(value) =>
                setPrices({
                  ...prices,
                  offers: { ...prices.offers, ptTitle: value },
                })
              }
            />
            <TextArea
              label="Teksti"
              value={prices.offers.ptText}
              onChange={(value) =>
                setPrices({
                  ...prices,
                  offers: { ...prices.offers, ptText: value },
                })
              }
            />
          </Card>

          <Card
            title="Vuoden superetu"
            description="6–12 kk kuukausihinnat."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {prices.offers.yearPrices.map((item, index) => (
                <div
                  key={`year-${index}`}
                  className="grid gap-3 rounded-xl bg-[#f8fafb] p-4"
                >
                  <Field
                    label="Tuote"
                    value={item.title}
                    onChange={(value) => {
                      const yearPrices = [...prices.offers.yearPrices];
                      yearPrices[index] = { ...item, title: value };
                      setPrices({
                        ...prices,
                        offers: { ...prices.offers, yearPrices },
                      });
                    }}
                  />
                  <Field
                    label="Hinta"
                    value={item.price}
                    onChange={(value) => {
                      const yearPrices = [...prices.offers.yearPrices];
                      yearPrices[index] = { ...item, price: value };
                      setPrices({
                        ...prices,
                        offers: { ...prices.offers, yearPrices },
                      });
                    }}
                  />
                  <Field
                    label="Huomautus"
                    value={item.note || ""}
                    onChange={(value) => {
                      const yearPrices = [...prices.offers.yearPrices];
                      yearPrices[index] = { ...item, note: value };
                      setPrices({
                        ...prices,
                        offers: { ...prices.offers, yearPrices },
                      });
                    }}
                  />
                </div>
              ))}
            </div>
            <Field
              label="Kaupan päälle -otsikko"
              value={prices.offers.bonusTitle}
              onChange={(value) =>
                setPrices({
                  ...prices,
                  offers: { ...prices.offers, bonusTitle: value },
                })
              }
            />
            <TextArea
              label="Kaupan päälle -edut"
              hint="Kirjoita yksi etu per rivi."
              value={prices.offers.bonuses.join("\n")}
              rows={4}
              onChange={(value) =>
                setPrices({
                  ...prices,
                  offers: {
                    ...prices.offers,
                    bonuses: value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean),
                  },
                })
              }
            />
          </Card>

          <Card title="Aerial Bungee -tarjous">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Badge"
                value={prices.offers.aerialBadge}
                onChange={(value) =>
                  setPrices({
                    ...prices,
                    offers: { ...prices.offers, aerialBadge: value },
                  })
                }
              />
              <Field
                label="Teksti"
                value={prices.offers.aerialText}
                onChange={(value) =>
                  setPrices({
                    ...prices,
                    offers: { ...prices.offers, aerialText: value },
                  })
                }
              />
            </div>
          </Card>

          <Card
            title="Hoitosarjat"
            description="Hyvinvointitarjoukset sivulla /tarjoukset."
          >
            {prices.offers.treatments.map((item, index) => (
              <div
                key={`treatment-${index}`}
                className="grid gap-3 rounded-xl bg-[#f8fafb] p-4 md:grid-cols-2"
              >
                <Field
                  label="Otsikko"
                  value={item.title}
                  onChange={(value) => {
                    const treatments = [...prices.offers.treatments];
                    treatments[index] = { ...item, title: value };
                    setPrices({
                      ...prices,
                      offers: { ...prices.offers, treatments },
                    });
                  }}
                />
                <Field
                  label="Tarjousmerkintä"
                  value={item.offer}
                  onChange={(value) => {
                    const treatments = [...prices.offers.treatments];
                    treatments[index] = { ...item, offer: value };
                    setPrices({
                      ...prices,
                      offers: { ...prices.offers, treatments },
                    });
                  }}
                />
                <Field
                  label="Hinta"
                  value={item.price}
                  onChange={(value) => {
                    const treatments = [...prices.offers.treatments];
                    treatments[index] = { ...item, price: value };
                    setPrices({
                      ...prices,
                      offers: { ...prices.offers, treatments },
                    });
                  }}
                />
                <Field
                  label="Huomautus"
                  value={item.note}
                  onChange={(value) => {
                    const treatments = [...prices.offers.treatments];
                    treatments[index] = { ...item, note: value };
                    setPrices({
                      ...prices,
                      offers: { ...prices.offers, treatments },
                    });
                  }}
                />
              </div>
            ))}
          </Card>
        </div>
      ) : null}

      {tab === "pt" ? (
        <Card
          title="Personal Training -hinnat"
          description="Näkyvät /personal-training- ja /painonpudotus-sivuilla."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {(
              [
                ["ohjelma1", "Ohjelma 1 pv"],
                ["ohjelma2", "Ohjelma 2 pv"],
                ["ohjelma3", "Ohjelma 3 pv"],
                ["ruokavalio", "Ruokavalio"],
                ["pt2", "PT 2×"],
                ["pt5", "PT 5×"],
                ["pt10", "PT 10× normaali"],
                ["pt10Offer", "PT 10× tarjous"],
                ["pt15", "PT 15× normaali"],
                ["pt15Offer", "PT 15× tarjous"],
              ] as const
            ).map(([key, label]) => (
              <Field
                key={key}
                label={label}
                value={prices.personalTraining[key]}
                onChange={(value) =>
                  setPrices({
                    ...prices,
                    personalTraining: {
                      ...prices.personalTraining,
                      [key]: value,
                    },
                  })
                }
              />
            ))}
          </div>
        </Card>
      ) : null}

      {tab === "syksy" ? (
        <ScheduleEditor
          mode="autumn"
          schedules={schedules}
          onChange={setSchedules}
        />
      ) : null}

      {tab === "kesa" ? (
        <ScheduleEditor
          mode="summer"
          schedules={schedules}
          onChange={setSchedules}
        />
      ) : null}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Tallennetaan…" : "Tallenna muutokset"}
        </button>
      </div>
    </div>
  );
}
