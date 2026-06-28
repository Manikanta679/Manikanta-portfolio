"use client";

import { ExternalLink, FileText } from "lucide-react";

import { CardFooter } from "@/components/ui/card";

const footerClassName =
  "mt-auto flex min-h-9 w-full flex-row flex-wrap items-end gap-x-6 gap-y-2.5 px-4 pb-4 pt-0";

const actionClassName =
  "group/link inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground";

const labelClassName =
  "underline-offset-4 decoration-primary/50 transition-[text-decoration-color,color] duration-200 group-hover/link:underline";

/** Minimalist footer action row for certification cards. */
export function CertificationCardFooter({
  label,
  certificateUrl,
}: {
  label: string;
  certificateUrl?: string;
}) {
  if (!certificateUrl) {
    return null;
  }

  return (
    <CardFooter className={footerClassName}>
      <a
        href={certificateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={actionClassName}
      >
        <FileText className="size-3.5 shrink-0 transition-transform duration-200 group-hover/link:-translate-y-px" />
        <span className={labelClassName}>{label}</span>
        <ExternalLink className="size-3 shrink-0 opacity-60 transition-transform duration-200 group-hover/link:-translate-y-px" />
      </a>
    </CardFooter>
  );
}
