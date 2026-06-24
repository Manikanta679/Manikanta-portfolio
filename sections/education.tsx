import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Timeline, TimelineItem } from "@/components/timeline";
import { GlassCard } from "@/components/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { education, type EducationContent } from "@/data/education";

export function Education() {
  const t = useTranslations("education");
  const tc = useTranslations("common");
  const items = t.raw("items") as Record<string, EducationContent>;

  return (
    <Section id="education">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

      <div className="mx-auto mt-12 max-w-3xl">
        <Timeline>
          {education.map((entry, i) => {
            const content = items[entry.id];
            if (!content) return null;

            const meta = [content.institution, content.location, content.period]
              .filter(Boolean)
              .join(" · ");

            return (
              <TimelineItem
                key={entry.id}
                delay={i * 0.1}
                icon={<GraduationCap className="size-4" />}
              >
                <GlassCard className="transition-colors hover:border-primary/40">
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <CardTitle className="text-lg leading-snug">
                        {content.degree}
                      </CardTitle>
                      <Badge
                        variant={
                          entry.status === "current" ? "default" : "secondary"
                        }
                      >
                        {tc(`status.${entry.status}`)}
                      </Badge>
                    </div>
                    {meta ? (
                      <p className="text-sm text-muted-foreground">{meta}</p>
                    ) : null}
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {tc("focusAreas")}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {content.focus.map((area) => (
                        <li key={area}>
                          <Badge variant="outline">{area}</Badge>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </GlassCard>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
    </Section>
  );
}
