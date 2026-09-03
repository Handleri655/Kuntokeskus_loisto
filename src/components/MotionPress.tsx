"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

const spring = { type: "spring" as const, stiffness: 420, damping: 26 };

type MotionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
};

/** Link with Motion hover / tap feedback. */
export function MotionLink({
  children,
  className,
  href,
  fullWidth,
}: MotionLinkProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={fullWidth ? "flex w-full" : "inline-flex"}
      whileHover={reduce ? undefined : { y: -3, scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      transition={spring}
    >
      <Link
        href={href}
        className={fullWidth ? `${className ?? ""} w-full` : className}
      >
        {children}
      </Link>
    </motion.div>
  );
}

type MotionAnchorProps = {
  href: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  target?: string;
  rel?: string;
};

export function MotionAnchor({
  children,
  className,
  href,
  fullWidth,
  target,
  rel,
}: MotionAnchorProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={fullWidth ? "flex w-full" : "inline-flex"}
      whileHover={reduce ? undefined : { y: -3, scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      transition={spring}
    >
      <a
        href={href}
        target={target}
        rel={rel}
        className={fullWidth ? `${className ?? ""} w-full` : className}
      >
        {children}
      </a>
    </motion.div>
  );
}

type MotionButtonProps = {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
};

export function MotionButton({
  children,
  className,
  type = "button",
  onClick,
  disabled,
  fullWidth,
}: MotionButtonProps) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={fullWidth ? `${className ?? ""} w-full` : className}
      whileHover={reduce || disabled ? undefined : { y: -3, scale: 1.03 }}
      whileTap={reduce || disabled ? undefined : { scale: 0.96 }}
      transition={spring}
    >
      {children}
    </motion.button>
  );
}
