import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Brain, Globe2, GraduationCap, Sparkles, TrendingUp, Users, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "About lurnex | Personalised Learning, Built Around You",
  description: "Discover the lurnex approach to personalised online learning, one-to-one tutoring and academic support for students worldwide.",
  alternates: { canonical: "/about" },
};

const difference = [
  { icon: Users, title: "Personalised learning paths", text: "A learning journey shaped around each student’s pace, strengths and goals.", tone: "blue" },
  { icon: Video, title: "Live one-to-one classes", text: "Focused sessions with an experienced tutor and room for real conversation.", tone: "purple" },
  { icon: BookOpen, title: "Outcome-focused teaching", text: "Build understanding through clear teaching and purposeful practice.", tone: "green" },
  { icon: Brain, title: "Structured progress", text: "Useful updates, detailed reports and guidance to keep learners on track.", tone: "orange" },
];

const testimonials = [
  { quote: "Lurnex helped me understand concepts so clearly. The personalised guidance made a huge difference in my preparation.", name: "Aarav Sharma", program: "JEE Aspirant", initials: "AS", color: "bg-[#dceeff] text-[#087ff5]" },
  { quote: "The one-to-one classes are amazing. My mentor always motivates me and helps me stay on track.", name: "Riya Mehta", program: "NEET Aspirant", initials: "RM", color: "bg-[#e9e2ff] text-[#7044df]" },
  { quote: "The study material and practice tests are top-notch. Lurnex truly understands student needs.", name: "Kabir Khan", program: "SAT Aspirant", initials: "KK", color: "bg-[#d9f7ec] text-[#0a9b71]" },
];

const pathways = [
  { title: "English, Hindi & French", tag: "LANGUAGES", href: "/courses/languages" },
  { title: "IB, IGCSE, AP & CBSE", tag: "GLOBAL CURRICULA", href: "/courses" },
  { title: "JEE, NEET & SAT", tag: "ENTRANCE PREP", href: "/courses" },
  { title: "Foundation programmes", tag: "EARLY LEARNING", href: "/courses/foundation" },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white text-[#0a2148]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#061b38] text-white">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_78%_48%,rgba(0,117,255,.38),transparent_35%),radial-gradient(ellipse_at_25%_110%,rgba(20,71,174,.36),transparent_48%)]" />
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(115deg,transparent_0%,rgba(255,255,255,.1)_44%,transparent_45%),radial-gradient(circle_at_77%_20%,#27a8ff_0,transparent_2px)] [background-size:auto,28px_28px]" />
        <div className="container-shell relative min-h-[600px] pb-28 pt-14 sm:min-h-[650px] sm:pt-20 lg:min-h-[420px] lg:pb-24 lg:pt-10">
          <div className="relative z-20 max-w-[560px] lg:pt-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/[.06] px-3 py-1.5 text-[10px] font-extrabold tracking-[.14em] text-white"><Sparkles size={13}/> ABOUT LURNEX</span>
            <h1 className="mt-4 max-w-[570px] text-[40px] font-extrabold leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-[46px]">Redefining how students <span className="text-[#087ff5]">learn,</span> speak and succeed.</h1>
            <p className="mt-4 max-w-[475px] text-sm leading-[1.65] text-blue-50/90 sm:text-[15px]">At lurnex, we believe every student is unique. That’s why we build personalised, technology-driven learning experiences that help them discover their potential and achieve their goals.</p>
            <div className="mt-5 flex flex-wrap gap-2"><Link href="/courses" className="inline-flex items-center gap-2 rounded-full bg-[#087ff5] px-5 py-2.5 text-[11px] font-extrabold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500">Explore our Programmes <ArrowRight size={14}/></Link><Link href="#our-approach" className="inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-2.5 text-[11px] font-bold text-white transition hover:bg-white/10">Our Approach <ArrowDown size={14}/></Link></div>
          </div>

          <div className="relative z-20 mt-6 w-full max-w-[510px] rounded-2xl border border-white/25 bg-[#0e3765]/75 p-4 shadow-[0_14px_50px_rgba(0,0,0,.18)] backdrop-blur-md sm:p-5 lg:absolute lg:left-[49%] lg:top-1/2 lg:mt-0 lg:w-[335px] lg:-translate-y-1/2 lg:p-4">
            <div className="flex items-center justify-between px-1 pb-2"><strong className="text-[11px] tracking-wide text-white">LEARNING, YOUR WAY</strong><span className="grid h-5 w-5 place-items-center rounded-full bg-white/15 text-white"><Sparkles size={12}/></span></div>
            {[{ icon: Users, title: "A plan that starts with you", sub: "Personalised learning path", color: "bg-[#087ff5]/30 text-sky-200" }, { icon: Video, title: "A tutor who knows your goals", sub: "Expert guidance & mentorship", color: "bg-amber-300/20 text-amber-200" }, { icon: TrendingUp, title: "Progress you can see", sub: "Regular feedback & smart reports", color: "bg-emerald-300/20 text-emerald-200" }].map(({ icon: Icon, title, sub, color }) => <div key={title} className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-[#08284e]/70 px-3 py-2.5"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${color}`}><Icon size={17}/></span><span className="min-w-0"><strong className="block text-[10px] text-white">{title}</strong><small className="mt-0.5 block text-[9px] text-blue-100/75">{sub}</small></span><ArrowUpRight className="ml-auto shrink-0 text-white/60" size={14}/></div>)}
            <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-3"><span className="rounded-lg bg-white px-3 py-2"><small className="block text-[8px] font-extrabold tracking-wider text-[#087ff5]">OUR FOCUS</small><strong className="block text-[10px] text-[#10244a]">Confidence through progress</strong></span><span className="text-[9px] text-white/80">One step at a time →</span></div>
          </div>

          <div className="pointer-events-none absolute bottom-20 right-[-15px] z-10 h-[330px] w-[255px] sm:right-0 sm:h-[420px] sm:w-[320px] lg:bottom-0 lg:right-[-18px] lg:h-[420px] lg:w-[350px]">
            <Image src="/assets/images/lurnex_boy.png" alt="lurnex student holding books" fill priority sizes="(max-width: 768px) 320px, 350px" className="object-contain object-bottom" />
            <span className="absolute right-0 top-4 hidden rotate-6 font-serif text-sm font-bold italic leading-tight text-sky-100 [text-shadow:0_1px_8px_#061b38] lg:block">Higher Scores<br/>Brighter Futures</span>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-y-3 border-t border-white/15 py-4 sm:grid-cols-4 sm:gap-2 lg:py-3">{[{ icon: GraduationCap, title: "Personalised", sub: "learning paths", color: "bg-orange-500/25 text-orange-200" }, { icon: Video, title: "Live", sub: "one-to-one classes", color: "bg-violet-400/25 text-violet-200" }, { icon: Globe2, title: "Global", sub: "learning support", color: "bg-emerald-400/25 text-emerald-200" }, { icon: TrendingUp, title: "Clear", sub: "progress updates", color: "bg-sky-400/25 text-sky-200" }].map(({ icon: Icon, title, sub, color }) => <div key={title} className="flex items-center gap-2.5"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${color}`}><Icon size={15}/></span><span><strong className="block text-[10px] text-white">{title}</strong><small className="block text-[8px] text-blue-100/75">{sub}</small></span></div>)}</div>
        </div>
      </section>

      {/* Who we are */}
      <section className="container-shell grid items-center gap-5 py-10 md:grid-cols-[1.35fr_.65fr] md:py-12">
        <div><span className="flex items-center gap-2 text-[10px] font-extrabold tracking-[.2em] text-[#087ff5]"><i className="h-px w-5 bg-[#087ff5]"/> WHO WE ARE <i className="h-px w-5 bg-[#087ff5]"/></span><h2 className="mt-2 text-[28px] font-extrabold leading-tight tracking-[-.035em] sm:text-3xl">Every student learns <span className="text-[#087ff5]">differently.</span></h2><p className="mt-3 max-w-2xl text-[12px] leading-6 text-slate-600">lurnex is a next-generation learning platform built around that simple truth. Across languages, international curricula and competitive examinations, we create personalised, interactive and outcome-driven learning experiences.</p></div>
        <div className="relative hidden h-[155px] md:block"><div className="absolute inset-x-5 bottom-0 top-4 rounded-2xl bg-gradient-to-tr from-sky-100 to-amber-50"/><Image src="/assets/images/herogirl.png" alt="Student enjoying her learning journey" fill sizes="300px" className="relative object-contain object-bottom"/><span className="absolute right-0 top-3 rotate-6 font-serif text-sm font-bold italic leading-tight text-[#10244a]">Learn<br/>Grow<br/>Excel <ArrowRight className="inline -rotate-45" size={13}/></span></div>
      </section>

      {/* Philosophy panels */}
      <section className="container-shell grid gap-3 pb-10 sm:grid-cols-2 sm:pb-12">
        <article className="relative rounded-2xl border border-[#ffe5df] bg-gradient-to-br from-[#fff7f4] to-[#fff1ee] p-5 shadow-sm"><span className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-[#ffe4dc] text-[#fb6b39]"><GraduationCap size={21}/></span><div className="pl-14"><span className="text-[9px] font-extrabold tracking-[.18em] text-[#fb6b39]">OUR LEARNING PHILOSOPHY</span><h3 className="mt-1 text-[17px] font-extrabold leading-tight">Confidence first.<br/>Understanding that lasts.</h3><p className="mt-2 text-[11px] leading-5 text-slate-600">Learning works best when students feel confident. Concepts stick when learners can apply them. Personal attention and mentorship help turn steady effort into visible progress.</p></div><span className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full bg-white text-[#087ff5] shadow-sm"><ArrowUpRight size={14}/></span></article>
        <article className="relative flex items-center gap-4 rounded-2xl border border-sky-100 bg-gradient-to-br from-[#f3faff] to-[#eaf5ff] p-5 shadow-sm"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#dceeff] text-[#087ff5]"><Globe2 size={22}/></span><div><h3 className="text-[16px] font-extrabold">A wider world of learning</h3><p className="mt-2 text-[11px] leading-5 text-slate-600">Flexible online support for learners following different curricula and goals, wherever they are.</p></div><span className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full bg-white text-[#087ff5] shadow-sm"><ArrowUpRight size={14}/></span></article>
      </section>

      {/* Difference */}
      <section id="our-approach" className="container-shell pb-8 pt-2 md:pb-10">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><span className="text-[9px] font-extrabold tracking-[.2em] text-[#087ff5]">THE LURNEX DIFFERENCE</span><h2 className="mt-1 text-[25px] font-extrabold tracking-tight sm:text-[28px]">A more personal way to learn.</h2></div><p className="max-w-md text-[11px] leading-5 text-slate-600">A thoughtful mix of expert teaching, useful practice and ongoing guidance helps every learner move forward with purpose.</p></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{difference.map(({ icon: Icon, title, text, tone }, index) => <article key={title} className="group relative rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_3px_14px_rgba(16,42,78,.035)] transition hover:-translate-y-1 hover:shadow-lg"><span className={`grid h-10 w-10 place-items-center rounded-xl ${tone === "blue" ? "bg-sky-100 text-sky-600" : tone === "purple" ? "bg-violet-100 text-violet-600" : tone === "green" ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"}`}><Icon size={20}/></span><span className="absolute right-4 top-4 text-[9px] font-bold text-slate-300">0{index + 1}</span><h3 className="mt-3 text-[12px] font-extrabold">{title}</h3><p className="mt-1.5 text-[10px] leading-[1.45] text-slate-600">{text}</p><span className="absolute bottom-3 right-3 grid h-5 w-5 place-items-center rounded-full bg-[#eaf4ff] text-[#087ff5]"><ArrowRight size={12}/></span></article>)}</div>
      </section>

      {/* Impact stats */}
      <section className="container-shell pb-9"><div className="grid grid-cols-2 gap-3 rounded-2xl bg-[#edf6ff] px-5 py-5 sm:grid-cols-4 sm:px-8">{[{ icon: Users, number: "10,000+", label: "Students Learning" }, { icon: GraduationCap, number: "500+", label: "Expert Faculty" }, { icon: TrendingUp, number: "95%", label: "Student Success Rate" }, { icon: Globe2, number: "15+", label: "Countries & Growing" }].map(({ icon: Icon, number, label }) => <div key={label} className="flex items-center gap-3 border-slate-200 sm:border-r sm:px-3 last:border-0"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#087ff5]"><Icon size={20}/></span><span><strong className="block text-lg font-extrabold tracking-tight text-[#0a2148]">{number}</strong><small className="block text-[9px] text-slate-600">{label}</small></span></div>)}</div></section>

      {/* Global impact */}
      <section className="container-shell grid items-center gap-5 pb-10 md:grid-cols-2 md:pb-12">
        <div className="relative min-h-[220px] overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-[#edf6ff] to-white sm:min-h-[260px]"><Image src="/assets/images/about_us.png" alt="Students learning across a range of lurnex programmes" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center"/></div>
        <div className="py-2 md:pl-2"><span className="text-[9px] font-extrabold tracking-[.2em] text-[#087ff5]">OUR GLOBAL IMPACT</span><h2 className="mt-2 text-[29px] font-extrabold leading-[1.05] tracking-tight sm:text-[34px]">Learning without <span className="text-[#087ff5]">boundaries.</span></h2><p className="mt-3 max-w-lg text-[12px] leading-6 text-slate-600">From India to the world, lurnex empowers students with high-quality education, expert mentorship and the right resources to achieve their dreams.</p><div className="mt-5 grid grid-cols-3 gap-2">{[{ icon: Users, top: "15+", bottom: "Countries" }, { icon: Users, top: "Global", bottom: "Student Community" }, { icon: BookOpen, top: "Diverse", bottom: "Curricula" }].map(({ icon: Icon, top, bottom }, index) => <div key={top} className="flex items-center gap-2"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${index === 1 ? "bg-violet-100 text-violet-600" : index === 2 ? "bg-sky-100 text-sky-600" : "bg-orange-100 text-orange-600"}`}><Icon size={15}/></span><span><strong className="block text-[12px] font-extrabold">{top}</strong><small className="block text-[8px] text-slate-600">{bottom}</small></span></div>)}</div></div>
      </section>

      {/* What we teach */}
      <section className="container-shell pb-10"><div className="flex flex-wrap items-center gap-2">{pathways.map((path) => <Link key={path.tag} href={path.href} className="rounded-full border border-slate-100 bg-white px-4 py-2 shadow-sm transition hover:border-sky-200 hover:text-[#087ff5]"><small className="block text-[8px] font-extrabold tracking-wider text-[#087ff5]">{path.tag}</small><strong className="text-[10px]">{path.title}</strong></Link>)}</div></section>

      {/* Testimonials */}
      <section className="bg-[#fafdff] py-8"><div className="container-shell"><div className="flex items-center justify-between"><div><span className="text-[9px] font-extrabold tracking-[.2em] text-[#087ff5]">WHAT OUR STUDENTS SAY</span><h2 className="mt-1 text-[23px] font-extrabold tracking-tight">Confidence today. Success tomorrow.</h2></div><div className="hidden gap-2 sm:flex"><button aria-label="Previous testimonials" className="grid h-7 w-7 place-items-center rounded-full bg-[#eaf4ff] text-[#087ff5]"><ArrowRight className="rotate-180" size={14}/></button><button aria-label="Next testimonials" className="grid h-7 w-7 place-items-center rounded-full border border-sky-200 bg-white text-[#087ff5]"><ArrowRight size={14}/></button></div></div><div className="mt-4 grid gap-3 md:grid-cols-3">{testimonials.map((item) => <article key={item.name} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"><span className="text-2xl font-black leading-none text-[#087ff5]">“</span><p className="min-h-[45px] text-[10px] leading-[1.55] text-slate-600">“{item.quote}”</p><div className="mt-3 flex items-center gap-2.5 border-t border-slate-100 pt-3"><span className={`grid h-9 w-9 place-items-center rounded-full text-[10px] font-extrabold ${item.color}`}>{item.initials}</span><span><strong className="block text-[10px] font-extrabold">{item.name}</strong><small className="text-[9px] text-slate-500">{item.program}</small></span></div></article>)}</div></div></section>

      {/* CTA */}
      <section className="mt-7 rounded-t-[2rem] bg-gradient-to-r from-[#061b38] via-[#0a3470] to-[#064987] py-8 text-white"><div className="container-shell flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-extrabold tracking-tight">Your brighter future starts here.</h2><p className="mt-1 text-[11px] text-blue-100/80">Join students who are learning, growing and achieving with lurnex.</p></div><div className="flex flex-wrap gap-2"><Link href="/courses" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[10px] font-extrabold text-[#087ff5]">Explore Our Programmes <ArrowRight size={13}/></Link><Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/50 px-4 py-2.5 text-[10px] font-bold text-white">Talk to an Expert <ArrowRight size={13}/></Link></div></div></section>
    </main>
  );
}
