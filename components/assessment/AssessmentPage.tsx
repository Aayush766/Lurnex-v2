"use client";

import { FormEvent, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle, ArrowRight, BarChart3, Bookmark, CalendarDays, Check, CheckCircle2, ChevronLeft, ChevronRight, Clock3, FileText, GraduationCap, LoaderCircle, Mail, Phone, Target, XCircle } from "lucide-react";
import { LeadSource } from "@/lib/lead-source";

const API = (process.env.NEXT_PUBLIC_API_URL || "https://lurnex-me-server.onrender.com/api").replace(/\/$/, "");
const fields = ["name", "grade", "previousGrade", "school", "address", "city", "country", "mobile", "email", "parentEmail"] as const;
type Candidate = Record<(typeof fields)[number], string>;
type Question = { id: string; questionText: string; options: string[]; subject?: string; correctAnswer?: string };
type Assessment = { duration: number; questions: Question[] };
type Session = { token: string; attemptId: string };
type Result = { percentage: number; score: number; totalMarks: number; strengths?: string[]; weaknesses?: string[]; subjectAnalysis?: { subject: string; percentage: number }[]; correctAnswers?: Record<string, string> };
type Stage = "profile" | "instructions" | "quiz" | "review" | "result";
const blankCandidate: Candidate = { name: "", grade: "", previousGrade: "", school: "", address: "", city: "", country: "", mobile: "", email: "", parentEmail: "" };
const grades = ["5", "6", "7", "8", "9", "10", "11", "12"];
const countryCodes = [{ code: "+91", country: "India" }, { code: "+1", country: "USA / Canada" }, { code: "+44", country: "United Kingdom" }, { code: "+971", country: "UAE" }, { code: "+61", country: "Australia" }, { code: "+65", country: "Singapore" }];
const curricula = ["IB", "Cambridge", "APs", "SAT", "JEE", "NEET", "Foundation", "CBSE", "ICSE/ISC"];

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const response = await fetch(`${API}${path}`, { ...init, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data as T;
}

export default function AssessmentPage() {
  const [stage, setStage] = useState<Stage>("profile");
  const [candidate, setCandidate] = useState<Candidate>(blankCandidate);
  const [countryCode, setCountryCode] = useState("+91");
  const [session, setSession] = useState<Session | null>(null);
  const [quiz, setQuiz] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [preferredSlot, setPreferredSlot] = useState("");
  const [slotConfirmed, setSlotConfirmed] = useState(false);
  const [warnings, setWarnings] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${session?.token || ""}` }), [session]);
  const time = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  const submit = useCallback(async () => {
    if (!session || loading) return;
    setLoading(true); setError("");
    try {
      const data = await api<Result>(`/assessments/public/${session.attemptId}/submit`, { method: "POST", headers: authHeaders, body: JSON.stringify({ answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({ questionId, selectedAnswer })) }) });
      setResult(data); setStage("result");
    } catch (e) { setError(e instanceof Error ? e.message : "We could not submit your answers. Please try again."); }
    finally { setLoading(false); }
  }, [answers, authHeaders, loading, session]);

  useEffect(() => {
    if ((stage !== "quiz" && stage !== "review") || secondsLeft <= 0) return;
    const timer = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [stage, secondsLeft]);
  useEffect(() => { if ((stage === "quiz" || stage === "review") && secondsLeft === 0) void submit(); }, [stage, secondsLeft, submit]);
  useEffect(() => {
    if (stage !== "quiz" && stage !== "review") return;
    const visibility = () => { if (document.hidden) setWarnings((n) => { const next = n + 1; if (next >= 3) void submit(); return next; }); };
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, [stage, submit]);

  const start = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const data = await api<{ token: string; attemptId: string; assessment: Assessment }>("/assessments/public/start", { method: "POST", body: JSON.stringify({ ...candidate, mobile: `${countryCode}${candidate.mobile.replace(/^\+/, "")}`, leadSource: LeadSource.ASSESSMENT_ENROLLMENT, leadIntent: "Academic readiness assessment", registrationUrl: window.location.href, sourcePage: window.location.pathname, referrerUrl: document.referrer || null }) });
      setSession({ token: data.token, attemptId: data.attemptId }); setQuiz(data.assessment); setSecondsLeft(data.assessment.duration * 60); setStage("instructions");
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to start your assessment. Please check your details."); }
    finally { setLoading(false); }
  };
  const bookSlot = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!session || !preferredSlot) return;
    setLoading(true); setError("");
    try { await api(`/assessments/public/${session.attemptId}/book-slot`, { method: "POST", headers: authHeaders, body: JSON.stringify({ preferredSlot, leadSource: LeadSource.COUNSELLING_REQUEST, leadIntent: "Assessment results counselling", registrationUrl: window.location.href, sourcePage: window.location.pathname, referrerUrl: document.referrer || null }) }); setSlotConfirmed(true); }
    catch (e) { setError(e instanceof Error ? e.message : "We could not book your preferred slot. Please try again."); }
    finally { setLoading(false); }
  };

  const shell = (children: ReactNode, wide = false) => <main className="assessment-page"><div className={`assessment-shell${wide ? " assessment-shell-wide" : ""}`}><Link href="/" className="assessment-logo"><Image src="/logo.png" alt="Lurnex home" width={120} height={42} priority /></Link>{children}</div></main>;

  if (stage === "profile") return <main className="assessment-page"><section className="assessment-profile">
    <div className="assessment-intro"><Link href="/"><Image src="/logo.png" alt="Lurnex home" width={124} height={46} priority /></Link><span className="assessment-kicker">ACADEMIC READINESS CHECK</span><h1>Discover how you learn best.</h1><p>Take a grade-appropriate diagnostic assessment and get a clearer picture of strengths, focus areas and next steps.</p><ul>{["Curriculum-matched question sets", "A detailed strengths and focus area review", "One-to-one counsellor guidance"].map((x) => <li key={x}><Check size={17} />{x}</li>)}</ul><div className="assessment-curricula"><small>CURRICULA WE COVER</small><div>{curricula.map((x) => <span key={x}>{x}</span>)}</div></div></div>
    <form className="assessment-form" onSubmit={start}><span className="assessment-kicker">PERSONALISED FOR YOUR LEARNER</span><h2>Start your assessment</h2><p>Share a few details to prepare the right question set.</p><div className="assessment-fields">{fields.map((field) => <label key={field} className={field === "address" ? "assessment-span-2" : ""}><span>{({ name: "Student name", grade: "Current grade", previousGrade: "Previous grade", school: "School", address: "Address", city: "City", country: "Country", mobile: "Mobile number", email: "Student email (optional)", parentEmail: "Parent email" } as Record<string, string>)[field]}</span>{field === "grade" || field === "previousGrade" ? <select required value={candidate[field]} onChange={(e) => setCandidate({ ...candidate, [field]: e.target.value })}><option value="">Select grade</option>{grades.map((g) => <option key={g} value={g}>Grade {g}</option>)}</select> : field === "mobile" ? <div className="assessment-phone"><select aria-label="Country calling code" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>{countryCodes.map((x) => <option key={x.code} value={x.code}>{x.code} {x.country}</option>)}</select><input required type="tel" value={candidate.mobile} onChange={(e) => setCandidate({ ...candidate, mobile: e.target.value })} placeholder="Enter mobile number" /></div> : <input required={field !== "email"} type={field === "email" || field === "parentEmail" ? "email" : "text"} value={candidate[field]} onChange={(e) => setCandidate({ ...candidate, [field]: e.target.value })} placeholder={field === "email" ? "Enter email (optional)" : `Enter ${field === "parentEmail" ? "parent email" : field}`} />}</label>)}</div>{error && <p className="assessment-error"><AlertCircle size={16}/>{error}</p>}<button className="assessment-primary" disabled={loading}>{loading ? <LoaderCircle className="assessment-spin" size={18}/> : <>Continue to instructions <ArrowRight size={18}/></>}</button><small className="assessment-consent">By proceeding, you agree to receive assessment and result discussion updates.</small></form>
  </section></main>;

  if (stage === "instructions" && quiz) return shell(<section className="assessment-card"><div className="assessment-card-top"><div><span className="assessment-kicker">READY WHEN YOU ARE</span><h1>Assessment instructions</h1><p>Please read these guidelines before starting.</p></div><span className="assessment-grade"><GraduationCap size={16}/> Grade {candidate.grade}</span></div><div className="assessment-facts"><div><Clock3/><small>Total duration</small><b>{quiz.duration} minutes</b></div><div><FileText/><small>Total questions</small><b>{quiz.questions.length} questions</b></div></div><ul className="assessment-guidelines">{["Ensure a stable internet connection during the test.", "You can mark questions for review and return before submitting.", "The assessment will submit automatically when time expires."].map((x) => <li key={x}><CheckCircle2 size={19}/>{x}</li>)}</ul>{error && <p className="assessment-error">{error}</p>}<button className="assessment-primary" onClick={() => { document.documentElement.requestFullscreen?.().catch(() => {}); setStage("quiz"); }}>Start assessment <ArrowRight size={18}/></button></section>);

  if ((stage === "quiz" || stage === "review") && quiz) {
    const question = quiz.questions[index];
    if (stage === "review") return shell(<section className="assessment-card"><span className="assessment-kicker">FINAL CHECK</span><h1>Review your answers</h1><p>Check answered and unanswered questions before submitting.</p><div className="assessment-facts"><div><CheckCircle2/><small>Answered</small><b>{Object.keys(answers).length}</b></div><div><FileText/><small>Unanswered</small><b>{quiz.questions.length - Object.keys(answers).length}</b></div><div><Bookmark/><small>Marked for review</small><b>{Object.values(marked).filter(Boolean).length}</b></div></div><div className="assessment-question-grid">{quiz.questions.map((q, i) => <button key={q.id} className={answers[q.id] ? "is-answered" : ""} onClick={() => { setIndex(i); setStage("quiz"); }}>{i + 1}</button>)}</div>{error && <p className="assessment-error">{error}</p>}<div className="assessment-actions"><button className="assessment-secondary" onClick={() => setStage("quiz")}>Back to quiz</button><button className="assessment-primary" disabled={loading} onClick={() => void submit()}>{loading ? "Submitting…" : "Submit assessment"}<ArrowRight size={17}/></button></div></section>);
    if (!question) return shell(<section className="assessment-card"><h1>Assessment unavailable</h1><p>This assessment does not contain any questions. Please contact our team.</p><Link href="/contact" className="assessment-primary">Contact us <ArrowRight size={17}/></Link></section>);
    const progress = Math.round((Object.keys(answers).length / quiz.questions.length) * 100);
    return <main className="assessment-quiz-page">{warnings > 0 && <div className="assessment-warning">Please stay on the assessment page. Warning {warnings}/3.</div>}<header className="assessment-quiz-header"><Link href="/"><Image src="/logo.png" alt="Lurnex home" width={112} height={40}/></Link><div><b>Academic Readiness Assessment</b><small>Grade {candidate.grade} · {quiz.questions.length} questions</small></div><span><Clock3 size={17}/>{time}</span></header><div className="assessment-quiz-layout"><aside className="assessment-question-nav"><span className="assessment-kicker">YOUR PROGRESS</span><h2>Question {index + 1} of {quiz.questions.length}</h2><div className="assessment-progress"><span style={{ width: `${((index + 1) / quiz.questions.length) * 100}%` }}/></div><small>{progress}% answered</small><div className="assessment-question-grid">{quiz.questions.map((q, i) => <button key={q.id} className={`${i === index ? "is-current" : ""} ${answers[q.id] ? "is-answered" : ""} ${marked[q.id] ? "is-marked" : ""}`} onClick={() => setIndex(i)}>{i + 1}</button>)}</div><div className="assessment-help"><b>Need help?</b><p>Our support team is here for you.</p><button onClick={() => setSupportOpen(true)}>Contact support <ArrowRight size={14}/></button></div></aside><section className="assessment-question-area"><div className="assessment-question-meta"><span>Grade {candidate.grade}</span><span>{question.subject || "Assessment question"}</span></div><article className="assessment-question-card"><span className="assessment-kicker">QUESTION {index + 1}</span><h1>{question.questionText}</h1><div className="assessment-options">{question.options.map((option, i) => <button key={`${question.id}-${i}`} className={answers[question.id] === option ? "selected" : ""} onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))}><span>{String.fromCharCode(65 + i)}</span>{option}</button>)}</div><button className={`assessment-mark ${marked[question.id] ? "marked" : ""}`} onClick={() => setMarked((prev) => ({ ...prev, [question.id]: !prev[question.id] }))}><Bookmark size={16}/>{marked[question.id] ? "Marked for review" : "Mark for review"}</button></article><div className="assessment-actions"><button className="assessment-secondary" disabled={!index} onClick={() => setIndex(index - 1)}><ChevronLeft size={17}/> Previous</button><button className="assessment-primary" onClick={() => index === quiz.questions.length - 1 ? setStage("review") : setIndex(index + 1)}>{index === quiz.questions.length - 1 ? "Review answers" : "Next question"}<ChevronRight size={17}/></button></div></section><aside className="assessment-tips"><div><span className="assessment-kicker">ASSESSMENT DETAILS</span><p><b>{quiz.questions.length}</b><small>Questions</small></p><p><b>{question.subject || "Multiple subjects"}</b><small>Subject</small></p><p><b>Grade {candidate.grade}</b><small>Your level</small></p></div><div><b>Helpful tips</b><ul><li>Read each question carefully.</li><li>Mark questions to revisit.</li><li>Submit before time expires.</li></ul></div><div className="assessment-encouragement"><Target/><b>You&apos;ve got this!</b><small>Stay focused and do your best.</small></div></aside></div>{supportOpen && <div className="assessment-modal-backdrop"><section className="assessment-modal"><button className="assessment-modal-close" onClick={() => setSupportOpen(false)} aria-label="Close"><XCircle/></button><span className="assessment-kicker">WE’RE HERE TO HELP</span><h2>Contact support</h2><a href="mailto:support@lurnex.me"><Mail size={18}/>support@lurnex.me</a><a href="tel:+919990054003"><Phone size={18}/>+91 9990 054 003</a></section></div>}</main>;
  }

  if (stage === "result" && result) return shell(<section className="assessment-card assessment-result"><span className="assessment-success-icon"><CheckCircle2 size={32}/></span><span className="assessment-kicker">ASSESSMENT COMPLETE</span><h1>Thank you, {candidate.name}!</h1><p>Your assessment has been submitted. Choose a preferred time to discuss the results with an academic counsellor.</p><div className="assessment-score"><small>OVERALL SCORE</small><strong>{result.percentage}%</strong><span>{result.score} / {result.totalMarks} marks</span></div><div className="assessment-insights"><Insight title="Your strengths" items={result.strengths} /><Insight title="Focus areas" items={result.weaknesses} /></div>{result.subjectAnalysis?.length ? <div className="assessment-analysis"><h2><BarChart3 size={19}/> Subject-wise breakdown</h2>{result.subjectAnalysis.map((item) => <div key={item.subject}><span>{item.subject}</span><b>{item.percentage}%</b><i><span style={{ width: `${Math.max(0, Math.min(100, item.percentage))}%` }}/></i></div>)}</div> : null}<div className="assessment-detailed"><h2><FileText size={19}/> Answer review</h2>{quiz?.questions.map((q, i) => { const correct = result.correctAnswers?.[q.id] || q.correctAnswer; const good = answers[q.id] === correct; return <article key={q.id}><b>Q{i + 1}. {q.questionText}</b><span className={good ? "answer-good" : "answer-wrong"}>{good ? <CheckCircle2 size={15}/> : <XCircle size={15}/>} {good ? "Correct" : "Review this answer"}</span><p>Your answer: {answers[q.id] || "Not answered"}</p>{correct && <p>Correct answer: {correct}</p>}</article>; })}</div>{slotConfirmed ? <div className="assessment-confirmed"><CalendarDays/><b>Your preferred slot has been sent.</b><p>Our team will contact you to confirm the discussion.</p></div> : <form className="assessment-booking" onSubmit={bookSlot}><label>Preferred discussion date and time<input required type="datetime-local" min={new Date().toISOString().slice(0, 16)} value={preferredSlot} onChange={(e) => setPreferredSlot(e.target.value)}/></label>{error && <p className="assessment-error">{error}</p>}<button className="assessment-primary" disabled={loading}>{loading ? "Booking…" : "Book preferred slot"}<ArrowRight size={17}/></button></form>}<small className="assessment-report-note">Your performance report will be shared during the result discussion.</small><Link className="assessment-home-link" href="/">Return to home</Link></section>, true);

  return shell(<section className="assessment-card"><h1>Assessment unavailable</h1><p>Please refresh the page or contact our team for help.</p><Link className="assessment-home-link" href="/contact">Contact us</Link></section>);
}

function Insight({ title, items }: { title: string; items?: string[] }) { return <article><h2>{title}</h2>{items?.length ? <ul>{items.map((item) => <li key={item}><CheckCircle2 size={16}/>{item}</li>)}</ul> : <p>No clear areas identified in this session.</p>}</article>; }
