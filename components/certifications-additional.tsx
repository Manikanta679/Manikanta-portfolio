"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { CertificationCard } from "@/components/certification-card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Button } from "@/components/ui/button";
import type {
  Certification,
  CertificationContent,
} from "@/data/certifications";
import { cn } from "@/lib/utils";

export function CertificationsAdditional({
  items,
}: {
  items: { certification: Certification; content: CertificationContent }[];
}) {
  const t = useTranslations("certifications");
  const [expanded, setExpanded] = React.useState(false);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-4 border-t border-border/50 pt-8">
      <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <h3 className="text-base font-semibold tracking-tight">
          {t("additionalTitle")}
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setExpanded((value) => !value)}
          className="gap-1.5 text-muted-foreground hover:text-foreground"
          aria-expanded={expanded}
        >
          {expanded ? t("showLess") : t("showMore")}
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-300",
              expanded && "rotate-180"
            )}
          />
        </Button>
      </div>

      {expanded ? (
        <Stagger className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map(({ certification, content }) => (
            <StaggerItem key={certification.id} variant="scaleIn" className="h-full">
              <CertificationCard certification={certification} content={content} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : null}
    </div>
  );
}
