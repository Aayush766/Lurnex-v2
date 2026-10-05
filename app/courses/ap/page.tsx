import type { Metadata } from "next";
import { CurriculumPage } from "@/components/courses/curriculum/CurriculumPage";

export const metadata: Metadata = { title: "Advanced Placement Online Coaching | LURNEX", description: "University-level AP learning with expert instruction, exam practice and college pathway guidance.", alternates: { canonical: "/courses/ap" } };
export default function Page(){ return <CurriculumPage type="ap" />; }
