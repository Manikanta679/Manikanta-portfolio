/**
 * Projects (structural data only).
 *
 * Translatable content (title, subtitle, description, category and the full
 * case-study copy) lives in the `projects.items.<slug>` namespace of the message
 * files and is read via `t.raw("items")` in the section. Technology names are
 * proper nouns and intentionally kept here / in the message arrays.
 *
 * The `slug` is also the route segment for future detail pages
 * (e.g. `/projects/[slug]`).
 */
export type ProjectStatus = "latest" | "completed" | "in-progress";

export type Project = {
  /** Stable, URL-safe identifier — also the key into `projects.items`. */
  slug: string;
  /** Short technology chips shown on the overview card. */
  technologies: readonly string[];
  status: ProjectStatus;
  /**
   * External links. Left undefined while no public URL exists — the buttons are
   * only rendered when a real URL is provided (no placeholders/broken links).
   */
  github?: string;
  liveDemo?: string;
  /** Optional image (e.g. Cloudinary public path). Falls back to a placeholder. */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "data-analysis-toolkit",
    status: "latest",
    technologies: ["Next.js", "TypeScript", "Python", "Data Analytics", "Tailwind CSS"],
    github: "https://github.com/Manikanta679/Data-Analysis-Toolkit",
    liveDemo: "https://data-analysis-toolkit-eight.vercel.app/",
    image: "/images/projects/data-analysis-toolkit.png",
  },
  {
    slug: "vital-guard",
    status: "completed",
    technologies: ["ESP8266", "MPU6050", "GPS", "Blynk IoT", "Embedded Systems"],
    image: "/images/projects/vital-guard.png",
  },
  {
    slug: "video-anomaly-detection",
    status: "completed",
    technologies: ["TensorFlow", "Keras", "OpenCV", "CNN", "Transfer Learning"],
    image: "/images/projects/video-anomaly-detection.png",
  },
  {
    slug: "sms-spam-detection",
    status: "completed",
    technologies: ["Python", "Scikit-learn", "NLTK", "TF-IDF", "NLP"],
    image: "/images/projects/sms-spam-detection.png",
  },
];

/** A labelled group of technologies in the case-study "Technology Stack". */
export type TechGroup = {
  label: string;
  items: string[];
};

/** A named item with a short professional explanation (architecture / modules). */
export type NamedDetail = {
  name: string;
  description: string;
};

/** Shape of a single translated project entry (from messages). */
export type ProjectContent = {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  overview: string;
  features: string[];
  architecture: NamedDetail[];
  stack: TechGroup[];
  modules: NamedDetail[];
  contributions: string[];
  challenges: string[];
  outcomes: string[];
};

/** Lookup helper for future project detail pages. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
