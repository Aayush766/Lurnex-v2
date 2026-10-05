import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { courses } from "@/lib/constants";

type Course = (typeof courses)[number];

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-500/10">
      
      {/* Upper Content Wrap */}
      <div>
        {/* Course Image & Badge */}
        <div className="relative aspect-[1.8/1] w-full overflow-hidden bg-slate-100">
          {/* Badge */}
          {course.badge && (
            <div className="absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/90 px-3 py-1 text-[10px] font-extrabold tracking-wide text-[#071B3A] shadow-xs backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10BBD5] animate-pulse" />
              <span>{course.badge}</span>
            </div>
          )}

          {/* Dark Overlay gradient on hover */}
          <div className="absolute inset-0 z-1 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Course Image */}
          <Image
            src={course.image}
            alt={course.alt}
            width={840}
            height={360}
            sizes="(max-width: 768px) 100vw, 25vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          <h3 className="text-lg font-black tracking-tight text-[#071B3A] transition-colors duration-200 group-hover:text-[#087FF5]">
            {course.title}
          </h3>

          <p className="mt-2 min-h-[44px] text-xs leading-relaxed text-slate-500 line-clamp-2">
            {course.description}
          </p>

          {/* Features List */}
          <ul className="mt-4 space-y-2.5">
            {course.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2.5 text-xs font-semibold text-slate-600"
              >
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[#087FF5]">
                  <CheckCircle2 size={14} className="stroke-[2.5]" />
                </div>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Link Button */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <Link
          href={course.href}
          className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-xs font-bold text-[#087FF5] transition-all duration-300 group-hover:border-[#087FF5] group-hover:bg-[#087FF5] group-hover:text-white group-hover:shadow-md group-hover:shadow-sky-500/20"
        >
          <span>Explore course</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

    </article>
  );
}