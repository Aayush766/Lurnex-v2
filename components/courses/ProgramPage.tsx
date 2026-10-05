import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowRight, 
  Bell, 
  BookOpen, 
  CalendarDays, 
  Check, 
  ChevronRight, 
  ClipboardList, 
  GraduationCap, 
  Lightbulb, 
  MessageCircle, 
  NotebookTabs, 
  Sparkles,
  Target, 
  Users 
} from "lucide-react";
import { programBySlug } from "@/lib/programs";
import { LeadCaptureButton } from "@/components/ui/LeadCaptureButton";
import "./program-page.css";
import "./curriculum/curriculum-page.css";

type PageContent = {
  eyebrow: string; headline: string; headlineAccent?: string; intro: string; accent: string; tint: string; heroImage: string;
  nav: string[]; resources: { title: string; text: string; icon: "book" | "paper" | "test" | "tips" }[];
  extraTitle: string; extra: { title: string; text: string }[]; audience: string;
};

const content: Record<string, PageContent> = {
  jee: { 
    eyebrow: "ENGINEERING ENTRANCE PREPARATION", 
    headline: "JEE Main & Advanced", 
    headlineAccent: "Build your path to top engineering institutes.", 
    intro: "Prepare for JEE with structured Physics, Chemistry and Mathematics lessons, focused problem-solving practice, and individual academic guidance.", 
    accent: "#087cf5", 
    tint: "#edf6ff", 
    heroImage: "/assets/images/jee.png", 
    nav: ["Overview", "JEE Main", "JEE Advanced", "Subjects", "Study Resources", "FAQs"], 
    resources: [
      { title: "JEE Main syllabus", text: "Topic-wise subject coverage & weighting", icon: "book" }, 
      { title: "Previous year questions", text: "Practice with worked step-by-step solutions", icon: "paper" }, 
      { title: "Full mock tests", text: "Build exam speed and accuracy strategy", icon: "test" }, 
      { title: "Preparation strategy", text: "Tailored revision plan around your goals", icon: "tips" }
    ], 
    extraTitle: "Explore JEE pathways", 
    extra: [
      { title: "JEE Main", text: "Strengthen concepts, accuracy, and problem speed across Physics, Chemistry, and Mathematics." }, 
      { title: "JEE Advanced", text: "Develop multi-step analytical reasoning and confidence with challenging problems." }, 
      { title: "JEE Foundation", text: "Build strong school-level concepts for a confident start to competitive exams." }
    ], 
    audience: "Students preparing for JEE Main or Advanced, and learners wanting to strengthen core STEM foundations." 
  },
  neet: { 
    eyebrow: "MEDICAL ENTRANCE PREPARATION", 
    headline: "NEET UG Preparation", 
    headlineAccent: "Make every concept count towards your medical dream.", 
    intro: "Prepare for NEET with guided learning in Physics, Chemistry and Biology, regular topic practice, and a study plan shaped around your targets.", 
    accent: "#08a879", 
    tint: "#eaf9f5", 
    heroImage: "/assets/images/neet.png", 
    nav: ["Overview", "NEET UG", "Subjects", "Study Resources", "Preparation Plan", "FAQs"], 
    resources: [
      { title: "NEET syllabus", text: "High-yield topics broken down by subject", icon: "book" }, 
      { title: "Previous year papers", text: "Targeted question practice with key insights", icon: "paper" }, 
      { title: "Mock tests", text: "Evaluate speed and accuracy across topics", icon: "test" }, 
      { title: "Preparation tips", text: "Build a consistent daily revision routine", icon: "tips" }
    ], 
    extraTitle: "Explore NEET preparation", 
    extra: [
      { title: "Physics", text: "Build conceptual clarity and practise applying formulas to numerical problems." }, 
      { title: "Chemistry", text: "Master Physical, Organic, and Inorganic Chemistry with dedicated topic drills." }, 
      { title: "Biology", text: "Review Botany and Zoology concepts and strengthen recall through active testing." }
    ], 
    audience: "Learners preparing for the NEET UG medical entrance examination who seek structured guidance." 
  },
  sat: { 
    eyebrow: "GLOBAL UNIVERSITY ADMISSIONS", 
    headline: "SAT Preparation", 
    headlineAccent: "Unlock top global university offers.", 
    intro: "Build confidence for the Digital SAT with focused Reading, Writing, and Math practice, personalized feedback, and strategic score coaching.", 
    accent: "#6544e8", 
    tint: "#f3f0ff", 
    heroImage: "/assets/images/sat.png", 
    nav: ["Overview", "SAT Exam", "Digital SAT", "Study Resources", "Score Planning", "FAQs"], 
    resources: [
      { title: "SAT syllabus", text: "Understand the core skills tested on test day", icon: "book" }, 
      { title: "Practice questions", text: "Target specific skill areas for maximum growth", icon: "paper" }, 
      { title: "Digital SAT practice", text: "Get familiar with the Bluebook test format", icon: "test" }, 
      { title: "Score strategies", text: "Pacing techniques to maximize your total score", icon: "tips" }
    ], 
    extraTitle: "Explore SAT preparation", 
    extra: [
      { title: "Reading and Writing", text: "Practise reading comprehension, rhetoric, grammar rules, and expression of ideas." }, 
      { title: "Math", text: "Strengthen algebra, advanced math, problem-solving, and data analysis concepts." }, 
      { title: "Personalised score plan", text: "Use diagnostic testing to map out your target score timeline." }
    ], 
    audience: "Students planning to take the SAT as part of their global undergraduate admissions journey." 
  },
};

const renderIcon = (name: PageContent["resources"][number]["icon"]) => {
  switch (name) {
    case "book": return <BookOpen />;
    case "paper": return <NotebookTabs />;
    case "test": return <ClipboardList />;
    case "tips": return <Lightbulb />;
  }
};

const sectionFor = (label: string, isExam: boolean) => {
  const key = label.toLowerCase();
  if (key === "overview") return "overview";
  if (key.includes("faq")) return "faqs";
  if (key.includes("resource") || key.includes("download") || key.includes("material") || key.includes("book")) return "resources";
  if (key.includes("main") || key.includes("advanced") || key.includes("exam") || key.includes("digital sat") || key.includes("pathway")) return isExam ? "pathways" : "subjects";
  if (key.includes("plan") || key.includes("strategy") || key.includes("score") || key.includes("tip")) return "pathways";
  return "subjects";
};

export function ProgramPage({ slug }: { slug: string }) {
  const program = programBySlug(slug);
  if (!program) notFound();

  const detail = content[slug] ?? {
    eyebrow: "PERSONALISED ONLINE LEARNING", 
    headline: program.title, 
    headlineAccent: "Learn with a structured plan built for you.", 
    intro: program.description,
    accent: "#087cf5", 
    tint: "#edf6ff", 
    heroImage: program.image, 
    nav: ["Overview", "What we cover", "Learning approach", "FAQs"],
    resources: [
      { title: "Course overview", text: "Explore modules and learning goals", icon: "book" as const }, 
      { title: "Practice & revision", text: "Build mastery topic by topic", icon: "paper" as const }, 
      { title: "Progress tracking", text: "Regular evaluations along your journey", icon: "test" as const }, 
      { title: "Study planning", text: "Design a flexible and efficient schedule", icon: "tips" as const }
    ],
    extraTitle: "Explore the programme", 
    extra: program.focus.map((item) => ({ title: item.level, text: item.subjects })), 
    audience: `Students looking for tailored academic support with ${program.title}.`
  } satisfies PageContent;

  const firstName = slug.toUpperCase();
  const examPage = ["jee", "neet", "sat"].includes(slug);
  const leadSubjects = slug === "foundation" ? ["Foundation enrolment", "Mathematics", "Science", "Olympiad preparation", "Study plan and counselling"] : [`${program.title} enrolment`, ...program.focus.map((item) => item.level)];
  const leadGrades = slug === "foundation" ? ["Grade 8", "Grade 9", "Grade 10"] : ["jee", "neet"].includes(slug) ? ["Grade 11", "Grade 12", "Dropper"] : ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];

  const faqItems = [
    { q: `What does the ${program.title} programme cover?`, a: `${program.description} Lesson plans are customized around the student's current proficiency level and goals.` },
    { q: "How do I get started?", a: "Connect with our academic team to discuss your current level and goals. We'll match you with an expert mentor and customized study roadmap." },
    { q: "Can lessons fit around regular school hours?", a: "Yes, session schedules are flexible and can be customized based on your time zone and school commitments." },
  ];

  const courseSchema = { 
    "@context": "https://schema.org", 
    "@type": "Course", 
    name: program.title, 
    description: program.description, 
    provider: { "@type": "Organization", name: "lurnex", url: "https://lurnex.me" }, 
    url: `https://lurnex.me/courses/${slug}` 
  };

  const breadcrumbSchema = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lurnex.me" }, 
      { "@type": "ListItem", position: 2, name: "Courses", item: "https://lurnex.me/courses" }, 
      { "@type": "ListItem", position: 3, name: program.title, item: `https://lurnex.me/courses/${slug}` }
    ] 
  };

  return (
    <main className="program-page" style={{ "--program-accent": detail.accent, "--program-tint": detail.tint } as React.CSSProperties}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      
      {/* Breadcrumbs */}
      <div className="program-breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={13}/>
        <Link href="/courses">Courses</Link>
        <ChevronRight size={13}/>
        <span>{firstName}</span>
      </div>

      <div className="program-layout">
        
        {/* Left Sticky Navigation */}
        <aside className="program-sidebar">
          <h2><GraduationCap size={20}/>{firstName}</h2>
          <nav aria-label={`${program.title} page navigation`}>
            {detail.nav.map((item, i) => (
              <a key={item} href={`#${sectionFor(item, examPage)}`} className={i === 0 ? "selected" : ""}>
                <ChevronRight size={13}/>
                {item}
              </a>
            ))}
          </nav>

          <div className="sidebar-promo">
            <span className="promo-tag"><Sparkles size={11} /> LEARN WITH LURNEX</span>
            <b>{program.title}</b>
            <p>Get a personalized academic plan tailored to your target scores.</p>
            <LeadCaptureButton course={program.title} title={`Talk to a ${program.title} expert`} className="sidebar-promo-btn" interestOptions={leadSubjects} gradeOptions={leadGrades}>
              Talk to an expert <ArrowRight size={14}/>
            </LeadCaptureButton>
          </div>
        </aside>

        {/* Main Content Body */}
        <div className="program-main">
          
          {/* Hero Banner */}
          <section className="program-hero" id="overview">
            <div className="hero-text">
              <span className="program-eyebrow">{detail.eyebrow}</span>
              <h1>
                {detail.headline}
                <span className="headline-accent">{detail.headlineAccent}</span>
              </h1>
              <p>{detail.intro}</p>

              <div className="hero-actions">
                <LeadCaptureButton course={program.title} title={`Enquire about ${program.title}`} className="primary-action" interestOptions={leadSubjects} gradeOptions={leadGrades}>Request a learning plan <ArrowRight size={16}/></LeadCaptureButton>
                <a href="#resources" className="secondary-action">
                  <BookOpen size={16}/> Explore resources
                </a>
              </div>

              <div className="hero-benefits">
                <span><Users size={16} /> 1-on-1 Personalised Guidance</span>
                <span><Target size={16} /> Goal-Driven Learning</span>
                <span><Check size={16} /> Structured Progress Reviews</span>
              </div>
            </div>

            <div className="hero-art">
              <img src={detail.heroImage} alt={`${program.title} learning programme`} />
            </div>
          </section>

          {/* Exam Roadmap Banner */}
          {examPage && (
            <section className="exam-strip">
              <div className="strip-title">
                <CalendarDays size={22}/>
                <div>
                  <h2>{slug === "sat" ? "Plan your SAT schedule" : `${firstName} preparation roadmap`}</h2>
                  <p>Build a realistic study plan around key exam dates.</p>
                </div>
              </div>

              <div className="exam-cards">
                <div className="exam-card-item">
                  <span className="date-icon"><CalendarDays size={18}/></span>
                  <div>
                    <b>Know your key dates</b>
                    <p>Track test deadlines and official exam windows.</p>
                  </div>
                  <a href={slug === "sat" ? "https://satsuite.collegeboard.org/sat/dates-deadlines" : slug === "jee" ? "https://jeemain.nta.nic.in/" : "https://exams.nta.ac.in/NEET/"} target="_blank" rel="noreferrer">
                    Official updates <ArrowRight size={13}/>
                  </a>
                </div>

                <div className="exam-card-item">
                  <span className="date-icon alt"><Bell size={18}/></span>
                  <div>
                    <b>Consistent preparation</b>
                    <p>Convert your targets into structured weekly goals.</p>
                  </div>
                  <LeadCaptureButton course={program.title} title={`Enquire about ${program.title}`} className="exam-card-action" interestOptions={leadSubjects} gradeOptions={leadGrades}>
                    Get academic advice <ArrowRight size={13}/>
                  </LeadCaptureButton>
                </div>
              </div>
            </section>
          )}

          {/* Resources */}
          <section className="resource-section" id="resources">
            <div className="section-heading">
              <div>
                <span className="section-icon"><BookOpen size={18}/></span>
                <div>
                  <h2>Explore {program.title} resources</h2>
                  <p>Focused materials to boost every phase of your preparation.</p>
                </div>
              </div>
              <Link href="/courses">All courses <ArrowRight size={14}/></Link>
            </div>

            <div className="resource-grid">
              {detail.resources.map((item) => (
                <a className="resource-card" href="#subjects" key={item.title}>
                  <span className="resource-icon">{renderIcon(item.icon)}</span>
                  <span className="resource-info">
                    <b>{item.title}</b>
                    <small>{item.text}</small>
                  </span>
                  <ChevronRight className="resource-arrow" size={15}/>
                </a>
              ))}
            </div>
          </section>

          {/* Core Modules & Support Grid */}
          <div className="program-columns">
            <section className="subject-section" id="subjects">
              <div className="section-heading">
                <div>
                  <span className="section-icon"><NotebookTabs size={18}/></span>
                  <div>
                    <h2>{slug === "sat" ? "SAT Sections" : `${program.title} Subjects`}</h2>
                    <p>Core focus areas in your learning roadmap.</p>
                  </div>
                </div>
              </div>

              <div className="subject-list">
                {program.focus.map((item, i) => (
                  <article key={item.level}>
                    <span className={`subject-number n${(i % 3) + 1}`}>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{item.level}</h3>
                      <p>{item.subjects}</p>
                    </div>
                    <ChevronRight size={15}/>
                  </article>
                ))}
              </div>

              <LeadCaptureButton course={program.title} title={`Talk to a ${program.title} counsellor`} className="text-action" interestOptions={leadSubjects} gradeOptions={leadGrades}>
                Discuss your learning targets <ArrowRight size={14}/>
              </LeadCaptureButton>
            </section>

            <section className="books-section">
              <div className="section-heading">
                <div>
                  <span className="section-icon"><Target size={18}/></span>
                  <div>
                    <h2>How Lurnex supports you</h2>
                    <p>Dedicated coaching through every step of learning.</p>
                  </div>
                </div>
              </div>

              <div className="support-list">
                {program.highlights.map((item) => (
                  <article key={item.title}>
                    <span className="check-badge"><Check size={13}/></span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="audience-note">
                <Users size={18}/>
                <p>
                  <b>Who it’s for</b><br/>
                  {detail.audience}
                </p>
              </div>
            </section>
          </div>

          {/* Pathways Section */}
          <section className="pathway-section" id="pathways">
            <div className="section-heading">
              <div>
                <span className="section-icon"><GraduationCap size={18}/></span>
                <div>
                  <h2>{detail.extraTitle}</h2>
                  <p>Core areas tailored to your target proficiency level.</p>
                </div>
              </div>
            </div>

            <div className="pathway-grid">
              {detail.extra.map((item) => (
                <article key={item.title}>
                  <span><Check size={14}/></span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="faq-section" id="faqs">
            <div className="section-heading">
              <div>
                <span className="section-icon"><MessageCircle size={18}/></span>
                <div>
                  <h2>Frequently asked questions</h2>
                  <p>Everything you need to know before starting.</p>
                </div>
              </div>
            </div>

            <div className="faq-grid">
              {faqItems.map((item) => (
                <article key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Bottom Call to Action */}
          <section className="related-section">
            <div>
              <span className="cta-eyebrow">YOUR NEXT STEP</span>
              <h2>Ready to start your prep?</h2>
              <p>Speak with an academic counsellor to map out your personalized learning roadmap.</p>
            </div>
            <LeadCaptureButton course={program.title} title={`Enquire about ${program.title}`} className="cta-btn" interestOptions={leadSubjects} gradeOptions={leadGrades}>
              Request a free session <ArrowRight size={15}/>
            </LeadCaptureButton>
          </section>

        </div>

        {/* Right Sticky Rail */}
        <aside className="program-rail">
          <section className="quick-links">
            <h2><span><ArrowRight size={16}/></span> Quick navigation</h2>
            {detail.nav.slice(1).map((item) => (
              <a key={item} href={`#${sectionFor(item, examPage)}`}>
                {item}
                <ChevronRight size={14}/>
              </a>
            ))}
            <Link className="rail-all" href="/courses">
              Browse all courses <ArrowRight size={14}/>
            </Link>
          </section>

          <section className="rail-cta">
            <span className="rail-symbol"><Lightbulb size={20}/></span>
            <h2>Your learning journey starts here.</h2>
            <ul>
              {["Customized learning plan", "Targeted subject coaching", "Regular performance checks"].map((x) => (
                <li key={x}><Check size={12}/>{x}</li>
              ))}
            </ul>
            <LeadCaptureButton course={program.title} title={`Talk to a ${program.title} expert`} className="rail-cta-btn" interestOptions={leadSubjects} gradeOptions={leadGrades}>
              Talk to an expert <ArrowRight size={14}/>
            </LeadCaptureButton>
          </section>

          <section className="rail-help">
            <MessageCircle size={22}/>
            <div>
              <h3>Have questions?</h3>
              <p>Our academic team is here to guide your study choices.</p>
              <Link href="/contact">Contact Lurnex <ArrowRight size={13}/></Link>
            </div>
          </section>
        </aside>

      </div>
    </main>
  );
}
