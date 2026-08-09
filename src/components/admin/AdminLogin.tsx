"use client";

import { useState } from "react";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kirjautuminen epäonnistui");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Virhe");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <form
        onSubmit={onSubmit}
        className="overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-sm"
      >
        <div className="border-b border-[var(--line)] bg-[#f8fafb] px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Hallinta
          </p>
          <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight">
            Kirjaudu sisään
          </h1>
        </div>
        <div className="space-y-4 px-6 py-6">
          <p className="text-sm text-muted leading-relaxed">
            Muokkaa hintoja, tarjouksia ja ryhmäliikuntatunteja ilman koodia.
          </p>
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-ink">Salasana</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="text-sm font-medium text-signal">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Kirjaudutaan…" : "Kirjaudu"}
          </button>
        </div>
      </form>
    </div>
  );
}
