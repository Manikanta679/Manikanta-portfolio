/**
 * Categorized skill set rendered by the Skills section.
 *
 * `categoryKey` references a key under the `skills.categories` namespace in the
 * translation files. Individual skill names are proper nouns and intentionally
 * kept untranslated.
 */
export type SkillCategory = {
  categoryKey: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    categoryKey: "programming",
    skills: ["Python", "Java", "JavaScript", "TypeScript"],
  },
  {
    categoryKey: "frontend",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    categoryKey: "backend",
    skills: ["Node.js", "Express"],
  },
  {
    categoryKey: "aiData",
    skills: ["Machine Learning", "Deep Learning", "Data Analysis", "NLP"],
  },
  {
    categoryKey: "databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    categoryKey: "tools",
    skills: ["Git", "Docker", "Linux"],
  },
];
