import { Download, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/glass-card";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";

export function Resume() {
  const t = useTranslations("resume");

  return (
    <Section id="resume">
      <Reveal>
        <GlassCard className="mx-auto max-w-3xl">
          <CardContent className="flex flex-col items-center gap-5 p-8 text-center sm:p-12">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FileText className="size-7" />
            </span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t("title")}
            </h2>
            <p className="max-w-xl text-muted-foreground">{t("description")}</p>
            <Button asChild size="lg">
              <a href={siteConfig.resumeUrl} download>
                <Download />
                {t("download")}
              </a>
            </Button>
          </CardContent>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
