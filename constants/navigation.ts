/**
 * Primary navigation items. `labelKey` references a key in the `nav`
 * namespace of the translation files (`/messages/*.json`).
 */
export const navItems = [
  { href: "/", labelKey: "home" },
  { href: "/#about", labelKey: "about" },
  { href: "/#projects", labelKey: "projects" },
  { href: "/#experience", labelKey: "experience" },
  { href: "/#contact", labelKey: "contact" },
] as const;

export type NavItem = (typeof navItems)[number];
