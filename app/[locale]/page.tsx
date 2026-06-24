import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

/**
 * Placeholder landing content. Real sections (Hero, About, Projects, …)
 * will be composed here from `@/sections`.
 */
function HomeContent() {
  const t = useTranslations("home");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="absolute right-6 top-6 flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        {t("greeting")}
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">{t("tagline")}</p>
    </main>
  );
}
