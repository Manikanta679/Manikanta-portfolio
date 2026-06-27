"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import {
  Boxes,
  Braces,
  Brain,
  Database,
  LayoutTemplate,
  Server,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skillCategories, type Skill } from "@/data/skills";
import type { ProjectContent } from "@/data/projects";
import type { ExperienceContent } from "@/data/experience";
import type { SkillDetailView } from "@/components/skill-modal";

// Lazy-load the dialog: its code is only fetched on the client and kept in a
// separate chunk, so it never weighs down the initial Skills render.
const SkillModal = dynamic(
  () => import("@/components/skill-modal").then((m) => m.SkillModal),
  { ssr: false }
);

const categoryIcons: Record<string, LucideIcon> = {
  programming: Braces,
  frontend: LayoutTemplate,
  backend: Server,
  aiData: Brain,
  databases: Database,
  tools: Boxes,
};

/** Translated prose for a skill (from `skills.details.<key>`). */
type SkillDetailContent = {
  summary?: string;
  responsibilities?: string[];
  outcome?: string;
};

export function SkillsGrid() {
  const t = useTranslations("skills");
  const tp = useTranslations("projects");
  const te = useTranslations("experience");
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = React.useState<Skill | null>(null);

  const projectItems = tp.raw("items") as Record<string, ProjectContent>;
  const experienceItems = te.raw("items") as Record<string, ExperienceContent>;
  const detailMap = t.raw("details") as Record<string, SkillDetailContent>;
  const contextMap = t.raw("contexts") as Record<string, string>;

  const buildView = React.useCallback(
    (skill: Skill, categoryKey: string): SkillDetailView => {
      const detail = detailMap[skill.key];
      const usage = skill.usage ?? {};

      const usedIn: string[] = [
        ...(usage.projects ?? [])
          .map((slug) => projectItems[slug]?.title)
          .filter((value): value is string => Boolean(value)),
        ...(usage.experience ?? [])
          .map((id) => experienceItems[id]?.company)
          .filter((value): value is string => Boolean(value)),
        ...(usage.contexts ?? [])
          .map((key) => contextMap[key])
          .filter((value): value is string => Boolean(value)),
      ];

      return {
        name: skill.name,
        category: t(`categories.${categoryKey}`),
        summary: detail?.summary ?? "",
        usedIn,
        workedWith: [...(usage.usedWith ?? [])],
        responsibilities: detail?.responsibilities ?? [],
        outcome: detail?.outcome,
      };
    },
    [t, detailMap, contextMap, projectItems, experienceItems]
  );

  const selectedView = React.useMemo(() => {
    if (!selected) return null;
    const category = skillCategories.find((c) =>
      c.skills.some((s) => s.key === selected.key)
    );
    return buildView(selected, category?.categoryKey ?? "");
  }, [selected, buildView]);

  return (
    <>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => {
          const Icon = categoryIcons[category.categoryKey] ?? Boxes;
          return (
            <Reveal key={category.categoryKey} delay={0.06 * i}>
              <Card className="group h-full transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <CardTitle className="text-base">
                      {t(`categories.${category.categoryKey}`)}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const isActive = selected?.key === skill.key;
                      return (
                        <li key={skill.key}>
                          <motion.button
                            type="button"
                            onClick={() => setSelected(skill)}
                            whileHover={reduceMotion ? undefined : { y: -2 }}
                            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                            aria-haspopup="dialog"
                            aria-label={t("modal.openAria", {
                              skill: skill.name,
                            })}
                            className={cn(
                              "inline-flex items-center rounded-md border px-2.5 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              isActive
                                ? "border-primary bg-primary/15 text-foreground shadow-sm shadow-primary/20"
                                : "border-transparent bg-secondary text-secondary-foreground hover:border-primary/40 hover:bg-primary/10 hover:text-foreground hover:shadow-md hover:shadow-primary/10"
                            )}
                          >
                            {skill.name}
                          </motion.button>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </div>

      <SkillModal
        open={selected !== null}
        view={selectedView}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
