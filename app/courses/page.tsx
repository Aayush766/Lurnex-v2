"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Languages,
  LayoutGrid,
  Search,
  Sparkles,
  Target,
  Trophy,
  Users,
  MonitorPlay,
  Clock3,
  X,
  Compass,
  Check,
  Star,
} from "lucide-react";

import "./page.css";
import { LeadCaptureButton } from "@/components/ui/LeadCaptureButton";

type Category = "all" | "school" | "competitive" | "international";

type Course = {
  code: string;
  title: string;
  category: string;
  type: Category;
  description: string;
  image: string;
  href: string;
  icon: ReactNode;
  badge?: string;
  classes: string;
  mode: string;
  duration: string;
  subjects: string[];
  features: string[];
};

const courses: Course[] = [
  {
    code: "IB",
    title: "IB Diploma Program",
    category: "International",
    type: "international",
    description:
      "Globally recognized curriculum designed for ambitious, future-ready global learners.",
    image: "/assets/images/ibdiploma.png",
    href: "/courses/ib",
    icon: <Globe2 className="w-4 h-4" />,
    badge: "Global Choice",
    classes: "Grades 11–12",
    mode: "Live + Interactive",
    duration: "2 Years",
    subjects: ["Sciences", "Math HL", "Languages"],
    features: ["Critical Thinking & TOK", "EE Research Guidance", "Global Uni Prep"],
  },
  {
    code: "IGCSE",
    title: "IGCSE Curriculum",
    category: "International",
    type: "international",
    description:
      "Flexible Cambridge international curriculum building solid academic foundations.",
    image: "/assets/images/igcse.png",
    href: "/courses/igcse",
    icon: <BookOpen className="w-4 h-4" />,
    badge: "Popular",
    classes: "Grades 9–10",
    mode: "Live + Recorded",
    duration: "2 Years",
    subjects: ["Maths", "Sciences", "English"],
    features: ["Flexible Subject Choice", "Global Academic Readiness", "Top Uni Pathways"],
  },
  {
    code: "AP",
    title: "Advanced Placement",
    category: "International",
    type: "international",
    description:
      "Rigorous university-level courses designed to give high school students college credit.",
    image: "/assets/images/ap.png",
    href: "/courses/ap",
    icon: <GraduationCap className="w-4 h-4" />,
    badge: "Advanced",
    classes: "Grades 10–12",
    mode: "Live Mentorship",
    duration: "1 Year",
    subjects: ["Calculus BC", "Physics C", "Chemistry"],
    features: ["Earn College Credits", "Advanced Problem Solving", "Ivy League Prep"],
  },
  {
    code: "SAT",
    title: "Digital SAT Prep",
    category: "Competitive",
    type: "competitive",
    description:
      "Focused strategies and practice for top percentile scores in global admissions.",
    image: "/assets/images/sat.png",
    href: "/courses/sat",
    icon: <Target className="w-4 h-4" />,
    badge: "Top Rated",
    classes: "Grades 9–12",
    mode: "Live + Mock Tests",
    duration: "3–6 Months",
    subjects: ["Digital Reading", "Writing", "Maths"],
    features: ["Adaptive Practice Tests", "1500+ Score Strategy", "Personalized Review"],
  },
  {
    code: "CBSE",
    title: "CBSE Comprehensive",
    category: "School",
    type: "school",
    description:
      "Structured board exam preparation with deep conceptual clarity and practice.",
    image: "/assets/images/cbse.png",
    href: "/courses/cbse",
    icon: <BookOpen className="w-4 h-4" />,
    badge: "Board Exam",
    classes: "Classes 6–12",
    mode: "Live + Notes",
    duration: "1 Academic Year",
    subjects: ["Maths", "Science", "Social Science"],
    features: ["Board Exam Mastery", "NCERT Deep Dive", "Regular Assessment"],
  },
  {
    code: "NEET",
    title: "NEET Medical Prep",
    category: "Competitive",
    type: "competitive",
    description:
      "Comprehensive coaching for top ranks in medical entrance examinations.",
    image: "/assets/images/neet.png",
    href: "/courses/neet",
    icon: <Target className="w-4 h-4" />,
    badge: "Medical",
    classes: "Classes 9–12",
    mode: "Live + Test Series",
    duration: "1–4 Years",
    subjects: ["Physics", "Chemistry", "Biology"],
    features: ["NCERT Pattern Mastery", "10,000+ Question Bank", "Doctor Mentorship"],
  },
  {
    code: "FOUNDATION",
    title: "Junior Foundation",
    category: "School",
    type: "school",
    description:
      "Nurturing analytical thinking and core fundamentals for middle schoolers.",
    image: "/assets/images/foundation.png",
    href: "/courses/foundation",
    icon: <Sparkles className="w-4 h-4" />,
    badge: "Classes 6–10",
    classes: "Classes 6–10",
    mode: "Interactive Live",
    duration: "1 Academic Year",
    subjects: ["STEM Maths", "Physics & Chem", "Mental Ability"],
    features: ["Interactive Science Labs", "Olympiad Prep", "Logic Building"],
  },
  {
    code: "JEE",
    title: "JEE Mains & Advanced",
    category: "Competitive",
    type: "competitive",
    description:
      "Elite engineering entrance preparation led by top IITian educators.",
    image: "/assets/images/jee.png",
    href: "/courses/jee",
    icon: <Trophy className="w-4 h-4" />,
    badge: "Engineering",
    classes: "Classes 11–12",
    mode: "Live + All India Test",
    duration: "1–2 Years",
    subjects: ["Adv. Physics", "Physical Chem", "Higher Maths"],
    features: ["IITian Faculty Team", "Full Mock Test Series", "Rank Improvement Plan"],
  },
];

const filters = [
  {
    id: "all" as Category,
    label: "All Programs",
    icon: <LayoutGrid size={15} />,
  },
  {
    id: "school" as Category,
    label: "School Boards",
    icon: <BookOpen size={15} />,
  },
  {
    id: "competitive" as Category,
    label: "Competitive Exams",
    icon: <Trophy size={15} />,
  },
  {
    id: "international" as Category,
    label: "International",
    icon: <Globe2 size={15} />,
  },
];

const languages = [
  {
    name: "English",
    flag: "🇬🇧",
    subtitle: "Public Speaking & Writing",
    text: "Master confident articulation, persuasive writing, and global academic communication.",
  },
  {
    name: "Hindi",
    flag: "🇮🇳",
    subtitle: "Academic Mastery",
    text: "Build linguistic precision, literature depth, and confident expression.",
  },
  {
    name: "French",
    flag: "🇫🇷",
    subtitle: "Global Fluency",
    text: "Practical communication, grammar, and immersion for global opportunities.",
  },
];

export default function Courses() {
  const [filter, setFilter] = useState<Category>("all");
  const [search, setSearch] = useState("");

  const visibleCourses = useMemo(() => {
    const q = search.toLowerCase().trim();

    return courses.filter((course) => {
      const categoryMatch = filter === "all" || course.type === filter;

      const searchMatch =
        !q ||
        [
          course.code,
          course.title,
          course.category,
          course.description,
          course.classes,
          ...course.subjects,
          ...course.features,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);

      return categoryMatch && searchMatch;
    });
  }, [filter, search]);

  return (
    <main className="courses-page">
      {/* HERO SECTION */}
      <section className="courses-hero">
        <div className="courses-container">
          <div className="hero-content">
            <div className="hero-copy">
              <div className="hero-eyebrow">
                <Sparkles size={14} className="eyebrow-icon" />
                EXPLORE LURNEX PROGRAMS
              </div>

              <h1>
                Find Your <span>Perfect Course</span>
              </h1>

              <p>
                From school board excellence to competitive exams and global
                curriculums — experience world-class interactive learning tailored for you.
              </p>

              <div className="hero-points">
                <span>
                  <CheckCircle2 size={16} /> Expert Faculty
                </span>
                <span>
                  <CheckCircle2 size={16} /> Personalized Learning
                </span>
                <span>
                  <CheckCircle2 size={16} /> Global Curriculums
                </span>
              </div>
            </div>

            <div className="hero-search-area">
              <div className="hero-search">
                <Search size={19} className="search-icon" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search JEE, NEET, IB, SAT, CBSE..."
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    type="button"
                    className="clear-btn"
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="hero-stat">
                <div className="stat-badge">
                  <strong>08+</strong>
                </div>
                <div className="stat-text">
                  <span>Specialized</span>
                  <small>Programs</small>
                </div>
              </div>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="filter-bar">
            <div className="filter-label">
              <span>EXPLORE BY</span>
              <strong>Program Type</strong>
            </div>

            <div className="filter-buttons">
              {filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={filter === item.id ? "active" : ""}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            <Link href="/courses/languages" className="language-filter">
              <Languages size={16} />
              Languages
            </Link>
          </div>
        </div>
      </section>

      {/* COURSE LISTINGS SECTION */}
      <section className="courses-section">
        <div className="courses-container">
          <div className="section-header">
            <div>
              <span className="section-kicker">OUR COURSES</span>
              <h2>
                Learn. Prepare. <span>Achieve.</span>
              </h2>
              <p>Choose a program designed around your academic ambitions.</p>
            </div>

            <div className="result-count">
              <strong>{visibleCourses.length}</strong>
              <span>Available Programs</span>
            </div>
          </div>

          <div className="courses-grid">
            {visibleCourses.map((course) => (
              <article className="course-card" key={course.code}>
                <div className="card-image">
                  <img src={course.image} alt={course.title} loading="lazy" />
                  <span className={`card-category ${course.type}`}>
                    {course.category}
                  </span>
                  {course.badge && (
                    <span className="card-badge">{course.badge}</span>
                  )}
                </div>

                <div className="card-body">
                  <div className="card-heading">
                    <div>
                      <span className="course-code">{course.code}</span>
                      <h3>{course.title}</h3>
                    </div>
                    <div className="course-icon">{course.icon}</div>
                  </div>

                  <p className="card-description">{course.description}</p>

                  <div className="course-info">
                    <div title="Classes">
                      <Users size={14} />
                      <span>{course.classes}</span>
                    </div>
                    <div title="Mode">
                      <MonitorPlay size={14} />
                      <span>{course.mode}</span>
                    </div>
                    <div title="Duration">
                      <Clock3 size={14} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="subject-row">
                    {course.subjects.map((subject) => (
                      <span key={subject}>{subject}</span>
                    ))}
                  </div>

                  <div className="feature-list">
                    {course.features.map((feature) => (
                      <span key={feature}>
                        <Check size={13} className="check-icon" />
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Link href={course.href} className="explore-button">
                    <span>Explore Program</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {visibleCourses.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon-wrap">
                <Compass size={36} />
              </div>
              <h3>No courses matched your query</h3>
              <p>
                Try searching for keywords like "JEE", "NEET", "IB", "SAT", or
                "CBSE".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFilter("all");
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* QUICK CTA */}
      <section className="program-cta">
        <div className="courses-container">
          <div className="cta-box">
            <div className="cta-icon">
              <GraduationCap size={28} />
            </div>

            <div className="cta-text-content">
              <span className="cta-kicker">NEED ACADEMIC GUIDANCE?</span>
              <h2>Not sure which learning path fits your goals?</h2>
              <p>
                Schedule a 1-on-1 discovery session with our senior academic counselors.
              </p>
            </div>

            <LeadCaptureButton course="Academic Programmes" title="Talk to a Lurnex course counsellor" className="cta-button" interestOptions={["IB Diploma", "Advanced Placement", "SAT Prep", "CBSE Curriculum", "Foundation Courses", "JEE", "NEET"]} gradeOptions={["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "Other"]}>
              Talk to an Expert
              <ArrowRight size={16} />
            </LeadCaptureButton>
          </div>
        </div>
      </section>

      {/* LANGUAGES SECTION */}
      <section className="language-section">
        <div className="courses-container">
          <div className="language-inner">
            <div className="language-copy">
              <span className="lang-kicker">BILINGUAL EXCELLENCE</span>
              <h2>
                Master Languages.
                <br />
                <strong>Open Global Doors.</strong>
              </h2>
              <p>
                Develop real-world fluency, public speaking confidence, and international academic readiness.
              </p>
              <Link href="/courses/languages" className="lang-link">
                Explore All Language Courses
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="language-grid">
              {languages.map((language) => (
                <div className="language-card" key={language.name}>
                  <div className="lang-card-header">
                    <span className="language-flag">{language.flag}</span>
                    <div>
                      <h3>{language.name}</h3>
                      <span className="lang-sub">{language.subtitle}</span>
                    </div>
                  </div>

                  <p>{language.text}</p>

                  <div className="lang-footer">
                    <Star size={13} fill="#087cf5" color="#087cf5" />
                    <span>Expert Native Tutors</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
