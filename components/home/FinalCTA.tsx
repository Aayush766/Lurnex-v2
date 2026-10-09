"use client";

import { FormEvent, useState } from "react";
import {
  Check,
  Send,
  User,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import "./FinalCTA.css";
import { learningApi } from "@/lib/api";
import { registrationCountries } from "@/lib/registration-data";
import { leadSourceFor } from "@/lib/lead-source";

type FormStatus = "idle" | "loading" | "success" | "error";

export function FinalCTA() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("error");
      return;
    }

    setStatus("loading");
    const data = new FormData(form);
    const dialCode = String(data.get("country"));
    const country = registrationCountries.find((item) => item.dialCode === dialCode)?.name || "Other";
    try {
      await learningApi.registerStudent({
        name: String(data.get("name")).trim(),
        email: String(data.get("email")).trim(),
        mobile: `${dialCode}${String(data.get("phone")).replace(/\D/g, "")}`,
        course: "Academic Guidance",
        grade: "Not specified",
        school: "Not provided",
        country,
        leadSource: leadSourceFor("Homepage counselling callback"),
        leadIntent: "Homepage Get Started form",
        registrationUrl: window.location.href,
        sourcePage: window.location.pathname,
        referrerUrl: document.referrer || null,
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="final-cta-section">
      <div className="final-cta-container">

        {/* Ambient Glows & Grid Accent */}
        <div className="cta-orb cta-orb-one" aria-hidden="true" />
        <div className="cta-orb cta-orb-two" aria-hidden="true" />
        <div className="cta-grid-pattern" aria-hidden="true" />

        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <div className="final-cta-left">

          <div className="final-cta-plane-wrap">
            <div className="final-cta-plane">
              <Send size={38} strokeWidth={2} />
            </div>

            <div className="final-cta-spark spark-one">
              <Sparkles size={12} />
            </div>

            <div className="final-cta-spark spark-two">
              <Sparkles size={9} />
            </div>
          </div>

          <div className="final-cta-copy">

            <div className="final-cta-eyebrow">
              <span className="eyebrow-dot" />
              <span>START YOUR JOURNEY</span>
            </div>

            <h2 className="final-cta-title">
              Ready to Start Your{" "}
              <span className="final-cta-gradient">Learning Journey?</span>
            </h2>

            <p className="final-cta-description">
              Join thousands of students worldwide who are achieving their academic goals with Lurnex.
            </p>

            <div className="final-cta-benefits">

              <div className="cta-benefit">
                <span className="benefit-icon">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>Free Counselling</span>
              </div>

              <div className="cta-benefit">
                <span className="benefit-icon">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>Personalised Plan</span>
              </div>

              <div className="cta-benefit">
                <span className="benefit-icon">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>No Obligation</span>
              </div>

            </div>

          </div>
        </div>


        {/* =====================================================
            FORM CARD
        ====================================================== */}

        <div className="final-cta-form-card">

          <div className="form-card-header">
            <div>
              <h3>Get Started Today</h3>
              <p>Tell us how we can help you.</p>
            </div>

            <div className="secure-badge">
              <ShieldCheck size={13} />
              <span>Secure</span>
            </div>
          </div>


          <form
            className="final-cta-form"
            onSubmit={submit}
            noValidate
          >

            {/* Name Field */}
            <div className="cta-field">
              <User
                className="cta-field-icon"
                size={18}
                strokeWidth={2}
              />
              <label htmlFor="cta-name" className="sr-only">
                Full Name
              </label>
              <input
                id="cta-name"
                name="name"
                type="text"
                required
                minLength={2}
                placeholder="Full Name"
              />
            </div>

            {/* Email Field */}
            <div className="cta-field">
              <Mail
                className="cta-field-icon"
                size={18}
                strokeWidth={2}
              />
              <label htmlFor="cta-email" className="sr-only">
                Email Address
              </label>
              <input
                id="cta-email"
                name="email"
                type="email"
                required
                placeholder="Email Address"
              />
            </div>

            {/* Phone Row */}
            <div className="cta-phone-row">
              <div className="cta-country">
                <span className="cta-flag">🇮🇳</span>
                <label htmlFor="cta-country" className="sr-only">
                  Country Code
                </label>
                <select
                  id="cta-country"
                  name="country"
                  defaultValue="+91"
                  aria-label="Country code"
                >
                  {registrationCountries.filter((item) => item.name !== "Other").map((item) => (
                    <option key={`${item.name}-${item.dialCode}`} value={item.dialCode}>{item.dialCode} · {item.name}</option>
                  ))}
                </select>
                <span className="cta-country-chevron">▾</span>
              </div>

              <div className="cta-field cta-mobile-field">
                <Phone
                  className="cta-field-icon"
                  size={18}
                  strokeWidth={2}
                />
                <label htmlFor="cta-phone" className="sr-only">
                  Mobile Number
                </label>
                <input
                  id="cta-phone"
                  name="phone"
                  type="tel"
                  required
                  pattern="[0-9 +()-]{7,}"
                  placeholder="Mobile Number"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`final-cta-submit ${status === "success" ? "submitted" : ""}`}
              disabled={status === "loading"}
            >
              <span>
                {status === "loading"
                  ? "Sending..."
                  : status === "success"
                  ? "Request Sent!"
                  : "Get Started Now"}
              </span>

              {status === "success" ? (
                <CheckCircle2 size={18} strokeWidth={2.5} />
              ) : (
                <ArrowRight
                  size={18}
                  strokeWidth={2.5}
                  className="cta-submit-arrow"
                />
              )}

              <span className="button-shine" />
            </button>

            {status === "error" && (
              <p className="final-cta-message error">
                Please enter valid details to proceed.
              </p>
            )}

            {status === "success" && (
              <p className="final-cta-message success">
                Thanks! We'll get back to you shortly.
              </p>
            )}

          </form>

        </div>


        {/* =====================================================
            RIGHT DECORATION
        ====================================================== */}

        <div className="final-cta-right">

          <div className="future-text">
            <span>Your</span>
            <strong>Future</strong>
            <strong>Starts Here</strong>
          </div>

          <div className="future-arrow" aria-hidden="true">
            ↙
          </div>

        </div>

      </div>
    </section>
  );
}
