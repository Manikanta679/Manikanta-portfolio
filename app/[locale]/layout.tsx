import type { Metadata } from "next";
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

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

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
      canonical: "/",
      languages: {
        en: "/en",
        de: "/de",
      },
    },
    openGraph: {
      type: "website",
      locale,
      url: siteConfig.url,
      title: t("title"),
      description: t("description"),
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: siteConfig.author.twitter,
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
