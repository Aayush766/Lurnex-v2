"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpenText, ChevronRight, Clock3, FileText, Link2, LockKeyhole, Sparkles, X } from "lucide-react";
import { stringValue, type CmsRecord } from "@/components/cms/cms-api";
import { CopyPageLink } from "@/components/cms/CopyPageLink";
import { cmsSourcePath } from "@/lib/course-content-links";

const apiBase = (process.env.NEXT_PUBLIC_API_URL || "https://lurnex-me-server.onrender.com/api").replace(/\/$/, "");
const displayLabel = (segment: string) => segment.replace(/[-_]/g, " ");
const cmsValue = (record: CmsRecord, keys: string[]) => {
  const value = stringValue(record, keys);
  if (value) return value;

  // Admin APIs have used camelCase, PascalCase, and snake_case for these fields.
  const wanted = new Set(keys.map((key) => key.toLowerCase().replace(/[^a-z0-9]/g, "")));
  const entry = Object.entries(record).find(([key, candidate]) =>
    wanted.has(key.toLowerCase().replace(/[^a-z0-9]/g, "")) && typeof candidate === "string" && candidate.trim(),
  );
  return typeof entry?.[1] === "string" ? entry[1].trim() : "";
};
type CmsSideLink = { title: string; url?: string; image?: string; date?: string };
const getLinks = (value: unknown): CmsSideLink[] => Array.isArray(value) ? value.flatMap((item) => {
  if (typeof item === "string") return [{ title: item }];
  if (!item || typeof item !== "object") return [];
  const record = item as CmsRecord;
  const title = stringValue(record, ["title", "Title", "name", "Name", "label", "Label"]);
  if (!title) return [];
  return [{ title, url: stringValue(record, ["url", "Url", "href", "Href", "sourceUrl", "SourceUrl", "slug", "Slug"]), image: stringValue(record, ["image", "Image", "imageUrl", "ImageUrl", "thumbnail", "Thumbnail"]), date: stringValue(record, ["date", "Date", "publishedAt", "PublishedAt"]) }];
}) : [];

function prepareContent(html: string, pageTitle = "") {
  if (typeof DOMParser === "undefined") return { html, css: "", headings: [] as CmsSideLink[] };
  const document = new DOMParser().parseFromString(html, "text/html");
  const css = Array.from(document.querySelectorAll("style")).map((style) => style.textContent || "").join("\n");
  document.querySelectorAll("style").forEach((style) => style.remove());
  const normalizedTitle = pageTitle.replace(/\s+/g, " ").trim().toLowerCase();
  const firstHeading = document.body.querySelector("h1");
  if (firstHeading?.textContent?.replace(/\s+/g, " ").trim().toLowerCase() === normalizedTitle) firstHeading.remove();
  const headings = Array.from(document.body.querySelectorAll("h2, h3")).map((heading, index) => {
    const title = heading.textContent?.trim() || `Section ${index + 1}`;
    const id = heading.id || `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section"}-${index + 1}`;
    heading.id = id;
    return { title, url: `#${id}` };
  });
  return { html: document.body.innerHTML, css, headings };
}

const cmsLinkHref = (link: CmsSideLink) => {
  if (!link.url) return "#cms-content";
  if (link.url.startsWith("#") || /^https?:\/\//i.test(link.url)) return link.url;
  return `/${link.url.replace(/^~?\/?|\/$/g, "").replace(/^cms\//i, "")}`;
};

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${String(date.getUTCDate()).padStart(2, "0")} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function splitAtWordLimit(html: string, limit = 600) {
  if (typeof DOMParser === "undefined") return { preview: html, wordCount: 0 };
  const doc = new DOMParser().parseFromString(html, "text/html");
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  let count = 0;
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest("script, style, noscript")) continue;
    const matches = [...(node.textContent || "").matchAll(/\S+/g)];
    if (count + matches.length < limit) { count += matches.length; continue; }
    const target = matches[limit - count - 1];
    if (!target) break;
    const range = doc.createRange();
    range.setStart(node, (target.index || 0) + target[0].length);
    range.setEnd(doc.body, doc.body.childNodes.length);
    range.extractContents();
    return { preview: doc.body.innerHTML, wordCount: limit };
  }
  return { preview: html, wordCount: count };
}

function GateTrigger({ onReach }: { onReach: () => void }) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) onReach(); }, { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, onReach]);
  return <div ref={setElement} aria-hidden="true" className="h-2" />;
}

export function CmsPage({ segments }: { segments: string[] }) {
  const initialPath = `/${segments.join("/")}`;
  const [page, setPage] = useState<CmsRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [pathname, setPathname] = useState(initialPath);
  const [quickLinks, setQuickLinks] = useState<CmsSideLink[]>([]);
  const [pageCss, setPageCss] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    const sync = () => setSignedIn(Boolean(localStorage.getItem("lumex_token")));
    sync();
    window.addEventListener("lumex-auth-changed", sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("lumex-auth-changed", sync); window.removeEventListener("storage", sync); };
  }, []);

  useEffect(() => {
    if (!loading && signedIn && window.location.hash === "#cms-premium-content") {
      window.setTimeout(() => document.getElementById("cms-premium-content")?.scrollIntoView({ block: "start" }), 100);
    }
  }, [loading, signedIn, page]);
  useEffect(() => {
    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    const controller = new AbortController();
    setPathname(currentPath);
    setPage(null);
    setLoading(true);

    fetch(`${apiBase}/v1/pages/by-source?source=${encodeURIComponent(cmsSourcePath(currentPath))}`, {
      headers: { Accept: "application/json", "X-Portal": "frontend" },
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) return null;
        const payload = await response.json();
        const data = payload?.data ?? payload;
        if (!data || typeof data !== "object" || String(data.status || "").toLowerCase() !== "published") return null;
        return data as CmsRecord;
      })
      .then((data) => {
        if (controller.signal.aborted) return;
        setPage(data);
        if (data) {
          const rawHtml = cmsValue(data, ["content", "Content", "html", "Html", "htmlContent", "contentHtml", "pageHtml", "bodyHtml", "content_html"]);
          const prepared = prepareContent(rawHtml, stringValue(data, ["title", "Title"]));
          const suppliedCss = cmsValue(data, ["css", "Css", "customCss", "pageCss", "contentCss", "styles", "stylesheet", "custom_css"]);
          setPageCss([suppliedCss, prepared.css].filter(Boolean).join("\n"));
          const supplied = getLinks(data.quickLinks ?? data.QuickLinks);
          setQuickLinks(supplied.length ? supplied : prepared.headings);
          // The prepared HTML adds stable anchors for the generated quick links.
          data.__preparedContent = prepared.html;
        } else {
          setPageCss("");
          setQuickLinks([]);
        }
      })
    .catch(() => { if (!controller.signal.aborted) { setPage(null); setPageCss(""); setQuickLinks([]); } })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });

    return () => controller.abort();
  }, [initialPath]);

  const crumbs = pathname.split("/").filter(Boolean);
  if (loading) return <main className="cms-page container-shell" aria-live="polite"><section className="cms-loading-card"><span className="cms-loading-mark"><BookOpenText size={22}/></span><div><strong>Preparing your page</strong><p>Loading the latest Lurnex content…</p></div><span className="cms-loading-spinner"/></section></main>;
  if (!page) return <main className="cms-page container-shell"><nav className="cms-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link>{crumbs.map((part, index) => <span className="cms-crumb-parent" key={`${part}-${index}`}><ChevronRight size={15} /><span>{displayLabel(part)}</span></span>)}</nav><section className="cms-empty"><span className="cms-empty-icon"><FileText size={23}/></span><span className="cms-category">PAGE NOT FOUND</span><h1>We couldn’t find this page.</h1><p>The content may have moved or is not published yet. Try browsing a course or return to the homepage.</p><div><Link href="/courses">Explore courses <ArrowRight size={15}/></Link><Link href="/">Go home</Link></div></section></main>;

  const title = stringValue(page, ["title", "Title"]) || displayLabel(crumbs.at(-1) || "Page");
  const content = cmsValue(page, ["content", "Content", "html", "Html", "htmlContent", "contentHtml", "pageHtml", "bodyHtml", "content_html"]);
  const preparedContent = typeof page.__preparedContent === "string" ? page.__preparedContent : content;
  const readingGate = splitAtWordLimit(preparedContent);
  const gated = readingGate.wordCount >= 600 && !signedIn;
  const returnToArticle = `${pathname}#cms-premium-content`;
  const loginHref = `/login?redirect=${encodeURIComponent(returnToArticle)}`;
  const registerHref = `/register?redirect=${encodeURIComponent(returnToArticle)}`;
  const category = stringValue(page, ["category", "Category", "categoryName", "CategoryName"]) || displayLabel(crumbs[0] || "");
  const excerpt = cmsValue(page, ["excerpt", "Excerpt", "summary", "Summary", "description", "Description", "metaDescription", "MetaDescription"]);
  const publishedDate = formatDate(stringValue(page, ["publishedAt", "PublishedAt", "publishedDate", "PublishedDate", "date", "Date", "updatedAt", "UpdatedAt"]));
  const plainText = preparedContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const readingMinutes = Math.max(1, Math.ceil(plainText.split(" ").filter(Boolean).length / 210));
  const related = getLinks(page.relatedArticles ?? page.RelatedArticles ?? page.relatedPages ?? page.RelatedPages);
  const hasSidebar = quickLinks.length > 0 || related.length > 0;

  return <main className="cms-page container-shell">
    {pageCss && <style dangerouslySetInnerHTML={{ __html: pageCss }} />}
    <nav className="cms-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link>{crumbs.map((part, index) => <span className="cms-crumb-parent" key={`${part}-${index}`}><ChevronRight size={15} />{index === crumbs.length - 1 ? <span aria-current="page">{title}</span> : <Link href={`/${crumbs.slice(0, index + 1).join("/")}`}>{displayLabel(part)}</Link>}</span>)}</nav>
    <header className="cms-hero">
      <div className="cms-hero-content"><span className="cms-category"><Sparkles size={13}/>{category}</span><h1>{title}</h1>{excerpt && <p className="cms-deck">{excerpt}</p>}<div className="cms-article-meta"><span><BookOpenText size={15}/>{readingMinutes} min read</span>{publishedDate && <span><Clock3 size={15}/>{publishedDate}</span>}<span className="cms-meta-dot"><i/>Updated learning resource</span></div></div>
      <div className="cms-hero-share"><span>Enjoying this resource?</span><CopyPageLink/></div>
      <span className="cms-hero-orb cms-hero-orb-one"/><span className="cms-hero-orb cms-hero-orb-two"/>
    </header>
    <div className={`cms-layout${hasSidebar ? "" : " cms-layout-single"}`}>
      <article className="cms-article">
        {content ? <div id="cms-content" className="cms-reading-card"><div className="cms-reading-accent"/>{gated ? <><div className="cms-html" dangerouslySetInnerHTML={{ __html: readingGate.preview }} /><GateTrigger onReach={() => setGateOpen(true)} /><section className="mx-5 mb-7 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center"><LockKeyhole className="mx-auto text-[#087FF5]"/><h2 className="mt-3 text-xl font-bold text-[#071B3A]">Keep reading with Lurnex</h2><p className="mx-auto mt-2 max-w-md text-sm text-slate-600">Create a free learner account or log in to continue reading this resource.</p><div className="mt-5 flex flex-wrap justify-center gap-3"><Link href={loginHref} className="rounded-xl border border-[#087FF5] px-5 py-3 text-sm font-bold text-[#087FF5]">Log in</Link><Link href={registerHref} className="rounded-xl bg-[#087FF5] px-5 py-3 text-sm font-bold text-white">Register with Lurnex</Link></div></section></> : <div id="cms-premium-content" className="cms-html" dangerouslySetInnerHTML={{ __html: preparedContent }} />}</div> : <p className="cms-empty-copy">Content not available.</p>}
      </article>
      {hasSidebar && <aside className="cms-sidebar">
        {quickLinks.length > 0 && <section className="cms-side-card cms-toc-card"><div className="cms-side-kicker"><Link2 size={15}/> KEEP EXPLORING</div><h2>On this page</h2><ul>{quickLinks.map((item, index) => <li key={`${item.title}-${index}`}><Link href={cmsLinkHref(item)}><span className="cms-toc-number">{String(index + 1).padStart(2, "0")}</span>{item.title}<ChevronRight className="cms-side-end" size={15} /></Link></li>)}</ul></section>}
        {related.length > 0 && <section className="cms-side-card cms-related-card"><div className="cms-side-kicker"><FileText size={15}/> MORE TO EXPLORE</div><h2>Related articles</h2><ul className="cms-related">{related.map((item, index) => <li key={`${item.title}-${index}`}><Link href={cmsLinkHref(item)}>{item.image && <img src={item.image} alt="" loading="lazy" />}<span>{item.title}{item.date && <small>{formatDate(item.date) || item.date}</small>}</span><ChevronRight size={15} /></Link></li>)}</ul></section>}
      </aside>}
    </div>
    {gateOpen && gated && <div className="fixed inset-0 z-[200] grid place-items-center bg-[#071B3A]/60 p-4" role="presentation"><section role="dialog" aria-modal="true" aria-labelledby="cms-gate-title" className="relative w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl"><button type="button" aria-label="Close reading prompt" onClick={() => setGateOpen(false)} className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100"><X size={20}/></button><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-[#087FF5]"><LockKeyhole size={22}/></span><h2 id="cms-gate-title" className="mt-4 text-2xl font-extrabold text-[#071B3A]">Enjoying this resource?</h2><p className="mt-2 text-sm leading-6 text-slate-600">You’ve reached the free preview. Log in or register with Lurnex to continue reading.</p><div className="mt-6 grid gap-3"><Link href={loginHref} className="rounded-xl border border-[#087FF5] px-5 py-3 font-bold text-[#087FF5]">Log in to continue</Link><Link href={registerHref} className="rounded-xl bg-[#087FF5] px-5 py-3 font-bold text-white">Register with Lurnex</Link></div></section></div>}
  </main>;
}
