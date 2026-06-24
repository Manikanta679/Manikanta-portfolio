import { Award, BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { GlassCard } from "@/components/glass-card";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  certifications,
  type CertificationContent,
} from "@/data/certifications";

export function Certifications() {
  const t = useTranslations("certifications");
  const tc = useTranslations("common");
  const items = t.raw("items") as Record<string, CertificationContent>;

  return (
    <Section id="certifications" className="bg-muted/30">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => {
          const content = items[cert.id];
          if (!content) return null;

          return (
            <StaggerItem key={cert.id} variant="scaleIn" className="h-full">
              <GlassCard className="group h-full transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Award className="size-6" />
                    </span>
                    <Badge variant="secondary" className="gap-1">
                      <BadgeCheck className="size-3" />
                      {tc("status.completed")}
                    </Badge>
                  </div>
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
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
