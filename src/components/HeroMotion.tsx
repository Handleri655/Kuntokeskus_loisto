"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type HeroMotionProps = {
  image: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

/** Full-bleed hero: ken-burns image + staggered text entrance (motion.dev). */
export function HeroMotion({
  image,
  children,
  className,
  contentClassName,
}: HeroMotionProps) {
  const reduce = useReducedMotion();

  return (
    <section className={className}>
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.1 }}
        animate={reduce ? undefined : { scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
      >
        {image}
      </motion.div>
      <div className="hero-veil absolute inset-0" />
      <div className="grain absolute inset-0" />
      <motion.div
        className={contentClassName}
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "show"}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.1, delayChildren: 0.12 },
          },
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export function HeroLine({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
