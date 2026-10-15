"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { ArrowRight, BarChart3, BookOpen, CalendarDays, Calculator, Check, ClipboardList, Clock3, FileText, GraduationCap, Menu, MessageCircle, Quote, ShieldCheck, Target, UsersRound, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ApiError, registerSatMasterclassEnquiry, type SatMasterclassEnquiry } from "@/lib/api";
import { testimonials } from "@/lib/constants";
import { yogendraKumar } from "@/lib/mentors";

const benefits: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: BookOpen, title: "Build Strong Foundations", copy: "Revisit key concepts and strengthen the fundamentals that matter for the SAT." },
  { icon: Target, title: "Smarter Test Strategies", copy: "Learn proven approaches to save time, avoid common mistakes and attempt questions more effectively." },
  { icon: BarChart3, title: "Identify Weak Areas", copy: "Analyse your performance and focus on the areas that need more attention." },
  { icon: ShieldCheck, title: "Build Test-Day Confidence", copy: "Get comfortable with the test format and develop a clear plan for test day." },
];
const learningItems: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: Calculator, title: "SAT Math Strategies", copy: "Core concepts, question types and proven strategies to solve questions faster and more accurately." },
  { icon: FileText, title: "Reading & Writing Strategies", copy: "Learn how to approach passages, understand question patterns and improve accuracy." },
  { icon: BarChart3, title: "Practice & Performance Analysis", copy: "Work through SAT-style questions, review mistakes and create a focused improvement plan." },
];
const faqs = [
  ["Who should attend this master class?", "This master class is ideal for high school students planning to appear for the November SAT, especially those who want a more structured and focused approach in the final weeks."],
  ["Are both sessions included?", "The master class has two planned sessions: October 24 and October 31, 2026, from 11:00 AM to 2:00 PM each day. Choose one session or both in the form; the Lurnex team will confirm availability and registration details."],
  ["Do I need previous SAT preparation experience?", "No. Students can use the sessions to strengthen concepts, practise strategies, and identify areas to focus on. Contact Lurnex if you would like help deciding whether the master class is right for you."],
  ["Will this guarantee a higher SAT score?", "No specific score improvement can be guaranteed. The master class supports preparation through focused instruction, practice strategies, and guidance."],
];
const satTestimonials = testimonials.filter((testimonial) => testimonial.category === "SAT");

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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const formStarted = useRef(false);
  const submitLock = useRef(false);
  const conversionTracked = useRef(false);
  const initialUtm = useRef<SatUtm | null>(null);
  if (!initialUtm.current && typeof window !== "undefined") initialUtm.current = readSatUtm();
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919990054003";
  const whatsappHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi Lurnex! I’m interested in the SAT Master Class on October 24 and/or 31.")}`;

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

  const cta = (label: string, place: string, className = "") => <a className={`sm-button ${className}`} href="#register" onClick={() => track(`SATMasterclassCTA_${place}`)}>{label}<ArrowRight size={15}/></a>;

  return <main className="sm-page">
    <header className="sm-header"><div className="sm-header-inner">
      <a className="sm-brand" href="#top" aria-label="Lurnex home"><Image src="/logo.png" alt="Lurnex" width={100} height={36} priority/></a>
      <nav className={menuOpen ? "sm-nav sm-nav-open" : "sm-nav"} aria-label="Page navigation" onClick={() => setMenuOpen(false)}>
        <a href="#top">SAT Master Class</a><a href="#learn">What You’ll Learn</a><a href="#mentor">Your Mentor</a><a href="#faq">FAQs</a>
      </nav>
      {cta("Book Your Seat", "Header", "sm-header-cta")}
      <button type="button" className="sm-menu" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
    </div></header>

    <section className="sm-hero" id="top"><div className="sm-hero-inner">
      <div className="sm-hero-copy"><span className="sm-pill sm-hero-pill">LURNEX SAT MASTER CLASS</span>
        <h1>Your <em>November SAT</em><br/>Is Closer Than You Think.<br/><em>Are You Ready?</em></h1>
        <p>Get focused, expert-led SAT preparation. Strengthen your concepts, practise smarter, understand your mistakes, and approach test day with a clearer strategy.</p>
        <div className="sm-event-row"><span><CalendarDays/>24 &amp; 31 October 2026</span><span><Clock3/>11:00 AM – 2:00 PM</span></div>
        <div className="sm-chips"><span><i className="sm-chip-blue"><BookOpen/></i>Live SAT Master Class</span><span><i className="sm-chip-green"><GraduationCap/></i>Expert Mentorship</span><span><i className="sm-chip-orange"><Target/></i>Focused Practice</span></div>
        {cta("BOOK YOUR SEAT NOW", "Hero", "sm-hero-cta")}<p className="sm-hero-note">Limited seats available · Register your interest today.</p>
      </div>
      <div className="sm-hero-visual"><span className="sm-hero-circle sm-circle-a"/><span className="sm-hero-circle sm-circle-b"/><Image src="/assets/images/sat-masterclass.png" alt="A Lurnex mentor and student studying SAT preparation together" width={1400} height={1100} priority className="sm-hero-image"/>
        <div className="sm-float-card sm-float-live"><span><UsersRound/></span><b>2<small>Live Sessions</small></b></div><div className="sm-float-card sm-float-hours"><span><Clock3/></span><b>3<small>Hours Each</small></b></div><div className="sm-float-card sm-float-exam"><span><CalendarDays/></span><b>SAT · Nov 7, 2026</b></div>
      </div>
    </div></section>

    <section className="sm-exam-wrap" aria-label="Upcoming SAT exam and sessions"><div className="sm-exam-banner"><div className="sm-exam-title"><span className="sm-eyebrow">UPCOMING SAT EXAM</span><h2>November 7, 2026</h2><p>Two focused preparation sessions before test day.</p></div><div className="sm-exam-divider"/><div className="sm-exam-session"><span className="sm-session-icon"><CalendarDays/></span><div><small>SESSION 01</small><b>24 OCT</b><span>11 AM – 2 PM</span></div></div><div className="sm-exam-session"><span className="sm-session-icon"><CalendarDays/></span><div><small>SESSION 02</small><b>31 OCT</b><span>11 AM – 2 PM</span></div></div><div className="sm-calendar-illustration"><div className="sm-calendar-rings">••••</div><b>SAT</b><strong>Nov 7, 2026</strong></div><small className="sm-zone-note">Time zone to be confirmed.</small></div></section>

    <section className="sm-benefits sm-content"><div className="sm-section-heading sm-heading-center"><span className="sm-pill">PREPARE WITH PURPOSE</span><h2>Don’t Just Practise More. Practise <em>With a Plan.</em></h2><p>A focused, structured master class to help you strengthen your concepts, sharpen your strategies and approach the SAT with confidence.</p></div><div className="sm-benefit-grid">{benefits.map(({icon:Icon,title,copy})=><article className="sm-benefit-card" key={title}><span className="sm-benefit-icon"><Icon/></span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="sm-learn sm-content" id="learn"><div className="sm-learn-copy"><span className="sm-pill">COMPLETE &amp; FOCUSED</span><h2>What You’ll Learn</h2><p className="sm-learn-intro">Focused training across all key sections of the SAT.</p><div className="sm-learn-list">{learningItems.map(({icon:Icon,title,copy})=><article key={title}><span><Icon/></span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div><div className="sm-dashboard"><div className="sm-process"><b>Practice</b><ArrowRight/><b>Review</b><ArrowRight/><b>Improve</b></div><div className="sm-dashboard-bottom"><div className="sm-chart-card"><h3>Your Preparation Journey</h3><div className="sm-chart-legend"><span><i/>Math</span><span><i/>Reading &amp; Writing</span></div><div className="sm-chart" aria-label="Illustrative progress chart"><div><i style={{height:"20%"}}/><i style={{height:"31%"}}/></div><div><i style={{height:"29%"}}/><i style={{height:"42%"}}/></div><div><i style={{height:"40%"}}/><i style={{height:"51%"}}/></div><div><i style={{height:"54%"}}/><i style={{height:"68%"}}/></div><div><i style={{height:"66%"}}/><i style={{height:"83%"}}/></div><div><i style={{height:"82%"}}/><i style={{height:"100%"}}/></div></div></div><div className="sm-check-card">{["Timed practice","Mistake review","Focused revision plan","Clear test-day strategy"].map(x=><span key={x}><Check/>{x}</span>)}</div></div></div></section>

    <section className="sm-plan-band"><div className="sm-content sm-plan"><div className="sm-section-heading"><span className="sm-pill">STEP BY STEP</span><h2>Your Two-Session Learning Plan</h2><p>A focused and practical plan designed for the November SAT.</p></div><div className="sm-plan-grid"><article className="sm-plan-card"><span className="sm-plan-number">01</span><div className="sm-plan-body"><header><div><small>SESSION 01 · OCT 24</small><h3>Concepts, Questions &amp; Strategy</h3></div><span className="sm-time-pill">11:00 AM – 2:00 PM</span></header><ul><li><Check/>Review key concepts</li><li><Check/>Work through SAT-style questions</li><li><Check/>Identify common errors</li></ul></div></article><article className="sm-plan-card"><span className="sm-plan-number">02</span><div className="sm-plan-body"><header><div><small>SESSION 02 · OCT 31</small><h3>Targeted Practice &amp; Final Prep</h3></div><span className="sm-time-pill">11:00 AM – 2:00 PM</span></header><ul><li><Check/>Apply strategies under timed conditions</li><li><Check/>Review mistakes</li><li><Check/>Plan final-week revision</li></ul></div></article></div><p className="sm-plan-note">Session agenda and time zone are subject to confirmation by the faculty.</p></div></section>

    <section className="sm-testimonials sm-content" aria-labelledby="sm-testimonials-title"><div className="sm-testimonials-heading"><span className="sm-pill">STUDENT STORIES</span><h2 id="sm-testimonials-title">SAT Students on Their <em>Lurnex Experience</em></h2><p>Hear from learners who have worked with Lurnex for SAT preparation.</p></div><div className="sm-testimonial-grid">{satTestimonials.map((testimonial) => <article className="sm-testimonial-card" key={testimonial.name}><Quote className="sm-testimonial-quote"/><p>“{testimonial.quote}”</p><div className="sm-testimonial-student"><span>{testimonial.name.split(" ").map((part)=>part[0]).join("")}</span><div><b>{testimonial.name}</b><small>{testimonial.location} · SAT Student</small></div></div></article>)}</div></section>

    <section className="sm-mentor-wrap" id="mentor"><div className="sm-content sm-mentor"><div className="sm-mentor-image"><Image src={yogendraKumar.image} alt={`${yogendraKumar.name}, ${yogendraKumar.subject} mentor`} width={560} height={560}/></div><div className="sm-mentor-copy"><span className="sm-pill">MEET YOUR MENTOR</span><h2>Learn From Experienced SAT Educators</h2><h3>{yogendraKumar.name}</h3><p className="sm-mentor-role">{yogendraKumar.subject} Mentor · Lurnex</p><div className="sm-credentials"><span><GraduationCap/>{yogendraKumar.college}</span><span><Clock3/>{yogendraKumar.experience} of Experience</span></div><p className="sm-mentor-description">Mathematics educator with over a decade of teaching experience, helping students strengthen core concepts and build confidence in problem solving.</p></div><a className="sm-mentor-cta" href="#register" onClick={()=>track("SATMasterclassCTA_Mentor")}>MEET YOUR SAT MENTOR <ArrowRight/></a><GraduationCap className="sm-mentor-watermark"/></div></section>

    <section className="sm-register-wrap" id="register"><div className="sm-content sm-register"><div className="sm-register-heading"><span className="sm-pill">REGISTER NOW</span><h2>Reserve Your SAT Master Class Seat</h2><p>Tell us a little about the student and the Lurnex team will follow up about your enquiry.</p></div><div className="sm-register-layout"><div className="sm-form-area">{success ? <div className="sm-success" role="status"><span><Check/></span><h3>Your enquiry has been received.</h3><p>The Lurnex team will contact you to discuss the sessions. This is an enquiry, not a confirmed seat.</p><a href={whatsappHref} target="_blank" rel="noreferrer" onClick={()=>track("SATMasterclassWhatsApp")}>Chat with us on WhatsApp <ArrowRight/></a></div> : <form className="sm-form" onSubmit={submit} onFocus={()=>{if(!formStarted.current){formStarted.current=true;track("SATMasterclassFormStart");}}}>
        <div className="sm-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label>Student’s full name *<input name="student" required autoComplete="name" placeholder="Enter student’s full name"/></label><label>Parent’s name (optional)<input name="parent" autoComplete="additional-name" placeholder="Enter parent’s name"/></label>
        <label>Email address *<input name="email" type="email" required autoComplete="email" placeholder="Enter email address"/></label><label>WhatsApp number *<input name="whatsapp" type="tel" inputMode="tel" required pattern="[+0-9() .-]{8,24}" title="Enter a valid phone number including country code" autoComplete="tel" placeholder="Include country code"/></label>
        <label>Current grade<select name="grade" defaultValue="" required><option value="" disabled>Select current grade</option><option>Grade 9</option><option>Grade 10</option><option>Grade 11</option><option>Grade 12</option><option>Other</option></select></label><label>Preferred SAT focus<select name="focus" defaultValue="" required><option value="" disabled>Select preferred focus area</option><option>Math</option><option>Reading &amp; Writing</option><option>Both sections</option></select></label>
        <label>Preferred session<select name="session" defaultValue="" required><option value="" disabled>Select preferred session</option><option>October 24, 2026</option><option>October 31, 2026</option><option>Both sessions</option></select></label><label>Preferred SAT date<select name="testDate" defaultValue="November 7, 2026"><option value="November 7, 2026">Nov 7, 2026</option><option value="December 5, 2026">Dec 5, 2026</option></select></label>
        {error&&<p className="sm-form-error" role="alert">{error}</p>}<button className="sm-submit" type="submit" disabled={busy}>{busy?"SENDING…":"CONTINUE REGISTRATION"}<ArrowRight/></button><p className="sm-privacy-note"><ShieldCheck/>Your details are used only to follow up on your SAT Master Class enquiry.</p>
      </form>}</div><aside className="sm-support"><span className="sm-support-icon"><ClipboardList/></span><h3>Have questions before registering?</h3><p>Chat with us on WhatsApp and we’ll be happy to help.</p><a href={whatsappHref} target="_blank" rel="noreferrer" onClick={()=>track("SATMasterclassWhatsApp")}><MessageCircle/>Chat on WhatsApp</a></aside></div></div></section>

    <section className="sm-faq sm-content" id="faq"><div className="sm-faq-heading"><span className="sm-pill">COMMON QUESTIONS</span><h2>Frequently Asked Questions</h2></div><div className="sm-faq-list">{faqs.map(([question,answer],i)=><details key={question} open={i===0}><summary><span className="sm-faq-toggle">{i===0?"−":"+"}</span><b>{question}</b><span className="sm-faq-chevron">⌄</span></summary><p>{answer}</p></details>)}</div></section>

    <section className="sm-bottom-cta"><div className="sm-bottom-copy"><span className="sm-bottom-pill">LURNEX SAT MASTER CLASS</span><h2>Make Your Final Weeks Count.</h2><p>Prepare with purpose before the November SAT.</p></div><div className="sm-bottom-details"><span><CalendarDays/>24 &amp; 31 October 2026</span><span><Clock3/>11:00 AM – 2:00 PM</span></div>{cta("BOOK YOUR SEAT NOW", "Bottom", "sm-bottom-button")}<i className="sm-bottom-orb sm-bottom-orb-a"/><i className="sm-bottom-orb sm-bottom-orb-b"/></section>

    <footer className="sm-footer"><a href="#top" className="sm-footer-brand">Lurnex</a><span>Learn | Grow | Excel</span><nav><a href="/privacy">Privacy Policy</a><a href="https://www.instagram.com/lurnex.me/" target="_blank" rel="noreferrer">Instagram</a><a href="/contact">Contact</a></nav></footer>
    <a className="sm-mobile-cta" href="#register" onClick={()=>track("SATMasterclassCTA_Mobile")}>Book Your Seat <ArrowRight/></a><a className="sm-whatsapp-float" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat with Lurnex on WhatsApp" onClick={()=>track("SATMasterclassWhatsApp")}><MessageCircle/></a>
  </main>;
}
