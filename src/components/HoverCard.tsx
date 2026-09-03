"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type HoverCardProps = {
  children: ReactNode;
  className?: string;
  /** Softer lift for dense grids */
  subtle?: boolean;
};

/** Motion hover lift for panels, price tiles, and other cards. */
export function HoverCard({ children, className, subtle }: HoverCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={
        reduce
          ? undefined
          : subtle
            ? { y: -3, scale: 1.01 }
            : { y: -5, scale: 1.015 }
      }
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
    >
      {children}
    </motion.div>
  );
}
