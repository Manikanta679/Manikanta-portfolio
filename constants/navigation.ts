/**
 * Primary navigation items. `labelKey` references a key in the `nav`
 * namespace of the translation files (`/messages/*.json`).
 */
export const navItems = [
  { href: "#home", labelKey: "home" },
  { href: "#about", labelKey: "about" },
  { href: "#skills", labelKey: "skills" },
  { href: "#education", labelKey: "education" },
  { href: "#experience", labelKey: "experience" },
  { href: "#projects", labelKey: "projects" },
  { href: "#certifications", labelKey: "certifications" },
  { href: "#contact", labelKey: "contact" },
] as const;

export type NavItem = (typeof navItems)[number];
