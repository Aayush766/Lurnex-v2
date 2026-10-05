import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock3, MapPin, MonitorPlay, UsersRound } from "lucide-react";
import { locationBySlug, locations } from "@/lib/locations";
import { locationFlag, locationRegion } from "@/lib/location-presentation";

export function generateStaticParams() { return locations.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const location = locationBySlug((await params).slug);
  return location ? { title: `Online Tutoring in ${location.name} | lurnex`, description: `Personalised online IB, IGCSE, CBSE, SAT, JEE and NEET tutoring for students in ${location.name}.`, alternates: { canonical: `/locations/${location.slug}` } } : {};
}

const programmes = [
  { title: "IB & IGCSE", subtitle: "International curriculum support", href: "/courses/ib" },
  { title: "CBSE", subtitle: "School subjects and exam preparation", href: "/courses/cbse" },
  { title: "JEE & NEET", subtitle: "Focused entrance preparation", href: "/courses/jee" },
  { title: "SAT", subtitle: "Digital SAT preparation", href: "/courses/sat" },
];

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const location = locationBySlug((await params).slug);
  if (!location) notFound();

  return (
    <main className="overflow-hidden bg-[#f5f9ff] text-[#10244a]">
      <section className="relative isolate overflow-hidden bg-[#071b3a] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,rgba(8,127,245,.45),transparent_36%),radial-gradient(ellipse_at_10%_100%,rgba(108,59,255,.32),transparent_42%)]" />
        <div className="container-shell grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_.7fr]">
          <div>
          <Link href="/locations" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50 transition hover:bg-white/15"><ArrowLeft size={16}/> All locations</Link>
          <div className="mt-12 flex flex-wrap items-center gap-4"><span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/10 text-4xl">{locationFlag(location)}</span><span className="rounded-full bg-cyan-300/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[.13em] text-cyan-200">{locationRegion(location)} · Online learning</span></div>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">Personalised online tutoring in <span className="text-sky-300">{location.name}.</span></h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100/80">Live one-to-one support for IB, IGCSE, CBSE, SAT, JEE and NEET students in {location.cities.slice(0, 3).join(", ")} and across {location.name}.</p>
          <div className="mt-8 flex flex-wrap gap-2">{location.cities.map((city) => <span key={city} className="rounded-full border border-white/15 bg-white/[.07] px-3.5 py-2 text-xs text-blue-50">{city}</span>)}</div>
          </div>
          <aside className="relative overflow-hidden rounded-[1.7rem] border border-white/15 bg-white/[.08] p-6 backdrop-blur-sm sm:p-7">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-sky-100">{locationRegion(location)} · local snapshot</span>
            <div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/10 bg-[#0b2445]/65 p-4"><MapPin className="text-cyan-200" size={18}/><strong className="mt-3 block text-2xl">{location.cities.length}</strong><span className="text-xs text-blue-100/70">cities listed</span></div><div className="rounded-2xl border border-white/10 bg-[#0b2445]/65 p-4"><BookOpen className="text-cyan-200" size={18}/><strong className="mt-3 block text-2xl">{programmes.length}</strong><span className="text-xs text-blue-100/70">learning pathways</span></div></div>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b2445]/65 p-4"><Clock3 className="shrink-0 text-cyan-200" size={20}/><div><small className="block text-[10px] font-bold uppercase tracking-wider text-blue-100/60">Scheduling reference</small><strong className="mt-1 block text-sm">{location.timezone}</strong></div></div>
            <p className="mt-4 text-xs leading-6 text-blue-100/70">Sessions are arranged around the learner&apos;s local time and school timetable.</p>
          </aside>
        </div>
      </section>

      <section className="container-shell relative -mt-7 pb-12"><div className="grid gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-900/5 sm:grid-cols-3 sm:p-8"><div className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#edf5ff] text-[#087ff5]"><MapPin size={21}/></span><div><h2 className="font-bold">{location.cities.length} cities listed</h2><p className="mt-1 text-sm leading-6 text-slate-600">{location.cities.join(", ")}</p></div></div><div className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eaf9f4] text-emerald-600"><Clock3 size={21}/></span><div><h2 className="font-bold">Local scheduling</h2><p className="mt-1 text-sm leading-6 text-slate-600">Sessions can be planned around {location.timezone} and your school timetable.</p></div></div><div className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f2edff] text-violet-600"><UsersRound size={21}/></span><div><h2 className="font-bold">{programmes.length} learning pathways</h2><p className="mt-1 text-sm leading-6 text-slate-600">IB, IGCSE, CBSE, SAT, JEE and NEET support.</p></div></div></div></section>

      <section className="container-shell py-12 md:py-16"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><span className="text-xs font-extrabold tracking-[.18em] text-[#087ff5]">LEARNING OPTIONS</span><h2 className="mt-3 text-3xl font-extrabold">Choose your programme.</h2></div><p className="max-w-xl leading-7 text-slate-600">Get support that fits your school curriculum, exam plan and learning goals.</p></div><div className="mt-8 grid gap-4 sm:grid-cols-2">{programmes.map((program) => <Link key={program.title} href={program.href} className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#edf5ff] text-[#087ff5]"><BookOpen size={22}/></span><span className="min-w-0"><strong className="block">{program.title}</strong><small className="mt-1 block text-slate-500">{program.subtitle}</small></span><ArrowRight className="ml-auto shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#087ff5]" size={18}/></Link>)}</div></section>

      <section className="container-shell pb-20"><div className="rounded-[2rem] bg-gradient-to-r from-[#e9f4ff] to-[#f1edff] p-7 sm:p-10"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><span className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[.18em] text-[#087ff5]"><MonitorPlay size={15}/> LEARN ONLINE, LIVE</span><h2 className="mt-3 text-2xl font-extrabold">Make a plan that works in {location.name}.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Tell us about the subjects you’re working on, your schedule and the support you need.</p></div><Link href="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#087ff5] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700">Talk to an academic counsellor <ArrowRight size={17}/></Link></div></div></section>
    </main>
  );
}
