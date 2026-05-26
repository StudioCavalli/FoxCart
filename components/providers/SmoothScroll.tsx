"use client";

import { useEffect } from "react";

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let lenis: InstanceType<typeof import("lenis").default> | null = null;
    let raf: number;

    async function init() {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

      function tick(time: number) {
        lenis?.raf(time);
        raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
    }

    init();

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}

export { SmoothScroll };
