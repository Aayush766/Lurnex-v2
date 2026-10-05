"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, BookOpen, Check, ChevronDown, CircleHelp, MessageCircle, Search, Send, Sparkles, ThumbsUp } from "lucide-react";
import "./forum.css";

type Question = {
  id?: number | string;
  askQuestion?: string;
  questionTitle?: string;
  cat?: string;
  curriculum?: string;
  grade?: string;
  subject?: string;
  topic?: string;
  subtopic?: string;
  userName?: string;
  createdAt?: string;
  answersCount?: number;
};
type Answer = { id?: number | string; questionId?: number | string; answer?: string; answerText?: string };

const curricula = ["SAT", "AP", "IGCSE", "IB", "JEE", "NEET", "CBSE", "Foundation"];
const gradesByCurriculum: Record<string, string[]> = {
  SAT: ["Grade 9", "Grade 10", "Grade 11", "Grade 12", "Other"], AP: ["Grade 9", "Grade 10", "Grade 11", "Grade 12", "Other"],
  IGCSE: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"], IB: ["Grade 11 (IB1)", "Grade 12 (IB2)"],
  JEE: ["Grade 11", "Grade 12", "Dropper", "Other"], NEET: ["Grade 11", "Grade 12", "Dropper", "Other"],
  CBSE: ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"], Foundation: ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"]
};
const subjectsByCurriculum: Record<string, string[]> = {
  SAT: ["Math", "Reading and Writing"], AP: ["Calculus AB", "Calculus BC", "Physics", "Biology", "Chemistry", "Computer Science", "Other"],
  IGCSE: ["Mathematics", "Physics", "Biology", "Chemistry", "Computer Science", "English", "Other"],
  IB: ["Math AA", "Math AI", "Physics", "Biology", "Chemistry", "Computer Science", "Economics", "Other"],
  JEE: ["Mathematics", "Physics", "Chemistry"], NEET: ["Physics", "Chemistry", "Biology"],
  CBSE: ["Mathematics", "Physics", "Biology", "Chemistry", "Computer Science", "English", "Other"], Foundation: ["Mathematics", "Science", "English", "Other"]
};
const topicSuggestions: Record<string, string[]> = {
  Mathematics: ["Algebra", "Calculus", "Geometry", "Trigonometry", "Statistics", "Other"], "Math AA": ["Algebra", "Functions", "Calculus", "Statistics", "Other"], "Math AI": ["Functions", "Calculus", "Statistics", "Modelling", "Other"],
  Physics: ["Mechanics", "Electricity and magnetism", "Waves", "Thermal physics", "Other"], Chemistry: ["Atomic structure", "Bonding", "Stoichiometry", "Organic chemistry", "Other"], Biology: ["Cells", "Genetics", "Ecology", "Human physiology", "Other"],
  "Computer Science": ["Programming", "Algorithms", "Data structures", "Other"]
};

const forumApi = () => (process.env.NEXT_PUBLIC_FORUM_API_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
function listFrom<T>(input: unknown, keys: string[]): T[] {
  let value: any = input;
  for (let i = 0; i < 4 && value && !Array.isArray(value); i++) {
    const key = keys.find((candidate) => Array.isArray(value[candidate]));
    if (key) return value[key] as T[];
    value = value.data ?? value.result;
  }
  return Array.isArray(value) ? value as T[] : [];
}
function authToken() { return typeof window === "undefined" ? null : localStorage.getItem("lumex_token"); }
function userIdFromToken(token: string | null) {
  try {
    const part = token?.split(".")[1];
    if (!part) return undefined;
    const claims = JSON.parse(atob(part.replace(/-/g, "+").replace(/_/g, "/")));
    const raw = claims.userId ?? claims.id ?? claims.sub;
    const id = Number(raw);
    return Number.isFinite(id) && id > 0 ? id : undefined;
  } catch { return undefined; }
}
function initials(name?: string) { return (name || "Student").split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase(); }

export function ForumPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"latest" | "unanswered" | "saved">("latest");
  const [saved, setSaved] = useState<string[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [curriculum, setCurriculum] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const loadForum = useCallback(async () => {
    setLoading(true); setLoadError("");
    const base = forumApi();
    if (!base) { setLoading(false); setLoadError("Forum service is not configured yet."); return; }
    try {
      const headers: Record<string, string> = { "X-Portal": "frontend" };
      const token = authToken(); if (token) headers.Authorization = `Bearer ${token.replace(/^Bearer\s+/i, "")}`;
      const [q, a] = await Promise.all([
        fetch(`${base}/v1/forum/questions`, { headers }), fetch(`${base}/v1/forum/answers`, { headers })
      ]);
      if (!q.ok || !a.ok) throw new Error("We couldn't load the forum right now. Please try again.");
      const [qData, aData] = await Promise.all([q.json(), a.json()]);
      setQuestions(listFrom<Question>(qData, ["questions", "items"]));
      setAnswers(listFrom<Answer>(aData, ["answers", "items"]));
    } catch (e) { setLoadError(e instanceof Error ? e.message : "We couldn't load the forum right now."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    const sync = () => setSignedIn(Boolean(authToken())); sync(); loadForum();
    try { setSaved(JSON.parse(localStorage.getItem("lurnex_forum_saved") || "[]")); } catch { setSaved([]); }
    window.addEventListener("lumex-auth-changed", sync);
    return () => window.removeEventListener("lumex-auth-changed", sync);
  }, [loadForum]);

  const visibleQuestions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return questions.filter((q) => {
      const id = String(q.id ?? "");
      const text = `${q.questionTitle ?? ""} ${q.askQuestion ?? ""} ${q.cat ?? ""} ${q.curriculum ?? ""} ${q.subject ?? ""} ${q.topic ?? ""}`.toLowerCase();
      if (query && !text.includes(query)) return false;
      if (tab === "saved" && !saved.includes(id)) return false;
      if (tab === "unanswered" && answers.some((a) => String(a.questionId) === id)) return false;
      return true;
    });
  }, [questions, answers, search, tab, saved]);
  const selected = questions.find((q) => String(q.id) === activeQuestion);
  const selectedAnswers = answers.filter((a) => String(a.questionId) === activeQuestion);

  const toggleSaved = (id: string) => setSaved((current) => {
    const next = current.includes(id) ? current.filter((value) => value !== id) : [...current, id];
    localStorage.setItem("lurnex_forum_saved", JSON.stringify(next)); return next;
  });
  const changeCurriculum = (value: string) => { setCurriculum(value); setGrade(""); setSubject(""); setTopic(""); };
  const changeGrade = (value: string) => { setGrade(value); setSubject(""); setTopic(""); };
  const changeSubject = (value: string) => { setSubject(value); setTopic(""); };

  const submitQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(""); setNotice("");
    const token = authToken(); if (!token) { setError("Please log in to post a question."); return; }
    if (!curriculum || !grade || !subject || !title.trim() || !details.trim()) { setError("Complete each step and add your question details."); return; }
    const base = forumApi(); if (!base) { setError("Forum service is not configured yet."); return; }
    setSubmitting(true);
    try {
      const payload = { userId: userIdFromToken(token), curriculum, grade, subject, topic: topic || undefined, subtopic: topic || undefined, cat: `${curriculum} · ${subject}`, questionTitle: title.trim(), askQuestion: details.trim() };
      const response = await fetch(`${base}/v1/forum/questions`, { method: "POST", headers: { "Content-Type": "application/json", "X-Portal": "frontend", Authorization: `Bearer ${token.replace(/^Bearer\s+/i, "")}` }, body: JSON.stringify(payload) });
      if (!response.ok) { const body = await response.json().catch(() => null); throw new Error(body?.message || "Your question couldn't be posted. Please try again."); }
      setNotice("Your question is live. The community can now help."); setCurriculum(""); setGrade(""); setSubject(""); setTopic(""); setTitle(""); setDetails(""); await loadForum();
    } catch (e) { setError(e instanceof Error ? e.message : "Your question couldn't be posted."); }
    finally { setSubmitting(false); }
  };

  return <main className="forum-shell">
    <div className="forum-wrap">
      <header className="forum-hero">
        <div><span className="forum-eyebrow"><Sparkles size={15}/> LURNEX STUDENT COMMUNITY</span><h1>Curiosity grows<br/><em>when we share it.</em></h1><p>Ask a question, compare approaches, and learn alongside students on the same academic journey.</p><div className="forum-proof"><span><MessageCircle size={16}/> Subject-focused help</span><span><BookOpen size={16}/> Across 8 curricula</span></div></div>
        <div className="forum-hero-art" aria-hidden="true"><div className="forum-orbit orbit-one"/><div className="forum-orbit orbit-two"/><div className="forum-art-card"><CircleHelp size={37}/><span>Ask. Learn.<br/>Grow together.</span><div className="forum-art-dots">•••</div></div><span className="forum-float float-a">∑</span><span className="forum-float float-b">?</span></div>
      </header>

      <section className="forum-compose" id="ask-question">
        <div className="forum-compose-heading"><div><span className="forum-step-label">YOUR QUESTION, IN CONTEXT</span><h2>What are you working through?</h2><p>A few details help the right students find your question.</p></div><span className="forum-compose-icon"><MessageCircle size={22}/></span></div>
        {signedIn ? <form className="forum-form" onSubmit={submitQuestion}>
          <div className="forum-flow-grid">
            <label><span><b>01</b> Curriculum</span><div className="forum-select-wrap"><select value={curriculum} onChange={(e) => changeCurriculum(e.target.value)} required><option value="">Choose curriculum</option>{curricula.map((c) => <option key={c}>{c}</option>)}</select><ChevronDown size={16}/></div></label>
            <label><span><b>02</b> Grade / level</span><div className="forum-select-wrap"><select value={grade} onChange={(e) => changeGrade(e.target.value)} disabled={!curriculum} required><option value="">{curriculum ? "Choose grade" : "Choose curriculum first"}</option>{(gradesByCurriculum[curriculum] || []).map((g) => <option key={g}>{g}</option>)}</select><ChevronDown size={16}/></div></label>
            <label><span><b>03</b> Subject</span><div className="forum-select-wrap"><select value={subject} onChange={(e) => changeSubject(e.target.value)} disabled={!grade} required><option value="">{grade ? "Choose subject" : "Choose grade first"}</option>{(subjectsByCurriculum[curriculum] || []).map((s) => <option key={s}>{s}</option>)}</select><ChevronDown size={16}/></div></label>
            <label><span><b>04</b> Topic <small>optional</small></span><div className="forum-select-wrap"><select value={topic} onChange={(e) => setTopic(e.target.value)} disabled={!subject}><option value="">Select a topic</option>{(topicSuggestions[subject] || ["Concept clarification", "Exam question", "Other"]).map((t) => <option key={t}>{t}</option>)}</select><ChevronDown size={16}/></div></label>
          </div>
          <label className="forum-field"><span>Question title</span><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. How do I approach integration by parts?" maxLength={180} required/></label>
          <label className="forum-field"><span>Explain what you need help with</span><textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Share what you tried, where you got stuck, and any relevant working..." rows={4} maxLength={5000} required/></label>
          {error && <p className="forum-message error" role="alert">{error}</p>}{notice && <p className="forum-message success" role="status"><Check size={16}/>{notice}</p>}
          <div className="forum-form-footer"><p>Be kind, specific, and avoid sharing personal information.</p><button className="forum-primary" disabled={submitting || !curriculum || !grade || !subject || !title.trim() || !details.trim()}>{submitting ? "Posting..." : <>Post question <Send size={16}/></>}</button></div>
        </form> : <div className="forum-signin"><div><strong>Join the discussion</strong><p>Log in to ask your question and get help from the student community.</p></div><Link href="/login?redirect=/forum" className="forum-primary">Log in to ask <ArrowRight size={16}/></Link></div>}
      </section>

      <section className="forum-community">
        <div className="forum-community-head"><div><span className="forum-step-label">COMMUNITY KNOWLEDGE</span><h2>Explore questions</h2></div><a href="#ask-question" className="forum-ask-link">Ask the community <ArrowRight size={16}/></a></div>
        <div className="forum-tools"><div className="forum-search"><Search size={18}/><input aria-label="Search questions" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search a subject, topic, or question"/></div><div className="forum-tabs" role="tablist" aria-label="Question filters"><button className={tab === "latest" ? "active" : ""} onClick={() => setTab("latest")}>Latest</button><button className={tab === "unanswered" ? "active" : ""} onClick={() => setTab("unanswered")}>Unanswered</button><button className={tab === "saved" ? "active" : ""} onClick={() => setTab("saved")}>Saved</button></div></div>
        {loading ? <div className="forum-empty">Loading the latest questions...</div> : loadError ? <div className="forum-empty forum-error">{loadError}<button onClick={loadForum}>Try again</button></div> : visibleQuestions.length === 0 ? <div className="forum-empty"><CircleHelp size={26}/><strong>{tab === "saved" ? "No saved questions yet" : "No questions found"}</strong><span>{tab === "saved" ? "Save a question to come back to it later." : "Be the first to start a helpful conversation."}</span></div> : <div className="forum-question-list">{visibleQuestions.map((q, index) => {
          const id = String(q.id ?? index); const questionAnswers = answers.filter((a) => String(a.questionId) === id); const isSaved = saved.includes(id);
          return <article className="forum-question" key={id}><button className="forum-question-main" onClick={() => setActiveQuestion(activeQuestion === id ? null : id)} aria-expanded={activeQuestion === id}><span className="forum-avatar">{initials(q.userName)}</span><span className="forum-question-copy"><span className="forum-tags">{q.curriculum || q.cat || "Student question"}{q.grade ? ` · ${q.grade}` : ""}{q.subject ? ` · ${q.subject}` : ""}</span><strong>{q.questionTitle || q.askQuestion || "Question"}</strong><span className="forum-question-preview">{q.questionTitle && q.askQuestion ? q.askQuestion : "Open this question to read the details."}</span><span className="forum-question-meta">{q.userName || "Lurnex student"}{q.createdAt ? ` · ${new Date(q.createdAt).toLocaleDateString()}` : ""}</span></span><span className="forum-answer-count"><MessageCircle size={16}/>{questionAnswers.length} {questionAnswers.length === 1 ? "answer" : "answers"}</span></button><button className={`forum-save ${isSaved ? "is-saved" : ""}`} aria-label={isSaved ? "Remove saved question" : "Save question"} onClick={() => toggleSaved(id)}><Bookmark size={17} fill={isSaved ? "currentColor" : "none"}/></button>
            {activeQuestion === id && <div className="forum-detail"><p>{q.askQuestion || "No additional question details."}</p>{q.topic && <span className="forum-detail-topic">Topic: {q.topic}</span>}<h3>Answers <span>{questionAnswers.length}</span></h3>{questionAnswers.length ? questionAnswers.map((answer, i) => <div className="forum-answer" key={answer.id ?? i}><span className="forum-avatar answer-avatar">L</span><p>{answer.answer || answer.answerText || "Answer"}</p></div>) : <p className="forum-no-answer">No answers yet. If you know this topic, help a fellow student out.</p>}{!signedIn && <Link href="/login?redirect=/forum" className="forum-detail-login">Log in to join the conversation <ArrowRight size={15}/></Link>}</div>}
          </article>;
        })}</div>}
      </section>
      <footer className="forum-footer-note"><ThumbsUp size={17}/><span>Good questions build a stronger community. Thanks for sharing what you're learning.</span></footer>
    </div>
  </main>;
}
