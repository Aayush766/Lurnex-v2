import type { Metadata } from "next";
import { cmsSourcePath } from "@/lib/course-content-links";

export type CmsRecord = Record<string, unknown>;

export const stringValue = (obj: CmsRecord, keys: string[]) => {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
};

const apiBase = () => (process.env.NEXT_PUBLIC_API_URL || "https://lurnex-me-server.onrender.com/api").replace(/\/$/, "");

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
  };
}
