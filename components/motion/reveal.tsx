"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";
import { variantMap, type AnimationVariant } from "./variants";

type RevealProps = Omit<HTMLMotionProps<"div">, "variants"> & {
  /** Which entrance animation to use. Defaults to "fadeUp". */
  variant?: AnimationVariant;
  /** Delay before the animation starts (seconds). */
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * Reusable scroll-reveal wrapper built on the shared animation variants.
 * Animates once when scrolled into view; honours the chosen `variant`.
 */
export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
  ...props
}: RevealProps) {
  return (
    <motion.div
      variants={variantMap[variant]}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
