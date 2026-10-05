import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileText,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Leaf,
  Link2,
  MessageCircle,
  PhoneCall,
  Search,
  Sparkles,
  Stethoscope,
  Target,
  UserRound,
  UsersRound,
  Wrench,
} from "lucide-react";
import { siteUrl } from "@/lib/seo";
import "./page.css";

export const metadata: Metadata = {
  title: "NEET UG Preparation | LURNEX",
  description:
    "NEET UG preparation with structured study plans, expert guidance, study material, previous year papers, mock tests and personalised mentorship.",
  alternates: { canonical: "/courses/neet" },
  openGraph: {
    title: "NEET UG Preparation | LURNEX",
    description:
      "Everything you need for focused NEET UG preparation in one place.",
    url: `${siteUrl}/courses/neet`,
    type: "website",
  },
};

const nav = [
  ["Home", "/"],
  ["Courses", "/courses"],
  ["JEE", "/courses/jee"],
  ["NEET", "/courses/neet"],
  ["IB", "/courses/ib"],
  ["IGCSE", "/courses/languages"],
  ["SAT", "/courses/sat"],
  ["CBSE", "/courses/cbse"],
  ["Foundation", "/courses/foundation"],
  ["Resources", "/blog"],
  ["Results", "/success-stories"],
  ["About Us", "/about"],
];

const sidebar = [
  "NEET Overview",
  "NEET UG",
  "NEET PG",
  "NEET SS",
  "Syllabus",
  "Study Material",
  "Previous Year Papers",
  "Mock Tests",
  "Important Books",
  "Preparation Strategy",
  "Cutoff & Colleges",
  "Rank Predictor",
  "News & Updates",
  "FAQs",
];

const quickLinks = [
  "NEET UG Overview",
  "NEET UG Syllabus",
  "NEET Previous Year Papers",
  "NEET Mock Tests",
  "NEET Important Books",
  "NEET Cutoff & Colleges",
  "NEET Rank Predictor",
  "NEET Preparation Tips",
  "NEET News & Updates",
  "NEET PG",
  "NEET SS",
];

const resources = [
  { title: "Syllabus", text: "Topic-wise syllabus", icon: CalendarDays, tone: "green" },
  { title: "Study Material", text: "Notes, PDFs, DPPs", icon: BookOpen, tone: "orange" },
  { title: "Previous Year Papers", text: "10+ years with solutions", icon: FileText, tone: "purple" },
  { title: "Mock Tests", text: "Full-length & chapter-wise", icon: ClipboardCheck, tone: "pink" },
  { title: "Important Books", text: "Recommended by experts", icon: BookOpen, tone: "blue" },
  { title: "Preparation Strategy", text: "Study plans & expert tips", icon: Target, tone: "pink" },
  { title: "Rank Predictor", text: "Estimate your NEET rank", icon: UsersRound, tone: "orange" },
  { title: "Cutoff & Colleges", text: "Explore top medical colleges", icon: HeartPulse, tone: "green" },
];

const subjects = [
  { title: "Physics", text: "Notes • PYQs • Tests", icon: Atom, tone: "blue" },
  { title: "Chemistry", text: "Notes • PYQs • Tests", icon: FlaskConical, tone: "orange" },
  { title: "Biology", text: "Notes • PYQs • Tests", icon: Leaf, tone: "green" },
];

const books = [
  ["NCERT", "(Physics)", "#16243a"],
  ["QUEST", "(Chemistry)", "#1d6c60"],
  ["NCERT", "(Biology)", "#7b3b2f"],
  ["Trueman's", "Biology", "#e7e0d5"],
  ["Objective", "Biology", "#1e2448"],
];

const colleges = [
  ["AIIMS", "New Delhi"],
  ["JIPMER", "Puducherry"],
  ["CMC", "Vellore"],
  ["KGMU", "Lucknow"],
  ["SCB Medical", "Cuttack"],
];

const tools = [
  ["Rank Predictor", "Predict your rank", UsersRound, "orange"],
  ["Question Practice", "Topic-wise MCQs", MessageCircle, "green"],
  ["Study Planner", "Personalised plan", CalendarDays, "blue"],
  ["Exam Analysis", "Track performance", BookOpen, "purple"],
] as const;

const cmsHref = (label: string) => `/neet/${label.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

function ResourceCard({
  title,
  text,
  icon: Icon,
  tone,
}: {
  title: string;
  text: string;
  icon: typeof BookOpen;
  tone: string;
}) {
  return (
    <Link href={cmsHref(title)} className="neet-resource-card">
      <span className={`neet-icon neet-icon-${tone}`}><Icon size={21} strokeWidth={2.2} /></span>
      <span className="neet-resource-copy">
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
      <ChevronRight size={16} />
    </Link>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
  action,
}: {
  icon: typeof BookOpen;
  title: string;
  subtitle?: string;
  action?: string;
}) {
  return (
    <div className="neet-section-title-row">
      <div className="neet-section-title">
        <span className="neet-title-icon"><Icon size={22} /></span>
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      {action ? (
        <Link href={cmsHref(action)} className="neet-section-action">{action}<ArrowRight size={16} /></Link>
      ) : null}
    </div>
  );
}

export default function NEETPage() {
  return (
    <div className="neet-page">
      <header className="neet-header">
        <div className="neet-header-inner">
          <Link href="/" className="neet-logo" aria-label="LURNEX home">
            <span className="neet-logo-mark"><span /><span /></span>
            <span><b>LURNEX</b><small>Learn. Grow. Excel.</small></span>
          </Link>
          <nav className="neet-nav" aria-label="Primary navigation">
            {nav.map(([label, href]) => (
              <Link key={label} href={href} className={label === "NEET" ? "active" : ""}>{label}</Link>
            ))}
          </nav>
          <div className="neet-header-tools">
            <div className="neet-search"><Search size={17} /><span>Search for courses, notes, tests...</span></div>
            <a href="tel:18001234567" className="neet-phone"><PhoneCall size={17} />1800-123-4567</a>
            <Link href="/contact" className="neet-header-cta">Talk to an Expert <ArrowRight size={15} /></Link>
          </div>
        </div>
      </header>

      <main className="neet-shell">
        <div className="neet-breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} /><span>NEET</span></div>

        <div className="neet-layout">
          <aside className="neet-left-column">
            <div className="neet-side-card neet-side-nav">
              <div className="neet-side-heading"><GraduationCap size={22} /><strong>NEET</strong></div>
              <div className="neet-side-links">
                {sidebar.map((item) => (
                  <Link href={cmsHref(item)} key={item} className={item === "NEET UG" ? "selected" : ""}>
                    <ChevronRight size={14} />{item}
                  </Link>
                ))}
              </div>
            </div>

            <div className="neet-study-card">
              <span className="neet-free-pill">FREE</span>
              <h3>NEET Study Material</h3>
              <p>Chapter-wise notes,<br />PDFs, MCQs & more</p>
              <Link href={cmsHref("NEET Study Material")}>Download Now <ArrowRight size={15} /></Link>
              <div className="neet-book-stack" aria-hidden="true"><i /><i /><i /></div>
            </div>

            <div className="neet-guidance-card">
              <div className="neet-guidance-avatar"><UserRound size={30} /></div>
              <div><h3>Need Guidance?</h3><p>Talk to our NEET experts for personalised support.</p></div>
              <Link href="/contact">Talk to an Expert <ArrowRight size={15} /></Link>
              <small>Available 10 AM – 7 PM</small>
            </div>
          </aside>

          <section className="neet-center-column">
            <section className="neet-hero" id="overview">
              <div className="neet-hero-copy">
                <span className="neet-eyebrow">INDIA&apos;S TRUSTED NEET PREPARATION PROGRAM</span>
                <h1>NEET UG Preparation</h1>
                <p>Focused learning. Expert guidance. A step closer to your medical dreams.</p>
                <div className="neet-hero-benefits">
                  <span><UsersRound size={23} />Expert Faculty</span>
                  <span><ClipboardCheck size={23} />Structured Study Plan</span>
                  <span><UserRound size={23} />Personalised Mentorship</span>
                </div>
              </div>
              <div className="neet-hero-art">
                <div className="neet-hero-circle" />
                <Image src="/assets/images/lurnex_boy.png" alt="lurnex student preparing for NEET" fill priority sizes="430px" />
                <div className="neet-hero-note">Your<br />Medical Dream<br />Our Support</div>
                <span className="neet-hero-arrow"><ArrowRight size={18} /></span>
              </div>
            </section>

            <section className="neet-exam-row" id="exam-dates">
              <div className="neet-panel neet-exams-panel">
                <div className="neet-panel-head"><h2><CalendarDays size={22} />NEET Exam Dates 2025</h2><Link href={cmsHref("NEET Official Notice")}>View Official Notice <ArrowRight size={15} /></Link></div>
                <div className="neet-exam-cards">
                  <div className="neet-exam-card"><span className="neet-exam-icon green"><CalendarDays size={25} /></span><div><strong>NEET UG 2025</strong><p>Exam Date: <b>04 May 2025</b></p><small>Mode: Offline (Pen & Paper)</small></div><ChevronRight /></div>
                  <div className="neet-exam-card"><span className="neet-exam-icon purple"><CalendarDays size={25} /></span><div><strong>NEET PG 2025</strong><p>Exam Date: <b>15 June 2025</b></p><small>Mode: Computer Based Test</small></div><ChevronRight /></div>
                </div>
              </div>
              <div className="neet-panel neet-update-panel">
                <div className="neet-update-title"><Bell size={23} /><h3>Stay Updated</h3></div>
                <p>Get notified about exam dates,<br />admit cards, results and more.</p>
                <div className="neet-email"><span>Enter your email address</span><button aria-label="Subscribe"><ArrowRight size={18} /></button></div>
              </div>
            </section>

            <section className="neet-panel neet-resources-panel" id="resources">
              <SectionTitle icon={BookOpen} title="Explore NEET UG Resources" subtitle="Everything you need for NEET preparation, all in one place." action="View All Resources" />
              <div className="neet-resource-grid">{resources.map((r) => <ResourceCard key={r.title} {...r} />)}</div>
            </section>

            <section className="neet-middle-grid">
              <div className="neet-panel neet-subject-panel" id="subjects">
                <SectionTitle icon={BookOpen} title="Subject-wise Study Material" />
                <div className="neet-subject-grid">
                  {subjects.map(({ title, text, icon: Icon, tone }) => (
                    <Link href={cmsHref(`${title} NEET Study Material`)} className="neet-subject-card" key={title}>
                      <span className={`neet-subject-icon ${tone}`}><Icon size={25} /></span>
                      <strong>{title}</strong><small>{text}</small>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="neet-panel neet-books-panel" id="books">
                <SectionTitle icon={BookOpen} title="Most Important Books for NEET" action="View Book List" />
                <div className="neet-books-row">
                  <button className="neet-carousel-arrow" aria-label="Previous"><ChevronRight size={18} className="rotate-180" /></button>
                  {books.map(([title, subtitle, color], i) => (
                    <div className="neet-book-item" key={`${title}-${i}`}>
                      <div className="neet-book-cover" style={{ background: color }}><b>{title}</b><span>{subtitle.replace(/[()]/g, "")}</span><em>{i === 3 ? "TRUEMAN'S" : i === 4 ? "D.C. Pandey" : "NCERT"}</em></div>
                      <strong>{title}</strong><small>{subtitle}</small>
                    </div>
                  ))}
                  <button className="neet-carousel-arrow" aria-label="Next"><ChevronRight size={18} /></button>
                </div>
              </div>
            </section>

            <section className="neet-bottom-grid">
              <div className="neet-panel neet-colleges-panel" id="colleges">
                <SectionTitle icon={Building2} title="Top Medical Colleges" subtitle="Explore top government and private medical colleges in India." action="View All Colleges" />
                <div className="neet-college-grid">
                  {colleges.map(([name, city], i) => (
                    <Link href={cmsHref(name)} className="neet-college-card" key={name}>
                      <span className={`neet-college-logo c${i}`}><Building2 size={22} /></span>
                      <strong>{name}</strong><small>{city}</small>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="neet-panel neet-tools-panel">
                <SectionTitle icon={Wrench} title="NEET Preparation Tools" subtitle="Helpful tools to boost your preparation." />
                <div className="neet-tools-grid">
                  {tools.map(([name, text, Icon, tone]) => (
                    <Link href={cmsHref(name)} className="neet-tool-card" key={name}><span className={`neet-tool-icon ${tone}`}><Icon size={20} /></span><strong>{name}</strong><small>{text}</small></Link>
                  ))}
                </div>
              </div>
            </section>
          </section>

          <aside className="neet-right-column">
            <div className="neet-panel neet-quick-panel">
              <div className="neet-right-heading"><Link2 size={22} /><h2>Quick Links</h2></div>
              <div className="neet-quick-list">{quickLinks.map((item) => <Link href={cmsHref(item)} key={item}><span><ChevronRight size={12} />{item}</span><ChevronRight size={14} /></Link>)}</div>
              <Link href={cmsHref("NEET Resources")} className="neet-view-all">View All NEET Resources <ArrowRight size={16} /></Link>
            </div>

            <div className="neet-journey-card">
              <h2>Your Medical Journey<br /><b>Starts Here</b></h2>
              <ul>
                <li><CheckCircle2 />Concept Clarity</li>
                <li><CheckCircle2 />Practice & Analysis</li>
                <li><CheckCircle2 />Expert Mentorship</li>
                <li><CheckCircle2 />Consistent Improvement</li>
              </ul>
              <Link href={cmsHref("NEET Preparation")}>Start Learning Now <ArrowRight size={16} /></Link>
              <Stethoscope className="neet-stethoscope" size={98} strokeWidth={1.1} />
            </div>

            <div className="neet-doubt-card">
              <div className="neet-doubt-icon"><MessageCircle size={19} /></div>
              <h3>Have a Doubt?</h3>
              <p>Get instant answers from our<br />subject experts.</p>
              <Link href="/contact">Ask a Question <ArrowRight size={15} /></Link>
              <span className="neet-chat-bubble"><MessageCircle size={22} /></span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
