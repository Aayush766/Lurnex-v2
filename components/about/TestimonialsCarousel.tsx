"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const testimonials = [
  { quote: "Lurnex helped me understand concepts so clearly. The personalised guidance made a huge difference in my preparation.", name: "Aarav Sharma", program: "JEE Aspirant", initials: "AS", color: "bg-[#dceeff] text-[#087ff5]" },
  { quote: "The one-to-one classes are amazing. My mentor always motivates me and helps me stay on track.", name: "Riya Mehta", program: "NEET Aspirant", initials: "RM", color: "bg-[#e9e2ff] text-[#7044df]" },
  { quote: "The study material and practice tests are top-notch. Lurnex truly understands student needs.", name: "Kabir Khan", program: "SAT Aspirant", initials: "KK", color: "bg-[#d9f7ec] text-[#0a9b71]" },
  { quote: "My tutor explains difficult topics in a simple way and gives me a clear plan for every week.", name: "Anaya Iyer", program: "IB Diploma Student", initials: "AI", color: "bg-[#fff0dc] text-[#c46a12]" },
  { quote: "The regular feedback has helped me feel more confident and stay consistent with my studies.", name: "Dev Patel", program: "CBSE Student", initials: "DP", color: "bg-[#e4f7ee] text-[#15835b]" },
  { quote: "I enjoy learning French now. The lessons are engaging, personal and easy to follow.", name: "Mira Kapoor", program: "French Learner", initials: "MK", color: "bg-[#fce7f3] text-[#be397b]" },
];

export function TestimonialsCarousel() {
  const track = useRef<HTMLDivElement>(null);

  const move = (direction: -1 | 1) => {
    const element = track.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="bg-[#fafdff] py-8">
      <div className="container-shell">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-[9px] font-extrabold tracking-[.2em] text-[#087ff5]">WHAT OUR STUDENTS SAY</span>
            <h2 className="mt-1 text-[23px] font-extrabold tracking-tight">Confidence today. Success tomorrow.</h2>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" aria-label="Previous testimonials" onClick={() => move(-1)} className="grid h-9 w-9 place-items-center rounded-full border border-sky-200 bg-white text-[#087ff5] transition hover:bg-[#eaf4ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087ff5]">
              <ArrowRight className="rotate-180" size={16} />
            </button>
            <button type="button" aria-label="Next testimonials" onClick={() => move(1)} className="grid h-9 w-9 place-items-center rounded-full border border-sky-200 bg-white text-[#087ff5] transition hover:bg-[#eaf4ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087ff5]">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
        <div ref={track} className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Student testimonials">
          {testimonials.map((item) => (
            <article key={item.name} className="w-full shrink-0 snap-start rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-8px)]">
              <span aria-hidden="true" className="text-2xl font-black leading-none text-[#087ff5]">“</span>
              <p className="min-h-[45px] text-[10px] leading-[1.55] text-slate-600">“{item.quote}”</p>
              <div className="mt-3 flex items-center gap-2.5 border-t border-slate-100 pt-3">
                <span className={`grid h-9 w-9 place-items-center rounded-full text-[10px] font-extrabold ${item.color}`}>{item.initials}</span>
                <span><strong className="block text-[10px] font-extrabold">{item.name}</strong><small className="text-[9px] text-slate-500">{item.program}</small></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
