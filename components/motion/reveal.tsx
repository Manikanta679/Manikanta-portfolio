"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Delay before the animation starts (seconds). */
  delay?: number;
  /** Animation duration (seconds). */
  duration?: number;
  /** Vertical offset to animate from (px). */
  y?: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * Reusable scroll-reveal wrapper. Fades + slides its children into view once,
 * respecting the user's reduced-motion preference (handled by Framer Motion).
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  y = 24,
  className,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
