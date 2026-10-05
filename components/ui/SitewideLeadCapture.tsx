"use client";

import { usePathname } from "next/navigation";
import { LeadCaptureButton } from "@/components/ui/LeadCaptureButton";

const courseContexts: Array<{ match: string; course: string; interests: string[]; grades: string[] }> = [
  { match: "/courses/ib", course: "IB Diploma", interests: ["IB Diploma enrolment", "Mathematics AA HL", "Mathematics AI HL", "Physics HL", "Biology HL", "Chemistry HL", "Computer Science HL", "Internal Assessment", "Extended Essay / TOK"], grades: ["DP - 2", "DP - 1", "MYP - 5", "MYP - 4", "MYP - 3", "MYP - 2", "MYP - 1", "PYP - 5", "PYP - 4"] },
  { match: "/courses/ap", course: "Advanced Placement", interests: ["AP course enrolment", "AP Calculus", "AP Physics", "AP Chemistry", "AP Biology", "AP Computer Science"], grades: ["Grade 12", "Grade 11", "Grade 10", "Grade 9"] },
  { match: "/courses/cbse", course: "CBSE Curriculum", interests: ["CBSE course enrolment", "Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"] },
  { match: "/courses/foundation", course: "Foundation Courses", interests: ["Foundation enrolment", "Mathematics", "Science", "Olympiad preparation"], grades: ["Grade 8", "Grade 9", "Grade 10"] },
  { match: "/courses/sat", course: "SAT Prep", interests: ["SAT preparation", "Practice and assessment", "Study resources", "University guidance"], grades: [] },
  { match: "/courses/jee", course: "JEE Preparation", interests: ["JEE Main", "JEE Advanced", "Physics", "Chemistry", "Mathematics"], grades: ["Grade 11", "Grade 12", "Dropper"] },
  { match: "/courses/neet", course: "NEET Preparation", interests: ["NEET preparation", "Physics", "Chemistry", "Biology"], grades: ["Grade 11", "Grade 12", "Dropper"] },
  { match: "/courses/igcse", course: "IGCSE Curriculum", interests: ["Cambridge course enrolment", "Mathematics", "Physics", "Chemistry", "Biology", "English"], grades: ["AS & A Level", "IGCSE 10", "IGCSE 9", "Lower Secondary 8", "Lower Secondary 7", "Lower Secondary 6"] },
];

export function SitewideLeadCapture() {
  const pathname = usePathname() || "/";
  if (["/assessment", "/login", "/register"].some((path) => pathname === path || pathname.startsWith(`${path}/`))) return null;
  const context = courseContexts.find((item) => pathname === item.match || pathname.startsWith(`${item.match}/`));
  const course = context?.course || (pathname.startsWith("/courses") ? "Academic Programmes" : "Academic Guidance");
  return <div className="sitewide-lead-widget"><LeadCaptureButton course={course} title={`Request a free callback for ${course}`} className="sitewide-lead-button" interestOptions={context?.interests || ["Course selection advice", "Subject tutoring", "Assessment and study plan", "University guidance"]} gradeOptions={context?.grades || ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "Other"]}><span className="sitewide-lead-button-copy"><strong>Talk to our counsellor</strong><small>Get a free callback</small></span><span className="sitewide-lead-button-arrow" aria-hidden="true">→</span></LeadCaptureButton></div>;
}
