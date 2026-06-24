import { GraduationCap, Target } from "lucide-react";
import { useTranslations } from "next-intl";

import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function About() {
  const t = useTranslations("about");

  const infoCards = [
    {
      icon: GraduationCap,
      title: t("education.title"),
      description: t("education.description"),
    },
    {
      icon: Target,
      title: t("careerGoals.title"),
      description: t("careerGoals.description"),
    },
  ];

  return (
    <Section id="about">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

      <div className="mt-12 grid gap-10 lg:grid-cols-5 lg:items-start">
        <Reveal className="space-y-5 lg:col-span-3">
          <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            {t("lead")}
          </p>
          <p className="leading-relaxed text-muted-foreground">{t("body")}</p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
          {infoCards.map((card, i) => (
            <Reveal key={card.title} delay={0.1 * (i + 1)}>
              <Card className="h-full transition-colors hover:border-primary/40">
                <CardHeader>
                  <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <card.icon className="size-5" />
                  </div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
