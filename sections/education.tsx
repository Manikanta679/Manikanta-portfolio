import { Building2, CalendarDays, GraduationCap, MapPin } from "lucide-react";
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
      <SectionHeading title={t("title")} align="center" />

      <div className="mx-auto mt-12 max-w-3xl">
        <Timeline>
          {education.map((entry, i) => {
            const content = items[entry.id];
            if (!content) return null;

            return (
              <TimelineItem
                key={entry.id}
                delay={i * 0.1}
                icon={<GraduationCap className="size-4" />}
              >
                <GlassCard className="transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
                  <CardHeader className="gap-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <CardTitle className="text-lg leading-snug">
                        {content.degree}
                      </CardTitle>
                      <Badge
                        variant={
                          entry.status === "current" ? "default" : "secondary"
                        }
                        className="shrink-0"
                      >
                        {tc(`status.${entry.status}`)}
                      </Badge>
                    </div>
                    <div className="space-y-1.5 text-sm text-muted-foreground">
                      {content.institution ? (
                        <p className="flex items-center gap-2">
                          <Building2
                            className="size-4 shrink-0 text-primary/70"
                            aria-hidden
                          />
                          <span className="font-medium text-foreground/90">
                            {content.institution}
                          </span>
                        </p>
                      ) : null}
                      {content.location ? (
                        <p className="flex items-center gap-2">
                          <MapPin
                            className="size-4 shrink-0 text-primary/70"
                            aria-hidden
                          />
                          {content.location}
                        </p>
                      ) : null}
                      <p className="flex items-center gap-2">
                        <CalendarDays
                          className="size-4 shrink-0 text-primary/70"
                          aria-hidden
                        />
                        {content.period}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {tc("focusAreas")}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {content.focus.map((area) => (
                        <li key={area}>
                          <Badge
                            variant="outline"
                            className="border-border/60 bg-muted/30 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                          >
                            {area}
                          </Badge>
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
