import type { Metadata } from "next";
import { CurriculumPage } from "@/components/courses/curriculum/CurriculumPage";

export const metadata: Metadata = { title: "CBSE Curriculum Online Coaching | LURNEX", description: "Structured CBSE learning with concept clarity, study material, practice tests and personalised academic guidance.", alternates: { canonical: "/courses/cbse" } };
export default function Page(){ return <CurriculumPage type="cbse" />; }
