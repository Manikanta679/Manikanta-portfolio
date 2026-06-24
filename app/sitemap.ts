import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.map((locale) => ({
    url:
      locale === routing.defaultLocale
        ? siteConfig.url
        : `${siteConfig.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
  }));
}
