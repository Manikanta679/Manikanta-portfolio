import { setRequestLocale } from "next-intl/server";

import { Navbar } from "@/components/navbar";
import { About, Hero, Skills } from "@/sections";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
      </main>
    </>
  );
}
