"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Github, Sparkles, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectModal } from "@/components/project-modal";
import { EASE } from "@/components/motion/variants";
import type { Project, ProjectContent, ProjectStatus } from "@/data/projects";

const statusKey: Record<ProjectStatus, "completed" | "inProgress"> = {
  completed: "completed",
  "in-progress": "inProgress",
};

/**
 * Premium project card: hover lift, category + status badges, technology
 * badges and a "View Details" action that opens the reusable project modal.
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
                alt={content.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/15 via-muted to-background">
                <Sparkles className="size-12 text-primary/50" />
              </div>
            )}

            {/* Overlay badges */}
            <Badge variant="secondary" className="absolute left-3 top-3 shadow-sm">
              {content.category}
            </Badge>
            <Badge className="absolute right-3 top-3 gap-1 shadow-sm">
              <Check className="size-3" />
              {tc(`status.${statusKey[project.status]}`)}
            </Badge>
          </div>

          <CardHeader>
            <CardTitle className="text-xl">{content.title}</CardTitle>
          </CardHeader>

          <CardContent className="flex-1 space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {content.description}
            </p>

            {content.impact ? (
              <p className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm font-medium text-foreground">
                <TrendingUp
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden
                />
                <span>{content.impact}</span>
              </p>
            ) : null}

            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge variant="outline">{tech}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="gap-3">
            <Button className="flex-1" onClick={() => setOpen(true)}>
              <ArrowUpRight />
              {t("viewDetails")}
            </Button>
            {hasGithub ? (
              <Button asChild variant="outline" size="icon" aria-label={t("github")}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github />
                </a>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                disabled
                aria-label={t("github")}
              >
                <Github />
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      <ProjectModal
        open={open}
        onClose={() => setOpen(false)}
        content={content}
        technologies={project.technologies}
        github={project.github}
        status={project.status}
      />
    </>
  );
}
