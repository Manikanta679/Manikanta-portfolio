"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Blocks,
  Check,
  CircleCheckBig,
  ExternalLink,
  Github,
  Layers,
  ListChecks,
  Puzzle,
  Sparkles,
  Target,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/variants";
import type { ProjectContent, ProjectStatus } from "@/data/projects";

type ProjectModalProps = {
  open: boolean;
  onClose: () => void;
  content: ProjectContent;
  github?: string;
  liveDemo?: string;
  status: ProjectStatus;
};

const statusKey: Record<ProjectStatus, string> = {
  latest: "latest",
  completed: "completed",
  "in-progress": "inProgress",
};

/** Section wrapper with an icon heading and an elegant top separator. */
function CaseSection({
  icon: Icon,
  title,
  children,
  divider = true,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  divider?: boolean;
}) {
  return (
    <section
      className={
        divider ? "border-t border-border/60 pt-6" : undefined
      }
    >
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
        <Icon className="size-4" aria-hidden />
        {title}
      </h3>
      {children}
    </section>
  );
}

/**
 * Premium project case-study modal rendered in a portal. Closes on Escape,
 * backdrop click and the close button; locks body scroll and traps focus while
 * open. GitHub / Live Demo buttons render only when a real URL is provided.
 */
export function ProjectModal({
  open,
  onClose,
  content,
  github,
  liveDemo,
  status,
}: ProjectModalProps) {
  const t = useTranslations("projects");
  const tc = useTranslations("common");
  const [mounted, setMounted] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Trap focus inside the dialog so keyboard users can't tab out.
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;

        const active = document.activeElement;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const id = window.setTimeout(() => closeRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(id);
    };
  }, [open, onClose]);

  const hasGithub = Boolean(github && github !== "#");
  const hasLiveDemo = Boolean(liveDemo && liveDemo !== "#");
  const hasLinks = hasGithub || hasLiveDemo;
  const isLatest = status === "latest";

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative z-10 flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {/* Header */}
            <div className="relative shrink-0 overflow-hidden border-b border-border/60 p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full bg-primary/10 blur-3xl"
              />
              <div className="relative flex items-start justify-between gap-4">
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{content.category}</Badge>
                    <Badge
                      variant={isLatest ? "default" : "secondary"}
                      className="gap-1"
                    >
                      {isLatest ? (
                        <Sparkles className="size-3" />
                      ) : (
                        <Check className="size-3" />
                      )}
                      {tc(`status.${statusKey[status]}`)}
                    </Badge>
                  </div>
                  <h2
                    id={titleId}
                    className="text-xl font-bold tracking-tight sm:text-2xl"
                  >
                    {content.title}
                  </h2>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    {content.subtitle}
                  </p>
                </div>
                <Button
                  ref={closeRef}
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  aria-label={t("modal.close")}
                  className="shrink-0"
                >
                  <X className="size-5" />
                </Button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {/* Overview */}
              <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                {content.overview}
              </p>

              {/* Key Features */}
              <CaseSection icon={Sparkles} title={t("modal.features")}>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {content.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CaseSection>

              {/* Architecture & System Design */}
              <CaseSection icon={Layers} title={t("modal.architecture")}>
                <ul className="space-y-3">
                  {content.architecture.map((item) => (
                    <li
                      key={item.name}
                      className="rounded-lg border border-border/50 bg-muted/30 p-3"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </CaseSection>

              {/* Technology Stack */}
              <CaseSection icon={Blocks} title={t("modal.stack")}>
                <div className="space-y-3">
                  {content.stack.map((group) => (
                    <div
                      key={group.label}
                      className="flex flex-col gap-2 sm:flex-row sm:items-start"
                    >
                      <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:w-40 sm:pt-1.5">
                        {group.label}
                      </span>
                      <ul className="flex flex-wrap gap-2">
                        {group.items.map((tech) => (
                          <li key={tech}>
                            <Badge variant="outline">{tech}</Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CaseSection>

              {/* Core Modules */}
              <CaseSection icon={Puzzle} title={t("modal.modules")}>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {content.modules.map((mod) => (
                    <li
                      key={mod.name}
                      className="rounded-lg border border-border/50 p-3 transition-colors hover:border-primary/40"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {mod.name}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {mod.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </CaseSection>

              {/* Key Contributions */}
              <CaseSection icon={ListChecks} title={t("modal.contributions")}>
                <ul className="space-y-2">
                  {content.contributions.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <CircleCheckBig className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </CaseSection>

              {/* Challenges Solved */}
              <CaseSection icon={TriangleAlert} title={t("modal.challenges")}>
                <ul className="space-y-2">
                  {content.challenges.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60"
                        aria-hidden
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </CaseSection>

              {/* Outcome & Results */}
              <CaseSection icon={Target} title={t("modal.outcomes")}>
                <ul className="space-y-2">
                  {content.outcomes.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </CaseSection>
            </div>

            {/* Footer (only when real links exist) */}
            {hasLinks ? (
              <div className="flex shrink-0 flex-wrap justify-end gap-3 border-t border-border/60 p-6">
                {hasGithub ? (
                  <Button asChild variant="outline">
                    <a href={github} target="_blank" rel="noopener noreferrer">
                      <Github />
                      {t("github")}
                    </a>
                  </Button>
                ) : null}
                {hasLiveDemo ? (
                  <Button asChild className="w-full sm:w-auto">
                    <a href={liveDemo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink />
                      {t("liveApplication")}
                    </a>
                  </Button>
                ) : null}
              </div>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
