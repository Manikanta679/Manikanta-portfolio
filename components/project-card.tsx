"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  Github,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ProjectCardFooter } from "@/components/project-card-footer";
import { ProjectModal } from "@/components/project-modal";
import { EASE } from "@/components/motion/variants";
import type { Project, ProjectContent, ProjectStatus } from "@/data/projects";

const statusKey: Record<ProjectStatus, string> = {
  latest: "latest",
  completed: "completed",
  "in-progress": "inProgress",
};

/** Shared typography — identical on every project card. */
const CARD_TITLE_CLASS = "text-xl leading-snug tracking-tight";
const CARD_DESCRIPTION_CLASS =
  "line-clamp-3 font-normal leading-relaxed";
const CARD_TAGS_CLASS = "flex min-h-[3.25rem] flex-wrap content-start gap-2";

/**
 * Premium project card: hover lift, category + status badges, technology
 * badges and minimalist footer actions via {@link ProjectCardFooter}.
 */
export function ProjectCard({
  project,
  content,
  delay = 0,
}: {
  project: Project;
  content: ProjectContent;
  delay?: number;
}) {
  const t = useTranslations("projects");
  const tc = useTranslations("common");
  const [open, setOpen] = React.useState(false);

  const hasGithub = Boolean(project.github && project.github !== "#");
  const hasLiveDemo = Boolean(project.liveDemo && project.liveDemo !== "#");
  const showExternalLinks =
    project.slug === "data-analysis-toolkit" && hasGithub && hasLiveDemo;
  const isLatest = project.status === "latest";

  const footerActions = showExternalLinks
    ? [
        {
          label: t("repository"),
          icon: Github,
          href: project.github,
          external: true,
        },
        {
          label: t("liveDemo"),
          icon: ExternalLink,
          href: project.liveDemo,
          external: true,
        },
      ]
    : [
        {
          label: t("viewDetails"),
          icon: ArrowUpRight,
          onClick: () => setOpen(true),
        },
      ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay, ease: EASE }}
        whileHover={{ y: -6 }}
        className="h-full"
      >
        <Card className="group flex h-full flex-col overflow-hidden border-border/50 bg-card/60 backdrop-blur-md transition-all hover:border-primary/40 hover:shadow-xl supports-[backdrop-filter]:bg-card/50">
          {/* Image / placeholder */}
          <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/50">
            {project.image ? (
              <Image
                src={project.image}
                alt={t("coverAlt", { project: content.title })}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/15 via-muted to-background">
                <Sparkles className="size-12 text-primary/50" />
              </div>
            )}

            {/* Subtle overlay keeps badges legible and the covers consistent */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-card/50 via-transparent to-background/25"
            />

            {/* Overlay badges */}
            <Badge variant="secondary" className="absolute left-3 top-3 shadow-sm">
              {content.category}
            </Badge>
            <Badge
              variant={isLatest ? "default" : "secondary"}
              className="absolute right-3 top-3 gap-1 shadow-sm"
            >
              {isLatest ? (
                <Sparkles className="size-3" />
              ) : (
                <Check className="size-3" />
              )}
              {tc(`status.${statusKey[project.status]}`)}
            </Badge>
          </div>

          <CardHeader>
            <CardTitle
              className={cn(
                CARD_TITLE_CLASS,
                showExternalLinks &&
                  "cursor-pointer transition-colors hover:text-primary",
              )}
              {...(showExternalLinks
                ? {
                    role: "button",
                    tabIndex: 0,
                    onClick: () => setOpen(true),
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpen(true);
                      }
                    },
                  }
                : {})}
            >
              {content.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <CardDescription className={CARD_DESCRIPTION_CLASS}>
              {content.description}
            </CardDescription>

            <ul className={CARD_TAGS_CLASS}>
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge variant="outline">{tech}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>

          <div className="flex-1" aria-hidden />

          <ProjectCardFooter actions={footerActions} />
        </Card>
      </motion.div>

      <ProjectModal
        open={open}
        onClose={() => setOpen(false)}
        content={content}
        github={project.github}
        liveDemo={project.liveDemo}
        status={project.status}
      />
    </>
  );
}
