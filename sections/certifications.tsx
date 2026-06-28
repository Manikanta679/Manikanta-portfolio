import { Award } from "lucide-react";
import { useTranslations } from "next-intl";

import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { CertificationsGrid } from "@/components/certifications-grid";
import { EmptyState } from "@/components/empty-state";
import { certifications } from "@/data/certifications";
import type { CertificationContent } from "@/data/certifications";

export function Certifications() {
  const t = useTranslations("certifications");
  const items = t.raw("items") as Record<string, CertificationContent>;

  const visibleCertifications = certifications.filter((cert) => items[cert.id]);

  return (
    <Section id="certifications" className="bg-muted/30">
      <SectionHeading title={t("title")} align="center" />

      {visibleCertifications.length > 0 ? (
        <CertificationsGrid />
      ) : (
        <div className="mt-12">
          <EmptyState
            icon={Award}
            title={t("empty.title")}
            description={t("empty.description")}
          />
        </div>
      )}
    </Section>
  );
}
