"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
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

export type ProjectCardData = {
  title: string;
  description: string;
  technologies: readonly string[];
  github?: string;
  demo?: string;
  image?: string;
};

/**
 * Premium project card with hover lift, technology badges and action buttons.
 * The image area falls back to a themed gradient placeholder (ready to be
 * swapped for a Cloudinary image later).
 */
export function ProjectCard({
  project,
  delay = 0,
}: {
  project: ProjectCardData;
  delay?: number;
}) {
  const t = useTranslations("projects");
  const hasGithub = Boolean(project.github && project.github !== "#");
  const hasDemo = Boolean(project.demo && project.demo !== "#");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card className="group flex h-full flex-col overflow-hidden border-border/50 bg-card/60 backdrop-blur-md transition-colors hover:border-primary/40 supports-[backdrop-filter]:bg-card/50">
        {/* Image / placeholder */}
        <div className="relative aspect-video w-full overflow-hidden border-b border-border/50">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/15 via-muted to-background">
              <Sparkles className="size-10 text-primary/50" />
            </div>
          )}
        </div>

        <CardHeader>
          <CardTitle className="text-lg">{project.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge variant="secondary">{tech}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="gap-3">
          {hasGithub ? (
            <Button asChild size="sm" variant="outline" className="flex-1">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
                {t("code")}
              </a>
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="flex-1" disabled>
              <Github />
              {t("code")}
            </Button>
          )}

          {hasDemo ? (
            <Button asChild size="sm" className="flex-1">
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                {t("liveDemo")}
              </a>
            </Button>
          ) : (
            <Button size="sm" className="flex-1" disabled>
              <ExternalLink />
              {t("liveDemo")}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
