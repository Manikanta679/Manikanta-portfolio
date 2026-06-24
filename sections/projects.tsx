import { useTranslations } from "next-intl";

import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { projects, type ProjectContent } from "@/data/projects";

export function Projects() {
  const t = useTranslations("projects");
  const items = t.raw("items") as Record<string, ProjectContent>;

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("subtitle")}
        align="center"
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => {
          const content = items[project.slug];
          if (!content) return null;

          return (
            <ProjectCard
              key={project.slug}
              delay={i * 0.08}
              project={{
                title: content.title,
                description: content.description,
                technologies: project.technologies,
                github: project.github,
                demo: project.demo,
                image: project.image,
              }}
            />
          );
        })}
      </div>
    </Section>
  );
}
