/**
 * Featured projects (structural data only).
 *
 * Translatable content (title, description, category and the full detail copy)
 * lives in the `projects.items.<slug>` namespace of the message files.
 * Technology names are proper nouns and intentionally kept here.
 *
 * The `slug` is also the route segment for future detail pages
 * (e.g. `/projects/[slug]`).
 */
export type ProjectStatus = "completed" | "in-progress";

export type Project = {
  /** Stable, URL-safe identifier — also the key into `projects.items`. */
  slug: string;
  technologies: readonly string[];
  /** External links. Use "#" as a placeholder until a real URL exists. */
  github: string;
  status: ProjectStatus;
  /** Optional image (e.g. Cloudinary public path). Falls back to a placeholder. */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "vital-guard",
    status: "completed",
    technologies: ["ESP8266", "IoT", "GPS", "Blynk", "Embedded Systems"],
    github: "#",
  },
  {
    slug: "video-anomaly-detection",
    status: "completed",
    technologies: ["Python", "TensorFlow", "OpenCV", "Deep Learning", "CNN"],
    github: "#",
  },
  {
    slug: "sms-spam-detection",
    status: "completed",
    technologies: ["Python", "Scikit-learn", "NLTK", "NLP", "Machine Learning"],
    github: "#",
  },
];

/** Shape of a single translated project entry (from messages). */
export type ProjectContent = {
  title: string;
  description: string;
  category: string;
  overview: string;
  problem: string;
  solution: string;
  achievements: string[];
  architecture: string;
  challenges: string[];
  futureImprovements: string[];
};

/** Lookup helper for future project detail pages. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
