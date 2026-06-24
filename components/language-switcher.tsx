"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

/**
 * Minimal locale switcher that cycles through the configured locales while
 * preserving the current path. Replace with a dropdown as the UI grows.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = () => {
    const currentIndex = routing.locales.indexOf(
      locale as (typeof routing.locales)[number]
    );
    const next = routing.locales[(currentIndex + 1) % routing.locales.length];
    router.replace(pathname, { locale: next });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={switchTo}
      aria-label="Change language"
    >
      <Languages className="size-5" />
      <span className="sr-only">{locale.toUpperCase()}</span>
    </Button>
  );
}
