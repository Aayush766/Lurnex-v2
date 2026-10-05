"use client";

import { useId, useState } from "react";
import {
  ChevronDown,
  CircleHelp,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { faqs } from "@/lib/constants";

import "./FAQ.css";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  const toggleFAQ = (index: number) => {
    setOpen((current) => (current === index ? null : index));
  };

  return (
    <section className="faq-section">
      {/* Ambient Background Accents */}
      <div className="faq-bg-dots" aria-hidden="true" />
      <div className="faq-bg-glow" aria-hidden="true" />

      <div className="faq-container">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="faq-header">

          <div className="faq-heading-group">

            <div className="faq-eyebrow">
              <Sparkles size={12} className="faq-eyebrow-icon" />
              <span>HAVE QUESTIONS?</span>
            </div>

            <h2 className="faq-title">
              Frequently Asked{" "}
              <span className="faq-title-gradient">Questions</span>
            </h2>

            <p className="faq-subtitle">
              Everything you need to know about our live programs, mentors, and structure.
            </p>

          </div>

          <button
            type="button"
            className="faq-view-all"
          >
            <span>View All FAQs</span>
            <ArrowRight
              size={15}
              strokeWidth={2.2}
              className="faq-arrow-icon"
            />
          </button>

        </div>


        {/* =====================================================
            FAQ GRID
        ====================================================== */}

        <div className="faq-grid">

          {faqs.map(([question, answer], index) => {
            const panelId = `${id}-faq-${index}`;
            const isOpen = open === index;

            return (
              <div
                key={question}
                className={`faq-item ${
                  isOpen ? "faq-item-open" : ""
                }`}
              >

                {/* Question Header */}
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleFAQ(index)}
                >

                  <span className="faq-question-content">

                    <span className="faq-icon">
                      <CircleHelp
                        size={17}
                        strokeWidth={2.2}
                      />
                    </span>

                    <span className="faq-question-text">
                      {question}
                    </span>

                  </span>

                  <span
                    className={`faq-chevron ${
                      isOpen ? "faq-chevron-open" : ""
                    }`}
                  >
                    <ChevronDown
                      size={16}
                      strokeWidth={2.2}
                    />
                  </span>

                </button>


                {/* Answer Accordion */}
                <div
                  id={panelId}
                  className={`faq-answer-wrapper ${
                    isOpen ? "faq-answer-open" : ""
                  }`}
                >
                  <div className="faq-answer">
                    <p>{answer}</p>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}