"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type React from "react";

const presets = {
  fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  slideUp: { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } },
  slideDown: { initial: { opacity: 0, y: -24 }, animate: { opacity: 1, y: 0 } },
  scaleIn: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },
} as const;

const transition = {
  fast: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
  base: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  slow: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  page: { duration: 0.4, ease: [0.83, 0, 0.17, 1] },
} as const;

function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

export { MotionProvider, presets, transition };
