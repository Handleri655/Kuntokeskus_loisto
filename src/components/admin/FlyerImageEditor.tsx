"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/admin/fields";

type FlyerState = {
  custom: boolean;
  src: string;
};

export function FlyerImageEditor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [flyer, setFlyer] = useState<FlyerState | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/flyer")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Kuvaa ei voitu ladata");
        if (!cancelled) setFlyer({ custom: data.custom, src: data.src });
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Kuvaa ei voitu ladata");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    setStatus(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/flyer", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kuvan vaihto epäonnistui");
      setFlyer({ custom: true, src: data.src });
      setStatus("Tarjouslehden kuva on vaihdettu. Muutos näkyy sivulla heti.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kuvan vaihto epäonnistui");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function restore() {
    setBusy(true);
    setError(null);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/flyer", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Palautus epäonnistui");
      setFlyer({ custom: false, src: data.src });
      setStatus("Alkuperäinen tarjouslehti on palautettu.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Palautus epäonnistui");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card
      title="Tarjouslehti"
      description="Vaihda tarjoukset-sivun tarjouslehden kuva. Kuva tallentuu heti, erikseen muusta sisällöstä."
      appearsOn="/tarjoukset#lehti"
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,16rem)_1fr] md:items-start">
        <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-mist/40">
          {flyer ? (
            <img
              src={flyer.src}
              alt="Nykyinen tarjouslehti"
              className="aspect-[3/4] w-full object-cover object-top"
            />
          ) : (
            <div className="flex aspect-[3/4] items-center justify-center text-sm text-muted">
              Ladataan…
            </div>
          )}
        </div>
        <div className="grid gap-3">
          <p className="text-sm leading-relaxed text-muted">
            JPG, PNG tai WebP. Enimmäiskoko 3,5 Mt. Tämä ei käytä sivun
            Tallenna-nappia.
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            className="sr-only"
            disabled={busy}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file);
            }}
          />
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
              className="min-h-12 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white disabled:opacity-60 sm:min-h-0 sm:py-2.5"
            >
              {busy ? "Tallennetaan…" : "Vaihda kuva"}
            </button>
            {flyer?.custom ? (
              <button
                type="button"
                disabled={busy}
                onClick={() => void restore()}
                className="min-h-12 rounded-full border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold disabled:opacity-60 sm:min-h-0 sm:py-2.5"
              >
                Palauta alkuperäinen
              </button>
            ) : null}
          </div>
          {status ? (
            <p className="text-sm font-semibold text-emerald-800">{status}</p>
          ) : null}
          {error ? (
            <p className="text-sm font-semibold text-signal">{error}</p>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
