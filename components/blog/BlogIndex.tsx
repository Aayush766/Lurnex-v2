"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import { learningApi } from "@/lib/api";
import { blogPosts } from "@/lib/blog-posts";

const formatDate = (date: string) => new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${date}T12:00:00`));

type BlogSummary = { slug: string; title: string; excerpt?: string; featuredImage?: string; coverImage?: string; category?: string; createdAt?: string; readingTime?: string };
type DisplayPost = { slug: string; title: string; excerpt: string; category: string; image: string; imageAlt: string; publishedAt: string; readingTime: string };

const fallbackPosts: DisplayPost[] = blogPosts;
function extractBlogs(payload: unknown): BlogSummary[] {
  if (Array.isArray(payload)) return payload as BlogSummary[];
  if (!payload || typeof payload !== "object") return [];
  const data = payload as { blogs?: unknown; data?: unknown; posts?: unknown };
  const collection = data.blogs ?? data.data ?? data.posts;
  if (Array.isArray(collection)) return collection as BlogSummary[];
  if (collection && typeof collection === "object") {
    const nested = collection as { blogs?: unknown; posts?: unknown; results?: unknown };
    const result = nested.blogs ?? nested.posts ?? nested.results;
    if (Array.isArray(result)) return result as BlogSummary[];
  }
  return [];
}
const toDisplayPost = (post: BlogSummary): DisplayPost => {
  const fallback = blogPosts.find((item) => item.slug === post.slug) ?? blogPosts[0];
  return { slug: post.slug, title: post.title, excerpt: post.excerpt ?? "Ideas and practical guidance for your learning journey.", category: post.category ?? "Learning & Teaching", image: post.featuredImage || post.coverImage || fallback.image, imageAlt: post.title, publishedAt: post.createdAt?.slice(0, 10) ?? fallback.publishedAt, readingTime: post.readingTime ?? fallback.readingTime };
};

export function BlogIndex() {
  const [posts, setPosts] = useState<DisplayPost[]>(fallbackPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    learningApi.getBlogs().then((data) => {
      const blogs = extractBlogs(data);
      if (active && blogs.length) setPosts(blogs.map(toDisplayPost));
    }).catch(() => {
      // Keep the included articles available when the optional API is offline.
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const [featured, ...articles] = posts;
  if (!featured && !loading) return <div className="mt-10 rounded-3xl border border-slate-100 bg-white p-10 text-center"><h2 className="text-xl font-extrabold text-[#10244a]">No articles yet</h2><p className="mt-2 text-slate-600">Check back soon for more learning ideas and guidance.</p></div>;
  if (!featured) return <div className="mt-10 h-64 animate-pulse rounded-3xl bg-slate-100" aria-label="Loading articles" />;

  return (
    <div className="mt-10">
      <article className="group grid overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm lg:grid-cols-[1.05fr_.95fr]">
        <Link href={`/blog/${featured.slug}`} aria-label={`Read ${featured.title}`} className="relative min-h-[260px] overflow-hidden sm:min-h-[340px]">
          {featured.image.startsWith("/") ? <Image src={featured.image} alt={featured.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /> : <img src={featured.image} alt={featured.imageAlt} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />}
          <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#087ff5]">Featured article</span>
        </Link>
        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-11">
          <span className="text-xs font-extrabold uppercase tracking-[.16em] text-[#087ff5]">{featured.category}</span>
          <h2 className="mt-4 text-2xl font-extrabold leading-tight text-[#10244a] sm:text-3xl">{featured.title}</h2>
          <p className="mt-4 leading-7 text-slate-600">{featured.excerpt}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500"><span className="inline-flex items-center gap-2"><CalendarDays size={14}/>{formatDate(featured.publishedAt)}</span><span className="inline-flex items-center gap-2"><Clock3 size={14}/>{featured.readingTime}</span></div>
          <Link href={`/blog/${featured.slug}`} className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#087ff5] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700">Read the article <ArrowRight size={16}/></Link>
        </div>
      </article>

      <div className="mt-14 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><span className="text-xs font-extrabold tracking-[.18em] text-[#087ff5]">THE LURNEX JOURNAL</span><h2 className="mt-2 text-2xl font-extrabold text-[#10244a]">More ideas for your learning journey.</h2></div><span className="text-sm text-slate-500">{posts.length} articles{loading ? " · Updating" : ""}</span></div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <article key={article.slug} className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100/70">
        <Link href={`/blog/${article.slug}`} aria-label={`Read ${article.title}`} className="relative block h-52 overflow-hidden">{article.image.startsWith("/") ? <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.04]"/> : <img src={article.image} alt={article.imageAlt} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"/>}<span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#087ff5]">{article.category}</span></Link>
        <div className="p-5"><div className="flex items-center gap-4 text-[11px] text-slate-500"><span className="inline-flex items-center gap-1.5"><CalendarDays size={13}/>{formatDate(article.publishedAt)}</span><span className="inline-flex items-center gap-1.5"><Clock3 size={13}/>{article.readingTime}</span></div><h3 className="mt-4 text-lg font-extrabold leading-snug text-[#10244a]"><Link href={`/blog/${article.slug}`} className="transition hover:text-[#087ff5]">{article.title}</Link></h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{article.excerpt}</p><Link href={`/blog/${article.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#087ff5]">Read article <ArrowRight className="transition group-hover:translate-x-1" size={15}/></Link></div>
      </article>)}</div>
    </div>
  );
}
