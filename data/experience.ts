/**
 * Experience entries (structural data only).
 *
 * Translatable content (role, company, location, period, technologies,
 * responsibilities, contributions, projects) lives in the
 * `experience.items.<id>` namespace of the message files.
 */
export type ExperienceEntry = {
  id: string;
};

export const experience: ExperienceEntry[] = [
  { id: "moka" },
  { id: "biosoft" },
];

/** Shape of a single translated experience entry (from messages). */
export type ExperienceContent = {
  role: string;
  company: string;
  location: string;
  period: string;
  technologies: string[];
  responsibilities: string[];
  contributions: string[];
  /** Optional named projects worked on during the role. */
  projects?: string[];
};
