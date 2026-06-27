import { getTranslations, setRequestLocale } from "next-intl/server";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import {
  About,
  Certifications,
  Contact,
  Education,
  Experience,
  Hero,
  Projects,
  Resume,
  Skills,
} from "@/sections";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "metadata" });
  const tHero = await getTranslations({ locale, namespace: "hero" });

  return (
    <>
      <StructuredData
        locale={locale}
        jobTitle={tHero("headline")}
        description={t("description")}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
