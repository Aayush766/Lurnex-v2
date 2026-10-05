import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  BookOpenCheck,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Download,
  FileText,
  GraduationCap,
  Headphones,
  Link2,
  Menu,
  MonitorPlay,
  NotebookPen,
  Phone,
  Search,
  Sparkles,
  Target,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { siteUrl } from "@/lib/seo";
import { courseContentHref } from "@/lib/course-content-links";
import { LeadCaptureButton } from "@/components/ui/LeadCaptureButton";
import "./page.css";
import "@/components/courses/curriculum/curriculum-page.css";

export const metadata: Metadata = {
  title: "SAT Prep – Unlock Global Opportunities | LURNEX",
  description:
    "Expert-led SAT preparation with structured study plans, adaptive practice, mock tests, important books and university guidance.",
  alternates: { canonical: "/courses/sat" },
  openGraph: {
    title: "SAT Prep – Unlock Global Opportunities | LURNEX",
    description:
      "Personalised SAT preparation, practice and university admissions guidance from LURNEX.",
    url: `${siteUrl}/courses/sat`,
    type: "website",
  },
};

type IconType = typeof BookOpen;

type Resource = {
  title: string;
  subtitle: string;
  icon: IconType;
  tone: "green" | "purple" | "blue" | "orange" | "pink";
};

const nav = ["Home", "Courses", "JEE", "NEET", "IB", "IGCSE", "SAT", "CBSE", "Foundation", "Resources", "Results", "About Us"];

const sidebar = [
  "Overview",
  "SAT Exam Dates",
  "SAT Syllabus",
  "Study Material",
  "Practice Tests",
  "Previous Papers",
  "Important Books",
  "Test Strategies",
  "Score Calculator",
  "Colleges & Scholarships",
  "FAQs",
];

const quickLinks = [
  "SAT Overview",
  "SAT Exam Dates",
  "SAT Syllabus",
  "SAT Practice Tests",
  "SAT Previous Papers",
  "Best Books for SAT",
  "SAT Score Calculator",
  "Top Universities Accepting SAT",
  "SAT Preparation Tips",
  "FAQs",
];

const resources: Resource[] = [
  { title: "Syllabus", subtitle: "Section-wise topics", icon: BookOpenCheck, tone: "green" },
  { title: "Study Material", subtitle: "Notes, PDFs & more", icon: NotebookPen, tone: "purple" },
  { title: "Practice Tests", subtitle: "Full-length & topic-wise", icon: ClipboardCheck, tone: "green" },
  { title: "Previous Papers", subtitle: "With solutions", icon: FileText, tone: "blue" },
  { title: "Important Books", subtitle: "Recommended by experts", icon: BookOpen, tone: "blue" },
  { title: "Preparation Tips", subtitle: "Strategies from toppers", icon: Sparkles, tone: "orange" },
];

const downloads = [
  ["SAT Syllabus (Official)", "PDF · 2.1 MB"],
  ["SAT Practice Questions", "PDF · 4.3 MB"],
  ["SAT Formula Sheet", "PDF · 1.2 MB"],
  ["SAT Vocabulary List", "PDF · 1.8 MB"],
  ["SAT Preparation Guide", "PDF · 2.6 MB"],
];

const bookMockups = [
  { title: "The Official\nSAT Study Guide", color: "blue", label: "(College Board)" },
  { title: "Reading &\nWriting", color: "purple", label: "Erica Meltzer" },
  { title: "SAT Math", color: "cream", label: "College Panda" },
];

function ResourceCard({ item }: { item: Resource }) {
  const Icon = item.icon;
  return (
    <Link href={courseContentHref("sat", item.title)} className="sat-resource-card">
      <span className={`sat-icon sat-icon-${item.tone}`}><Icon size={22} strokeWidth={2.1} /></span>
      <span className="sat-resource-copy">
        <strong>{item.title}</strong>
        <small>{item.subtitle}</small>
      </span>
      <ChevronRight size={18} className={`sat-chevron sat-chevron-${item.tone}`} />
    </Link>
  );
}

function SectionTitle({ icon: Icon, title, subtitle, action }: { icon: IconType; title: string; subtitle?: string; action?: string }) {
  return (
    <div className="sat-section-title">
      <div className="sat-section-title-main">
        <span className="sat-section-title-icon"><Icon size={22} /></span>
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      {action && <Link href="#resources" className="sat-outline-link">{action}<ArrowRight size={16} /></Link>}
    </div>
  );
}

export default function SATPage() {
  return (
    <main className="sat-page">
      <header className="sat-header">
        <div className="sat-header-inner">
          <Link href="/" className="sat-brand" aria-label="LURNEX home">
            <Image src="/logo.png" alt="LURNEX" width={122} height={45} priority />
          </Link>
          <nav className="sat-main-nav" aria-label="Primary navigation">
            {nav.map((item) => (
              <Link key={item} href={item === "SAT" ? "/courses/sat" : `/#${item.toLowerCase().replaceAll(" ", "-")}`} className={item === "SAT" ? "active" : ""}>{item}</Link>
            ))}
          </nav>
          <div className="sat-header-actions">
            <div className="sat-search"><Search size={18} /><span>Search for courses, tests, resources...</span></div>
            <a className="sat-phone" href="tel:18001234567"><Phone size={18} fill="currentColor" />1800-123-4567</a>
            <LeadCaptureButton course="SAT Prep" title="Talk to a SAT Expert" className="sat-expert-btn">Talk to an Expert <ArrowRight size={17} /></LeadCaptureButton>
          </div>
          <button className="sat-mobile-menu" aria-label="Open menu"><Menu size={22} /></button>
        </div>
      </header>

      <div className="sat-page-shell">
        <div className="sat-breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} /><span>SAT</span></div>

        <div className="sat-layout">
          <aside className="sat-left-column">
            <section className="sat-side-card sat-nav-card">
              <div className="sat-side-title"><GraduationCap size={23} /><strong>SAT</strong></div>
              <div className="sat-side-links">
                {sidebar.map((item, i) => (
                  <Link key={item} href={courseContentHref("sat", item, "#resources")} className={i === 0 ? "selected" : ""}>
                    <ChevronRight size={15} /> <span>{item}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="sat-side-card sat-target-card">
              <Trophy size={31} className="target-trophy" />
              <h3>Target 1500+</h3>
              <p>with Expert Guidance</p>
              <ul>
                <li><Check size={15} />Personalised Study Plan</li>
                <li><Check size={15} />Live Doubt Sessions</li>
                <li><Check size={15} />Full-length Mock Tests</li>
              </ul>
              <LeadCaptureButton course="SAT Prep" title="Talk to a SAT Expert" className="sat-blue-btn">Talk to an Expert <ArrowRight size={16} /></LeadCaptureButton>
            </section>

            <section className="sat-side-card sat-free-card">
              <span className="free-icon"><BookOpen size={20} /></span>
              <h3>Free SAT Prep<br />Materials</h3>
              <p>Get chapter-wise notes, formula sheets & practice questions.</p>
              <LeadCaptureButton course="SAT Prep" title="Request free SAT prep materials" className="sat-outline-link full">Get Free Materials <ArrowRight size={15} /></LeadCaptureButton>
            </section>
          </aside>

          <section className="sat-main-column">
            <section className="sat-hero" id="overview">
              <div className="sat-hero-copy">
                <span className="sat-eyebrow">GLOBAL OPPORTUNITIES START HERE</span>
                <h1>SAT Prep – <span>Unlock Global Opportunities</span></h1>
                <p>Expert-led preparation to help you achieve your best score and get into your dream university.</p>
                <div className="sat-feature-row">
                  <div><MonitorPlay size={24} /><span>Live &amp; Recorded<br />Classes</span></div>
                  <div><Sparkles size={24} /><span>Adaptive Practice<br />Tests</span></div>
                  <div><NotebookPen size={24} /><span>Personalised<br />Study Plan</span></div>
                  <div><Users size={24} /><span>Expert<br />Mentorship</span></div>
                </div>
                <div className="sat-hero-buttons">
                  <LeadCaptureButton course="SAT Prep" title="Enroll in SAT preparation" className="sat-blue-btn large">Enroll in SAT Prep <ArrowRight size={17} /></LeadCaptureButton>
                  <LeadCaptureButton course="SAT Prep" title="Request the SAT brochure" className="sat-outline-link large"><Download size={17} />Request Brochure</LeadCaptureButton>
                </div>
              </div>
              <div className="sat-hero-visual" aria-hidden="true">
                <Image src="/assets/images/lurnex_boy.png" alt="lurnex student preparing for the SAT" fill priority sizes="286px" />
              </div>
              <div className="sat-score-panel">
                <h3>Your SAT Score<br /><span>Can Take You Places</span></h3>
                <ul>
                  <li><span className="score-icon blue"><GraduationCap size={19} /></span>Top Global Universities</li>
                  <li><span className="score-icon green"><BookOpen size={19} /></span>Scholarships &amp; Financial Aid</li>
                  <li><span className="score-icon orange"><GlobeIcon /></span>International Exposure</li>
                  <li><span className="score-icon red"><Award size={19} /></span>Future-Ready Career</li>
                </ul>
              </div>
            </section>

            <section className="sat-row-two" id="exam-dates">
              <div className="sat-exam-card sat-white-card">
                <SectionTitle icon={CalendarDays} title="SAT Exam Dates (2025)" action="View All Dates" />
                <div className="sat-exam-list">
                  <ExamDate month="MAR" day="08" title="SAT March 2025" deadline="Feb 21, 2025" badge="Upcoming" />
                  <ExamDate month="MAY" day="03" title="SAT May 2025" deadline="Apr 18, 2025" />
                </div>
              </div>
              <div className="sat-track-card sat-white-card">
                <SectionTitle icon={Target} title="Track Your Target" subtitle="Know where you stand and plan better." />
                <div className="score-track">
                  <div className="score-track-head"><span>Target Score</span><b>You can do it!</b></div>
                  <div className="score-value">1500</div>
                  <div className="score-line"><span></span><i></i></div>
                  <div className="score-range"><span>1500</span><span>1600</span></div>
                </div>
              </div>
            </section>

            <section className="sat-white-card sat-resources-section" id="resources">
              <SectionTitle icon={Sparkles} title="Explore SAT Resources" subtitle="Everything you need for SAT preparation, all in one place." action="View All Resources" />
              <div className="sat-resource-grid">
                {resources.map((r) => <ResourceCard item={r} key={r.title} />)}
              </div>
            </section>

            <section className="sat-bottom-grid" id="syllabus">
              <article className="sat-white-card sat-syllabus-card">
                <SectionTitle icon={FileText} title="SAT Syllabus" subtitle="Detailed section-wise syllabus for the new digital SAT." />
                <div className="sat-syllabus-list">
                  <Link href="#resources"><span className="syllabus-icon blue"><BookOpen size={19} /></span><span><b>Reading &amp; Writing</b><small>Craft and Structure · Information &amp; Ideas</small></span><ChevronRight size={17} /></Link>
                  <Link href="#resources"><span className="syllabus-icon green"><BarChart3 size={19} /></span><span><b>Math</b><small>Algebra · Problem Solving · Data Analysis</small></span><ChevronRight size={17} /></Link>
                </div>
                <Link href={courseContentHref("sat", "Syllabus")} className="sat-text-link">View Complete Syllabus <ArrowRight size={16} /></Link>
              </article>

              <article className="sat-white-card sat-books-card" id="books">
                <SectionTitle icon={BookOpen} title="Important Books for SAT" subtitle="Trusted by high scorers and expert faculty." />
                <div className="sat-books-row">
                  {bookMockups.map((book) => (
                    <div className="sat-book" key={book.title}>
                      <div className={`book-cover ${book.color}`}>
                        <small>SAT</small>
                        {book.title.split("\n").map((line) => <strong key={line}>{line}</strong>)}
                      </div>
                      <b>{book.title.replace("\n", " ")}</b>
                      <small>{book.label}</small>
                    </div>
                  ))}
                </div>
                <Link href={courseContentHref("sat", "Important Books")} className="sat-text-link">View Book List <ArrowRight size={16} /></Link>
              </article>

              <article className="sat-white-card sat-practice-card" id="practice">
                <SectionTitle icon={ClipboardCheck} title="Practice & Mock Tests" subtitle="Improve your score with real exam simulations." />
                <ul className="sat-check-list">
                  {["Full-length Mock Tests", "Sectional Practice Tests", "Adaptive Tests (Digital SAT)", "Detailed Performance Analysis", "AI-based Recommendations"].map((x) => <li key={x}><Check size={15} />{x}</li>)}
                </ul>
                <Link href="/assessment" className="sat-text-link">Explore Lurnex Practice <ArrowRight size={16} /></Link>
              </article>
            </section>

            <section className="sat-future-cta">
              <div className="sat-future-copy">
                <h2>Your Global Future Starts with a Higher SAT Score</h2>
                <p>Get into top universities across the US, Canada and beyond. We&apos;re with you at every step.</p>
                <div className="sat-cta-buttons">
                  <LeadCaptureButton course="SAT Prep" title="Enroll in SAT preparation" className="sat-blue-btn">Enroll Now <ArrowRight size={16} /></LeadCaptureButton>
                  <LeadCaptureButton course="SAT Prep" title="Schedule a free counselling call" className="sat-outline-link">Schedule a Free Counselling Call</LeadCaptureButton>
                </div>
              </div>
              <div className="sat-stat-strip">
                <div><strong>550+</strong><span>Universities Accept SAT</span></div>
                <div><strong>$300M+</strong><span>Scholarships Awarded</span></div>
                <div><strong>95%</strong><span>Student Success Rate</span></div>
              </div>
              <div className="sat-city-art"><Image src="/assets/images/ctaimage.png" alt="" fill sizes="380px" /></div>
            </section>
          </section>

          <aside className="sat-right-column">
            <section className="sat-side-card sat-quick-card">
              <div className="sat-side-title"><Link2 size={22} /><strong>Quick Links</strong></div>
              {quickLinks.map((item) => <Link href={courseContentHref("sat", item.replace(/^SAT\s+/i, ""), "#resources")} key={item}><span><ChevronRight size={14} />{item}</span><ChevronRight size={14} /></Link>)}
            </section>

            <section className="sat-side-card sat-counsellor-card">
              <div className="counsellor-copy">
                <h3>Need Personalised<br />SAT Guidance?</h3>
                <p>Get a customised study plan, from our expert counsellor.</p>
                <LeadCaptureButton course="SAT Prep" title="Talk to a SAT Counsellor" className="sat-purple-btn">Talk to a Counsellor <ArrowRight size={15} /></LeadCaptureButton>
              </div>
              <Image src="/assets/images/herogirl.png" alt="SAT counsellor" width={125} height={145} className="counsellor-img" />
            </section>

            <section className="sat-side-card sat-download-card" id="downloads">
              <div className="sat-side-title"><ArrowDownToLine size={21} /><strong>Useful Downloads</strong></div>
              <div className="sat-download-list">
                {downloads.map(([title, meta]) => <LeadCaptureButton course="SAT Prep" title={`Request download: ${title}`} className="sat-download-lead" key={title}><span className="pdf-icon">PDF</span><span><b>{title}</b><small>{meta}</small></span><Download size={17} /></LeadCaptureButton>)}
              </div>
              <LeadCaptureButton course="SAT Prep" title="Request SAT resource pack" className="sat-outline-link full">Request Resource Pack <ArrowRight size={15} /></LeadCaptureButton>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function ExamDate({ month, day, title, deadline, badge }: { month: string; day: string; title: string; deadline: string; badge?: string }) {
  return (
    <div className="sat-date-item">
      <div className="date-box"><strong>{day}</strong><small>{month}</small></div>
      <div className="date-copy"><b>{title}</b><span>Registration Deadline</span><small>{deadline}</small></div>
      {badge && <span className="upcoming">{badge}</span>}
    </div>
  );
}

function GlobeIcon() {
  return <span className="globe-symbol">◎</span>;
}
