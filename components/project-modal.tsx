"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Github, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/variants";
import type { ProjectContent, ProjectStatus } from "@/data/projects";

type ProjectModalProps = {
  open: boolean;
  onClose: () => void;
  content: ProjectContent;
  technologies: readonly string[];
  github: string;
  status: ProjectStatus;
};

const statusKey: Record<ProjectStatus, "completed" | "inProgress"> = {
  completed: "completed",
  "in-progress": "inProgress",
};

/**
 * Reusable, accessible project details modal rendered in a portal.
 * Closes on Escape, backdrop click and the close button; locks body scroll and
 * moves focus to the close control while open.
 */
export function ProjectModal({
  open,
  onClose,
  content,
  technologies,
  github,
  status,
}: ProjectModalProps) {
  const t = useTranslations("projects");
  const tc = useTranslations("common");
  const [mounted, setMounted] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const titleId = React.useId();

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    // Move focus into the dialog.
    const id = window.setTimeout(() => closeRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(id);
    };
  }, [open, onClose]);

  const hasGithub = Boolean(github && github !== "#");

  const lists: { heading: string; items: string[] }[] = [
    { heading: t("modal.achievements"), items: content.achievements },
    { heading: t("modal.challenges"), items: content.challenges },
    { heading: t("modal.futureImprovements"), items: content.futureImprovements },
  ];

  const paragraphs: { heading: string; body: string }[] = [
    { heading: t("modal.overview"), body: content.overview },
    { heading: t("modal.problem"), body: content.problem },
    { heading: t("modal.solution"), body: content.solution },
    { heading: t("modal.architecture"), body: content.architecture },
  ];

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
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border/60 p-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{content.category}</Badge>
                  <Badge className="gap-1">
                    <Check className="size-3" />
                    {tc(`status.${statusKey[status]}`)}
                  </Badge>
                </div>
                <h2
                  id={titleId}
                  className="text-xl font-bold tracking-tight sm:text-2xl"
                >
                  {content.title}
                </h2>
              </div>
              <Button
                ref={closeRef}
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label={t("modal.close")}
              >
                <X className="size-5" />
              </Button>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {paragraphs.map(({ heading, body }) => (
                <section key={heading} className="space-y-1.5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    {heading}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </section>
              ))}

              <section className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                  {t("modal.technologies")}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <li key={tech}>
                      <Badge variant="outline">{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </section>

              {lists.map(({ heading, items }) => (
                <section key={heading} className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    {heading}
                  </h3>
                  <ul className="space-y-2">
                    {items.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-border/60 p-6">
              {hasGithub ? (
                <Button asChild variant="outline">
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    <Github />
                    {t("github")}
                  </a>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  <Github />
                  {t("github")}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
