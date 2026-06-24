/**
 * Static, environment-independent site configuration.
 * Anything that varies per deployment should come from env vars instead.
 */
export const siteConfig = {
  name: "Manikanta Handral",
  /** Short brand used in compact spots such as the navbar logo. */
  shortName: "Manikanta",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-image.png",
  /** Public path to the downloadable CV. Replace the file to update the resume. */
  resumeUrl: "/resume/Manikanta-Handral-CV.pdf",
  email: "manikantahandral@gmail.com",
  location: "Leipzig, Germany",
  author: {
    name: "Manikanta Handral",
  },
  links: {
    github: "https://github.com/Manikanta679",
    linkedin: "https://www.linkedin.com/in/manikanta-engalligi/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
