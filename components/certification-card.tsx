"use client";



import { useTranslations } from "next-intl";



import { CertificationCardFooter } from "@/components/certification-card-footer";

import { GlassCard } from "@/components/glass-card";

import { CardContent } from "@/components/ui/card";

import type { Certification, CertificationContent } from "@/data/certifications";



type CertificationCardProps = {

  certification: Certification;

  content: CertificationContent;

};



export function CertificationCard({

  certification,

  content,

}: CertificationCardProps) {

  const t = useTranslations("certifications");



  return (

    <GlassCard className="group flex h-full min-h-[150px] flex-col overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:border-primary/40 hover:shadow-md hover:shadow-primary/5">

      <CardContent className="flex flex-1 flex-col gap-2 p-4">

        <div className="space-y-1">

          <h3 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight">

            {content.title}

          </h3>

          <p className="line-clamp-1 text-xs text-muted-foreground">

            {content.issuer}

          </p>

          {content.year ? (

            <p className="text-xs text-muted-foreground/80">{content.year}</p>

          ) : null}

        </div>

      </CardContent>



      <CertificationCardFooter

        label={t("viewCertificate")}

        certificateUrl={certification.certificateUrl}

      />

    </GlassCard>

  );

}


