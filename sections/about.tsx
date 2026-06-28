import {
  BarChart3,
  Hammer,
  LayoutTemplate,
  Server,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { LanguagesCard } from "@/components/languages-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const buildItems: { key: string; icon: LucideIcon }[] = [
  { key: "aiApps", icon: Sparkles },
  { key: "fullstack", icon: LayoutTemplate },
  { key: "dashboards", icon: BarChart3 },
  { key: "apis", icon: Server },
  { key: "automation", icon: Workflow },
];

export function About() {
  const t = useTranslations("about");

  return (
    <Section id="about">
      <SectionHeading title={t("title")} align="center" />

      <div className="mt-12 grid gap-8 lg:grid-cols-5 lg:items-stretch">
        {/* Left: professional summary */}
        <Reveal className="space-y-5 lg:col-span-3">
          <h3 className="text-xl font-bold tracking-tight">
            {t("summary.title")}
          </h3>
          <p className="text-lg font-medium leading-relaxed text-foreground">
            {t("summary.intro")}
          </p>
          <p className="leading-relaxed text-muted-foreground">
            {t("summary.p1")}
          </p>
          <p className="leading-relaxed text-muted-foreground">
            {t("summary.p2")}
          </p>
        </Reveal>

        {/* Right: what I build */}
        <Reveal delay={0.1} className="lg:col-span-2">
          <Card className="h-full transition-colors hover:border-primary/40">
            <CardHeader>
              <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Hammer className="size-5" />
              </div>
              <CardTitle className="text-lg">{t("build.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Stagger role="list" className="space-y-3">
                {buildItems.map(({ key, icon: Icon }) => (
                  <StaggerItem
                    key={key}
                    role="listitem"
                    variant="fadeUp"
                    className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span>{t(`build.items.${key}`)}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      {/* Below: compact languages */}
      <div className="mt-8">
        <LanguagesCard />
      </div>
    </Section>
  );
}
