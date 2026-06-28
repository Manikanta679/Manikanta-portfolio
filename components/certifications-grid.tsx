"use client";

import { useTranslations } from "next-intl";

import { CertificationCard } from "@/components/certification-card";
import { CertificationsAdditional } from "@/components/certifications-additional";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import {
  additionalCertifications,
  primaryCertifications,
  type CertificationContent,
} from "@/data/certifications";

export function CertificationsGrid() {
  const t = useTranslations("certifications");
  const items = t.raw("items") as Record<string, CertificationContent>;

  const visiblePrimary = primaryCertifications
    .map((certification) => ({
      certification,
      content: items[certification.id],
    }))
    .filter((entry): entry is typeof entry & { content: CertificationContent } =>
      Boolean(entry.content)
    );

  const visibleAdditional = additionalCertifications
    .map((certification) => ({
      certification,
      content: items[certification.id],
    }))
    .filter((entry): entry is typeof entry & { content: CertificationContent } =>
      Boolean(entry.content)
    );

  return (
    <>
      <Stagger className="mt-12 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">

        {visiblePrimary.map(({ certification, content }) => (
          <StaggerItem key={certification.id} variant="scaleIn" className="h-full">
            <CertificationCard certification={certification} content={content} />
          </StaggerItem>
        ))}
      </Stagger>

      <CertificationsAdditional items={visibleAdditional} />
    </>
  );
}
