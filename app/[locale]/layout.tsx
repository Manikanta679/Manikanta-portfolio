import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { isValidLocale, routing } from "@/i18n/routing";
import { Providers } from "@/providers";
import { siteConfig } from "@/constants/site";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/** Pre-render a static page per locale at build time. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Viewport + theme-color (separated from `metadata` per Next.js 15). Drives the
 * mobile browser chrome colour in both light and dark mode.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  // With `localePrefix: "as-needed"` the default locale is served at "/",
  // every other locale under "/<locale>". Keep canonical + hreflang in sync.
  const canonical = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s | ${siteConfig.name}`,
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    alternates: {
      canonical,
      languages: {
        en: "/",
        de: "/de",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "website",
      locale,
      url: canonical,
      title: t("title"),
      description: t("description"),
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [siteConfig.ogImage],
    },
    icons: { icon: "/favicon.ico" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale);

  // In next-intl v3 the server provider forwards locale/now/timeZone but NOT
  // messages, so we pass them explicitly to make translations available to all
  // Client Components.
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
