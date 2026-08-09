"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { moreNav, nav, site } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-[rgba(251,252,253,0.92)] text-ink shadow-[0_1px_0_var(--line)] backdrop-blur-xl"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4 md:h-[5.25rem]">
        <Link
          href="/"
          className="group leading-tight"
          onClick={() => setOpen(false)}
        >
          <div className="font-display text-[1.2rem] font-semibold tracking-tight md:text-[1.4rem]">
            Kuntokeskus{" "}
            <span className={scrolled || open ? "text-accent" : "text-accent-bright"}>
              Loisto
            </span>
          </div>
          <div
            className={`text-[0.68rem] uppercase tracking-[0.2em] ${
              scrolled || open ? "text-muted" : "text-white/65"
            }`}
          >
            Hollola
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-ink-soft hover:bg-mist hover:text-ink"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              type="button"
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-ink-soft hover:bg-mist hover:text-ink"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
              aria-expanded={moreOpen}
            >
              Lisää
            </button>
            <div
              className={`absolute right-0 top-full min-w-[14rem] pt-2 transition ${
                moreOpen
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white py-2 shadow-xl shadow-black/10">
                {moreNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-ink-soft transition hover:bg-mist hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className={`hidden rounded-full px-4 py-2.5 text-sm font-semibold transition md:inline-flex ${
              scrolled
                ? "bg-ink text-white hover:bg-ink-soft"
                : "bg-white text-ink hover:bg-white/90"
            }`}
          >
            {site.phone}
          </a>
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${
              scrolled || open
                ? "border-[var(--line)] text-ink"
                : "border-white/30 text-white"
            }`}
            aria-label={open ? "Sulje valikko" : "Avaa valikko"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Valikko</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full rounded-full bg-current transition ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden ${
          open ? "max-h-[100dvh] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden border-t border-[var(--line)] bg-[rgba(251,252,253,0.98)] transition-all duration-500`}
      >
        <div className="container-page flex max-h-[calc(100dvh-4.5rem)] flex-col gap-1 overflow-y-auto py-6 text-ink">
          {[...nav, ...moreNav].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 font-medium text-ink-soft transition hover:bg-mist hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.phoneHref}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-ink px-5 py-3.5 font-semibold text-white"
          >
            Soita {site.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
