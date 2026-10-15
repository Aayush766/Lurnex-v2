import type { Metadata } from "next";
import { cmsSourcePath } from "@/lib/course-content-links";
import { siteUrl } from "@/lib/seo";

export type CmsRecord = Record<string, unknown>;

export const stringValue = (obj: CmsRecord, keys: string[]) => {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
};

const apiBase = () => (process.env.NEXT_PUBLIC_API_URL || "https://lurnex-me-server.onrender.com/api").replace(/\/$/, "");

function cmsPageRecords(payload: unknown): CmsRecord[] {
  const candidates = [
    payload,
    (payload as any)?.data,
    (payload as any)?.pages,
    (payload as any)?.items,
    (payload as any)?.results,
    (payload as any)?.data?.pages,
    (payload as any)?.data?.items,
    (payload as any)?.data?.results,
    (payload as any)?.data?.data,
    (payload as any)?.payload?.pages,
  ];
  const list = candidates.find(Array.isArray) as unknown[] | undefined;
  return (list || []).filter((item): item is CmsRecord => Boolean(item && typeof item === "object"));
}

function cmsPagePath(record: CmsRecord): string | null {
  if (String(record.status ?? record.Status ?? record.publishStatus ?? "published").toLowerCase() !== "published") return null;
  const noIndex = record.noIndex ?? record.noindex ?? record.NoIndex;
  if (noIndex === true || String(noIndex).toLowerCase() === "true" || record.isIndexable === false || (record.robots as CmsRecord | undefined)?.index === false) return null;

  const rawPath = stringValue(record, ["source", "sourcePath", "publicPath", "sourceUrl", "pageUrl", "path", "url", "slug"]);
  if (!rawPath) return null;

  let pathname = rawPath;
  if (/^https?:\/\//i.test(rawPath)) {
    try {
      const parsed = new URL(rawPath);
      if (parsed.origin !== new URL(siteUrl).origin) return null;
      pathname = parsed.pathname;
    } catch {
      return null;
    }
  }

  pathname = `/${pathname.replace(/^\/+|\/+$/g, "")}`;
  if (pathname === "/" || pathname.includes("?") || pathname.includes("#")) return null;
  return pathname;
}

/** Lists published CMS routes for the generated sitemap. The API list endpoint is /v1/pages. */
export async function getPublishedCmsSitemapEntries() {
  const endpoint = process.env.CMS_SITEMAP_ENDPOINT || "/v1/pages";
  const buildUrl = (page: number) => {
    const url = /^https?:\/\//i.test(endpoint)
      ? new URL(endpoint)
      : new URL(`${apiBase()}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`);
    url.searchParams.set("status", "published");
    url.searchParams.set("limit", "1000");
    if (page > 1) url.searchParams.set("page", String(page));
    return url;
  };

  const records: CmsRecord[] = [];
  try {
    let totalPages = 1;
    for (let page = 1; page <= totalPages && page <= 100; page++) {
      const response = await fetch(buildUrl(page), {
        headers: { Accept: "application/json", "X-Portal": "frontend" },
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) break;
      const payload = await response.json();
      records.push(...cmsPageRecords(payload));
      const metadata = (payload as any)?.pagination ?? (payload as any)?.meta?.pagination ?? (payload as any)?.data?.pagination ?? {};
      const pages = Number(metadata.totalPages ?? metadata.pageCount ?? metadata.pages ?? 1);
      if (Number.isFinite(pages) && pages > 0) totalPages = Math.min(Math.ceil(pages), 100);
    }
  } catch {
    // Keep the statically known sitemap available when the CMS service is offline.
  }

  const unique = new Map<string, CmsRecord>();
  for (const record of records) {
    const path = cmsPagePath(record);
    if (path) unique.set(path, record);
  }

  return [...unique.entries()].map(([pathname, record]) => {
    const updatedAt = stringValue(record, ["updatedAt", "updated_at", "modifiedAt", "lastModified"]);
    const parsedDate = updatedAt ? new Date(updatedAt) : undefined;
    return {
      pathname,
      lastModified: parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : undefined,
    };
  });
}

export async function loadCmsPage(pathname: string): Promise<CmsRecord | null> {
  try {
    const response = await fetch(`${apiBase()}/v1/pages/by-source?source=${encodeURIComponent(pathname)}`, {
      headers: { Accept: "application/json", "X-Portal": "frontend" },
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    const payload = await response.json();
    const data = payload?.data ?? payload;
    if (!data || typeof data !== "object" || String(data.status || "").toLowerCase() !== "published") return null;
    return data as CmsRecord;
  } catch {
    return null;
  }
}

export async function getCmsMetadata(segments: string[]): Promise<Metadata> {
  const pathname = cmsSourcePath(`/${segments.join("/")}`);
  const data = await loadCmsPage(pathname);
  const title = data && stringValue(data, ["seoTitle", "SeoTitle", "title", "Title"]);
  const description = data && stringValue(data, ["metaDescription", "MetaDescription", "excerpt", "Excerpt"]);
  const keywords = data?.metaKeywords ?? data?.MetaKeywords;
  return {
    title: title || (data && stringValue(data, ["title", "Title"])) || undefined,
    description: description || undefined,
    keywords: Array.isArray(keywords) ? keywords.filter((item): item is string => typeof item === "string") : typeof keywords === "string" ? keywords : undefined,
    alternates: { canonical: pathname },
    robots: data ? { index: true, follow: true } : { index: false, follow: false },
  };
}
