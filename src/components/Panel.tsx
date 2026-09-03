"use client";

import { HoverCard } from "@/components/HoverCard";
import type { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "soft";
  hover?: boolean;
};

const tones = {
  light: "panel",
  dark: "panel panel-dark",
  soft: "panel panel-soft",
} as const;

export function Panel({
  children,
  className = "",
  tone = "light",
  hover = true,
}: PanelProps) {
  const classes = `${tones[tone]} ${className}`.trim();

  if (!hover) {
    return <div className={classes}>{children}</div>;
  }

  return <HoverCard className={classes}>{children}</HoverCard>;
}
