"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";
import { staggerContainer, variantMap, type AnimationVariant } from "./variants";

type StaggerProps = Omit<HTMLMotionProps<"div">, "variants"> & {
  /** Delay between each child's entrance (seconds). */
  stagger?: number;
  /** Delay before the first child animates (seconds). */
  delayChildren?: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * Container that staggers the entrance of its `StaggerItem` children when
 * scrolled into view.
 */
export function Stagger({
  children,
  stagger = 0.1,
  delayChildren = 0,
  className,
  ...props
}: StaggerProps) {
  return (
    <motion.div
      variants={staggerContainer(stagger, delayChildren)}
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

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "variants"> & {
  variant?: AnimationVariant;
  className?: string;
  children: React.ReactNode;
};

/** A single item inside a `Stagger` container. */
export function StaggerItem({
  children,
  variant = "fadeUp",
  className,
  ...props
}: StaggerItemProps) {
  return (
    <motion.div
      variants={variantMap[variant]}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
