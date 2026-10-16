"use client";

import Image from "next/image";
import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart3, BookOpen, CalendarDays, Calculator, Check, ChevronLeft, ChevronRight, ClipboardList, Clock3, FileText, GraduationCap, MessageCircle, Phone, Quote, ShieldCheck, Target, UsersRound, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ApiError, registerSatMasterclassEnquiry, type SatMasterclassEnquiry } from "@/lib/api";
import { testimonials } from "@/lib/constants";
import { yogendraKumar } from "@/lib/mentors";

const benefits: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: BookOpen, title: "Turn the Basics Into Points", copy: "Refresh the SAT concepts that show up often and understand how to use them under timed conditions." },
  { icon: Target, title: "Make Every Minute Count", copy: "Practise smarter ways to approach questions, manage your time, and avoid common traps." },
  { icon: BarChart3, title: "Know What to Work On Next", copy: "Use guided practice to spot strengths and gaps, then focus your remaining prep where it matters." },
  { icon: ShieldCheck, title: "Walk In With a Game Plan", copy: "Get familiar with the test format and leave with practical next steps for test day." },
];
const learningItems: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: Calculator, title: "Math: Solve With a Strategy", copy: "Break down common question types, choose an efficient approach, and practise with purpose." },
  { icon: FileText, title: "Reading & Writing: Find the Clue", copy: "Learn to read with intent, spot what each question tests, and choose answers with confidence." },
  { icon: BarChart3, title: "Practice, Review, Improve", copy: "Try SAT-style questions, learn from the process, and leave knowing what to practise next." },
];
const faqs = [
  ["Who should attend this master class?", "This master class is ideal for high school students planning to appear for the November SAT, especially those who want a more structured and focused approach in the final weeks."],
  ["Are both sessions included?", "The master class has two planned sessions: October 24 and October 31, 2026, from 11:00 AM to 2:00 PM each day. Choose one session or both in the form; the Lurnex team will confirm availability and registration details."],
  ["Do I need previous SAT preparation experience?", "No. Students can use the sessions to strengthen concepts, practise strategies, and identify areas to focus on. Contact Lurnex if you would like help deciding whether the master class is right for you."],
  ["Will this guarantee a higher SAT score?", "No specific score improvement can be guaranteed. The master class supports preparation through focused instruction, practice strategies, and guidance."],
];
const satTestimonials: { name: string; location: string; quote: string }[] = [
  ...testimonials.filter((testimonial) => testimonial.category === "SAT").map((testimonial) => testimonial.name === "Johnathan Smith"
    ? { ...testimonial, name: "Rama Verma", location: "New Delhi, India" }
    : testimonial),
  { name: "Aiman", location: "Malaysia", quote: "The practice questions helped me get familiar with the SAT format and see which topics I should focus on next." },
  { name: "Batrisyia", location: "Malaysia", quote: "Working through Reading and Writing questions with a plan helped me understand what each question was asking." },
];

function track(name: string) {
  const analytics = window as Window & { fbq?: (...args: unknown[]) => void; dataLayer?: Array<Record<string, unknown>> };
  analytics.fbq?.("trackCustom", name);
  analytics.dataLayer?.push({ event: name });
}

const utmKeys = ["source", "medium", "campaign", "term", "content"] as const;
type SatUtm = SatMasterclassEnquiry["utm"];

function readSatUtm(): SatUtm {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("utm_source") || "",
    medium: params.get("utm_medium") || "",
    campaign: params.get("utm_campaign") || "",
    term: params.get("utm_term") || "",
    content: params.get("utm_content") || "",
  };
}

export default function SATMasterclass() {
  const testimonialSliderRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showFloatingCta, setShowFloatingCta] = useState(true);
  const [batchCountdown, setBatchCountdown] = useState<{ totalMs: number; days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [showBatchPopup, setShowBatchPopup] = useState(false);
  useEffect(() => {
    const updateCountdown = () => {
      const firstBatch = new Date(2026, 9, 24, 11, 0, 0);
      const totalMs = Math.max(firstBatch.getTime() - Date.now(), 0);
      const totalSeconds = Math.floor(totalMs / 1000);
      setBatchCountdown({
        totalMs,
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
    };
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, []);
  useEffect(() => {
    if (Date.now() >= new Date(2026, 9, 24, 11, 0, 0).getTime()) return;
    const timeout = window.setTimeout(() => setShowBatchPopup(true), 2000);
    return () => window.clearTimeout(timeout);
  }, []);
  useEffect(() => {
    if (!showBatchPopup) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowBatchPopup(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [showBatchPopup]);
  useEffect(() => {
    const formSection = document.getElementById("sat-registration-form");
    if (!formSection || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setShowFloatingCta(!entry.isIntersecting), { threshold: 0.12 });
    observer.observe(formSection);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelector(".sm-page")?.classList.add("sm-reveal-ready");
    const elements = document.querySelectorAll<HTMLElement>(".sm-section-heading, .sm-exam-banner, .sm-benefit-card, .sm-testimonial-card, .sm-mentor, .sm-faq-list details, .sm-bottom-cta");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("sm-in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const formStarted = useRef(false);
  const submitLock = useRef(false);
  const conversionTracked = useRef(false);
  const initialUtm = useRef<SatUtm | null>(null);
  if (!initialUtm.current && typeof window !== "undefined") initialUtm.current = readSatUtm();
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919990054003";
  const whatsappHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi Lurnex, I submitted the SAT Masterclass enquiry and would like to arrange my free SAT counselling or demo.")}`;
  const callHref = `tel:+${whatsapp.replace(/\D/g, "")}`;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current) return;
    submitLock.current = true;
    setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    if (String(form.get("website") || "").trim()) {
      setError("We could not send your enquiry. Please try again.");
      setBusy(false);
      submitLock.current = false;
      return;
    }
    const student = String(form.get("student")).trim();
    const parent = String(form.get("parent") || "").trim();
    const email = String(form.get("email")).trim();
    const mobile = String(form.get("whatsapp")).trim();
    const digits = mobile.replace(/\D/g, "");
    const grade = String(form.get("grade"));
    const focusValue = String(form.get("focus"));
    const sessionValue = String(form.get("session"));
    const testDate = String(form.get("testDate"));
    if (digits.length < 8 || digits.length > 15) {
      setError("Enter a WhatsApp number with 8 to 15 digits, including the country code.");
      setBusy(false);
      submitLock.current = false;
      return;
    }
    const satFocus: SatMasterclassEnquiry["satFocus"] = focusValue === "Math" || focusValue === "Reading & Writing" ? focusValue : "Both";
    const preferredSession: SatMasterclassEnquiry["preferredSession"] = sessionValue === "October 24, 2026"
      ? "October 24"
      : sessionValue === "October 31, 2026" ? "October 31" : "Both";
    const currentUtm = readSatUtm();
    const capturedUtm = initialUtm.current || currentUtm;
    const utm = Object.fromEntries(utmKeys.map((key) => [key, capturedUtm[key] || currentUtm[key]])) as SatUtm;
    try {
      await registerSatMasterclassEnquiry({
        studentName: student,
        ...(parent ? { parentName: parent } : {}),
        email,
        whatsappNumber: mobile,
        grade,
        satFocus,
        preferredSession,
        targetSatDate: testDate,
        pageUrl: window.location.href,
        referrerUrl: document.referrer || null,
        utm,
      });
      setSuccess(true);
      if (!conversionTracked.current) {
        conversionTracked.current = true;
        track("SATMasterclassLead");
      }
    } catch (e) {
      setError(e instanceof ApiError
        ? e.message
        : "We couldn't connect to Lurnex. Your details are still here—please check your connection and try again.");
    } finally {
      setBusy(false);
      submitLock.current = false;
    }
  }

  const cta = (label: string, place: string, className = "") => <a className={`sm-button ${className}`} href="#sat-registration-form" onClick={() => track(`SATMasterclassCTA_${place}`)}>{label}<ArrowRight size={15}/></a>;
  const scrollTestimonials = (direction: -1 | 1) => {
    const slider = testimonialSliderRef.current;
    if (!slider) return;
    const card = slider.querySelector<HTMLElement>(".sm-testimonial-card");
    slider.scrollBy({ left: direction * ((card?.offsetWidth ?? slider.clientWidth * 0.8) + 16), behavior: "smooth" });
  };

  const highlightPointer = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--sm-pointer-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--sm-pointer-y", `${event.clientY}px`);
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>(".sm-hero-headline, .sm-offer-details span, .sm-offer-chips span, .sm-button, .sm-benefit-card, .sm-testimonial-card, .sm-plan-card, .sm-exam-session, .sm-support, .sm-form input, .sm-form select, .sm-submit, .sm-faq-list details, .sm-mentor-image") : null;
    document.querySelector(".sm-pointer-active")?.classList.remove("sm-pointer-active");
    if (target) {
      target.style.setProperty("--sm-active-x", `${event.clientX - target.getBoundingClientRect().left}px`);
      target.style.setProperty("--sm-active-y", `${event.clientY - target.getBoundingClientRect().top}px`);
      target.classList.add("sm-pointer-active");
    }
  };

  return <main className="sm-page" onPointerMove={highlightPointer}>
    <header className="sm-header"><div className="sm-header-inner">
      <a className="sm-brand" href="#top" aria-label="Lurnex home"><Image src="/logo.png" alt="Lurnex" width={100} height={36} priority/></a>
      {cta("Book Your Seat", "Header", "sm-header-cta")}
    </div></header>

    <section className="sm-hero" id="top"><div className="sm-hero-inner">
      <div className="sm-hero-copy"><span className="sm-pill sm-hero-pill"><i aria-hidden="true"/> YOUR NOVEMBER SAT GAME PLAN</span>
        <h1 className="sm-hero-headline" tabIndex={0} aria-label="Make your November SAT count. Prepare with a plan."><span>Make Your November SAT Count.</span><em>Prepare with a Plan.</em><i aria-hidden="true"/></h1>
        <p>Walk into the November SAT knowing how you’ll tackle it. Get practical Math and Reading &amp; Writing strategies, guided practice, and a plan you can use right up to test day.</p>
        <div className="sm-event-row sm-offer-details"><span><CalendarDays/><b>Oct 24 &amp; 31, 2026</b></span><span><Clock3/><b>11 AM–2 PM each session</b></span></div>
        <div className="sm-chips sm-offer-chips"><span><i className="sm-chip-blue"><BookOpen/></i><b>2 live lectures</b></span><span><i className="sm-chip-green"><Clock3/></i><b>3 hours each · 6 total</b></span><span><i className="sm-chip-orange"><Target/></i><b>Before Nov 7 SAT</b></span></div>
        {cta("Build My SAT Game Plan", "Hero", "sm-hero-cta")}<p className="sm-hero-note">Choose one session or both. Enquire now and our team will help with the next steps.</p>
      </div>
      <div className="sm-hero-visual"><span className="sm-hero-circle sm-circle-a"/><span className="sm-hero-circle sm-circle-b"/><Image src="/assets/images/sat-masterclass.png" alt="A Lurnex mentor and student studying SAT preparation together" width={1400} height={1100} priority className="sm-hero-image"/>
        <div className="sm-hero-image-caption"><span><BookOpen/></span><div><b>Math + Reading &amp; Writing</b><small>Focused prep. A clearer next step.</small></div></div>
        <div className="sm-float-card sm-float-live"><span><UsersRound/></span><b>2<small>Live Sessions</small></b></div><div className="sm-float-card sm-float-hours"><span><Clock3/></span><b>3<small>Hours Each</small></b></div><div className="sm-float-card sm-float-exam"><span><CalendarDays/></span><b>SAT · Nov 7, 2026</b></div>
      </div>
    </div></section>

    <section className="sm-register-wrap" id="sat-registration-form"><div className="sm-content sm-register"><div className="sm-register-heading"><span className="sm-pill">SAVE YOUR PLACE</span><h2>Your SAT game plan starts here.</h2><p>Pick the session date that works for you and share a few details. Our team will be in touch to help you take the next step.</p></div><div className="sm-register-layout"><div className="sm-form-area">{success ? <div className="sm-success" role="status"><span><Check/></span><h3>Your enquiry is in. Your next step starts here.</h3><p>Continue on WhatsApp or call us to arrange your free SAT counselling/demo and discuss the Masterclass sessions.</p><div className="sm-success-actions"><a href={whatsappHref} target="_blank" rel="noreferrer" onClick={()=>track("SATMasterclassWhatsApp")}><MessageCircle/>Continue on WhatsApp</a><a href={callHref} onClick={()=>track("SATMasterclassCall")}><Phone/>Call Lurnex</a></div></div> : <form className="sm-form" onSubmit={submit} onFocus={()=>{if(!formStarted.current){formStarted.current=true;track("SATMasterclassFormStart");}}}>
        <div className="sm-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label>Student’s full name *<input name="student" required autoComplete="name" placeholder="Enter student’s full name"/></label><label>Parent’s name (optional)<input name="parent" autoComplete="additional-name" placeholder="Enter parent’s name"/></label>
        <label>Email address *<input name="email" type="email" required autoComplete="email" placeholder="Enter email address"/></label><label>WhatsApp number *<input name="whatsapp" type="tel" inputMode="tel" required pattern="[+0-9() .-]{8,24}" title="Enter a valid phone number including country code" autoComplete="tel" placeholder="Include country code"/></label>
        <label>Current grade<select name="grade" defaultValue="" required><option value="" disabled>Select current grade</option><option>Grade 9</option><option>Grade 10</option><option>Grade 11</option><option>Grade 12</option><option>Other</option></select></label><label>Preferred SAT focus<select name="focus" defaultValue="" required><option value="" disabled>Select preferred focus area</option><option>Math</option><option>Reading &amp; Writing</option><option>Both sections</option></select></label>
        <label>Choose your masterclass date *<select name="session" defaultValue="" required><option value="" disabled>Select preferred session</option><option>October 24, 2026</option><option>October 31, 2026</option><option>Both sessions</option></select></label><label>Preferred SAT date<select name="testDate" defaultValue="November 7, 2026"><option value="November 7, 2026">Nov 7, 2026</option><option value="December 5, 2026">Dec 5, 2026</option></select></label>
        {error&&<p className="sm-form-error" role="alert">{error}</p>}<button className="sm-submit" type="submit" disabled={busy}>{busy?"SENDING…":"CONTINUE REGISTRATION"}<ArrowRight/></button><p className="sm-privacy-note"><ShieldCheck/>Your details are used only to follow up on your SAT Master Class enquiry.</p>
      </form>}</div><aside className="sm-support sm-followup"><span className="sm-support-icon"><ClipboardList/></span><h3>What happens after you enquire?</h3><ol className="sm-followup-steps"><li><span>1</span><div><b>We follow up</b><p>Our team reaches you on WhatsApp or phone to discuss your SAT goals.</p></div></li><li><span>2</span><div><b>Free counselling or demo</b><p>Get guidance on the right SAT preparation next step for the student.</p></div></li><li><span>3</span><div><b>Explore SAT enrollment</b><p>Review suitable SAT preparation options with the team.</p></div></li></ol><a href={whatsappHref} target="_blank" rel="noreferrer" onClick={()=>track("SATMasterclassWhatsApp")}><MessageCircle/>Continue on WhatsApp</a><a href={callHref} onClick={()=>track("SATMasterclassCall")}><Phone/>Prefer a call? Call Lurnex</a></aside></div></div></section>

    <section className="sm-exam-wrap" aria-label="Upcoming SAT exam and sessions"><div className="sm-exam-banner"><div className="sm-exam-title"><span className="sm-eyebrow">UPCOMING SAT EXAM</span><h2>November 7, 2026</h2><p>Two focused preparation sessions before test day.</p></div><div className="sm-exam-divider"/><div className="sm-exam-session"><span className="sm-session-icon"><CalendarDays/></span><div><small>SESSION 01</small><b>24 OCT</b><span>11 AM – 2 PM</span></div></div><div className="sm-exam-session"><span className="sm-session-icon"><CalendarDays/></span><div><small>SESSION 02</small><b>31 OCT</b><span>11 AM – 2 PM</span></div></div><div className="sm-calendar-illustration"><div className="sm-calendar-rings">••••</div><b>SAT</b><strong>Nov 7, 2026</strong></div><small className="sm-zone-note">Time zone to be confirmed.</small></div></section>

    <section className="sm-benefits sm-content"><div className="sm-section-heading sm-heading-center"><span className="sm-pill">A SMARTER SAT STARTS HERE</span><h2>Less Guesswork. More <em>“I’ve Got This.”</em></h2><p>Use two focused sessions to sharpen your approach, practise with purpose, and leave with clear next steps for your November SAT.</p></div><div className="sm-benefit-grid">{benefits.map(({icon:Icon,title,copy})=><article className="sm-benefit-card" key={title}><span className="sm-benefit-icon"><Icon/></span><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="sm-benefits-cta">{cta("Save My Spot", "Benefits")}</div></section>

    <section className="sm-learn sm-content" id="learn"><div className="sm-section-heading sm-heading-center"><span className="sm-pill">TWO SUBJECTS. ONE CLEARER PLAN.</span><h2>Get Ready to Tackle <em>Every Section</em></h2><p>Practical tools for SAT Math and Reading &amp; Writing, plus guided practice to help you decide what to work on next.</p></div><div className="sm-benefit-grid sm-learning-grid">{learningItems.map(({icon:Icon,title,copy})=><article className="sm-benefit-card sm-learning-card" key={title}><span className="sm-benefit-icon"><Icon/></span><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="sm-learn-cta">{cta("I’m Ready to Prepare", "Learning")}</div></section>

    <section className="sm-testimonials sm-content" aria-labelledby="sm-testimonials-title"><div className="sm-testimonials-heading"><span className="sm-pill">STUDENT STORIES</span><h2 id="sm-testimonials-title">SAT Students on Their <em>Lurnex Experience</em></h2><p>Hear from students preparing for the SAT with Lurnex. Aiman and Batrisyia’s draft quotes need their approval.</p><span className="sm-testimonial-swipe-hint">Swipe to explore</span><div className="sm-testimonial-controls"><button type="button" aria-label="Previous testimonials" onClick={() => scrollTestimonials(-1)}><ChevronLeft/></button><button type="button" aria-label="Next testimonials" onClick={() => scrollTestimonials(1)}><ChevronRight/></button></div></div><div ref={testimonialSliderRef} className="sm-testimonial-grid" role="list" aria-label="SAT student testimonials" tabIndex={0}>{satTestimonials.map((student) => <article className="sm-testimonial-card" key={student.name} role="listitem"><Quote className="sm-testimonial-quote"/><p>“{student.quote}”</p><div className="sm-testimonial-student"><span aria-hidden="true">{student.name.split(" ").map((part)=>part[0]).join("")}</span><div><b>{student.name}</b><small>{student.location} · SAT Student</small></div></div></article>)}</div></section>

    <section className="sm-mentor-wrap" id="mentor"><div className="sm-content sm-mentor"><div className="sm-mentor-image"><Image src={yogendraKumar.image} alt={`${yogendraKumar.name}, ${yogendraKumar.subject} mentor`} width={560} height={560}/></div><div className="sm-mentor-copy"><span className="sm-pill">MEET YOUR MENTOR</span><h2>Learn From Experienced SAT Educators</h2><h3>{yogendraKumar.name}</h3><p className="sm-mentor-role">{yogendraKumar.subject} Mentor · Lurnex</p><div className="sm-credentials"><span><GraduationCap/>{yogendraKumar.college}</span><span><Clock3/>{yogendraKumar.experience} of Experience</span></div><p className="sm-mentor-description">Mathematics educator with over a decade of teaching experience, helping students strengthen core concepts and build confidence in problem solving.</p></div><a className="sm-mentor-cta" href="#sat-registration-form" onClick={()=>track("SATMasterclassCTA_Mentor")}>MEET YOUR SAT MENTOR <ArrowRight/></a><GraduationCap className="sm-mentor-watermark"/></div></section>

    <section className="sm-faq sm-content" id="faq"><div className="sm-faq-heading"><span className="sm-pill">COMMON QUESTIONS</span><h2>Frequently Asked Questions</h2></div><div className="sm-faq-list">{faqs.map(([question,answer],i)=><details key={question} open={i===0}><summary><span className="sm-faq-toggle">{i===0?"−":"+"}</span><b>{question}</b><span className="sm-faq-chevron">⌄</span></summary><p>{answer}</p></details>)}</div></section>

    <section className="sm-bottom-cta"><div className="sm-bottom-copy"><span className="sm-bottom-pill">LURNEX SAT MASTER CLASS</span><h2>Turn Your Final Weeks Into Focused Prep.</h2><p>Two live sessions. Six focused hours. A clearer plan for test day.</p></div><div className="sm-bottom-details"><span><CalendarDays/>24 &amp; 31 October 2026</span><span><Clock3/>11:00 AM – 2:00 PM</span></div>{cta("BOOK YOUR SEAT NOW", "Bottom", "sm-bottom-button")}<i className="sm-bottom-orb sm-bottom-orb-a"/><i className="sm-bottom-orb sm-bottom-orb-b"/></section>

    <footer className="sm-footer"><a href="#top" className="sm-footer-brand">Lurnex</a><span>Learn | Grow | Excel</span><nav><a href="/privacy">Privacy Policy</a><a href="https://www.instagram.com/lurnex.me/" target="_blank" rel="noreferrer">Instagram</a><a href="/contact">Contact</a></nav></footer>
    {showBatchPopup && batchCountdown && batchCountdown.totalMs > 0 && <div className="sm-batch-popup-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowBatchPopup(false); }}><section className="sm-batch-popup" role="dialog" aria-modal="true" aria-labelledby="sm-batch-popup-title"><button type="button" className="sm-batch-popup-close" aria-label="Close first batch countdown" onClick={() => setShowBatchPopup(false)}><X/></button><span className="sm-batch-popup-icon"><Clock3/></span><span className="sm-pill">FIRST BATCH · OCTOBER 24</span><h2 id="sm-batch-popup-title">Your first SAT session is coming up</h2><div className="sm-popup-countdown" aria-label={`${batchCountdown.days} days, ${batchCountdown.hours} hours, ${batchCountdown.minutes} minutes, ${batchCountdown.seconds} seconds`}><div><strong>{batchCountdown.days}</strong><small>Days</small></div><div><strong>{String(batchCountdown.hours).padStart(2, "0")}</strong><small>Hours</small></div><div><strong>{String(batchCountdown.minutes).padStart(2, "0")}</strong><small>Minutes</small></div><div><strong>{String(batchCountdown.seconds).padStart(2, "0")}</strong><small>Seconds</small></div></div><small className="sm-popup-local-time">Countdown uses your device’s local time. Session 1 starts Oct 24, 2026 at 11:00 AM.</small><p>Reserve a place in the first batch and get focused SAT practice before test day.</p><a href="#sat-registration-form" className="sm-button" onClick={() => { setShowBatchPopup(false); track("SATMasterclassCTA_FirstBatchPopup"); }}>Reserve Your Seat <ArrowRight size={16}/></a></section></div>}
    {showFloatingCta && <a className="sm-floating-cta" href="#sat-registration-form" onClick={()=>track("SATMasterclassCTA_Floating")}>Reserve Your Seat <ArrowRight/></a>}<a className="sm-whatsapp-float" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat with Lurnex on WhatsApp" onClick={()=>track("SATMasterclassWhatsApp")}><MessageCircle/></a>
  </main>;
}
