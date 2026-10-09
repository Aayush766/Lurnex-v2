 "use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/constants";

export function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const move = (direction: -1 | 1) => {
    const slider = sliderRef.current;
    const card = slider?.firstElementChild;
    if (!slider || !card) return;
    const atStart = slider.scrollLeft <= 1;
    const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 2;
    if ((direction < 0 && atStart) || (direction > 0 && atEnd)) {
      slider.scrollTo({ left: direction > 0 ? 0 : slider.scrollWidth, behavior: "smooth" });
      return;
    }
    const gap = Number.parseFloat(getComputedStyle(slider).columnGap) || 0;
    slider.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  return (
    <section className="section-pad bg-[#FBFDFF]">
      <div className="container-shell">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-[24px] font-extrabold text-[#071B3A]">What Our <span className="text-[#087FF5]">Learners Say</span></h2>
            <p className="mt-1 text-xs text-slate-500">Real stories. Real success. Real global opportunities.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => move(-1)} aria-label="Previous testimonials" className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-[#071B3A] shadow-sm transition hover:border-[#087FF5] hover:text-[#087FF5]"><ChevronLeft size={17}/></button>
            <button onClick={() => move(1)} aria-label="Next testimonials" className="grid h-10 w-10 place-items-center rounded-full border border-[#087FF5] bg-white text-[#087FF5] shadow-sm transition hover:bg-[#087FF5] hover:text-white"><ChevronRight size={17}/></button>
          </div>
        </div>
        <div ref={sliderRef} className="testimonial-slider mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3" aria-label="Student testimonials" tabIndex={0}>
          {testimonials.map((t, i) => (
            <article key={`${t.name}-${i}`} className="w-full shrink-0 snap-start rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card md:w-[calc((100%_-_1.25rem)/2)] lg:w-[calc((100%_-_2.5rem)/3)]">
              <Quote size={23} className="text-slate-300" fill="currentColor"/>
              <p className="mt-2 min-h-[72px] text-[12px] leading-4.5 text-slate-600">“{t.quote}”</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span aria-label={`${t.name} initials`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#087FF5] to-[#7054D8] text-[10px] font-extrabold tracking-wide text-white shadow-sm">
                    {t.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()}
                  </span>
                  <div><div className="text-[11px] font-extrabold text-[#071B3A]">{t.name}</div><div className="text-[9px] text-slate-400">{t.location}</div></div>
                </div>
                <div className="flex text-[#FFB21A]" aria-label="5 out of 5 stars">{Array.from({length:5}).map((_,s)=><Star key={s} size={12} fill="currentColor"/>)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
