"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { GymPhoto } from "@/lib/gym-photos";

const INTERVAL_MS = 5500;

export function HeroSlideshow({ slides }: { slides: GymPhoto[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <>
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={
            slide.objectPosition
              ? { objectPosition: slide.objectPosition }
              : undefined
          }
          sizes="100vw"
        />
      ))}
    </>
  );
}
