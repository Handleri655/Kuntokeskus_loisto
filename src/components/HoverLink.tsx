"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

type HoverLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Full-width / block link with Motion hover. */
export function HoverLink({ href, children, className }: HoverLinkProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}
