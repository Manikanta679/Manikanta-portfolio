/**
 * Education entries (structural data only).
 *
 * Translatable content (degree, institution, period, focus areas) lives in the
 * `education.items.<id>` namespace of the message files and is read via
 * `t.raw("items")` in the section.
 */
export type EducationStatus = "current" | "completed" | "graduated";

export type EducationEntry = {
  id: string;
  status: EducationStatus;
};

export const education: EducationEntry[] = [
  { id: "msc", status: "current" },
  { id: "bsc", status: "graduated" },
];

/** Shape of a single translated education entry (from messages). */
export type EducationContent = {
  degree: string;
  institution?: string;
  location?: string;
  period: string;
  focus: string[];
};
