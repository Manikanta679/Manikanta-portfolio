import { useTranslations } from "next-intl";

import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { SkillsGrid } from "@/components/skills-grid";

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

      <SkillsGrid />
    </Section>
  );
}
