/**
 * Featured projects (structural data only).
 *
 * Translatable content (title, description) lives in the
 * `projects.items.<slug>` namespace of the message files. Technology names are
 * proper nouns and intentionally kept here.
 *
 * The `slug` is also the route segment for future detail pages
 * (e.g. `/projects/[slug]`), enabling progressive enhancement without changing
 * the data model.
 */
export type Project = {
  /** Stable, URL-safe identifier — also the key into `projects.items`. */
  slug: string;
  technologies: readonly string[];
  /** External links. Use "#" as a placeholder until a real URL exists. */
  github: string;
  demo: string;
  /** Optional image (e.g. Cloudinary public path). Falls back to a placeholder. */
  image?: string;
  /** Whether the project has a dedicated detail page (future use). */
  hasDetail?: boolean;
};

export const projects: Project[] = [
  {
    slug: "vital-guard",
    technologies: ["ESP8266", "IoT", "GPS", "Blynk", "Embedded Systems"],
    github: "#",
    demo: "#",
  },
  {
    slug: "video-anomaly-detection",
    technologies: ["Python", "TensorFlow", "OpenCV", "Deep Learning", "CNN"],
    github: "#",
    demo: "#",
  },
  {
    slug: "sms-spam-detection",
    technologies: ["Python", "Scikit-learn", "NLTK", "NLP", "Machine Learning"],
    github: "#",
    demo: "#",
  },
];

/** Shape of a single translated project entry (from messages). */
export type ProjectContent = {
  title: string;
  description: string;
};

/** Lookup helper for future project detail pages. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
