"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type React from "react";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}

export { ThemeProvider };
