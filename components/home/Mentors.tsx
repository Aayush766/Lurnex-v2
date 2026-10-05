"use client";

import Image from "next/image";
import { useState } from "react";
import { BookOpen, GraduationCap, Sparkles, X } from "lucide-react";

const mentors = [
  { name: "Raman Kumar Lal", subject: "Math & Science", college: "IIT Kharagpur", experience: "7 Years", image: "/assets/images/mentors/Ramam_Kumar_Lal.png", profileImage: "/assets/images/mentors/pop_up_raman.jpeg" },
  { name: "Santosh Kumar Nanda", subject: "Physics & Mathematics", college: "NIT Rourkela", experience: "15 Years", image: "/assets/images/mentors/Santosh_Kumar_Nanda.png", profileImage: "/assets/images/mentors/pop_up_santosh.jpeg" },
  { name: "Bhuvnesh Sir", subject: "Physics & Mathematics", college: "SVITS, Indore", experience: "12+ Years", image: "/assets/images/mentors/Bhuvnesh.png", profileImage: "/assets/images/mentors/pop_up_bhuvnesh.jpeg" },
  { name: "Chitranahi Upadhayay", subject: "Chemistry", college: "NIT Trichy", experience: "7 Years", image: "/assets/images/mentors/Chitranahi_Upadhayay.png", profileImage: "/assets/images/mentors/pop_up_chitranahi.jpeg" },
  { name: "Yogendra Kumar", subject: "Mathematics", college: "NIT Bhubaneswar", experience: "10+ Years", image: "/assets/images/mentors/Yogendra_Kumar.png", profileImage: "/assets/images/mentors/pop_up_yogendra.jpeg" },
];

export function Mentors() {
  const [selectedMentor, setSelectedMentor] = useState<(typeof mentors)[number] | null>(null);
  return (
    <section className="section-pad overflow-hidden bg-white">
      <div className="container-shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#087FF5]"><Sparkles size={13}/> Meet your mentors</span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#071B3A] sm:text-3xl">Learn from people who <span className="text-[#087FF5]">know the journey.</span></h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Personal guidance, clear explanations and a learning plan shaped around you.</p>
        </div>
        <div className="mt-8 grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:auto-cols-[minmax(0,1fr)] lg:grid-cols-5 lg:grid-flow-col lg:overflow-visible">
          {mentors.map((mentor) => <article key={mentor.subject} className="group relative isolate flex min-h-[390px] snap-start flex-col overflow-hidden rounded-[1.5rem] border border-blue-100 bg-gradient-to-br from-[#f5faff] via-white to-[#f4f1ff] shadow-[0_18px_50px_-32px_rgba(8,61,130,.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_-30px_rgba(8,61,130,.4)]">
            <div className="relative min-h-40 overflow-hidden bg-gradient-to-br from-[#dcefff] to-[#e8e2ff]">
              <div className="absolute -left-12 top-8 h-44 w-44 rounded-full border border-white/70"/><div className="absolute -left-5 top-16 h-32 w-32 rounded-full border border-white/70"/>
              <Image src={mentor.image} alt={`${mentor.name}, ${mentor.subject} mentor`} fill sizes="(max-width: 1024px) 80vw, 20vw" className="relative z-10 object-contain object-bottom pt-3 transition duration-500 group-hover:scale-[1.04]" />
              <span className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-[10px] font-bold text-[#17315c] shadow-sm backdrop-blur"><GraduationCap size={13} className="text-[#087FF5]"/> {mentor.college}</span>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <span className="text-[9px] font-extrabold uppercase tracking-[.16em] text-[#087FF5]">Your learning partner</span>
              <h3 className="mt-1 min-h-12 text-base font-extrabold leading-tight text-[#071B3A]">{mentor.name}</h3>
              <p className="mt-0.5 text-xs font-semibold text-slate-500">{mentor.subject} mentor</p>
              <div className="mt-3 grid gap-2">
                <div className="rounded-xl border border-blue-100 bg-white/80 p-2.5"><div className="flex items-center gap-2"><BookOpen size={15} className="shrink-0 text-[#087FF5]"/><strong className="text-[11px] font-extrabold text-[#102b55]">{mentor.subject}</strong></div><span className="mt-1 block pl-6 text-[9px] text-slate-500">Subject expertise</span></div>
                <div className="rounded-xl border border-blue-100 bg-white/80 p-2.5"><div className="flex items-center gap-2"><GraduationCap size={15} className="shrink-0 text-[#7958dd]"/><strong className="text-[10px] font-extrabold leading-tight text-[#102b55]">{mentor.experience}</strong></div><span className="mt-1 block pl-6 text-[9px] text-slate-500">Teaching experience</span></div>
              </div>
              <button type="button" onClick={() => setSelectedMentor(mentor)} className="mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#087FF5] px-3 py-2.5 text-[10px] font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-[#0669d1] focus:outline-none focus:ring-4 focus:ring-blue-200">View profile <span aria-hidden="true">↗</span></button>
            </div>
          </article>)}
        </div>
      </div>
      {selectedMentor && <div className="fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-[#071b3a]/70 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedMentor(null); }}><section role="dialog" aria-modal="true" aria-labelledby="mentor-profile-title" className="relative grid w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl sm:grid-cols-2"><button type="button" aria-label="Close mentor profile" onClick={() => setSelectedMentor(null)} className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-700 shadow-lg transition hover:bg-white"><X size={19}/></button><div className="relative flex min-h-[280px] items-center justify-center bg-gradient-to-br from-[#dcefff] via-[#eef3ff] to-[#e8e2ff] p-4 sm:min-h-[440px] sm:p-6"><div className="absolute -left-16 top-10 h-64 w-64 rounded-full border border-white/70"/><Image src={selectedMentor.profileImage} alt={selectedMentor.name} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-contain object-center p-3 sm:p-5" priority/></div><div className="flex flex-col justify-center p-7 sm:p-10"><span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#087FF5]"><Sparkles size={13}/> Meet your mentor</span><h2 id="mentor-profile-title" className="mt-4 text-3xl font-extrabold leading-tight text-[#071B3A]">{selectedMentor.name}</h2><p className="mt-2 text-sm font-semibold text-slate-500">{selectedMentor.subject}</p><div className="mt-7 space-y-3"><div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-[#f7fbff] p-4"><GraduationCap className="shrink-0 text-[#087FF5]" size={20}/><div><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Education</span><strong className="mt-0.5 block text-sm text-[#102b55]">{selectedMentor.college}</strong></div></div><div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-[#faf8ff] p-4"><BookOpen className="shrink-0 text-violet-600" size={20}/><div><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Teaching experience</span><strong className="mt-0.5 block text-sm text-[#102b55]">{selectedMentor.experience}</strong></div></div></div><button type="button" onClick={() => setSelectedMentor(null)} className="mt-7 inline-flex items-center justify-center rounded-full bg-[#087FF5] px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-[#0669d1]">Close profile</button></div></section></div>}
    </section>
  );
}
