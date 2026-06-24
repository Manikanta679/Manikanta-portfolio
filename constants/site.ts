/**
 * Static, environment-independent site configuration.
 * Anything that varies per deployment should come from env vars instead.
 */
export const siteConfig = {
  name: "Manikanta",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-image.png",
  author: {
    name: "Manikanta",
    twitter: "@manikanta",
  },
  links: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
