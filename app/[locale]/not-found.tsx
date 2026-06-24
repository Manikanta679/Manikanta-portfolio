import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-bold sm:text-4xl">{t("title")}</h1>
      <p className="max-w-md text-muted-foreground">{t("description")}</p>
      <Link href="/" className={buttonVariants({ variant: "default" })}>
        {t("backHome")}
      </Link>
    </main>
  );
}
