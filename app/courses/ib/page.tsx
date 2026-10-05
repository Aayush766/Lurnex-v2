import type { Metadata } from "next";
import { CurriculumPage } from "@/components/courses/curriculum/CurriculumPage";

export const metadata: Metadata = { title: "IB Diploma Online Coaching | LURNEX", description: "IB Diploma support with subject mastery, IA, Extended Essay, TOK and global university guidance.", alternates: { canonical: "/courses/ib" } };
export default function Page(){ return <CurriculumPage type="ib" />; }
