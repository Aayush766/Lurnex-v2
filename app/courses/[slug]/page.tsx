import type { Metadata } from "next";
import { ProgramPage } from "@/components/courses/ProgramPage";
import { programBySlug, programs } from "@/lib/programs";

export function generateStaticParams() { return programs.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const program = programBySlug((await params).slug); return program ? { title: `${program.title} Online Tutoring`, description: program.description, alternates: { canonical: `/courses/${program.slug}` } } : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <ProgramPage slug={(await params).slug} />; }
