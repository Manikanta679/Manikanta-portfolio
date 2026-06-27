"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowDown,
  FolderGit2,
  Github,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/variants";
import { siteConfig } from "@/constants/site";

type HeroSocial = {
  href: string;
  labelKey: "linkedin" | "github" | "email";
  icon: LucideIcon;
  external: boolean;
};

const heroSocials: HeroSocial[] = [
  {
    href: siteConfig.links.linkedin,
    labelKey: "linkedin",
    icon: Linkedin,
    external: true,
  },
  {
    href: siteConfig.links.github,
    labelKey: "github",
    icon: Github,
    external: true,
  },
  {
    href: `mailto:${siteConfig.email}`,
    labelKey: "email",
    icon: Mail,
    external: false,
  },
];

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

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
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

        <motion.div
          variants={item}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          {heroSocials.map(({ href, labelKey, icon: Icon, external }) => (
            <motion.a
              key={labelKey}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-foreground hover:shadow-[0_0_20px_-4px] hover:shadow-primary/40"
            >
              <Icon className="size-4" aria-hidden />
              {t(`social.${labelKey}`)}
            </motion.a>
          ))}
        </motion.div>
        </motion.div>

        {/* Profile picture — right on desktop, below the text on mobile */}
        <motion.div
          initial={{ opacity: 0, x: reduceMotion ? 0 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          className="relative mx-auto w-full max-w-[16rem] sm:max-w-[18rem] lg:ml-auto lg:max-w-sm"
        >
          {/* Subtle glow behind the portrait */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-primary/15 blur-2xl"
          />
          <motion.div animate={float(10, 6)} className="will-change-transform">
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-2 shadow-xl backdrop-blur-md supports-[backdrop-filter]:bg-card/50"
            >
              <Image
                src="/images/profile.jpg"
                alt={t("portraitAlt")}
                width={800}
                height={1000}
                sizes="(max-width: 640px) 16rem, (max-width: 1024px) 18rem, 24rem"
                className="h-auto w-full rounded-xl"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

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
