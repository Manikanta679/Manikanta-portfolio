import { Award } from "lucide-react";
import { useTranslations } from "next-intl";

import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/glass-card";
import { CardContent } from "@/components/ui/card";
import {
  certifications,
  type CertificationContent,
} from "@/data/certifications";

export function Certifications() {
  const t = useTranslations("certifications");
  const items = t.raw("items") as Record<string, CertificationContent>;

  return (
    <Section id="certifications" className="bg-muted/30">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => {
          const content = items[cert.id];
          if (!content) return null;

          return (
            <Reveal key={cert.id} delay={i * 0.08}>
              <GlassCard className="group h-full transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Award className="size-6" />
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-semibold leading-snug">
                      {content.title}
                    </h3>
                    {content.issuer ? (
                      <p className="text-sm text-muted-foreground">
                        {content.issuer}
                      </p>
                    ) : null}
                  </div>
                </CardContent>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
