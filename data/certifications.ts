/**
 * Certifications (structural data only).
 *
 * Translatable titles live in the `certifications.items.<id>` namespace of the
 * message files.
 */
export type Certification = {
  id: string;
};

export const certifications: Certification[] = [
  { id: "aws" },
  { id: "dataAnalytics" },
  { id: "aiTools" },
];

/** Shape of a single translated certification entry (from messages). */
export type CertificationContent = {
  title: string;
  issuer?: string;
};
