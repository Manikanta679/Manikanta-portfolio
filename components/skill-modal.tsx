"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Layers, Sparkles, Target, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/variants";

/** Fully-resolved, render-ready details for a single skill. */
export type SkillDetailView = {
  name: string;
  category: string;
  summary: string;
  /** Real projects / internships / contexts where the skill was applied. */
  usedIn: string[];
  /** Co-technologies (proper nouns). */
  workedWith: string[];
  responsibilities: string[];
  outcome?: string;
};

type SkillModalProps = {
  open: boolean;
  onClose: () => void;
  view: SkillDetailView | null;
};

/**
 * Accessible skill-detail dialog rendered in a portal. Reuses the same a11y
 * contract as the project modal: closes on Escape / backdrop, locks body
 * scroll, focuses the close control and traps Tab focus while open.
 *
 * `view` becomes null on close; the last value is cached so the exit animation
 * still has content to render.
 */
export function SkillModal({ open, onClose, view }: SkillModalProps) {
  const t = useTranslations("skills");
  const [mounted, setMounted] = React.useState(false);
  const [cached, setCached] = React.useState<SkillDetailView | null>(view);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (view) setCached(view);
  }, [view]);

  React.useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

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

  if (!mounted) return null;

  const data = view ?? cached;

  return createPortal(
    <AnimatePresence>
      {open && data ? (
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
            className="relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/95 shadow-2xl backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border/60 p-6">
              <div className="space-y-2">
                <Badge variant="secondary">{data.category}</Badge>
                <h2
                  id={titleId}
                  className="text-xl font-bold tracking-tight sm:text-2xl"
                >
                  {data.name}
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
              {data.summary ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {data.summary}
                </p>
              ) : null}

              {data.usedIn.length > 0 ? (
                <section className="space-y-2">
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                    <Briefcase className="size-4" aria-hidden />
                    {t("modal.usedIn")}
                  </h3>
                  <ul className="space-y-2">
                    {data.usedIn.map((entry) => (
                      <li
                        key={entry}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Sparkles
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden
                        />
                        <span>{entry}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {data.responsibilities.length > 0 ? (
                <section className="space-y-2">
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                    <Target className="size-4" aria-hidden />
                    {t("modal.responsibilities")}
                  </h3>
                  <ul className="space-y-2">
                    {data.responsibilities.map((entry) => (
                      <li
                        key={entry}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{entry}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {data.workedWith.length > 0 ? (
                <section className="space-y-2">
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                    <Layers className="size-4" aria-hidden />
                    {t("modal.workedWith")}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {data.workedWith.map((tech) => (
                      <li key={tech}>
                        <Badge variant="outline">{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {data.outcome ? (
                <section className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    {t("modal.outcome")}
                  </h3>
                  <p className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm font-medium text-foreground">
                    {data.outcome}
                  </p>
                </section>
              ) : null}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
