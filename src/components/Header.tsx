"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MotionAnchor } from "@/components/MotionPress";
import { nav, servicesNav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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

  const solid = scrolled || open;
  const servicesActive = servicesNav.some((item) => pathname === item.href);

  const linkClass = (href: string) => {
    const active = pathname === href;
    if (solid) {
      return active
        ? "nav-active"
        : "text-ink-soft hover:bg-mist hover:text-ink";
    }
    return active
      ? "nav-active-ghost"
      : "text-white/85 hover:bg-white/10 hover:text-white";
  };

  const servicesBtnClass = () => {
    if (solid) {
      return servicesActive
        ? "nav-active"
        : "text-ink-soft hover:bg-mist hover:text-ink";
    }
    return servicesActive
      ? "nav-active-ghost"
      : "text-white/85 hover:bg-white/10 hover:text-white";
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-[rgba(251,252,253,0.92)] text-ink shadow-[0_1px_0_var(--line)] backdrop-blur-xl"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4 md:h-[5.25rem]">
        <Link
          href="/koti"
          className="group flex items-center gap-3 leading-tight"
          onClick={() => setOpen(false)}
        >
          <span
            className={`brand-mark ${solid ? "" : "brand-mark-light"}`}
            aria-hidden="true"
          >
            L
          </span>
          <span>
            <div className="font-display text-[1.15rem] font-semibold tracking-tight md:text-[1.35rem]">
              Kuntokeskus{" "}
              <span className={solid ? "text-accent" : "text-accent-bright"}>
                Loisto
              </span>
            </div>
            <div
              className={`text-[0.68rem] uppercase tracking-[0.2em] ${
                solid ? "text-muted" : "text-white/65"
              }`}
            >
              Hollola
            </div>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${linkClass(item.href)}`}
            >
              {item.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${servicesBtnClass()}`}
              aria-expanded={servicesOpen}
            >
              Palvelut
            </button>
            <div
              className={`absolute left-0 top-full min-w-[16rem] pt-2 transition ${
                servicesOpen
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white py-2 shadow-xl shadow-black/10">
                {servicesNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2.5 text-sm transition hover:bg-mist hover:text-ink ${
                      pathname === item.href
                        ? "bg-mist/80 font-semibold text-ink"
                        : "text-ink-soft"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {nav.slice(2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${linkClass(item.href)}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <MotionAnchor
            href={site.phoneHref}
            className={`hidden rounded-full px-4 py-2.5 text-sm font-semibold transition md:inline-flex ${
              solid
                ? "bg-ink text-white hover:bg-ink-soft"
                : "bg-white text-ink hover:bg-white/90"
            }`}
          >
            {site.phone}
          </MotionAnchor>
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${
              solid
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
          {nav.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-3 py-3 font-medium transition hover:bg-mist hover:text-ink ${
                pathname === item.href ? "bg-mist text-ink" : "text-ink-soft"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            className="flex items-center justify-between rounded-xl px-3 py-3 text-left font-medium text-ink-soft transition hover:bg-mist hover:text-ink"
            onClick={() => setMobileServicesOpen((v) => !v)}
            aria-expanded={mobileServicesOpen}
          >
            Palvelut
            <span className="text-muted">{mobileServicesOpen ? "−" : "+"}</span>
          </button>
          {mobileServicesOpen
            ? servicesNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-6 py-2.5 transition hover:bg-mist hover:text-ink ${
                    pathname === item.href
                      ? "bg-mist font-semibold text-ink"
                      : "text-ink-soft"
                  }`}
                >
                  {item.label}
                </Link>
              ))
            : null}

          {nav.slice(2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-3 py-3 font-medium transition hover:bg-mist hover:text-ink ${
                pathname === item.href ? "bg-mist text-ink" : "text-ink-soft"
              }`}
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
