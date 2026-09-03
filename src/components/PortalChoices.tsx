"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

type Choice = {
  href: string;
  className: string;
  kicker: string;
  name: string;
  text: string;
};

const choices: Choice[] = [
  {
    href: "https://tmijarik.vercel.app/koti.html",
    className: "portal-choice portal-choice-jari",
    kicker: "Hyvinvointi & hoito",
    name: "T:mi Jari Kotkansalo",
    text: "Fysioterapia · hieronta · Footbalance · PT",
  },
  {
    href: "/koti",
    className: "portal-choice portal-choice-loisto",
    kicker: "Treeni & kuntosali",
    name: "Kuntokeskus Loisto",
    text: "Sali · ryhmäliikunta · Aerial Bungee · PT",
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
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
      }}
    >
      {choices.map((choice) => (
        <motion.a
          key={choice.href}
          href={choice.href}
          className={choice.className}
          variants={{
            hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease },
            },
          }}
          whileHover={reduce ? undefined : { scale: 1.01 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
        >
          <motion.span className="portal-choice-bg" aria-hidden="true" />
          <span className="portal-choice-veil" aria-hidden="true" />
          <span className="portal-choice-content">
            <span className="portal-choice-kicker">{choice.kicker}</span>
            <span className="portal-choice-name">{choice.name}</span>
            <span className="portal-choice-text">{choice.text}</span>
            <span className="portal-choice-cta">
              <span>Siirry sivustolle</span>
            </span>
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
