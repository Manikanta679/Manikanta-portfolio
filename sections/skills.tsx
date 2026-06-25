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

import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skillCategories } from "@/data/skills";

const categoryIcons: Record<string, LucideIcon> = {
  programming: Braces,
  frontend: LayoutTemplate,
  backend: Server,
  aiData: Brain,
  databases: Database,
  tools: Boxes,
};

export function Skills() {
  const t = useTranslations("skills");

  return (
    <Section id="skills" className="bg-muted/30">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("subtitle")}
        align="center"
      />

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
                    {category.skills.map((skill) => (
                      <li key={skill}>
                        <Badge
                          variant="secondary"
                          className="cursor-default text-sm transition-all hover:bg-primary/10 hover:text-foreground motion-safe:hover:-translate-y-0.5"
                        >
                          {skill}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
