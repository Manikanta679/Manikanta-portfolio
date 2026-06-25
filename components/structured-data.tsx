import { siteConfig } from "@/constants/site";

type StructuredDataProps = {
  /** Active locale, used for the schema's `inLanguage` field. */
  locale: string;
  /** Localised professional headline (e.g. the hero/footer tagline). */
  jobTitle: string;
  /** Localised one-line professional summary. */
  description: string;
};

/**
 * Emits a JSON-LD `Person` schema so search engines and rich results can
 * understand who the site belongs to. Rendered from the server (no client JS)
 * and kept in sync with `siteConfig` to avoid duplicated personal data.
 */
export function StructuredData({
  locale,
  jobTitle,
  description,
}: StructuredDataProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    jobTitle,
    description,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location,
    },
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    knowsLanguage: ["en", "de"],
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      // Schema is built from trusted static config only.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
