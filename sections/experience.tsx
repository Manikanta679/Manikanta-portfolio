import { Briefcase, Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Timeline, TimelineItem } from "@/components/timeline";
import { GlassCard } from "@/components/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { experience, type ExperienceContent } from "@/data/experience";

export function Experience() {
  const t = useTranslations("experience");
  const items = t.raw("items") as Record<string, ExperienceContent>;

  return (
    <Section id="experience" className="bg-muted/30">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

      <div className="mx-auto mt-12 max-w-3xl">
        <Timeline>
          {experience.map((entry, i) => {
            const content = items[entry.id];
            if (!content) return null;

            return (
              <TimelineItem
                key={entry.id}
                delay={i * 0.1}
                icon={<Briefcase className="size-4" />}
              >
                <GlassCard className="transition-colors hover:border-primary/40">
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <CardTitle className="text-lg leading-snug">
                        {content.role}
                      </CardTitle>
                      <span className="rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        {content.period}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-primary">
                      {content.company}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {content.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{highlight}</span>
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
