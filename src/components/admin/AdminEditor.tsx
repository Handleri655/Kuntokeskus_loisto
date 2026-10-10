"use client";

import { useEffect, useMemo, useState } from "react";
import { MembershipPricesEditor } from "@/components/admin/MembershipPricesEditor";
import { OffersEditor } from "@/components/admin/OffersEditor";
import { Card, Field, ItemBox, TextArea } from "@/components/admin/fields";
import type { PricesData } from "@/lib/prices";

type Props = {
  initialPrices: PricesData;
  storageMode: "cloud" | "file";
};

type TabId = "hinnasto" | "tarjoukset" | "pt" | "palvelut" | "ryhmaliikunta";

const tabs: { id: TabId; label: string }[] = [
  { id: "hinnasto", label: "Hinnasto" },
  { id: "tarjoukset", label: "Tarjoukset" },
  { id: "pt", label: "PT-hinnat" },
  { id: "palvelut", label: "Palveluhinnat" },
  { id: "ryhmaliikunta", label: "Ryhmäliikunta" },
];

const ptFields = [
  ["ohjelma1", "Treeniohjelma 1 pv/vko"],
  ["ohjelma2", "Treeniohjelma 2 pv/vko"],
  ["ohjelma3", "Treeniohjelma 3 pv/vko"],
  ["kuntotesti", "Kuntotesti"],
  ["kehonkoostumus", "Kehonkoostumusmittaus"],
  ["ruokavalio", "Ravinto-ohjelma"],
  ["pt2", "PT 2 kertaa"],
  ["pt5", "PT 5 kertaa"],
  ["pt10", "PT 10 kertaa"],
  ["pt10Offer", "PT 10 kertaa, tarjoushinta"],
  ["pt15", "PT 15 kertaa"],
  ["pt15Offer", "PT 15 kertaa, tarjoushinta"],
] as const;

const servicePriceFields = [
  ["aerialIntensivi", "Aerial Bungee intensiivi 75 min"],
  ["aerial5x", "Aerial Bungee 5× 55 min"],
  ["aerial3x", "Aerial Bungee 3× 55 min"],
  ["crossKerta", "Cross Training kertamaksu"],
  ["cross6x", "Cross Training 6× kurssi"],
  ["aanimaljaMember", "Äänimaljarentoutus, jäsen"],
  ["aanimaljaGuest", "Äänimaljarentoutus, ei-jäsen"],
  ["painonpudotusIntensiivi", "Painonpudotus PT intensiivi 5×"],
  ["painonpudotusDuo", "Painonpudotus duo-tarjous"],
] as const;

const SAVED_FLASH_KEY = "loisto-admin-saved-at";
const SAVED_FLASH_MS = 10000;

function Feedback({
  status,
  error,
}: {
  status: string | null;
  error: string | null;
}) {
  if (error) {
    return (
      <p
        role="alert"
        className="rounded-xl border border-signal/25 bg-[rgba(212,84,42,0.1)] px-4 py-3 text-sm font-semibold text-signal"
      >
        Tallennus epäonnistui: {error}
      </p>
    );
  }
  if (status) {
    return (
      <p
        role="status"
        className="rounded-xl border border-emerald-400 bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-900"
      >
        {status}
      </p>
    );
  }
  return null;
}

export function AdminEditor({
  initialPrices,
  storageMode,
}: Props) {
  const [prices, setPrices] = useState(initialPrices);
  const [savedPrices, setSavedPrices] = useState(initialPrices);
  const [tab, setTab] = useState<TabId>("hinnasto");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const dirty = useMemo(
    () => JSON.stringify(prices) !== JSON.stringify(savedPrices),
    [prices, savedPrices],
  );

  const updatedLabel = useMemo(() => {
    try {
      return new Date(prices.updatedAt).toLocaleString("fi-FI");
    } catch {
      return prices.updatedAt;
    }
  }, [prices.updatedAt]);

  useEffect(() => {
    const raw = sessionStorage.getItem(SAVED_FLASH_KEY);
    if (!raw) return;
    const savedAt = Number(raw);
    if (Number.isFinite(savedAt) && Date.now() - savedAt < SAVED_FLASH_MS) {
      setJustSaved(true);
      setStatus("Tallennus onnistui. Muutokset näkyvät sivuilla heti.");
    } else {
      sessionStorage.removeItem(SAVED_FLASH_KEY);
    }
  }, []);

  useEffect(() => {
    if (!status && !justSaved) return;
    const remaining = (() => {
      const raw = sessionStorage.getItem(SAVED_FLASH_KEY);
      const savedAt = raw ? Number(raw) : Date.now();
      return Math.max(0, SAVED_FLASH_MS - (Date.now() - savedAt));
    })();
    const timer = window.setTimeout(() => {
      setStatus(null);
      setJustSaved(false);
      sessionStorage.removeItem(SAVED_FLASH_KEY);
    }, remaining || SAVED_FLASH_MS);
    return () => window.clearTimeout(timer);
  }, [status, justSaved]);

  async function save() {
    sessionStorage.setItem(SAVED_FLASH_KEY, String(Date.now()));
    setSaving(true);
    setStatus(null);
    setError(null);
    setJustSaved(false);
    try {
      const pricesRes = await fetch("/api/prices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prices),
      });

      const pricesData = await pricesRes.json();

      if (!pricesRes.ok) {
        throw new Error(pricesData.error || "Hintojen tallennus epäonnistui");
      }

      sessionStorage.setItem(SAVED_FLASH_KEY, String(Date.now()));
      setPrices(pricesData);
      setSavedPrices(pricesData);
      setJustSaved(true);
      setStatus("Tallennus onnistui. Muutokset näkyvät sivuilla heti.");
    } catch (err) {
      sessionStorage.removeItem(SAVED_FLASH_KEY);
      setJustSaved(false);
      setError(err instanceof Error ? err.message : "Virhe tallennuksessa");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  const activeTabLabel = tabs.find((item) => item.id === tab)?.label ?? "";

  return (
    <div className="pb-4 md:pb-10">
      <div className="sticky top-[4.5rem] z-40 -mx-1 mb-4 border-b border-[var(--line)] bg-[rgba(251,252,253,0.97)] px-1 py-3 backdrop-blur-xl sm:mb-6 sm:py-4 md:top-[5.25rem]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              Hallinta
            </h1>
            <p className="mt-0.5 text-xs text-muted sm:mt-1 sm:text-sm">
              <span className="sm:hidden">{activeTabLabel}</span>
              <span className="hidden sm:inline">
                Viimeksi tallennettu {updatedLabel}
              </span>
              {dirty ? (
                <span className="ml-1.5 font-semibold text-accent sm:ml-2">
                  · tallentamaton
                </span>
              ) : null}
            </p>
            <p
              className={`mt-2 hidden rounded-full px-3 py-1 text-xs font-semibold sm:inline-flex ${
                storageMode === "cloud"
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-[#ffe8c8] text-[#8a5a00]"
              }`}
            >
              {storageMode === "cloud"
                ? "Pilvitallennus käytössä"
                : "Paikallinen tallennus – lisää Upstash tuotantoon"}
            </p>
          </div>
          <div className="hidden flex-wrap justify-end gap-2 md:flex">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60 ${
                justSaved ? "bg-emerald-600" : "bg-accent"
              }`}
            >
              {saving ? "Tallennetaan…" : justSaved ? "Tallennettu" : "Tallenna"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-[var(--line)] bg-white px-5 py-2.5 text-sm font-semibold"
            >
              Kirjaudu ulos
            </button>
          </div>
          <button
            type="button"
            onClick={logout}
            className="shrink-0 rounded-full border border-[var(--line)] bg-white px-3 py-2 text-xs font-semibold md:hidden"
          >
            Ulos
          </button>
        </div>

        {status || error ? (
          <div className="mt-3 hidden md:block">
            <Feedback status={status} error={error} />
          </div>
        ) : null}

        <div
          className="-mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory sm:mt-4 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Hallinnan osiot"
        >
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={`min-h-11 shrink-0 snap-start rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                tab === item.id
                  ? "bg-ink text-white shadow-sm"
                  : "bg-white text-ink-soft ring-1 ring-[var(--line)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-[rgba(251,252,253,0.97)] px-3 py-3 backdrop-blur-xl md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {status || error ? (
          <div className="mb-2">
            <Feedback status={status} error={error} />
          </div>
        ) : null}
        <div className="flex items-center gap-2">
          {dirty ? (
            <p className="min-w-0 flex-1 text-xs font-semibold text-accent">
              Tallentamattomia muutoksia
            </p>
          ) : (
            <p className="min-w-0 flex-1 truncate text-xs text-muted">
              {justSaved ? "Tallennettu" : `Tallennettu ${updatedLabel}`}
            </p>
          )}
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className={`min-h-12 min-w-[8.5rem] rounded-full px-5 text-sm font-semibold text-white disabled:opacity-60 ${
              justSaved ? "bg-emerald-600" : "bg-accent"
            }`}
          >
            {saving ? "Tallennetaan…" : justSaved ? "Tallennettu" : "Tallenna"}
          </button>
        </div>
      </div>

      {tab === "hinnasto" ? (
        <div className="space-y-4">
          <Card
            title="Hinnastosivun otsikot"
            description="Korostushinnat näkyvät myös etusivulla ja ryhmäliikunnassa."
            appearsOn="/hinnat"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Yläotsikko"
                hint="Pieni rivi otsikon yläpuolella"
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
                label="Kuntosali, hintanosto"
                hint="Esim. 33 €/kk"
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
                label="Ryhmäliikunta, hintanosto"
                hint="Esim. 43 €/kk"
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
                label="Fitness, hintanosto"
                hint="Esim. 56 €/kk"
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

          <MembershipPricesEditor prices={prices} setPrices={setPrices} />

          <Card
            title="Lisähinnat"
            description="Esim. Aerial Bungee, solarium ja ohjelmat."
            appearsOn="/hinnat"
          >
            {prices.extras.map((item, index) => (
              <ItemBox key={`${item.title}-${index}`} className="md:grid-cols-2">
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
                  label="Hinta tai selite"
                  value={item.text}
                  onChange={(value) => {
                    const extras = [...prices.extras];
                    extras[index] = { ...item, text: value };
                    setPrices({ ...prices, extras });
                  }}
                />
              </ItemBox>
            ))}
          </Card>

          <Card
            title="Etusivun kolme hintaa"
            description="Kolme nostoa etusivun tarjousosiossa."
            appearsOn="/"
          >
            <div className="grid gap-4 md:grid-cols-3">
              {prices.homeHighlights.map((item, index) => (
                <ItemBox key={`home-${index}`}>
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
                </ItemBox>
              ))}
            </div>
          </Card>
        </div>
      ) : null}

      {tab === "tarjoukset" ? (
        <OffersEditor
          offers={prices.offers}
          onChange={(offers) => setPrices({ ...prices, offers })}
        />
      ) : null}

      {tab === "pt" ? (
        <Card
          title="Personal Training -hinnat"
          description="Käytössä PT-, kuntosali- ja painonpudotussivuilla."
          appearsOn="/personal-training, /kuntosali, /painonpudotus"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {ptFields.map(([key, label]) => (
              <Field
                key={key}
                label={label}
                value={prices.personalTraining[key] ?? ""}
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

      {tab === "palvelut" ? (
        <Card
          title="Palvelusivujen hinnat"
          description="Nämä hinnat näkyvät suoraan palvelusivuilla. Aerial-hinnat päivittyvät myös hinnaston lisähintoihin."
          appearsOn="/aerial-bungee, /cross-training, /aanimaljarentoutus, /painonpudotus, /ryhmaliikunta"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {servicePriceFields.map(([key, label]) => (
              <Field
                key={key}
                label={label}
                value={prices.servicePrices[key]}
                onChange={(value) =>
                  setPrices({
                    ...prices,
                    servicePrices: {
                      ...prices.servicePrices,
                      [key]: value,
                    },
                  })
                }
              />
            ))}
          </div>
        </Card>
      ) : null}

      {tab === "ryhmaliikunta" ? (
        <Card
          title="Ryhmäliikuntasivun esittely"
          description="Teksti ryhmäliikuntasivun alussa. Tuntilista: yksi tunti per rivi."
          appearsOn="/ryhmaliikunta"
        >
          <TextArea
            label="Johdanto"
            hint="Varausohjeet ja yleiset tiedot"
            rows={4}
            value={prices.ryhmaliikuntaInfo.intro}
            onChange={(value) =>
              setPrices({
                ...prices,
                ryhmaliikuntaInfo: {
                  ...prices.ryhmaliikuntaInfo,
                  intro: value,
                },
              })
            }
          />
          <TextArea
            label="Tuntilista"
            hint="Yksi rivi = yksi kohta listassa"
            rows={8}
            value={prices.ryhmaliikuntaInfo.classes.join("\n")}
            onChange={(value) =>
              setPrices({
                ...prices,
                ryhmaliikuntaInfo: {
                  ...prices.ryhmaliikuntaInfo,
                  classes: value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                },
              })
            }
          />
          <TextArea
            label="Lopputeksti"
            hint="Ohjaajat ja mitä kortit sisältävät"
            rows={4}
            value={prices.ryhmaliikuntaInfo.outro}
            onChange={(value) =>
              setPrices({
                ...prices,
                ryhmaliikuntaInfo: {
                  ...prices.ryhmaliikuntaInfo,
                  outro: value,
                },
              })
            }
          />
        </Card>
      ) : null}

      <div className="mt-6 space-y-3 rounded-2xl border border-[var(--line)] bg-white p-4">
        <Feedback status={status} error={error} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {dirty
              ? "Muutoksia ei ole vielä tallennettu."
              : "Kaikki muutokset on tallennettu."}
          </p>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className={`rounded-full px-6 py-3 text-sm font-semibold text-white disabled:opacity-60 ${
              justSaved ? "bg-emerald-600" : "bg-accent"
            }`}
          >
            {saving ? "Tallennetaan…" : justSaved ? "Tallennettu" : "Tallenna muutokset"}
          </button>
        </div>
      </div>
    </div>
  );
}
