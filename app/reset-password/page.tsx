"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { learningApi } from "@/lib/api";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { setEmail(new URLSearchParams(window.location.search).get("email") || ""); }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try { await learningApi.resetPassword({ email: email.trim(), code: code.trim(), password }); setMessage("Your password has been updated. You can now log in."); setCode(""); setPassword(""); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to reset your password."); }
    finally { setBusy(false); }
  }
  return <main className="min-h-[75vh] bg-[#F4FAFF] px-5 py-16"><section className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl"><Link href="/forgot-password" className="text-sm font-bold text-[#087FF5]">Back</Link><h1 className="mt-8 text-3xl font-extrabold text-[#071B3A]">Choose a new password</h1><p className="mt-2 text-sm text-slate-600">Enter the email and reset code, then choose a new password.</p><form onSubmit={submit} className="mt-7 grid gap-4"><label className="grid gap-1 text-sm font-semibold">Email<input className="rounded-xl border border-slate-200 px-4 py-3 font-normal" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label className="grid gap-1 text-sm font-semibold">Reset code<input className="rounded-xl border border-slate-200 px-4 py-3 font-normal" autoComplete="one-time-code" required value={code} onChange={e=>setCode(e.target.value)}/></label><label className="grid gap-1 text-sm font-semibold">New password<input className="rounded-xl border border-slate-200 px-4 py-3 font-normal" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)}/></label>{error&&<p role="alert" className="text-sm text-red-600">{error}</p>}{message&&<p role="status" className="text-sm text-emerald-700">{message}</p>}<button disabled={busy} className="rounded-xl bg-[#087FF5] px-5 py-3 font-bold text-white disabled:opacity-60">{busy?"Updating…":"Update password"}</button></form>{message&&<Link href="/login" className="mt-5 block text-sm font-bold text-[#087FF5]">Go to login</Link>}</section></main>;
}
