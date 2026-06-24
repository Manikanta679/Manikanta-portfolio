/**
 * Experience entries (structural data only).
 *
 * Translatable content (role, company, period, highlights) lives in the
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
  period: string;
  highlights: string[];
};
