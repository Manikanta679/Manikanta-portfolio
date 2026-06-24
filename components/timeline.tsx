"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { EASE } from "@/components/motion/variants";

/**
 * Reusable vertical timeline with an animated connector that "grows" as it
 * scrolls into view. Shared by the Education and Experience sections.
 */
export function Timeline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ol className={cn("relative space-y-10", className)}>
      <motion.span
        aria-hidden
        className="absolute bottom-2 left-[18px] top-2 w-0.5 origin-top rounded-full bg-linear-to-b from-primary/60 via-border to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: EASE }}
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
      <motion.span
        className="absolute left-0 top-1 z-10 flex size-9 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm ring-4 ring-background"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: EASE, delay }}
      >
        {icon}
      </motion.span>
      <Reveal delay={delay}>{children}</Reveal>
    </li>
  );
}
