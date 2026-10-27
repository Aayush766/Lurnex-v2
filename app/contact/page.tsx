import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Clock3, Mail, MessageCircle, Phone, Sparkles } from "lucide-react";
import { LeadCaptureButton } from "@/components/ui/LeadCaptureButton";

export const metadata: Metadata = {
  title: "Contact lurnex | Academic Counselling and Course Guidance",
  description: "Talk with lurnex about online tutoring, courses, exam preparation and academic guidance.",
  alternates: { canonical: "/contact" },
};

const details = [
  { icon: Mail, label: "Email us", value: "support@lurnex.me", href: "mailto:support@lurnex.me", note: "For course and general enquiries" },
  { icon: Phone, label: "Call our team", value: "+91 99900 54003", href: "tel:+919990054003", note: "Speak with an education counsellor" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/919990054003", note: "A quick way to get an answer" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <section className="relative isolate bg-[#f2f8ff]">
        <div aria-hidden="true" className="absolute -right-24 -top-32 -z-10 h-[430px] w-[430px] rounded-full bg-[#d9eeff] blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-48 left-1/3 -z-10 h-[350px] w-[350px] rounded-full bg-[#e9e4ff] blur-3xl" />
        <div className="container-shell grid min-h-[420px] items-center gap-12 py-16 md:grid-cols-[1.15fr_.85fr] md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-[#1769e8]"><Sparkles size={14}/> Here to help you learn</span>
            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-[#102342] sm:text-5xl lg:text-6xl">Let’s find the <span className="gradient-text">right next step</span> for you.</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#586982]">Tell us what you’re working toward. Our team can help you explore courses, tutoring and a learning plan that fits.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <LeadCaptureButton course="Academic Guidance" title="Request a free callback" className="inline-flex items-center gap-2 rounded-full bg-[#1769e8] px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-200 hover:-translate-y-0.5 hover:bg-[#0e59ce]">Talk to a counsellor <ArrowRight size={18}/></LeadCaptureButton>
              <a href="#contact-details" className="inline-flex items-center gap-2 px-3 py-3 font-semibold text-[#405572] hover:text-[#1769e8]">Explore contact options <ArrowDown size={16}/></a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute -inset-4 rotate-3 rounded-[32px] bg-gradient-to-br from-[#bce7ff] to-[#e5dcff]" />
            <div className="relative rounded-[28px] border border-white bg-white p-7 shadow-[0_24px_70px_rgba(28,67,120,.13)] sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#1769e8]"><MessageCircle size={23}/></div>
              <p className="mt-6 text-sm font-bold uppercase tracking-[.13em] text-[#1769e8]">A real person, ready to help</p>
              <h2 className="mt-2 text-2xl font-extrabold leading-snug text-[#102342]">Your questions deserve a thoughtful answer.</h2>
              <p className="mt-3 leading-relaxed text-[#65758c]">Share your goals and we’ll help you understand the options, from choosing a subject to planning for an exam.</p>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 text-sm text-[#586982]"><Clock3 size={17} className="text-[#1769e8]"/><span>We’ll get back to you as soon as we can.</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-details" className="container-shell py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[.15em] text-[#1769e8]">Get in touch</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102342] sm:text-4xl">Choose what works for you</h2>
          <p className="mt-3 text-[#65758c]">Our team is happy to answer questions about programmes, scheduling or getting started.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {details.map(({ icon: Icon, label, value, href, note }) => (
            <a key={label} href={href} target={href.startsWith("https:") ? "_blank" : undefined} rel={href.startsWith("https:") ? "noreferrer" : undefined} className="group rounded-2xl border border-[#e5ebf3] bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_14px_38px_rgba(16,35,66,.08)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eff6ff] text-[#1769e8] transition group-hover:bg-[#1769e8] group-hover:text-white"><Icon size={21}/></span>
              <p className="mt-5 text-sm font-semibold text-[#728097]">{label}</p>
              <p className="mt-1 text-xl font-bold text-[#102342]">{value}</p>
              <p className="mt-2 text-sm text-[#728097]">{note}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="container-shell pb-16 md:pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#102342] px-7 py-9 text-white sm:px-10 md:flex-row md:items-center md:px-12 md:py-10">
          <div><p className="text-sm font-bold uppercase tracking-[.13em] text-[#84c5ff]">Not sure where to start?</p><h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Let’s talk through your goals.</h2><p className="mt-2 max-w-xl text-slate-300">Request a free callback and a counsellor will help you find a suitable programme.</p></div>
          <LeadCaptureButton course="Academic Guidance" title="Request a free callback" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-[#102342] hover:bg-[#eaf4ff]">Request a callback <ArrowRight size={18}/></LeadCaptureButton>
        </div>
        <p className="mt-6 text-center text-sm text-[#728097]">Looking for a specific programme? <Link href="/courses" className="font-semibold text-[#1769e8] hover:underline">Explore our courses</Link>.</p>
      </section>
    </main>
  );
}
