"use client";

import { useEffect } from "react";

type PrintButtonProps = {
  label?: string;
  autoPrint?: boolean;
  className?: string;
};

export function PrintButton({
  label = "Tulosta A4",
  autoPrint = false,
  className = "btn-accent",
}: PrintButtonProps) {
  useEffect(() => {
    if (!autoPrint) return;
    const timer = window.setTimeout(() => window.print(), 350);
    return () => window.clearTimeout(timer);
  }, [autoPrint]);

  return (
    <button type="button" onClick={() => window.print()} className={className}>
      {label}
    </button>
  );
}
