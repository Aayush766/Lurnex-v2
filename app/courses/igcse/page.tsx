import type { Metadata } from "next";
import { CurriculumPage } from "@/components/courses/curriculum/CurriculumPage";

export const metadata: Metadata = { title: "IGCSE Curriculum Online Coaching | LURNEX", description: "Flexible IGCSE learning with subject-wise resources, practice, exam strategies and global university guidance.", alternates: { canonical: "/courses/igcse" } };
export default function Page(){ return <CurriculumPage type="igcse" />; }
