import { useTranslations } from "next-intl";

import { ContactForm } from "@/components/contact-form";
import { ContactInfo, type ContactDetailIcon } from "@/components/contact-info";
import { GlassCard } from "@/components/glass-card";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { CardContent } from "@/components/ui/card";
import { siteConfig } from "@/constants/site";

export function Contact() {
  const t = useTranslations("contact");

  const details: {
    icon: ContactDetailIcon;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
  }[] = [
    {
      icon: "map",
      label: t("locationLabel"),
      value: siteConfig.location,
    },
    {
      icon: "mail",
      label: t("emailLabel"),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: "phone",
      label: t("phoneLabel"),
      value: siteConfig.phone.display,
      href: siteConfig.phone.href,
    },
    {
      icon: "whatsapp",
      label: t("whatsappLabel"),
      value: siteConfig.whatsapp.display,
      href: siteConfig.whatsapp.href,
      external: true,
    },
  ];

  return (
    <Section id="contact">
      <SectionHeading
        title={t("title")}
        description={t("subtitle")}
        align="center"
      />

      <Reveal className="mx-auto mt-12 max-w-3xl" variant="scaleIn">
        <GlassCard>
          <CardContent className="space-y-10 p-8 sm:p-10">
            <ContactInfo
              details={details}
              labels={{
                emailMe: t("emailMe"),
                github: t("github"),
                linkedin: t("linkedin"),
                whatsapp: t("whatsapp"),
              }}
            />

            <div className="border-t border-border/50 pt-10">
              <ContactForm />
            </div>
          </CardContent>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
