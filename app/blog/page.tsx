import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Learning Journal | lurnex",
  description: "Ideas, study strategies and practical guidance for students and families navigating school, entrance exams and global curricula.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#f5f9ff] text-[#10244a]">
      <section className="relative isolate overflow-hidden bg-[#071b3a] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_82%_20%,rgba(8,127,245,.4),transparent_34%),radial-gradient(ellipse_at_10%_100%,rgba(108,59,255,.3),transparent_43%)]" />
        <div className="container-shell py-16 md:py-20"><div className="flex items-center gap-2 text-sm text-blue-100/70"><Link href="/" className="transition hover:text-white">Home</Link><span>/</span><span className="text-white">Journal</span></div><div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold tracking-[.15em] text-sky-100"><BookOpen size={15}/> THE LURNEX JOURNAL</span><h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">Ideas to help you <span className="text-sky-300">learn with confidence.</span></h1><p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100/80">Study strategies, exam guidance and thoughtful perspectives on how students learn.</p></div><Link href="/courses" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200 transition hover:text-white">Explore our programmes <ArrowRight size={16}/></Link></div><div className="mt-9 flex flex-wrap gap-2">{["Study strategies", "Exam preparation", "Personalised learning"].map((topic) => <span key={topic} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.07] px-3 py-2 text-xs text-blue-100"><Sparkles size={13}/>{topic}</span>)}</div></div>
      </section>
      <section className="container-shell py-12 md:py-16"><BlogIndex /></section>
    </main>
  );
}
