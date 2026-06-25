import { FolderGit2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { EmptyState } from "@/components/empty-state";
import { projects, type ProjectContent } from "@/data/projects";

export function Projects() {
  const t = useTranslations("projects");
  const items = t.raw("items") as Record<string, ProjectContent>;

  // Only render projects that have matching translated content, so missing
  // copy never produces a blank card.
  const visibleProjects = projects.filter((project) => items[project.slug]);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("subtitle")}
        align="center"
      />

      {visibleProjects.length > 0 ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, i) => {
            const content = items[project.slug];
            if (!content) return null;

            return (
              <ProjectCard
                key={project.slug}
                delay={i * 0.08}
                project={project}
                content={content}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-12">
          <EmptyState
            icon={FolderGit2}
            title={t("empty.title")}
            description={t("empty.description")}
          />
        </div>
      )}
    </Section>
  );
}
