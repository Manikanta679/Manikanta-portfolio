import { useTranslations } from "next-intl";

import { navItems } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          {/* Brand */}
          <div className="max-w-sm space-y-2">
            <a
              href="#home"
              className="text-lg font-bold tracking-tight transition-colors hover:text-primary"
            >
              {siteConfig.name}
            </a>
            <p className="text-sm text-muted-foreground">{tf("headline")}</p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-4 md:flex md:flex-wrap md:justify-end md:gap-x-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(item.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} {siteConfig.name}. {tf("rights")}
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
