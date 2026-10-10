"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

const classes = [
  {
    href: "/aerial-bungee",
    label: "Aerial Bungee",
    image: "/images/aerial-bungee-hero.jpg",
    position: "center 28%",
  },
  {
    href: "/cross-training",
    label: "Cross Training",
    image: "/images/kuntosali-08.jpg",
    position: "center 32%",
  },
  {
    href: "/kangoo",
    label: "Kangoo Power / Jumps",
    image: "/images/kangoo-hero.jpg",
    position: "center 40%",
  },
  {
    href: "/jooga",
    label: "Jooga",
    image: "/images/hyvinvointi-hero.jpg",
    position: "center 55%",
  },
  {
    href: "/aanimaljarentoutus",
    label: "Äänimaljarentoutus",
    image: "/images/aanimalja-01.jpg",
    position: "center 60%",
  },
] as const;

export function GroupClassCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const step = useCallback((direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const styles = window.getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 12;
    const amount = card.offsetWidth + gap;
    const max = el.scrollWidth - el.clientWidth;
    if (direction === 1 && el.scrollLeft >= max - 8) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (direction === -1 && el.scrollLeft <= 8) {
      el.scrollTo({ left: max, behavior: "smooth" });
      return;
    }
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) step(1);
    }, 3200);
    return () => window.clearInterval(id);
  }, [step]);

  return (
    <section
      aria-label="Ryhmäliikunnan lajit"
      className="border-t border-[var(--line)] bg-white py-8 md:py-10"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          pausedRef.current = false;
        }
      }}
    >
      <div className="container-page">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="eyebrow text-accent">Lajit</p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Edellinen laji"
              onClick={() => step(-1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-lg text-ink transition hover:border-accent hover:text-accent"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Seuraava laji"
              onClick={() => step(1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-lg text-ink transition hover:border-accent hover:text-accent"
            >
              ›
            </button>
          </div>
        </div>
        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {classes.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-card
              className="group relative h-24 w-[min(20rem,78vw)] shrink-0 snap-start overflow-hidden rounded-2xl sm:h-28"
            >
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                style={{ objectPosition: item.position }}
                sizes="248px"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />
              <span className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-8 font-display text-base font-semibold leading-tight text-white sm:text-lg">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
