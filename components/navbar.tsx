"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { navItems } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Navbar() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const sectionIds = React.useMemo(
    () => navItems.map((item) => item.href.replace("#", "")),
    []
  );
  const activeId = useActiveSection(sectionIds);
  const activeItem = navItems.find((item) => item.href === `#${activeId}`);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the mobile menu when resizing up to the desktop breakpoint.
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label={t("home")}
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6"
      >
        <a
          href="#home"
          className="text-lg font-bold tracking-tight transition-colors hover:text-primary"
        >
          {siteConfig.shortName}
          <span className="text-primary">.</span>
        </a>

        {/* Desktop navigation with animated active underline */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = item.href === `#${activeId}`;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t(item.labelKey)}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          {/* Current section indicator (mobile) */}
          {activeItem ? (
            <span className="mr-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground lg:hidden">
              {t(activeItem.labelKey)}
            </span>
          ) : null}
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? tc("closeMenu") : tc("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border/60 bg-background/95 backdrop-blur-lg lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item) => {
                const isActive = item.href === `#${activeId}`;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                        isActive
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full transition-colors",
                          isActive ? "bg-primary" : "bg-transparent"
                        )}
                      />
                      {t(item.labelKey)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
