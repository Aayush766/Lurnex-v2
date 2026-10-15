import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Success Stories | lurnex",
  description: "Read learner stories about tutoring, exam preparation and progress with lurnex.",
  alternates: { canonical: "/success-stories" },
};

export default function SuccessStoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
