/**
 * Shared domain types used across the app.
 * Section-specific types (projects, experience, …) will be added here as the
 * corresponding features are built.
 */

export type Locale = "en" | "de";

/** Generic params shape for locale-aware pages/layouts (Next.js 15 async params). */
export type LocaleParams = {
  params: Promise<{ locale: Locale }>;
};
