import { defineRouting } from "next-intl/routing";

/**
 * Central definition of the app's locales and routing behaviour.
 * Add a locale here + a matching file in `/messages` to support it.
 */
export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "en",
  // Only show the locale prefix when it isn't the default ("/about" vs "/de/about").
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

/**
 * Type-safe locale validation.
 * `next-intl` v3 does not export a `hasLocale` helper (added in v4), so we
 * provide our own type guard for validating arbitrary strings.
 */
export function isValidLocale(locale: string | undefined): locale is Locale {
  return (
    locale !== undefined &&
    (routing.locales as readonly string[]).includes(locale)
  );
}
