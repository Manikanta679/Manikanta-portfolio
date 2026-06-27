/**
 * Categorized skill set rendered by the Skills section.
 *
 * `categoryKey` references a key under the `skills.categories` namespace in the
 * translation files. Individual skill names are proper nouns and intentionally
 * kept untranslated.
 *
 * Each skill carries structural `usage` references only (project slugs,
 * experience ids, reusable context keys and co-technologies). The human-facing
 * prose (summary, responsibilities, outcome) lives in the
 * `skills.details.<key>` namespace of the message files, while project titles
 * and company names are resolved from their existing translations — so nothing
 * is duplicated and i18n stays intact.
 */
export type SkillUsage = {
  /** Project slugs (resolve the title from `projects.items.<slug>`). */
  projects?: readonly string[];
  /** Experience ids (resolve the company from `experience.items.<id>`). */
  experience?: readonly string[];
  /** Reusable context keys (resolve from `skills.contexts.<key>`). */
  contexts?: readonly string[];
  /** Other technologies used alongside this one (proper nouns). */
  usedWith?: readonly string[];
};

export type Skill = {
  /** Stable, translation-safe identifier — also the key into `skills.details`. */
  key: string;
  /** Display name (proper noun). */
  name: string;
  usage?: SkillUsage;
};

export type SkillCategory = {
  categoryKey: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    categoryKey: "programming",
    skills: [
      {
        key: "python",
        name: "Python",
        usage: {
          projects: ["video-anomaly-detection", "sms-spam-detection"],
          contexts: ["academic"],
          usedWith: ["TensorFlow", "OpenCV", "Scikit-learn", "NLP"],
        },
      },
      { key: "java", name: "Java", usage: { contexts: ["academic"] } },
      {
        key: "javascript",
        name: "JavaScript",
        usage: {
          experience: ["biosoft"],
          contexts: ["fullstack", "portfolio"],
          usedWith: ["React.js", "Node.js"],
        },
      },
      {
        key: "typescript",
        name: "TypeScript",
        usage: {
          contexts: ["portfolio", "fullstack"],
          usedWith: ["Next.js", "React.js"],
        },
      },
      {
        key: "csharp",
        name: "C#",
        usage: { experience: ["biosoft"], usedWith: [".NET Core", "REST APIs"] },
      },
    ],
  },
  {
    categoryKey: "frontend",
    skills: [
      {
        key: "react",
        name: "React.js",
        usage: { experience: ["biosoft"], usedWith: ["JavaScript", "REST APIs"] },
      },
      {
        key: "nextjs",
        name: "Next.js",
        usage: {
          contexts: ["portfolio"],
          usedWith: ["React.js", "TypeScript", "Tailwind CSS"],
        },
      },
      {
        key: "tailwind",
        name: "Tailwind CSS",
        usage: { contexts: ["portfolio"], usedWith: ["Next.js", "React.js"] },
      },
      {
        key: "html5",
        name: "HTML5",
        usage: {
          experience: ["biosoft"],
          contexts: ["fullstack"],
          usedWith: ["CSS3", "JavaScript"],
        },
      },
      {
        key: "css3",
        name: "CSS3",
        usage: {
          experience: ["biosoft"],
          contexts: ["fullstack"],
          usedWith: ["HTML5", "Tailwind CSS"],
        },
      },
    ],
  },
  {
    categoryKey: "backend",
    skills: [
      {
        key: "dotnet",
        name: ".NET Core",
        usage: {
          experience: ["biosoft"],
          usedWith: ["C#", "SQL Server", "REST APIs"],
        },
      },
      {
        key: "nodejs",
        name: "Node.js",
        usage: {
          contexts: ["fullstack", "academic"],
          usedWith: ["Express.js", "REST APIs"],
        },
      },
      {
        key: "express",
        name: "Express.js",
        usage: {
          contexts: ["fullstack", "academic"],
          usedWith: ["Node.js", "REST APIs"],
        },
      },
      {
        key: "rest",
        name: "REST APIs",
        usage: {
          experience: ["biosoft", "moka"],
          usedWith: [".NET Core", "Postman"],
        },
      },
    ],
  },
  {
    categoryKey: "aiData",
    skills: [
      {
        key: "ml",
        name: "Machine Learning",
        usage: {
          projects: ["sms-spam-detection", "video-anomaly-detection"],
          usedWith: ["Python", "Scikit-learn", "TensorFlow"],
        },
      },
      {
        key: "deeplearning",
        name: "Deep Learning",
        usage: {
          projects: ["video-anomaly-detection"],
          usedWith: ["TensorFlow", "OpenCV", "Python"],
        },
      },
      {
        key: "tensorflow",
        name: "TensorFlow",
        usage: {
          projects: ["video-anomaly-detection"],
          usedWith: ["Python", "OpenCV", "Deep Learning"],
        },
      },
      {
        key: "opencv",
        name: "OpenCV",
        usage: {
          projects: ["video-anomaly-detection"],
          usedWith: ["Python", "TensorFlow"],
        },
      },
      {
        key: "nlp",
        name: "NLP",
        usage: {
          projects: ["sms-spam-detection"],
          usedWith: ["Python", "Scikit-learn"],
        },
      },
      {
        key: "scikit",
        name: "Scikit-learn",
        usage: {
          projects: ["sms-spam-detection"],
          usedWith: ["Python", "NLP"],
        },
      },
      {
        key: "dataanalytics",
        name: "Data Analytics",
        usage: { contexts: ["academic"], usedWith: ["Python"] },
      },
    ],
  },
  {
    categoryKey: "databases",
    skills: [
      {
        key: "sqlserver",
        name: "SQL Server",
        usage: { experience: ["biosoft"], usedWith: [".NET Core", "REST APIs"] },
      },
      { key: "mysql", name: "MySQL", usage: { contexts: ["academic"] } },
      {
        key: "mongodb",
        name: "MongoDB",
        usage: {
          contexts: ["fullstack", "academic"],
          usedWith: ["Node.js", "Express.js"],
        },
      },
      {
        key: "postgresql",
        name: "PostgreSQL",
        usage: { contexts: ["portfolio"] },
      },
    ],
  },
  {
    categoryKey: "tools",
    skills: [
      {
        key: "git",
        name: "Git",
        usage: { experience: ["moka", "biosoft"], contexts: ["allProjects"] },
      },
      {
        key: "docker",
        name: "Docker",
        usage: { experience: ["moka"], usedWith: ["CI/CD", "Linux"] },
      },
      {
        key: "linux",
        name: "Linux",
        usage: {
          experience: ["moka"],
          contexts: ["devEnv"],
          usedWith: ["Docker"],
        },
      },
      {
        key: "postman",
        name: "Postman",
        usage: {
          experience: ["biosoft"],
          contexts: ["apiWork"],
          usedWith: ["REST APIs", ".NET Core"],
        },
      },
      { key: "vscode", name: "VS Code", usage: { contexts: ["devEnv"] } },
      {
        key: "cicd",
        name: "CI/CD",
        usage: { experience: ["moka"], usedWith: ["Docker"] },
      },
    ],
  },
];
