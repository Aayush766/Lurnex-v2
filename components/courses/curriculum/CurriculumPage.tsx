"use client";

import Image from "next/image";
import Link from "next/link";
import { courseContentHref } from "@/lib/course-content-links";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileText,
  Globe2,
  GraduationCap,
  Layers3,
  Link2,
  Menu,
  X,
  MonitorPlay,
  NotebookPen,
  Phone,
  Search,
  Sparkles,
  Target,
  Trophy,
  Users,
  Mail,
  X as CloseIcon,
} from "lucide-react";
import { learningApi } from "@/lib/api";
import { registrationCountries } from "@/lib/registration-data";
import { leadSourceFor } from "@/lib/lead-source";
import "./curriculum-page.css";

type IconType = typeof BookOpen;
type Tone = "blue" | "green" | "purple" | "orange" | "pink" | "teal";

type CurriculumConfig = {
  slug: string;
  short: string;
  title: string;
  heroTitle: string;
  heroHighlight: string;
  eyebrow: string;
  description: string;
  heroImage: string;
  sideBadge: string;
  sideTitle: string;
  sideCopy: string;
  accent: string;
  navItems: string[];
  quickLinks: string[];
  resources: { title: string; subtitle: string; icon: IconType; tone: Tone }[];
  subjects: { title: string; subtitle: string; icon: IconType; tone: Tone }[];
  stats: { value: string; label: string }[];
  featureRows: string[];
  downloads: string[];
  cards: {
    title: string;
    subtitle: string;
    icon: IconType;
    tone: Tone;
    bullets: string[];
  }[];
  footerTitle: string;
  footerCopy: string;
};

const configs: Record<string, CurriculumConfig> = {
  cbse: {
    slug: "cbse", short: "CBSE", title: "CBSE Curriculum", heroTitle: "CBSE Curriculum –", heroHighlight: "Build Strong Foundations", eyebrow: "STRONG FOUNDATIONS, BRIGHTER FUTURES", description: "Structured CBSE learning that strengthens concepts, improves school performance and prepares students for competitive pathways.", heroImage: "/assets/images/cbse.png", sideBadge: "CLASSES 6–12", sideTitle: "CBSE Academic Excellence", sideCopy: "Concept clarity, regular assessments and personalised academic support.", accent: "green", navItems: ["Overview", "CBSE Syllabus", "Study Material", "NCERT Solutions", "Sample Papers", "Previous Papers", "Subject Preparation", "Revision Notes", "Board Exam Strategy", "Test Series", "FAQs"], quickLinks: ["CBSE Overview", "CBSE Syllabus", "NCERT Solutions", "CBSE Sample Papers", "Previous Year Papers", "Important Questions", "Board Exam Preparation", "Subject-wise Notes", "CBSE Study Plan", "FAQs"], resources: [
      { title: "CBSE Syllabus", subtitle: "Class-wise topics", icon: BookOpen, tone: "green" },
      { title: "Study Material", subtitle: "Notes, PDFs & more", icon: NotebookPen, tone: "purple" },
      { title: "NCERT Solutions", subtitle: "Step-by-step answers", icon: FileText, tone: "blue" },
      { title: "Sample Papers", subtitle: "Practice papers", icon: ClipboardCheck, tone: "orange" },
      { title: "Previous Papers", subtitle: "Board exam practice", icon: Layers3, tone: "blue" },
      { title: "Revision Notes", subtitle: "Quick chapter revision", icon: Sparkles, tone: "pink" },
    ], subjects: [
      { title: "Mathematics", subtitle: "Concepts • Practice • Tests", icon: BarChart3, tone: "blue" },
      { title: "Science", subtitle: "Physics • Chemistry • Biology", icon: Sparkles, tone: "green" },
      { title: "English", subtitle: "Grammar • Literature • Writing", icon: BookOpen, tone: "purple" },
      { title: "Social Science", subtitle: "History • Geography • Civics", icon: Globe2, tone: "orange" },
    ], stats: [{ value: "6–12", label: "Classes Covered" }, { value: "100%", label: "CBSE Focused" }, { value: "24x7", label: "Learning Access" }], featureRows: ["Concept-first teaching", "Personalised study plans", "Regular chapter tests", "Board exam strategy"], downloads: ["CBSE Syllabus & Blueprint", "NCERT Practice Pack", "Board Exam Revision Guide", "Sample Question Papers", "Subject-wise Formula Sheets"], cards: [
      { title: "CBSE Syllabus & Study Plan", subtitle: "A structured roadmap for every class", icon: CalendarDays, tone: "green", bullets: ["Class-wise syllabus coverage", "Weekly study planning", "Revision checkpoints"] },
      { title: "NCERT & Important Questions", subtitle: "Master the concepts that matter", icon: BookOpen, tone: "blue", bullets: ["NCERT-focused learning", "Important question bank", "Chapter-wise practice"] },
      { title: "Tests & Performance Analysis", subtitle: "Know your strengths and improve", icon: BarChart3, tone: "purple", bullets: ["Topic tests", "Mock examinations", "Detailed performance insights"] },
    ], footerTitle: "Your CBSE Success Starts with Strong Concepts", footerCopy: "Build confidence today with guided learning, focused practice and continuous academic support.",
  },
  ap: {
    slug: "ap", short: "AP", title: "Advanced Placement", heroTitle: "Advanced Placement –", heroHighlight: "Learn Beyond the Classroom", eyebrow: "UNIVERSITY-LEVEL LEARNING STARTS HERE", description: "Build college-level academic depth with AP-focused teaching, rigorous practice and expert guidance for ambitious high school students.", heroImage: "/assets/images/ap.png", sideBadge: "GRADES 10–12", sideTitle: "AP Academic Excellence", sideCopy: "Advanced coursework, exam strategy and university-ready academic skills.", accent: "purple", navItems: ["Overview", "AP Courses", "AP Syllabus", "Study Material", "Practice Tests", "Past Papers", "Exam Strategies", "Subject Preparation", "Score Planning", "College Credit", "FAQs"], quickLinks: ["AP Overview", "AP Course List", "AP Exam Dates", "AP Syllabus", "AP Practice Tests", "Past AP Papers", "Best AP Books", "AP Score Calculator", "College Credit Guide", "FAQs"], resources: [
      { title: "AP Course Guides", subtitle: "Course-wise topics", icon: GraduationCap, tone: "purple" },
      { title: "Study Material", subtitle: "Notes & review packs", icon: NotebookPen, tone: "blue" },
      { title: "Practice Tests", subtitle: "Timed AP practice", icon: ClipboardCheck, tone: "green" },
      { title: "Past Papers", subtitle: "Exam-style questions", icon: FileText, tone: "orange" },
      { title: "Exam Strategies", subtitle: "Scoring techniques", icon: Target, tone: "pink" },
      { title: "College Credit", subtitle: "Plan your pathway", icon: Globe2, tone: "blue" },
    ], subjects: [
      { title: "AP Calculus", subtitle: "Functions • Limits • Integration", icon: BarChart3, tone: "blue" },
      { title: "AP Physics", subtitle: "Mechanics • Waves • Electricity", icon: Sparkles, tone: "purple" },
      { title: "AP Chemistry", subtitle: "Reactions • Equilibrium • Labs", icon: Layers3, tone: "green" },
      { title: "AP English", subtitle: "Reading • Writing • Analysis", icon: BookOpen, tone: "orange" },
    ], stats: [{ value: "30+", label: "AP Subjects" }, { value: "5", label: "Top Score" }, { value: "10–12", label: "Grades Covered" }], featureRows: ["University-level instruction", "AP exam-focused practice", "Personalised study plans", "College pathway guidance"], downloads: ["AP Course Syllabus Pack", "AP Formula & Review Sheets", "AP Practice Question Bank", "AP Exam Strategy Guide", "College Credit Planner"], cards: [
      { title: "AP Course Roadmaps", subtitle: "Plan your year with clarity", icon: CalendarDays, tone: "purple", bullets: ["Course-wise milestones", "Weekly learning targets", "Exam countdown planning"] },
      { title: "AP Practice & Past Papers", subtitle: "Train with exam-level questions", icon: ClipboardCheck, tone: "blue", bullets: ["Timed section practice", "Past-style questions", "Detailed solutions"] },
      { title: "Score & College Planning", subtitle: "Turn AP performance into opportunity", icon: GraduationCap, tone: "green", bullets: ["Score tracking", "Credit planning", "University readiness"] },
    ], footerTitle: "Go Further with Advanced Placement", footerCopy: "Learn at university level, practise with purpose and build a stronger college-ready academic profile.",
  },
  igcse: {
    slug: "igcse", short: "IGCSE", title: "IGCSE Curriculum", heroTitle: "IGCSE Curriculum –", heroHighlight: "Explore Global Learning", eyebrow: "GLOBAL LEARNING, GREATER POSSIBILITIES", description: "A flexible international curriculum with strong academic foundations, subject choice and skills designed for global university pathways.", heroImage: "/assets/images/igcse.png", sideBadge: "GRADES 9–10", sideTitle: "IGCSE Academic Journey", sideCopy: "Build independent thinking, subject confidence and global academic readiness.", accent: "teal", navItems: ["Overview", "IGCSE Syllabus", "Study Material", "Past Papers", "Practice Tests", "Subject Guides", "Revision Notes", "Exam Strategy", "University Pathways", "Resources", "FAQs"], quickLinks: ["IGCSE Overview", "IGCSE Syllabus", "Exam Dates", "Past Papers", "Practice Tests", "Best IGCSE Books", "Subject Resources", "Exam Preparation Tips", "University Pathways", "FAQs"], resources: [
      { title: "IGCSE Syllabus", subtitle: "Subject-wise structure", icon: BookOpen, tone: "teal" },
      { title: "Study Material", subtitle: "Notes & resources", icon: NotebookPen, tone: "purple" },
      { title: "Past Papers", subtitle: "With answer support", icon: FileText, tone: "blue" },
      { title: "Practice Tests", subtitle: "Topic & full length", icon: ClipboardCheck, tone: "green" },
      { title: "Subject Guides", subtitle: "Expert recommendations", icon: GraduationCap, tone: "orange" },
      { title: "Exam Strategies", subtitle: "Score with confidence", icon: Target, tone: "pink" },
    ], subjects: [
      { title: "Mathematics", subtitle: "Number • Algebra • Geometry", icon: BarChart3, tone: "blue" },
      { title: "Sciences", subtitle: "Physics • Chemistry • Biology", icon: Sparkles, tone: "teal" },
      { title: "English", subtitle: "Language • Literature • Writing", icon: BookOpen, tone: "purple" },
      { title: "Global Perspectives", subtitle: "Research • Analysis • Debate", icon: Globe2, tone: "orange" },
    ], stats: [{ value: "70+", label: "Subjects & Options" }, { value: "2", label: "Core Years" }, { value: "Global", label: "Recognition" }], featureRows: ["Flexible subject choices", "Conceptual understanding", "Independent learning skills", "Global university readiness"], downloads: ["IGCSE Syllabus Planner", "Subject Revision Notes", "Past Paper Practice Pack", "Exam Strategy Guide", "University Pathway Guide"], cards: [
      { title: "Subject-wise Learning Plan", subtitle: "Create a balanced IGCSE routine", icon: CalendarDays, tone: "teal", bullets: ["Subject milestones", "Weekly revision plan", "Progress checkpoints"] },
      { title: "Past Papers & Practice", subtitle: "Build confidence through practice", icon: ClipboardCheck, tone: "blue", bullets: ["Past paper practice", "Topic-wise tests", "Detailed answer support"] },
      { title: "Global University Readiness", subtitle: "Prepare for the next academic step", icon: Globe2, tone: "purple", bullets: ["Profile development", "Academic guidance", "University pathway support"] },
    ], footerTitle: "Build a Global Academic Foundation", footerCopy: "Explore subjects, strengthen your skills and prepare confidently for international university pathways.",
  },
  ib: {
    slug: "ib", short: "IB", title: "IB Diploma", heroTitle: "IB Diploma –", heroHighlight: "Think Beyond Borders", eyebrow: "GLOBAL MINDS, BRIGHTER TOMORROWS", description: "A globally recognised IB Diploma pathway focused on critical thinking, research, communication and university readiness.", heroImage: "/assets/images/ibdiploma.png", sideBadge: "GRADES 11–12", sideTitle: "IB Diploma Excellence", sideCopy: "Subject mastery, research skills and personalised guidance for global university admissions.", accent: "blue", navItems: ["Overview", "IB Diploma", "IB Subjects", "Study Material", "Past Papers", "Internal Assessment", "Extended Essay", "TOK", "CAS", "University Guidance", "FAQs"], quickLinks: ["IB Diploma Overview", "IB Subject Groups", "IB Exam Dates", "IB Syllabus", "Past Papers", "Best IB Books", "IA Guidance", "Extended Essay", "TOK Resources", "FAQs"], resources: [
      { title: "IB Syllabus", subtitle: "Subject-group roadmap", icon: BookOpen, tone: "blue" },
      { title: "Study Material", subtitle: "Notes & resources", icon: NotebookPen, tone: "purple" },
      { title: "Past Papers", subtitle: "Exam-style practice", icon: FileText, tone: "green" },
      { title: "Internal Assessment", subtitle: "Plan & improve", icon: ClipboardCheck, tone: "orange" },
      { title: "Extended Essay", subtitle: "Research guidance", icon: Search, tone: "blue" },
      { title: "TOK & CAS", subtitle: "Core component support", icon: Sparkles, tone: "pink" },
    ], subjects: [
      { title: "Sciences", subtitle: "Biology • Chemistry • Physics", icon: Sparkles, tone: "green" },
      { title: "Mathematics", subtitle: "AA • AI • Problem Solving", icon: BarChart3, tone: "blue" },
      { title: "Languages", subtitle: "Language & Literature", icon: BookOpen, tone: "purple" },
      { title: "Individuals & Societies", subtitle: "Economics • History • Geography", icon: Globe2, tone: "orange" },
    ], stats: [{ value: "6", label: "Subject Groups" }, { value: "3", label: "Core Components" }, { value: "170+", label: "Countries" }], featureRows: ["Critical thinking", "Research & writing support", "IA & EE guidance", "Global university preparation"], downloads: ["IB Diploma Subject Planner", "IB Revision Notes", "Past Paper Practice Pack", "Extended Essay Guide", "University Application Planner"], cards: [
      { title: "IB Subject Planning", subtitle: "Build a balanced diploma", icon: CalendarDays, tone: "blue", bullets: ["HL & SL planning", "Study schedules", "Revision checkpoints"] },
      { title: "IA, EE & TOK Support", subtitle: "Master the IB core", icon: NotebookPen, tone: "purple", bullets: ["Research planning", "Draft feedback", "Academic writing guidance"] },
      { title: "University Readiness", subtitle: "Turn your IB profile into opportunity", icon: GraduationCap, tone: "green", bullets: ["Global admissions guidance", "Profile development", "Application planning"] },
    ], footerTitle: "Your IB Journey Starts with Curiosity", footerCopy: "Learn deeply, think independently and build a global academic profile with expert IB support.",
  },
};

const mainNav = ["Home", "Courses", "JEE", "NEET", "IB", "IGCSE", "SAT", "CBSE", "Foundation", "Resources", "Results", "About Us"];

function ResourceCard({ item, course, onLead }: { item: CurriculumConfig["resources"][number]; course: string; onLead: (title: string) => void }) {
  const Icon = item.icon;
  if (course === "ib" && item.title === "IB Syllabus") return <button type="button" onClick={() => onLead("Enroll for IB Courses")} className="curriculum-resource-card curriculum-resource-button"><span className={`curriculum-icon curriculum-icon-${item.tone}`}><Icon size={21} /></span><span className="curriculum-resource-copy"><strong>{item.title}</strong><small>{item.subtitle}</small></span><ChevronRight size={17} className="curriculum-card-arrow" /></button>;
  if (course === "ib" && item.title === "Internal Assessment") return <button type="button" onClick={() => onLead("Enroll for IB Internal Assessment Support")} className="curriculum-resource-card curriculum-resource-button"><span className={`curriculum-icon curriculum-icon-${item.tone}`}><Icon size={21} /></span><span className="curriculum-resource-copy"><strong>{item.title}</strong><small>{item.subtitle}</small></span><ChevronRight size={17} className="curriculum-card-arrow" /></button>;
  return <Link href={courseContentHref(course, item.title, "#resources")} className="curriculum-resource-card"><span className={`curriculum-icon curriculum-icon-${item.tone}`}><Icon size={21} /></span><span className="curriculum-resource-copy"><strong>{item.title}</strong><small>{item.subtitle}</small></span><ChevronRight size={17} className="curriculum-card-arrow" /></Link>;
}

function SectionTitle({ icon: Icon, title, subtitle, action, href }: { icon: IconType; title: string; subtitle?: string; action?: string; href?: string }) {
  return <div className="curriculum-section-title"><div className="curriculum-section-title-main"><span className="curriculum-section-icon"><Icon size={21} /></span><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>{action && <Link href={href || "#resources"} className="curriculum-outline-link">{action}<ArrowRight size={15} /></Link>}</div>;
}

function LeadModal({ course, title, onClose }: { course: string; title: string; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [dialCode, setDialCode] = useState("+91");
  const [country, setCountry] = useState("India");
  const [interest, setInterest] = useState(course === "IB Diploma" ? "IB Diploma enrolment" : course === "Advanced Placement" ? "AP course enrolment" : course === "CBSE Curriculum" ? "CBSE course enrolment" : course === "IGCSE Curriculum" ? "IGCSE course enrolment" : "Course enrolment");
  const courseGrades = course === "IB Diploma" ? ["DP - 2", "DP - 1", "MYP - 5", "MYP - 4", "MYP - 3", "MYP - 2", "MYP - 1", "PYP - 5", "PYP - 4"] : course === "IGCSE Curriculum" ? ["AS & A Level", "IGCSE 10", "IGCSE 9", "Lower Secondary 8", "Lower Secondary 7", "Lower Secondary 6"] : course === "Advanced Placement" ? ["Grade 12", "Grade 11", "Grade 10", "Grade 9"] : course === "SAT Prep" ? [] : ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
  const [grade, setGrade] = useState(courseGrades[0] || "");
  const interests: Record<string, string[]> = {
    "IB Diploma": ["IB Diploma enrolment", "Mathematics AA HL", "Mathematics AI HL", "Physics HL", "Biology HL", "Chemistry HL", "Computer Science HL", "Internal Assessment", "Extended Essay / TOK"],
    "Advanced Placement": ["AP course enrolment", "AP Calculus", "AP Physics", "AP Chemistry", "AP Biology", "AP Computer Science"],
    "CBSE Curriculum": ["CBSE course enrolment", "Mathematics", "Physics", "Chemistry", "Biology", "English"],
    "IGCSE Curriculum": ["IGCSE course enrolment", "Mathematics", "Physics", "Chemistry", "Biology", "English"],
  };
  const courseInterests = interests[course] || ["Course enrolment", "Practice and assessment", "Study plan and counselling"];
  useEffect(() => setMounted(true), []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const data = new FormData(event.currentTarget);
    try {
      await learningApi.registerStudent({ name: String(data.get("name")).trim(), email: String(data.get("email")).trim(), mobile: `${dialCode}${String(data.get("mobile")).replace(/\D/g, "")}`, course: `${course} - ${interest}`, grade: grade || "Not specified", school: "Not provided", country, leadSource: leadSourceFor(title), leadIntent: title, registrationUrl: window.location.href, sourcePage: window.location.pathname, referrerUrl: document.referrer || null });
      setDone(true);
    } catch (e) { setError(e instanceof Error ? e.message : "We could not submit your details. Please try again."); }
    finally { setBusy(false); }
  }
  if (!mounted) return null;
  return createPortal(<div className="curriculum-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="curriculum-lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title"><button className="curriculum-modal-close" type="button" onClick={onClose} aria-label="Close"><CloseIcon size={20}/></button>{done ? <div className="curriculum-lead-success"><span><Check size={25}/></span><h2 id="lead-modal-title">Thanks — we’ll be in touch</h2><p>Our counsellor will contact you soon about {title.toLowerCase()}.</p><button className="curriculum-blue-btn" onClick={onClose}>Done</button></div> : <><span className="curriculum-eyebrow">LURNEX · {course.toUpperCase()}</span><h2 id="lead-modal-title">{title}</h2><p>Select your programme and level so we can connect you with the right counsellor.</p><form onSubmit={submit} className="curriculum-lead-form"><label>Programme / subject<select value={interest} onChange={(e)=>setInterest(e.target.value)}>{courseInterests.map((item)=><option key={item}>{item}</option>)}</select></label>{courseGrades.length > 0 && <label>{course === "IB Diploma" ? "IB programme level" : course === "IGCSE Curriculum" ? "Cambridge programme level" : "Current grade"}<select value={grade} onChange={(e)=>setGrade(e.target.value)}>{courseGrades.map((item)=><option key={item}>{item}</option>)}</select></label>}<label>Your name<input name="name" autoComplete="name" required /></label><label>Email address<input name="email" type="email" autoComplete="email" required /></label><label>Mobile number<div className="curriculum-lead-phone"><select aria-label="Country code" value={dialCode} onChange={(e) => { setDialCode(e.target.value); setCountry(registrationCountries.find((x) => x.dialCode === e.target.value)?.name || "Other"); }}>{registrationCountries.map((x) => <option key={`${x.name}-${x.dialCode}`} value={x.dialCode}>{x.dialCode} · {x.name}</option>)}</select><input name="mobile" type="tel" autoComplete="tel-national" required /></div></label>{error && <p className="curriculum-lead-error" role="alert">{error}</p>}<button className="curriculum-blue-btn" disabled={busy}>{busy ? "Submitting..." : title.startsWith("Request download") ? "Request download" : "Request a call"}<ArrowRight size={16}/></button></form><small className="curriculum-lead-privacy"><Mail size={13}/> Your details are used only to follow up on this request.</small></>}</section></div>, document.body);
}

export function CurriculumPage({ type }: { type: keyof typeof configs }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadModal, setLeadModal] = useState("");
  const c = configs[type];
  const activeRoute = type === "ap" ? "/courses/ap" : `/courses/${type}`;
  return <main className={`curriculum-page curriculum-${c.accent}`}>
    <header className="curriculum-header"><div className="curriculum-header-inner">
      <Link href="/" className="curriculum-brand"><Image src="/logo.png" alt="LURNEX" width={122} height={45} priority /></Link>
      <nav className="curriculum-main-nav" aria-label="Primary navigation">{mainNav.map((item) => <Link key={item} href={item === c.short ? activeRoute : `/#${item.toLowerCase().replaceAll(" ", "-")}`} className={item === c.short ? "active" : ""}>{item}</Link>)}</nav>
      <div className="curriculum-header-actions"><div className="curriculum-search"><Search size={17} /><span>Search for courses, tests, resources...</span></div><a className="curriculum-phone" href="tel:18001234567"><Phone size={17} fill="currentColor" />1800-123-4567</a><button type="button" onClick={()=>setLeadModal("Talk to an Expert")} className="curriculum-expert-btn">Talk to an Expert <ArrowRight size={16} /></button></div>
      <button className="curriculum-mobile-menu" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen} aria-controls="curriculum-mobile-nav" onClick={() => setMobileMenuOpen((open) => !open)} type="button">{mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}</button>
    </div></header>
    {mobileMenuOpen && <nav className="curriculum-mobile-nav" id="curriculum-mobile-nav" aria-label="Mobile primary navigation">{mainNav.map((item) => <Link key={item} href={item === c.short ? activeRoute : `/#${item.toLowerCase().replaceAll(" ", "-")}`} onClick={() => setMobileMenuOpen(false)} className={item === c.short ? "active" : ""}>{item}</Link>)}<button type="button" className="curriculum-mobile-cta" onClick={() => {setMobileMenuOpen(false);setLeadModal("Talk to an Expert");}}>Talk to an Expert <ArrowRight size={16} /></button></nav>}

    <div className="curriculum-shell"><nav className="curriculum-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} /><Link href="/courses">Courses</Link><ChevronRight size={13} /><span aria-current="page">{c.title}</span></nav>
      <div className="curriculum-layout">
        <aside className="curriculum-left">
          <section className="curriculum-side-card curriculum-nav-card"><div className="curriculum-side-heading"><GraduationCap size={22}/><strong>{c.short}</strong></div><div className="curriculum-side-links">{c.navItems.map((item,i)=><Link key={item} href={courseContentHref(type, item, "#resources")} className={i===0?"selected":""}><ChevronRight size={14}/><span>{item}</span></Link>)}</div></section>
          <section className="curriculum-side-card curriculum-goal-card"><Trophy size={30}/><h3>{c.sideBadge}</h3><strong>{c.sideTitle}</strong><p>{c.sideCopy}</p><ul>{c.featureRows.slice(0,3).map((x)=><li key={x}><Check size={14}/>{x}</li>)}</ul><button onClick={()=>setLeadModal("Talk to an Expert")} className="curriculum-blue-btn">Talk to an Expert <ArrowRight size={15}/></button></section>
          <section className="curriculum-side-card curriculum-free-card"><span className="curriculum-free-icon"><BookOpen size={19}/></span><h3>Free {c.short} Prep<br/>Materials</h3><p>Get notes, revision sheets and practice resources for focused preparation.</p><button type="button" onClick={()=>setLeadModal("Request free prep materials")} className="curriculum-outline-link full">Get Free Materials <ArrowRight size={15}/></button></section>
        </aside>

        <section className="curriculum-main">
          <section className="curriculum-hero" id="overview"><div className="curriculum-hero-copy"><span className="curriculum-eyebrow">{c.eyebrow}</span><h1>{c.heroTitle} <span>{c.heroHighlight}</span></h1><p>{c.description}</p><div className="curriculum-feature-row">{c.featureRows.slice(0,4).map((x,i)=>{ const FeatureIcon = [MonitorPlay, Sparkles, NotebookPen, Users][i] ?? Sparkles; return <div key={x}><FeatureIcon size={22} /><span>{x}</span></div>; })}</div><div className="curriculum-hero-buttons"><button onClick={()=>setLeadModal("Enroll in Lurnex Assessment")} className="curriculum-blue-btn large">Enroll in Lurnex Assessment <ArrowRight size={16}/></button><button onClick={()=>setLeadModal("Download Brochure")} className="curriculum-outline-link large"><Download size={16}/>Download Brochure</button></div></div><div className="curriculum-hero-image"><Image src={c.heroImage} alt="" fill priority sizes="390px"/></div><div className="curriculum-hero-panel"><h3>{c.sideTitle}<br/><span>Can Take You Further</span></h3><ul>{c.stats.map((s,i)=><li key={s.label}><span className={`curriculum-panel-icon curriculum-panel-${i}`}><Award size={17}/></span><b>{s.value}</b><small>{s.label}</small></li>)}</ul></div></section>

          <section className="curriculum-row-two" id="roadmap"><div className="curriculum-white-card curriculum-roadmap-wide"><SectionTitle icon={CalendarDays} title={`${c.short} Academic Roadmap`} action="View Full Plan" href={courseContentHref(type, "Academic Roadmap", "#resources")}/><div className="curriculum-roadmap"><div><span className="roadmap-number">01</span><div><b>Learn</b><small>Concepts & syllabus</small></div></div><div><span className="roadmap-number">02</span><div><b>Practice</b><small>Questions & tests</small></div></div><div><span className="roadmap-number">03</span><div><b>Perform</b><small>Assess & improve</small></div></div></div></div></section>

          <section className="curriculum-resources curriculum-white-card" id="resources"><SectionTitle icon={Layers3} title={`Explore ${c.title} Resources`} subtitle={`Everything you need for ${c.short} preparation, all in one place.`} action="View All Resources"/><div className="curriculum-resource-grid">{c.resources.map((item)=><ResourceCard key={item.title} item={item} course={type} onLead={setLeadModal}/>)}</div></section>

          <section className="curriculum-bottom-grid" id="subjects"><div className="curriculum-white-card"><SectionTitle icon={BookOpen} title="Subject-wise Learning"/><div className="curriculum-subject-grid">{c.subjects.map((s)=><div key={s.title} className="curriculum-subject-card"><span className={`curriculum-subject-icon curriculum-icon-${s.tone}`}><s.icon size={21}/></span><b>{s.title}</b><small>{s.subtitle}</small></div>)}</div></div><div className="curriculum-white-card"><SectionTitle icon={NotebookPen} title="Most Important Resources" action="View Resource List"/><div className="curriculum-mini-list">{c.cards[0].bullets.map((x,i)=><div key={x}><span className={`curriculum-mini-icon curriculum-icon-${["blue","green","purple"][i]}`}><Check size={16}/></span><div><b>{x}</b><small>{c.cards[0].title}</small></div><ChevronRight size={15}/></div>)}</div></div><div className="curriculum-white-card"><SectionTitle icon={ClipboardCheck} title="Practice & Assessments"/><ul className="curriculum-check-list">{c.cards[2].bullets.concat(c.featureRows.slice(0,2)).map(x=><li key={x}><Check size={14}/>{x}</li>)}</ul><Link href="/assessment" className="curriculum-text-link">Explore Lurnex Practice <ArrowRight size={15}/></Link></div></section>

          <section className="curriculum-cards-grid" id="assessments">{c.cards.map((card)=><div key={card.title} className="curriculum-white-card curriculum-feature-card"><span className={`curriculum-feature-icon curriculum-icon-${card.tone}`}><card.icon size={22}/></span><h3>{card.title}</h3><p>{card.subtitle}</p><ul>{card.bullets.map(x=><li key={x}><Check size={14}/>{x}</li>)}</ul><Link href={courseContentHref(type, card.title, "#resources")} className="curriculum-text-link">Explore <ArrowRight size={15}/></Link></div>)}</section>
        </section>

        <aside className="curriculum-right"><section className="curriculum-side-card curriculum-quick-card"><div className="curriculum-side-heading"><Link2 size={21}/><strong>Quick Links</strong></div>{c.quickLinks.map(x=><Link key={x} href={courseContentHref(type, x, "#resources")}><span><ChevronRight size={13}/>{x}</span><ChevronRight size={13}/></Link>)}</section><section className="curriculum-side-card curriculum-guidance"><h3>Need Personalised<br/>{c.short} Guidance?</h3><p>Get a customised study plan from our expert faculty and academic mentors.</p><button type="button" onClick={()=>setLeadModal("Talk to an Expert")} className="curriculum-purple-btn">Talk to an Expert <ArrowRight size={14}/></button><Image src="/assets/images/herogirl.png" alt="" width={120} height={140}/></section><section className="curriculum-side-card curriculum-downloads" id="downloads"><div className="curriculum-side-heading"><Download size={20}/><strong>Useful Downloads</strong></div>{(type === "ib" ? ["IB Maths AA Higher Level Past Paper", "IB Maths AI Higher Level Past Paper", "IB Physics Higher Level Past Paper", "IB Biology Higher Level Past Paper", "IB Chemistry Higher Level Past Paper", "IB Computer Science Higher Level Past Paper"] : c.downloads.slice(0,5)).map(x=><button type="button" key={x} onClick={()=>setLeadModal(`Request download: ${x}`)} className="curriculum-download-item"><span className="download-pdf">PDF</span><span><b>{x}</b><small>Request a copy · PDF</small></span><Download size={16}/></button>)}<button type="button" onClick={()=>setLeadModal("Request useful resources")} className="curriculum-outline-link full">View All Downloads <ArrowRight size={14}/></button></section></aside>
      </div>

      <section className="curriculum-footer-cta"><div className="curriculum-footer-copy"><h2>{c.footerTitle}</h2><p>{c.footerCopy}</p><div><button onClick={()=>setLeadModal(`Enroll in ${c.short} courses`)} className="curriculum-blue-btn">Enroll Now <ArrowRight size={15}/></button><button onClick={()=>setLeadModal("Talk to an Expert")} className="curriculum-outline-link">Schedule a Free Counselling Call</button></div></div><div className="curriculum-stat-strip">{c.stats.map(s=><div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div><div className="curriculum-footer-art"><Image src="/assets/images/ctaimage.png" alt="" fill sizes="330px"/></div></section>
    </div>
    {leadModal && <LeadModal course={c.title} title={leadModal} onClose={()=>setLeadModal("")}/>}
  </main>;
}
