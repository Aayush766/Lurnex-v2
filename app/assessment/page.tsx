import type { Metadata } from "next";
import AssessmentPage from "@/components/assessment/AssessmentPage";
import "./assessment.css";

export const metadata: Metadata = {
  title: "Academic Readiness Assessment | LURNEX",
  description: "Take a personalised academic readiness assessment and receive a learning roadmap from LURNEX.",
  alternates: { canonical: "/assessment" },
};

export default function Page() {
  return <AssessmentPage />;
}
