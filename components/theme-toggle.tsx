"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

/**
 * Accessible light/dark toggle.
 * Renders a stable placeholder until mounted to avoid hydration mismatches.
 */
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const t = useTranslations("common");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const toggle = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={t("toggleTheme")}
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  );
}
