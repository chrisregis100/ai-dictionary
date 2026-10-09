"use client";

import { ArrowDown } from "@deemlol/next-icons";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const shouldReduce = useReducedMotion();
  const hidden = shouldReduce ? false : { opacity: 0, y: 14 };
  const shown = { opacity: 1, y: 0 };
  const transition = (delay: number) => ({
    duration: shouldReduce ? 0 : 0.62,
    delay: shouldReduce ? 0 : delay,
    ease,
  });

  return (
    <header className="space-y-6">
      <motion.p
        initial={hidden}
        animate={shown}
        transition={transition(0)}
        className="font-serif text-sm italic text-sage"
      >
        ¶ Parcours
      </motion.p>
      <motion.h1
        initial={hidden}
        animate={shown}
        transition={transition(0.1)}
        className="max-w-xl font-serif text-[clamp(2.6rem,8vw,5.2rem)] leading-[1.05] tracking-[-0.03em] text-ink italic"
      >
        Le vocabulaire, dans l&apos;ordre où il sert.
      </motion.h1>
      <motion.p
        initial={hidden}
        animate={shown}
        transition={transition(0.22)}
        className="max-w-prose text-base leading-7 text-muted"
      >
        Sept sections, des termes anglais laissés tels quels, et une
        explication française pour chacun. Marque une notion comme comprise :
        ça reste sur cet appareil.
      </motion.p>
      <motion.div initial={hidden} animate={shown} transition={transition(0.34)}>
        <a
          href="#parcours"
          className="link-ink inline-flex items-center gap-2 font-serif text-lg italic text-clay"
        >
          Feuilleter le sentier
          <ArrowDown size={18} strokeWidth={1.75} aria-hidden />
        </a>
      </motion.div>
    </header>
  );
}
