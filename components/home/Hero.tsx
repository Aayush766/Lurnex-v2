import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  GraduationCap,
  Play,
  Trophy,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";

import "./Hero.css";
import { LeadCaptureButton } from "@/components/ui/LeadCaptureButton";

const features = [
  { text: "Live & Recorded Classes", color: "#087ff5" },
  { text: "Expert Faculty", color: "#06b6d4" },
  { text: "Personalised Learning", color: "#7c3aed" },
  { text: "Regular Tests & Analytics", color: "#10b981" },
];

export function Hero() {
  return (
    <section className="hero">
      {/* Background Glows */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-circle hero-bg-circle-left" />
        <div className="hero-bg-circle hero-bg-circle-right" />
        <div className="hero-bg-circle hero-bg-circle-bottom" />
      </div>

      <div className="hero-container">
        <div className="hero-grid">

          {/* LEFT CONTENT */}
          <div className="hero-content">

            <div className="hero-badge">
              <span className="hero-badge-icon">
                <Sparkles size={10} strokeWidth={2.5} />
              </span>
              <span>GLOBAL LEARNING EXCELLENCE</span>
            </div>

            <h1 className="hero-title">
              Learn Today,
              <br />
              Build a{" "}
              <span className="hero-gradient-text">
                Brighter Tomorrow
              </span>
            </h1>

            <p className="hero-description">
              Expert-led courses and personalised mentoring help students build confidence, master challenging subjects, and achieve academic milestones.
            </p>

            <div className="hero-features">
              {features.map((feature) => (
                <div className="hero-feature" key={feature.text}>
                  <span
                    className="hero-feature-icon"
                    style={{ backgroundColor: feature.color }}
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="hero-actions">
              <Link href="/courses" className="hero-btn hero-btn-primary">
                <span>Start Learning Now</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>

              <LeadCaptureButton course="Academic Guidance" title="Talk to a Lurnex Expert" className="hero-btn hero-btn-secondary" interestOptions={["Course selection advice", "Subject tutoring", "Assessment and study plan", "University guidance"]} gradeOptions={["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "Other"]}>
                <Phone size={18} strokeWidth={2.5} />
                <span>Talk to an Expert</span>
              </LeadCaptureButton>
            </div>

          </div>

          {/* CENTER STUDENT VISUAL */}
          <div className="hero-visual">
            <div className="hero-visual-card">

              {/* Floating micro-badges */}
              <div className="hero-floating-pill hero-pill-top">
                <div className="hero-pill-icon" style={{ background: "#f59e0b" }}>
                  <Star size={16} fill="#ffffff" />
                </div>
                <div className="hero-pill-text">
                  <strong>4.9 Star Rating</strong>
                  <span>From 10,000+ Reviews</span>
                </div>
              </div>

              <div className="hero-floating-pill hero-pill-bottom">
                <div className="hero-pill-icon" style={{ background: "#10b981" }}>
                  <GraduationCap size={16} />
                </div>
                <div className="hero-pill-text">
                  <strong>Top Performers</strong>
                  <span>95%+ Exam Score</span>
                </div>
              </div>

              <Image
                src="/assets/images/herogirl.png"
                alt="Student learning"
                width={880}
                height={880}
                priority
                sizes="(max-width: 1024px) 320px, 380px"
                className="hero-student"
              />

            </div>
          </div>

          {/* RIGHT STAT CARDS */}
          <div className="hero-stat-cards">

            <div className="hero-stat-card">
              <div className="hero-stat-icon hero-stat-icon-blue">
                <GraduationCap size={26} strokeWidth={2} />
              </div>
              <div>
                <div className="hero-stat-number">1,300+</div>
                <div className="hero-stat-label">Active Students</div>
              </div>
            </div>

            <div className="hero-stat-card">
              <div className="hero-stat-icon hero-stat-icon-orange">
                <Trophy size={26} strokeWidth={2} />
              </div>
              <div>
                <div className="hero-stat-number">95%+</div>
                <div className="hero-stat-label">Success Rate</div>
              </div>
            </div>

            <div className="hero-stat-card">
              <div className="hero-stat-icon hero-stat-icon-play">
                <Play size={20} fill="currentColor" />
              </div>
              <div>
                <div className="hero-stat-number">Live & Interactive</div>
                <div className="hero-stat-label">Daily Sessions</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
