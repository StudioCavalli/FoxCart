"use client";

import { cn } from "@/lib/utils";
import type React from "react";
import { useEffect, useRef, useState } from "react";

type RevealDirection = "up" | "down";

interface RevealProps extends React.ComponentProps<"div"> {
  direction?: RevealDirection;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

function Reveal({
  direction = "up",
  delay = 0,
  threshold = 0.2,
  once = true,
  className,
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const translate = direction === "up" ? "translateY(24px)" : "translateY(-24px)";

  return (
    <div
      ref={ref}
      className={cn("transition-[opacity,transform]", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : translate,
        transitionDuration: "var(--duration-slow)",
        transitionTimingFunction: "var(--ease-reveal)",
        transitionDelay: `${delay}ms`,
        ...style,
      }}
      {...props}
    />
  );
}

export { Reveal };
