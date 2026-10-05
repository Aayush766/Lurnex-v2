import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { programs } from "@/lib/constants";

import "./TutoringSection.css";

export function TutoringSection() {
  return (
    <section className="tutoring-section">
      {/* Background Lighting & Grid Accent */}
      <div className="tutoring-bg-grid" aria-hidden="true" />
      <div className="tutoring-[#087FF5]-glow" aria-hidden="true" />

      <div className="tutoring-inner">

        {/* ================================================
            LEFT CONTENT
        ================================================= */}

        <div className="tutoring-left">
          
          {/* Top Pill Badge */}
          <div className="tutoring-badge">
            <Sparkles size={13} className="tutoring-badge-icon" />
            <span>One-On-One Tutoring</span>
          </div>

          <h2 className="tutoring-title">
            Live Tutoring for{" "}
            <span className="tutoring-title-gradient">
              Global Programs
            </span>
          </h2>

          <p className="tutoring-description">
            Get expert guidance, personalized learning paths, and real-time doubt resolution — anytime, anywhere.
          </p>

          {/* ==============================================
              ACTIONS + PROGRAMS
          =============================================== */}

          <div className="tutoring-controls">

            {/* Buttons */}
            <div className="tutoring-actions">
              <a href="/register" className="tutoring-register">
                <span>Register Now</span>
                <ArrowRight size={18} strokeWidth={2.5} className="tutoring-arrow-icon" />
              </a>

              <a href="/login" className="tutoring-login">
                Login
              </a>
            </div>

            {/* Programs */}
            <div className="tutoring-program-area">
              <div className="tutoring-program-heading">
                CHOOSE YOUR PROGRAM
              </div>

              <div className="tutoring-programs">
                {programs.map((program) => (
                  <span key={program} className="tutoring-program">
                    {program}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ================================================
            RIGHT VISUAL
        ================================================= */}

        <div className="tutoring-right">

          {/* Handwritten message */}
          <div className="tutoring-note">
            Personal Guidance
            <br />
            <span className="tutoring-note-sub">Real Growth</span>
          </div>

          {/* Curved arrow */}
          <svg
            className="tutoring-arrow"
            viewBox="0 0 120 100"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 8C10 39 30 58 62 64C82 68 94 76 97 89"
              stroke="#087FF5"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M87 79L98 90L108 80"
              stroke="#087FF5"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Background shapes */}
          <div className="tutoring-green-shape" />
          <div className="tutoring-blue-shape" />

          {/* Main tutoring image */}
          <Image
            src="/assets/images/ctaimage.png"
            alt="One-to-one live tutoring with Lurnex"
            width={1000}
            height={600}
            priority
            sizes="(max-width: 768px) 100vw, 520px"
            className="tutoring-image"
          />

          {/* Decorative dots */}
          <span className="tutoring-dot tutoring-dot-top" />
          <span className="tutoring-dot tutoring-dot-bottom" />

        </div>
      </div>
    </section>
  );
}