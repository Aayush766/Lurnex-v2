import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { courses } from "@/lib/constants";
import { CourseCard } from "./CourseCard";

export function CoursesSection() {
  return (
    <section id="courses" className="relative overflow-hidden bg-slate-50/80 py-0 md:py-0 mb-7">
      {/* Background Lighting Accents & Ambient Mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Subtle Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
        
        {/* Soft Colorful Glow Blobs */}
        <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-sky-200/50 blur-[120px]" />
        <div className="absolute -right-20 top-1/2 h-[30rem] w-[30rem] rounded-full bg-indigo-100/60 blur-[140px]" />
      </div>

      <div className="container-shell relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            
            {/* Category Pill Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/90 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#087FF5] shadow-xs backdrop-blur-md">
              <Sparkles size={13} className="text-[#087FF5] animate-pulse" />
              <span>Find Your Path</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-black tracking-tight text-[#071B3A] sm:text-4xl md:text-5xl leading-[1.12]">
              Learning built around{" "}
              <span className="bg-gradient-to-r from-[#087FF5] via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                your goals
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mt-3.5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Explore flexible programmes designed to help you feel prepared, capable, and ready for what comes next.
            </p>
          </div>

          {/* Desktop Call To Action Button */}
          <Link
            href="/courses"
            className="group hidden items-center gap-2.5 rounded-full bg-gradient-to-r from-[#087FF5] to-blue-600 px-7 py-3.5 text-xs font-bold text-white shadow-md shadow-sky-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/35 active:translate-y-0 sm:inline-flex"
          >
            <span>View all courses</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.href} course={course} />
          ))}
        </div>

        {/* Mobile Call To Action Button */}
        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/courses"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#087FF5] to-blue-600 px-6 py-4 text-xs font-bold text-white shadow-md shadow-sky-500/20 active:scale-98"
          >
            <span>View all courses</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}