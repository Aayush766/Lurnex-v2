"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { learningApi, type StudentDashboard } from "@/lib/api";

type DashboardItem = { id: string; title: string; createdAt: string; href?: string };

export default function DashboardPage() {
  const [data, setData] = useState<StudentDashboard | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    learningApi.getDashboard().then(setData).catch(reason => setError(reason instanceof Error ? reason.message : "Unable to load dashboard.")).finally(() => setLoading(false));
  }, []);
  if (loading) return <main className="container-shell min-h-[70vh] py-20">Loading your dashboard…</main>;
  if (error) return <main className="container-shell min-h-[70vh] py-20"><h1 className="text-3xl font-extrabold">Dashboard</h1><p role="alert" className="mt-4 text-slate-600">{error}</p><button onClick={() => window.location.reload()} className="mt-5 rounded-xl bg-[#087FF5] px-5 py-3 font-bold text-white">Try again</button></main>;
  const profile = data?.profile;
  const sections: Array<[string, DashboardItem[]]> = [
    ["Recent learning", (data?.activity || []).map(item => ({ ...item, href: item.href || "/assessment" }))],
    ["Recent downloads", (data?.downloads || []).map(item => ({ ...item, href: item.href || "#" }))],
    ["Your forum questions", (data?.forumQuestions || []).map(item => ({ ...item, href: item.href || "/forum" }))],
  ];
  const stats = [["Learning activity", data?.stats?.learningActivities ?? data?.activity?.length ?? 0], ["Downloads", data?.stats?.downloads ?? data?.downloads?.length ?? 0], ["Forum questions", data?.stats?.forumQuestions ?? data?.forumQuestions?.length ?? 0]] as const;
  return <main className="min-h-[75vh] bg-[#F4FAFF] py-12"><div className="container-shell"><header className="flex flex-wrap items-center gap-4 rounded-3xl bg-[#071B3A] p-7 text-white"><img src={profile?.avatarUrl || "/logo.png"} alt="" className="h-16 w-16 rounded-full bg-white object-cover p-1"/><div><p className="text-sm text-blue-200">LEARNER DASHBOARD</p><h1 className="mt-1 text-3xl font-extrabold text-white">Welcome, {profile?.name || "Learner"}</h1><p className="mt-1 text-sm text-blue-100">{profile?.curriculum || profile?.course} {profile?.grade && `· ${profile.grade}`}</p></div><Link href="/dashboard/profile" className="ml-auto rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#071B3A]">Edit profile</Link></header><div className="mt-6 grid gap-4 sm:grid-cols-3">{stats.map(([title,count])=><article key={title} className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{title}</p><strong className="mt-2 block text-3xl text-[#087FF5]">{count}</strong></article>)}</div><div className="mt-6 grid gap-5 lg:grid-cols-3">{sections.map(([title,items])=><section key={title} className="rounded-2xl bg-white p-5 shadow-sm"><h2 className="font-bold">{title}</h2><ul className="mt-3 grid gap-3">{items.length ? items.map(item=><li key={item.id}><Link href={item.href || "#"} className="text-sm font-semibold text-[#087FF5]">{item.title}</Link><time className="mt-1 block text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</time></li>) : <li className="text-sm text-slate-500">Nothing here yet.</li>}</ul></section>)}</div></div></main>;
}
