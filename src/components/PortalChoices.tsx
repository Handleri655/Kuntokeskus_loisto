"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

type Choice = {
  href: string;
  className: string;
  kicker: string;
  name: string;
  text: string;
  cta: string;
};

const choices: Choice[] = [
  {
    href: "https://tmijarik.vercel.app/koti.html",
    className: "portal-choice portal-choice-jari",
    kicker: "Hyvinvointi & hoito",
    name: "T:mi Jari Kotkansalo",
    text: "Fysioterapia · Hieronta · Footbalance · PT",
    cta: "Tutustu palveluihin",
  },
  {
    href: "/koti",
    className: "portal-choice portal-choice-loisto",
    kicker: "Treeni & kuntosali",
    name: "Kuntokeskus Loisto",
    text: "Kuntosali · Ryhmäliikunta · Aerial Bungee · PT",
    cta: "Treenaa Loistossa",
  },
];

export function PortalChoices() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="portal-choices"
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : "show"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
      }}
    >
      {choices.map((choice) => (
        <motion.a
          key={choice.href}
          href={choice.href}
          className={choice.className}
          variants={{
            hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.75, ease },
            },
          }}
          whileHover={reduce ? undefined : { scale: 1.008 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        >
          <span className="portal-choice-bg" aria-hidden="true" />
          <span className="portal-choice-veil" aria-hidden="true" />
          <span className="portal-choice-content">
            <span className="portal-choice-kicker">{choice.kicker}</span>
            <span className="portal-choice-name">{choice.name}</span>
            <span className="portal-choice-text">{choice.text}</span>
            <span className="portal-choice-cta">
              <span>{choice.cta}</span>
            </span>
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
