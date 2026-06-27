"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Languages as LanguagesIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EASE } from "@/components/motion/variants";
import { languages, LANGUAGE_SEGMENTS } from "@/data/languages";

/** Translated language entry (from `about.languages.items.<key>`). */
type LanguageItem = {
  name: string;
  level: string;
};

/**
 * Compact language card with a premium, animated segmented proficiency
 * indicator. When a row scrolls into view its segments light up left-to-right,
 * once, over roughly one second. Honours `prefers-reduced-motion` by rendering
 * the filled state immediately without animating.
 */
export function LanguagesCard() {
  const t = useTranslations("about");
  const reduceMotion = useReducedMotion();
  const items = t.raw("languages.items") as Record<string, LanguageItem>;

  return (
    <Reveal>
      <GlassCard className="transition-all hover:border-primary/40 hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <LanguagesIcon className="size-5" />
            </span>
            <CardTitle className="text-lg">{t("languages.title")}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {languages.map((lang, langIndex) => {
              const item = items[lang.key];
              if (!item) return null;

              const filledSegments = Math.round(
                (lang.value / 100) * LANGUAGE_SEGMENTS
              );

              return (
                <li key={lang.key} className="space-y-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.level}
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={lang.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${item.name}: ${item.level}`}
                    className="flex items-center gap-1"
                  >
                    {Array.from({ length: LANGUAGE_SEGMENTS }).map((_, i) => {
                      const filled = i < filledSegments;
                      return (
                        <motion.span
                          key={i}
                          aria-hidden
                          className={
                            filled
                              ? "h-1.5 flex-1 rounded-full bg-linear-to-r from-primary to-primary/70 shadow-[0_0_8px_0] shadow-primary/50"
                              : "h-1.5 flex-1 rounded-full bg-muted-foreground/15"
                          }
                          initial={
                            reduceMotion
                              ? false
                              : { opacity: 0, scaleX: 0 }
                          }
                          whileInView={{ opacity: 1, scaleX: 1 }}
                          viewport={{ once: true, margin: "-60px" }}
                          style={{ originX: 0 }}
                          transition={{
                            duration: 0.45,
                            ease: EASE,
                            delay: filled
                              ? langIndex * 0.06 + i * 0.07
                              : langIndex * 0.06,
                          }}
                        />
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </GlassCard>
    </Reveal>
  );
}
