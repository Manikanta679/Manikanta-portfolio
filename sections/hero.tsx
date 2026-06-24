"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, FolderGit2, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/variants";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export function Hero() {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotion();

  /** Infinite float animation, disabled when the user prefers reduced motion. */
  const float = (range: number, duration: number) =>
    reduceMotion
      ? undefined
      : {
          y: [0, -range, 0],
          x: [0, range / 2, 0],
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 pt-16"
    >
      {/* Animated background glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[680px] max-w-full -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        animate={
          reduceMotion ? undefined : { opacity: [0.55, 1, 0.55], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating gradient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-[28%] -z-10 size-40 rounded-full bg-blue-500/20 blur-3xl"
        animate={float(30, 9)}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[12%] top-[24%] -z-10 size-52 rounded-full bg-fuchsia-500/15 blur-3xl"
        animate={float(40, 11)}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[18%] left-[40%] -z-10 size-44 rounded-full bg-emerald-500/15 blur-3xl"
        animate={float(24, 10)}
      />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 35%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 35%, black, transparent)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.span
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/70" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          {t("available")}
        </motion.span>

        <motion.h1
          variants={item}
          className="text-balance text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          {t("name")}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 bg-linear-to-r from-primary to-foreground bg-clip-text text-lg font-semibold text-transparent sm:text-2xl"
        >
          {t("headline")}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg"
        >
          {t("intro")}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild size="lg">
            <a href="#projects">
              <FolderGit2 />
              {t("viewProjects")}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#contact">
              <Mail />
              {t("contactMe")}
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Animated scroll indicator */}
      <motion.a
        href="#about"
        aria-label={t("scrollDown")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-current p-1">
          <motion.span
            className="size-1 rounded-full bg-current"
            animate={reduceMotion ? undefined : { y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown className="mx-auto mt-1 size-4" />
      </motion.a>
    </section>
  );
}
