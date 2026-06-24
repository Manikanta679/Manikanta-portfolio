import * as React from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/**
 * Reusable vertical timeline. Renders a continuous rail with marker dots.
 * Shared by the Education and Experience sections.
 */
export function Timeline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ol className={cn("relative space-y-8", className)}>
      <span
        aria-hidden
        className="absolute bottom-2 left-[18px] top-2 w-px bg-border"
      />
      {children}
    </ol>
  );
}

type TimelineItemProps = {
  /** Marker icon rendered inside the timeline dot. */
  icon: React.ReactNode;
  /** Stagger delay for the reveal animation (seconds). */
  delay?: number;
  children: React.ReactNode;
};

export function TimelineItem({ icon, delay = 0, children }: TimelineItemProps) {
  return (
    <li className="relative pl-14">
      <span className="absolute left-0 top-1 z-10 flex size-9 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm">
        {icon}
      </span>
      <Reveal delay={delay}>{children}</Reveal>
    </li>
  );
}
