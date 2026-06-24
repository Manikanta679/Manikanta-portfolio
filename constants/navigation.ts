/**
 * Primary navigation items. `labelKey` references a key in the `nav`
 * namespace of the translation files (`/messages/*.json`).
 */
export const navItems = [
  { href: "#home", labelKey: "home" },
  { href: "#about", labelKey: "about" },
  { href: "#skills", labelKey: "skills" },
  { href: "#projects", labelKey: "projects" },
  { href: "#experience", labelKey: "experience" },
  { href: "#contact", labelKey: "contact" },
] as const;

export type NavItem = (typeof navItems)[number];
