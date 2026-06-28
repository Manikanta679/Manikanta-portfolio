"use client";

import * as React from "react";
import { type LucideIcon } from "lucide-react";

import { CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ProjectCardFooterAction = {
  label: string;
  icon: LucideIcon;
  href?: string;
  external?: boolean;
  onClick?: () => void;
};

const footerClassName =
  "mt-auto flex min-h-9 w-full flex-row flex-wrap items-center gap-x-6 gap-y-2.5";

const actionClassName =
  "group/link inline-flex items-center gap-1.5 text-xs font-medium leading-none text-muted-foreground transition-colors duration-200 hover:text-foreground";

const labelClassName =
  "underline-offset-4 decoration-primary/50 transition-[text-decoration-color,color] duration-200 group-hover/link:underline";

function ProjectCardFooterAction({
  action,
}: {
  action: ProjectCardFooterAction;
}) {
  const Icon = action.icon;
  const content = (
    <>
      <Icon className="size-3.5 shrink-0 transition-transform duration-200 group-hover/link:-translate-y-px" />
      <span className={labelClassName}>{action.label}</span>
    </>
  );

  if (action.href) {
    return (
      <a
        href={action.href}
        {...(action.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={actionClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={action.onClick}
      className={cn(
        actionClassName,
        "cursor-pointer appearance-none border-0 bg-transparent p-0 font-inherit",
      )}
    >
      {content}
    </button>
  );
}

/** Shared minimalist action row for every project card footer. */
export function ProjectCardFooter({
  actions,
}: {
  actions: ProjectCardFooterAction[];
}) {
  return (
    <CardFooter className={footerClassName}>
      {actions.map((action) => (
        <ProjectCardFooterAction key={action.label} action={action} />
      ))}
    </CardFooter>
  );
}
