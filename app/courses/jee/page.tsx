import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bell,
  BookOpen,
  BookOpenCheck,
  CalendarDays,
  ChevronRight,
  Download,
  FileText,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  Link2,
  Menu,
  MessageCircle,
  NotebookTabs,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Phone,
} from "lucide-react";
import { siteUrl } from "@/lib/seo";
import { courseContentHref } from "@/lib/course-content-links";
import "./page.css";

export const metadata: Metadata = {
  title: "JEE Main & Advanced Preparation | Lurnex",
  description:
    "Prepare for JEE Main and JEE Advanced with structured study material, expert faculty and personalised academic guidance from Lurnex.",
  alternates: { canonical: "/courses/jee" },
  openGraph: {
    title: "JEE Main & Advanced Preparation | Lurnex",
    description:
      "Personalised JEE preparation with expert guidance, focused practice and structured resources.",
    url: `${siteUrl}/courses/jee`,
    type: "website",
  },
};

const navigation = [
  "Home", "Courses", "JEE", "NEET", "IB", "IGCSE", "SAT", "CBSE",
  "Foundation", "Resources", "Results", "About Us",
];

const sidebarLinks = [
  "JEE Overview", "JEE Main", "JEE Advanced", "IIT JEE Coaching", "IITs & NITs",
  "BITSAT", "Study Material", "Previous Year Papers", "Mock Tests", "Important Books",
  "Preparation Strategy", "Results & Cutoffs", "FAQs",
];

const quickLinks = [
  "JEE Main Overview", "JEE Main Syllabus", "JEE Main Question Papers", "JEE Main Cutoff",
  "JEE Main Rank Predictor", "JEE Main Important Books", "JEE Advanced Overview",
  "JEE Advanced Syllabus", "JEE Advanced Question Papers", "JEE Advanced Cutoff",
  "JEE Advanced Important Books", "JEE Preparation Tips",
];

type Resource = { title: string; description: string; icon: React.ElementType };

const mainResources: Resource[] = [
  { title: "Overview", description: "Exam pattern, eligibility, important dates", icon: BookOpen },
  { title: "Syllabus", description: "Topic-wise syllabus with weightage", icon: NotebookTabs },
  { title: "Study Material", description: "Notes, DPPs, formula sheets", icon: FileText },
  { title: "Previous Year Papers", description: "10+ years papers with solutions", icon: BookOpenCheck },
  { title: "Mock Tests", description: "Chapter-wise & full-length", icon: ShieldCheck },
  { title: "Important Books", description: "Recommended by experts", icon: BookOpen },
  { title: "Cutoff & Colleges", description: "Opening & closing ranks", icon: Trophy },
  { title: "Preparation Tips", description: "Expert strategies & time plan", icon: Lightbulb },
];

const advancedResources: Resource[] = [
  { title: "Overview", description: "Exam pattern & eligibility", icon: BookOpen },
  { title: "Syllabus", description: "Topic-wise advanced syllabus", icon: NotebookTabs },
  { title: "Previous Year Papers", description: "Papers with detailed solutions", icon: FileText },
  { title: "Study Material", description: "Advanced notes & problem sets", icon: BookOpenCheck },
  { title: "Mock Tests", description: "Full-length & topic tests", icon: ShieldCheck },
  { title: "Important Books", description: "Must-read books list", icon: BookOpen },
  { title: "Rank Predictor", description: "Estimate your rank", icon: Users },
  { title: "Preparation Strategy", description: "Subject-wise planning", icon: Target },
];

const downloads = [
  ["JEE Main Syllabus 2025", "PDF · 2.1 MB"],
  ["JEE Main Previous Papers", "PDF · 12.5 MB"],
  ["JEE Main Formula Sheet", "PDF · 1.8 MB"],
  ["JEE Advanced Syllabus", "PDF · 2.4 MB"],
  ["JEE Preparation Strategy", "PDF · 1.6 MB"],
] as const;

const programs = [
  { title: "IIT JEE", description: "Complete guide for IIT JEE aspirants", icon: GraduationCap },
  { title: "IIT JEE Coaching", description: "Live & online coaching by expert faculty", icon: Users },
  { title: "BITSAT", description: "Preparation resources for BITSAT", icon: CalendarDays },
];
const cmsHref = (label: string) => courseContentHref("jee", label);

function ResourceCard({ item }: { item: Resource }) {
  const Icon = item.icon;
  return (
    <Link href={cmsHref(item.title)} className="jee-resource-card">
      <span className="jee-resource-icon"><Icon size={18} strokeWidth={2} /></span>
      <span className="jee-resource-copy">
        <strong>{item.title}</strong>
        <small>{item.description}</small>
      </span>
      <ChevronRight className="resource-arrow" size={15} />
    </Link>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  subtitle,
  action,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  action?: string;
}) {
  return (
    <div className="jee-section-heading">
      <div className="jee-heading-left">
        <span className="jee-section-icon"><Icon size={17} /></span>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      {action ? (
        <Link href={cmsHref(action)} className="jee-view-link">
          {action}<ArrowRight size={14} />
        </Link>
      ) : null}
    </div>
  );
}

export default function CoursePage() {
  return (
    <main className="jee-page">
      <header className="jee-topbar">
        <Link href="/" className="jee-brand" aria-label="Lurnex home">
          <span className="jee-brand-mark" aria-hidden="true">
            <span className="book-page book-page-left" />
            <span className="book-page book-page-right" />
          </span>
          <span className="jee-brand-copy">
            <strong>LURNEX</strong>
            <small>Learn. Grow. Excel.</small>
          </span>
        </Link>

        <nav className="jee-main-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item} href={item === "JEE" ? "/courses/jee" : "#"} className={item === "JEE" ? "active" : ""}>
              {item}
            </Link>
          ))}
        </nav>

        <div className="jee-header-actions">
          <div className="jee-search" role="search">
            <Search size={15} aria-hidden="true" />
            <span>Search for courses, notes, tests...</span>
          </div>
          <a className="jee-phone" href="tel:18001234567">
            <Phone size={14} />
            <span>1800-123-4567</span>
          </a>
          <Link href="/register?program=jee" className="jee-expert-button">
            Talk to an Expert <ArrowRight size={14} />
          </Link>
          <button className="jee-mobile-menu" type="button" aria-label="Open navigation">
            <Menu size={20} />
          </button>
        </div>
      </header>

      <div className="jee-shell">
        <div className="jee-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><ChevronRight size={13} /><span>JEE</span>
        </div>

        <div className="jee-layout">
          <aside className="jee-left-sidebar" aria-label="JEE navigation">
            <section className="jee-side-menu">
              <h2><GraduationCap size={19} />JEE</h2>
              <nav>
                {sidebarLinks.map((item, index) => (
                  <Link href={cmsHref(item)} key={item} className={index === 1 ? "selected" : ""}>
                    <ChevronRight size={13} />{item}
                  </Link>
                ))}
              </nav>
            </section>

            <section className="jee-free-card">
              <span className="jee-free-badge">FREE</span>
              <h3>JEE Study Material</h3>
              <p>Chapter-wise notes, PYQs, tests &amp; more</p>
              <Link href={cmsHref("JEE Main Downloads")}>Download Now <ArrowRight size={14} /></Link>
              <div className="jee-book-stack" aria-hidden="true"><span /><span /><span /><span /></div>
            </section>

            <section className="jee-guidance-card">
              <div className="jee-guide-avatar"><Users size={22} /></div>
              <h3>Need Guidance?</h3>
              <p>Talk to our JEE experts for personalised support.</p>
              <Link href="/register?program=jee">Talk to an Expert <ArrowRight size={14} /></Link>
              <small>Available 10 AM – 7 PM</small>
            </section>
          </aside>

          <div className="jee-main">
            <section className="jee-hero" id="overview">
              <div className="hero-orbit hero-orbit-one" />
              <div className="hero-orbit hero-orbit-two" />
              <div className="jee-hero-copy">
                <span className="jee-eyebrow">INDIA&apos;S LEADING JEE PREPARATION PROGRAM</span>
                <h1>JEE Mains &amp; Advanced <span>Dream. Prepare. Achieve.</span></h1>
                <p>Comprehensive study material, expert faculty and personalised guidance for your path to IITs.</p>
                <div className="jee-hero-actions">
                  <Link href="/register?program=jee" className="jee-primary">Start Your JEE Journey <ArrowRight size={16} /></Link>
                  <Link href={cmsHref("JEE Brochure")} className="jee-secondary"><Download size={15} />Download Brochure</Link>
                </div>
              </div>

              <div className="jee-hero-visual" aria-hidden="true">
                <div className="jee-hero-image-frame">
                  <Image
                    src="/assets/images/lurnex_boy.png"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 760px) 80vw, 330px"
                    className="jee-hero-image"
                  />
                </div>
                <div className="jee-hero-note">Better<br />Students<br />Brighter<br />Futures</div>
              </div>

              <div className="jee-hero-stats">
                <div><span className="stat-icon blue"><Trophy size={18} /></span><span><b>1000+</b><small>IIT Selections</small></span></div>
                <div><span className="stat-icon orange"><GraduationCap size={18} /></span><span><b>15+</b><small>Years of Excellence</small></span></div>
                <div><span className="stat-icon green"><Sparkles size={18} /></span><span><b>4.8/5</b><small>Student Satisfaction</small></span></div>
              </div>
            </section>

            <section className="jee-exam-row" id="exam-dates">
              <div className="jee-exam-panel jee-card">
                <div className="jee-exam-heading">
                  <h2><CalendarDays size={18} />JEE Exam Dates (2025)</h2>
                  <Link href={cmsHref("JEE Official Notices")}>View Official Notices <ArrowRight size={13} /></Link>
                </div>
                <div className="jee-exam-cards">
                  <article className="jee-exam-card">
                    <span className="exam-icon blue"><GraduationCap size={19} /></span>
                    <div><strong>JEE Main 2025</strong><p>Session 1: <b>22 Jan – 31 Jan 2025</b></p><p>Session 2: <b>01 Apr – 08 Apr 2025</b></p></div>
                  </article>
                  <article className="jee-exam-card">
                    <span className="exam-icon orange"><Trophy size={19} /></span>
                    <div><strong>JEE Advanced 2025</strong><p>Exam Date: <b>18 May 2025</b></p><Link href={cmsHref("JEE Advanced Exam Details")}>View Details <ArrowRight size={13} /></Link></div>
                  </article>
                </div>
              </div>
              <div className="jee-update-card jee-card">
                <span className="update-icon"><Bell size={19} /></span>
                <div><h3>Stay Updated</h3><p>Get notified about exam dates, form releases, results and more.</p><form className="jee-email-form"><input type="email" placeholder="Enter your email address" aria-label="Email address" /><button type="button" aria-label="Subscribe"><ArrowRight size={16} /></button></form></div>
              </div>
            </section>

            <section className="jee-content-card jee-card" id="jee-main">
              <SectionHeading icon={BookOpen} title="Explore JEE Main Resources" subtitle="Everything you need to crack JEE Main – study material, tests, syllabus and more." action="View All Resources" />
              <div className="jee-resource-grid">{mainResources.map((item) => <ResourceCard key={item.title} item={item} />)}</div>
            </section>

            <section className="jee-content-card jee-card" id="jee-advanced">
              <SectionHeading icon={GraduationCap} title="Explore JEE Advanced Resources" subtitle="In-depth resources for JEE Advanced preparation." action="View All Resources" />
              <div className="jee-resource-grid">{advancedResources.map((item) => <ResourceCard key={item.title} item={item} />)}</div>
            </section>

            <section className="jee-content-card jee-card" id="practice">
              <SectionHeading icon={Sparkles} title="More JEE Programs" subtitle="Explore other engineering entrance exams and coaching programs." />
              <div className="jee-more-grid">
                {programs.map((item) => { const Icon = item.icon; return <Link href={cmsHref(item.title)} key={item.title} className="jee-more-card"><span><Icon size={20} /></span><div><strong>{item.title}</strong><small>{item.description}</small><b>Explore {item.title} <ArrowRight size={13} /></b></div></Link>; })}
              </div>
            </section>
          </div>

          <aside className="jee-right-sidebar" aria-label="JEE quick resources">
            <section className="jee-quick-card jee-card">
              <h2><Link2 size={17} />Quick Links</h2>
              {quickLinks.map((item) => <Link href={cmsHref(item)} key={item}><span>{item}</span><ChevronRight size={13} /></Link>)}
              <Link href={cmsHref("JEE Resources")} className="jee-rail-button">View All JEE Resources <ArrowRight size={14} /></Link>
            </section>

            <section className="jee-mentor-card jee-card">
              <div className="mentor-copy"><span className="mentor-spark"><Lightbulb size={17} /></span><h2>Personalised<br />JEE Mentorship</h2><p>Get a customised study plan, doubt support and regular performance analysis.</p><Link href="/register?program=jee">Talk to a Mentor <ArrowRight size={14} /></Link></div>
              <Image src="/avatars/avatar-1.jpg" alt="JEE mentor" width={140} height={140} className="mentor-image" />
            </section>

            <section className="jee-download-card jee-card" id="downloads">
              <h2><Download size={17} />Useful Downloads</h2>
              {downloads.map(([title, meta]) => <Link href={cmsHref(title)} key={title}><span className="pdf-icon">PDF</span><span><strong>{title}</strong><small>{meta}</small></span><Download size={14} /></Link>)}
              <Link href={cmsHref("JEE Downloads")} className="jee-rail-button">View All Downloads <ArrowRight size={14} /></Link>
            </section>

            <section className="jee-doubt-card jee-card">
              <span className="doubt-icon"><MessageCircle size={18} /></span>
              <div><h2>Have a Doubt?</h2><p>Get instant answers from our subject experts.</p><Link href="/contact">Ask a Question <ArrowRight size={14} /></Link></div>
              <span className="jee-chat-bubble"><MessageCircle size={20} /></span>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
