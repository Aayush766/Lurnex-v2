import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Courses and Tutoring Programs",
  description: "Explore personalised online tutoring for school subjects, JEE, NEET, SAT and international curricula.",
  alternates: { canonical: "/courses" },
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
