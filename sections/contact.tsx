import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/glass-card";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";

export function Contact() {
  const t = useTranslations("contact");

  const details = [
    {
      icon: MapPin,
      label: t("locationLabel"),
      value: siteConfig.location,
      href: undefined as string | undefined,
    },
    {
      icon: Mail,
      label: t("emailLabel"),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
  ];

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("cta")}
        description={t("subtitle")}
        align="center"
      />

      <Reveal className="mx-auto mt-12 max-w-2xl" variant="scaleIn">
        <GlassCard>
          <CardContent className="space-y-8 p-8 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {details.map(({ icon: Icon, label, value, href }) => {
                const body = (
                  <div className="flex h-full items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {label}
                      </p>
                      <p className="truncate font-medium">{value}</p>
                    </div>
                  </div>
                );

                return href ? (
                  <a key={label} href={href} className="block">
                    {body}
                  </a>
                ) : (
                  <div key={label}>{body}</div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail />
                  {t("emailMe")}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github />
                  {t("github")}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin />
                  {t("linkedin")}
                </a>
              </Button>
            </div>
          </CardContent>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
