import {
  Briefcase,
  Building2,
  Calendar,
  Check,
  FolderGit2,
  MapPin,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Timeline, TimelineItem } from "@/components/timeline";
import { GlassCard } from "@/components/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experience, type ExperienceContent } from "@/data/experience";

const sectionLabel =
  "text-xs font-semibold uppercase tracking-wider text-muted-foreground";

export function Experience() {
  const t = useTranslations("experience");
  const items = t.raw("items") as Record<string, ExperienceContent>;

  return (
    <Section id="experience" className="bg-muted/30">
      <SectionHeading title={t("title")} align="center" />

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
                <GlassCard className="transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
                  <CardHeader className="gap-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1">
                        <CardTitle className="text-lg leading-snug">
                          {content.role}
                        </CardTitle>
                        <p className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                          <Building2 className="size-4 shrink-0" aria-hidden />
                          {content.company}
                        </p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/60 bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                        <Calendar className="size-3.5" aria-hidden />
                        {content.period}
                      </span>
                    </div>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-4 shrink-0" aria-hidden />
                      {content.location}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    {/* Technologies */}
                    <div className="space-y-2.5">
                      <p className={sectionLabel}>{t("labels.technologies")}</p>
                      <ul className="flex flex-wrap gap-2">
                        {content.technologies.map((tech) => (
                          <li key={tech}>
                            <Badge
                              variant="secondary"
                              className="transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/15 hover:text-foreground"
                            >
                              {tech}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-2.5">
                      <p className={sectionLabel}>
                        {t("labels.responsibilities")}
                      </p>
                      <ul className="space-y-2">
                        {content.responsibilities.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          >
                            <span
                              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60"
                              aria-hidden
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Contributions */}
                    <div className="space-y-2.5">
                      <p className={sectionLabel}>
                        {t("labels.contributions")}
                      </p>
                      <ul className="space-y-2">
                        {content.contributions.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-foreground/80"
                          >
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-primary"
                              aria-hidden
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Projects (optional) */}
                    {content.projects && content.projects.length > 0 ? (
                      <div className="space-y-2.5">
                        <p className={sectionLabel}>{t("labels.projects")}</p>
                        <ul className="flex flex-wrap gap-2">
                          {content.projects.map((project) => (
                            <li key={project}>
                              <Badge
                                variant="outline"
                                className="gap-1.5 border-border/60 bg-card/40 font-normal transition-colors hover:border-primary/40 hover:text-foreground"
                              >
                                <FolderGit2
                                  className="size-3 text-primary/70"
                                  aria-hidden
                                />
                                {project}
                              </Badge>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
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
