import { setRequestLocale } from "next-intl/server";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
