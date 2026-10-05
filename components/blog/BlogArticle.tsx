"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3 } from "lucide-react";
import { learningApi } from "@/lib/api";
import { blogPostBySlug, blogPosts, type BlogPost } from "@/lib/blog-posts";

type ApiBlock = { type: "heading" | "paragraph" | "image" | "list" | "quote" | "divider"; value?: string; level?: number; items?: string[]; imageUrl?: string; alt?: string };
export type ApiBlog = { slug?: string; title?: string; excerpt?: string; featuredImage?: string; coverImage?: string; category?: string; createdAt?: string; publishedAt?: string; readingTime?: string; author?: string | { name?: string }; contentBlocks?: ApiBlock[]; tags?: string[] };
type ArticleData = { title: string; excerpt: string; category: string; image: string; imageAlt: string; publishedAt: string; readingTime: string; author: string; sections: BlogPost["sections"]; contentBlocks?: ApiBlock[]; tags?: string[] };

function extractBlog(payload: unknown): ApiBlog | null {
  if (!payload || typeof payload !== "object") return null;
  const data = payload as { blog?: unknown; data?: unknown; post?: unknown };
  const candidate = data.blog ?? data.data ?? data.post ?? payload;
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) return null;
  return candidate as ApiBlog;
}

function normalizeApiBlog(blog: ApiBlog): ArticleData {
  const local = blog.slug ? blogPostBySlug(blog.slug) : undefined;
  const author = typeof blog.author === "string" ? blog.author : blog.author?.name;
  return {
    title: blog.title || local?.title || "Learning article",
    excerpt: blog.excerpt || local?.excerpt || "Guidance and ideas for your learning journey.",
    category: blog.category || local?.category || "Learning & Teaching",
    image: blog.featuredImage || blog.coverImage || local?.image || "/assets/images/ibdiploma.png",
    imageAlt: blog.title || local?.imageAlt || "Learning article",
    publishedAt: blog.createdAt?.slice(0, 10) || blog.publishedAt?.slice(0, 10) || local?.publishedAt || "",
    readingTime: blog.readingTime || local?.readingTime || "5 min read",
    author: author || "lurnex Academic Team",
    sections: local?.sections || [],
    contentBlocks: blog.contentBlocks,
    tags: blog.tags,
  };
}

function ArticleContent({ article }: { article: ArticleData }) {
  if (article.contentBlocks?.length) return <>{article.contentBlocks.map((block, index) => {
    if (block.type === "heading") { const Tag = block.level === 3 ? "h3" : "h2"; return <Tag key={index} id={`article-section-${index}`} className="mt-10 text-2xl font-extrabold text-[#10244a]">{block.value}</Tag>; }
    if (block.type === "paragraph") return <p key={index} className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">{block.value}</p>;
    if (block.type === "image" && block.imageUrl) return <img key={index} src={block.imageUrl} alt={block.alt || "Article illustration"} className="my-8 max-h-[520px] w-full rounded-2xl object-cover"/>;
    if (block.type === "list") return <ul key={index} className="mt-5 space-y-3">{block.items?.map((item) => <li key={item} className="flex items-start gap-3 text-base leading-7 text-slate-600"><Check className="mt-1 shrink-0 rounded-full bg-emerald-50 p-0.5 text-emerald-600" size={20}/>{item}</li>)}</ul>;
    if (block.type === "quote") return <blockquote key={index} className="my-8 border-l-4 border-[#087ff5] bg-[#f4f9ff] px-5 py-4 text-lg italic leading-8 text-slate-700">{block.value}</blockquote>;
    if (block.type === "divider") return <hr key={index} className="my-10 border-slate-200"/>;
    return null;
  })}</>;

  return <>{article.sections.map((section, index) => <section key={section.heading} id={`article-section-${index}`} className="mt-9 first:mt-0"><h2 className="text-2xl font-extrabold leading-tight text-[#10244a]">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-base leading-8 text-slate-600">{paragraph}</p>)}{section.bullets && <ul className="mt-5 space-y-3">{section.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-3 text-base leading-7 text-slate-600"><Check className="mt-1 shrink-0 rounded-full bg-emerald-50 p-0.5 text-emerald-600" size={20}/>{bullet}</li>)}</ul>}</section>)}</>;
}

const dateLabel = (date: string) => date ? new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(`${date}T12:00:00`)) : "";

export function BlogArticle({ slug, initialBlog }: { slug: string; initialBlog?: ApiBlog | null }) {
  const localPost = blogPostBySlug(slug);
  const [article, setArticle] = useState<ArticleData | null>(initialBlog ? normalizeApiBlog(initialBlog) : localPost ? normalizeApiBlog({ ...localPost, slug }) : null);
  const [loading, setLoading] = useState(!initialBlog && !localPost);

  useEffect(() => {
    let active = true;
    learningApi.getBlog(slug).then((data) => { const blog = extractBlog(data); if (active && blog) setArticle(normalizeApiBlog(blog)); }).catch(() => {
      // Keep the bundled article available when the optional API is offline.
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  if (loading) return <main className="grid min-h-[70vh] place-items-center bg-[#f5f9ff] text-slate-500">Loading article…</main>;
  if (!article) return <main className="grid min-h-[70vh] place-items-center bg-[#f5f9ff]"><div className="text-center"><h1 className="text-3xl font-extrabold text-[#10244a]">Article not found</h1><p className="mt-2 text-slate-600">This article may have been removed or is not available yet.</p><Link href="/blog" className="mt-5 inline-block font-bold text-[#087ff5]">Back to the journal</Link></div></main>;

  const related = blogPosts.filter((post) => post.slug !== slug).slice(0, 2);
  const tableOfContents = article.contentBlocks?.some((block) => block.type === "heading")
    ? (article.contentBlocks ?? []).flatMap((block, index) => block.type === "heading" && block.value ? [{ id: index, heading: block.value }] : [])
    : article.sections.map((section, index) => ({ id: index, heading: section.heading }));
  return <main className="min-h-screen bg-[#f5f9ff] text-[#10244a]">
    <header className="relative isolate flex min-h-[480px] items-end overflow-hidden bg-[#071b3a] text-white">{article.image.startsWith("/") ? <img src={article.image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"/> : <img src={article.image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"/>}<div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071b3a] via-[#071b3a]/75 to-[#071b3a]/35"/><div className="container-shell relative z-10 py-12 md:py-16"><Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"><ArrowLeft size={16}/> All articles</Link><div className="mt-10"><span className="rounded-full bg-[#087ff5] px-3 py-1.5 text-xs font-bold">{article.category}</span><h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">{article.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100/85">{article.excerpt}</p><div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-blue-100/75">{article.publishedAt && <span className="inline-flex items-center gap-2"><CalendarDays size={15}/>{dateLabel(article.publishedAt)}</span>}<span className="inline-flex items-center gap-2"><Clock3 size={15}/>{article.readingTime}</span><span>{article.author}</span></div></div></div></header>
    <div className="container-shell grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14 lg:py-16"><article className="min-w-0 rounded-3xl border border-slate-100 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-12"><div className="mb-10 overflow-hidden rounded-2xl"><img src={article.image} alt={article.imageAlt} className="max-h-[440px] w-full object-cover"/></div><ArticleContent article={article}/>{article.tags?.length ? <div className="mt-12 flex flex-wrap gap-2 border-t pt-8">{article.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">#{tag}</span>)}</div> : null}<div className="mt-12 rounded-2xl bg-gradient-to-r from-[#eaf5ff] to-[#f0edff] p-6 sm:p-8"><span className="text-xs font-extrabold tracking-[.15em] text-[#087ff5]">KEEP EXPLORING</span><h2 className="mt-2 text-xl font-extrabold">Learning works best with a plan built around you.</h2><Link href="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#087ff5] px-5 py-3 text-sm font-bold text-white">Talk to our team <ArrowRight size={16}/></Link></div></article>
      <aside className="space-y-5"><div className="rounded-3xl bg-[#071b3a] p-6 text-white"><span className="text-xs font-bold tracking-[.15em] text-cyan-200">IN THIS ARTICLE</span><div className="mt-4 space-y-3">{tableOfContents.map((section, index) => <a key={`${section.id}-${section.heading}`} href={`#article-section-${section.id}`} className="block text-sm leading-6 text-blue-100/80 transition hover:text-white">{String(index + 1).padStart(2, "0")} · {section.heading}</a>)}</div></div><div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"><span className="text-xs font-extrabold tracking-[.15em] text-[#087ff5]">ABOUT THE AUTHOR</span><h3 className="mt-3 text-lg font-extrabold">{article.author}</h3><p className="mt-2 text-sm leading-6 text-slate-600">Ideas and practical guidance from the lurnex learning team.</p><Link href="/about" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#087ff5]">About lurnex <ArrowRight size={15}/></Link></div></aside>
    </div>
    <div className="container-shell pb-16"><div className="flex items-end justify-between gap-4"><div><span className="text-xs font-extrabold tracking-[.17em] text-[#087ff5]">MORE FROM THE JOURNAL</span><h2 className="mt-2 text-2xl font-extrabold">Keep reading.</h2></div><Link href="/blog" className="hidden items-center gap-2 text-sm font-bold text-[#087ff5] sm:inline-flex">All articles <ArrowRight size={16}/></Link></div><div className="mt-6 grid gap-4 md:grid-cols-2">{related.map((item) => <Link key={item.slug} href={`/blog/${item.slug}`} className="group flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md"><div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl"><img src={item.image} alt={item.imageAlt} className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"/></div><div className="my-auto"><span className="text-[10px] font-extrabold uppercase tracking-wider text-[#087ff5]">{item.category}</span><h3 className="mt-1 font-bold leading-snug">{item.title}</h3><span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#087ff5]">Read article <ArrowRight size={13}/></span></div></Link>)}</div></div>
  </main>;
}
