import * as React from "react";
import { ThemeProvider } from "./theme-provider";

/**
 * Single composition point for all client-side providers.
 * Add future providers (analytics, tooltips, query client, …) here so the
 * root layout stays clean.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
