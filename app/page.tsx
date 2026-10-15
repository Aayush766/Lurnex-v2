import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StatsStrip } from "@/components/home/StatsStrip";
import { CoursesSection } from "@/components/home/CoursesSection";
import { TutoringSection } from "@/components/home/TutoringSection";
import { Whylumex } from "@/components/home/WhyLumex";
import { Testimonials } from "@/components/home/Testimonials";
import { Mentors } from "@/components/home/Mentors";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getOrganizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const schema = getOrganizationSchema();
  return (
    <>
      <main>
        <Hero />
        <StatsStrip />
        <CoursesSection />
        <TutoringSection />
        <Whylumex />
        <Testimonials />
        <Mentors />
        <FAQ />
        <FinalCTA />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
