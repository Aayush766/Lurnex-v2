"use client";

import { FormEvent, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Check, X } from "lucide-react";
import { learningApi } from "@/lib/api";
import { registrationCountries } from "@/lib/registration-data";
import { leadSourceFor } from "@/lib/lead-source";

export function LeadCaptureButton({ course, title, className, children, interestOptions, gradeOptions }: { course: string; title: string; className: string; children: ReactNode; interestOptions?: string[]; gradeOptions?: string[] }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [dialCode, setDialCode] = useState("+91");
  const [country, setCountry] = useState("India");
  const grades = gradeOptions ?? (course.toLowerCase().includes("foundation") ? ["Grade 8", "Grade 9", "Grade 10"] : course.toLowerCase().includes("cbse") ? ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"] : ["Grade 9", "Grade 10", "Grade 11", "Grade 12"]);
  const interests = interestOptions || (course.toLowerCase().includes("foundation") ? ["Foundation enrolment", "Mathematics", "Science", "Olympiad preparation", "Study plan and counselling"] : ["SAT preparation", "Practice and assessment", "Study resources", "University guidance"]);
  const [grade, setGrade] = useState(grades[0] || "");
  const [interest, setInterest] = useState(interests[0]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const data = new FormData(event.currentTarget);
    try {
      await learningApi.registerStudent({ name: String(data.get("name")).trim(), email: String(data.get("email")).trim(), mobile: `${dialCode}${String(data.get("mobile")).replace(/\D/g, "")}`, course: `${course} - ${interest}`, grade: grade || "Not specified", school: "Not provided", country, leadSource: leadSourceFor(title), leadIntent: title, registrationUrl: window.location.href, sourcePage: window.location.pathname, referrerUrl: document.referrer || null });
      setDone(true);
    } catch (e) { setError(e instanceof Error ? e.message : "We could not submit your details. Please try again."); }
    finally { setBusy(false); }
  }
  return <>
    <button type="button" className={className} onClick={() => { setOpen(true); setDone(false); }}>{children}</button>
    {open && createPortal(<div className="curriculum-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><section className="curriculum-lead-modal" role="dialog" aria-modal="true" aria-labelledby="sat-lead-title"><button className="curriculum-modal-close" type="button" onClick={() => setOpen(false)} aria-label="Close"><X size={20}/></button>{done ? <div className="curriculum-lead-success"><span><Check size={25}/></span><h2 id="sat-lead-title">Thanks — we’ll be in touch</h2><p>A LURNEX counsellor will contact you about {interest.toLowerCase()}.</p><button type="button" className="curriculum-blue-btn" onClick={() => setOpen(false)}>Done</button></div> : <><span className="curriculum-eyebrow">LURNEX · {course.toUpperCase()}</span><h2 id="sat-lead-title">{title}</h2><p>Tell us what you need and our counsellor will connect with you.</p><form onSubmit={submit} className="curriculum-lead-form"><label>What are you interested in?<select value={interest} onChange={(e) => setInterest(e.target.value)}>{interests.map((x) => <option key={x}>{x}</option>)}</select></label>{grades.length > 0 && <label>{course === "IB Diploma" ? "IB programme level" : course === "IGCSE Curriculum" ? "Cambridge programme level" : "Current grade"}<select value={grade} onChange={(e) => setGrade(e.target.value)}>{grades.map((x) => <option key={x}>{x}</option>)}</select></label>}<label>Your name<input name="name" autoComplete="name" required /></label><label>Email address<input name="email" type="email" autoComplete="email" required /></label><label>Mobile number<div className="curriculum-lead-phone"><select aria-label="Country code" value={dialCode} onChange={(e) => { setDialCode(e.target.value); setCountry(registrationCountries.find((x) => x.dialCode === e.target.value)?.name || "Other"); }}>{registrationCountries.map((x) => <option key={`${x.name}-${x.dialCode}`} value={x.dialCode}>{x.dialCode} · {x.name}</option>)}</select><input name="mobile" type="tel" autoComplete="tel-national" required /></div></label>{error && <p className="curriculum-lead-error" role="alert">{error}</p>}<button className="curriculum-blue-btn" disabled={busy}>{busy ? "Submitting..." : title.startsWith("Request download") ? "Request download" : "Request a call"}<ArrowRight size={16}/></button></form></>}</section></div>, document.body)}
  </>;
}
