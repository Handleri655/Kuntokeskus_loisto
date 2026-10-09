"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

type FlyerLightboxProps = {
  src: string;
  alt: string;
};

export function FlyerLightbox({ src, alt }: FlyerLightboxProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dialog =
    open && mounted
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/90 p-2 backdrop-blur-sm sm:p-4 md:p-6"
            onClick={() => setOpen(false)}
          >
            <p id={titleId} className="sr-only">
              {alt}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25 md:right-6 md:top-6"
            >
              Sulje
            </button>
            <div
              className="flex max-h-[min(96vh,1400px)] max-w-[min(96vw,900px)] items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={src}
                alt={alt}
                className="max-h-[min(96vh,1400px)] max-w-full cursor-zoom-out rounded-lg object-contain shadow-2xl"
                onClick={() => setOpen(false)}
              />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[1.1rem] text-left"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="relative block aspect-[3/4] max-h-[36rem] lg:aspect-[4/5]">
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
          />
        </span>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-4 py-3 text-sm font-semibold text-white">
          Avaa suureksi
        </span>
      </button>
      {dialog}
    </>
  );
}
