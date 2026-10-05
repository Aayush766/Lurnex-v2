"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { learningApi } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try { await learningApi.requestPasswordReset({ email: email.trim() }); setMessage("If an account matches that email, password reset instructions have been sent."); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to request a reset code."); }
    finally { setBusy(false); }
  }
  return <main className="min-h-[75vh] bg-[#F4FAFF] px-5 py-16"><section className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl"><Link href="/login" className="text-sm font-bold text-[#087FF5]">Back to login</Link><h1 className="mt-8 text-3xl font-extrabold text-[#071B3A]">Reset your password</h1><p className="mt-2 text-sm text-slate-600">Enter your account email. We’ll send a reset code if an account matches.</p><form onSubmit={submit} className="mt-7 grid gap-4"><label className="grid gap-1 text-sm font-semibold">Email<input className="rounded-xl border border-slate-200 px-4 py-3 font-normal" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label>{error&&<p role="alert" className="text-sm text-red-600">{error}</p>}{message&&<p role="status" className="text-sm text-emerald-700">{message}</p>}<button disabled={busy} className="rounded-xl bg-[#087FF5] px-5 py-3 font-bold text-white disabled:opacity-60">{busy?"Sending…":"Send reset code"}</button></form><p className="mt-5 text-sm text-slate-600">Received a code? <Link className="font-bold text-[#087FF5]" href={`/reset-password${email?`?email=${encodeURIComponent(email)}`:""}`}>Set a new password</Link></p></section></main>;
}
