"use client";

import type React from "react";
import { MotionProvider } from "./MotionConfig";
import { SmoothScroll } from "./SmoothScroll";
import { ThemeProvider } from "./ThemeProvider";

function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <SmoothScroll>{children}</SmoothScroll>
      </MotionProvider>
    </ThemeProvider>
  );
}

export { ClientProviders };
