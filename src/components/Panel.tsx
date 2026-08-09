import type { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "soft";
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
}: PanelProps) {
  return <div className={`${tones[tone]} ${className}`.trim()}>{children}</div>;
}
