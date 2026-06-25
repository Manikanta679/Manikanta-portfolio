import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const localeUrl = (locale: string) =>
    locale === routing.defaultLocale
      ? siteConfig.url
      : `${siteConfig.url}/${locale}`;

  // Shared hreflang map so each entry advertises every language alternative.
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, localeUrl(locale)])
  );

  return routing.locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
