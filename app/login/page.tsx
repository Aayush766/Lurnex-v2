"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { learningApi } from "@/lib/api";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const result = await learningApi.login({ email: email.trim(), password });
      localStorage.setItem("lumex_token", result.token);
      localStorage.setItem("lumex_user", JSON.stringify(result.user));
      window.dispatchEvent(new Event("lumex-auth-changed"));
      const requested = new URLSearchParams(window.location.search).get("redirect");
      router.push(requested?.startsWith("/") && !requested.startsWith("//") ? requested : "/dashboard");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to log in."); }
    finally { setBusy(false); }
  };
  return <main className="min-h-[75vh] bg-[#F4FAFF] px-5 py-16"><section className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl"><Link href="/" className="text-sm font-bold text-[#087FF5]">← Back to lurnex</Link><h1 className="mt-8 text-3xl font-extrabold text-[#071B3A]">Welcome back</h1><p className="mt-2 text-sm text-slate-600">Log in to continue your learning journey.</p><form className="mt-7 grid gap-4" onSubmit={submit}><label className="grid gap-1 text-sm font-semibold">Email<input className="rounded-xl border border-slate-200 px-4 py-3 font-normal" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label className="grid gap-1 text-sm font-semibold">Password<input className="rounded-xl border border-slate-200 px-4 py-3 font-normal" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}/></label><Link className="text-right text-sm font-semibold text-[#087FF5]" href="/forgot-password">Forgot password?</Link>{error&&<p role="alert" className="text-sm text-red-600">{error}</p>}<button disabled={busy} className="rounded-xl bg-[#087FF5] px-5 py-3 font-bold text-white disabled:opacity-60">{busy?"Logging in…":"Log in"}</button></form><p className="mt-5 text-sm text-slate-600">New to lurnex? <Link className="font-bold text-[#087FF5]" href="/register">Create an account</Link></p></section></main>;
}
