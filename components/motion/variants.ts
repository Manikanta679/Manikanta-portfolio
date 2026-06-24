import type { Variants } from "framer-motion";

/** Shared easing curve used across all entrance animations. */
export const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const DURATION = 0.55;

/**
 * Reusable Framer Motion variants. Each `show` target is a function so an
 * optional stagger `delay` can be passed via the `custom` prop.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE, delay },
  }),
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -28 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE, delay },
  }),
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  show: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: DURATION, ease: EASE, delay },
  }),
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  show: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: DURATION, ease: EASE, delay },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

/** Container variant that staggers the entrance of its children. */
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

export const variantMap = {
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  scaleIn,
} as const;

export type AnimationVariant = keyof typeof variantMap;
