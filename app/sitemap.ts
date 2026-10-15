import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { programs } from "@/lib/programs";
import { locations } from "@/lib/locations";
import { blogPosts } from "@/lib/blog-posts";
import { getPublishedCmsSitemapEntries } from "@/components/cms/cms-api";

export const revalidate = 300;

const routes = [
  "/", "/about", "/courses", "/courses/languages", "/learn-with-us",
  "/locations", "/success-stories", "/blog", "/contact", "/assessment",
  "/forum", "/privacy", "/terms"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const route of routes) {
    entries.set(route, {
      url: `${siteUrl}${route}`,
      changeFrequency: route === "/" || route === "/blog" || route === "/courses" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : route === "/courses" || route === "/locations" ? 0.9 : 0.7,
    });
  }

  for (const program of programs) {
    const route = `/courses/${program.slug}`;
    entries.set(route, { url: `${siteUrl}${route}`, changeFrequency: "monthly", priority: 0.8 });
  }

  for (const location of locations) {
    const route = `/locations/${location.slug}`;
    entries.set(route, { url: `${siteUrl}${route}`, changeFrequency: "monthly", priority: 0.7 });
  }

  for (const post of blogPosts) {
    const route = `/blog/${post.slug}`;
    entries.set(route, {
      url: `${siteUrl}${route}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  const privatePrefixes = ["/dashboard", "/login", "/register", "/forgot-password", "/reset-password"];
  const cmsEntries = await getPublishedCmsSitemapEntries();
  for (const page of cmsEntries) {
    if (privatePrefixes.some((prefix) => page.pathname === prefix || page.pathname.startsWith(`${prefix}/`))) continue;
    if (entries.has(page.pathname)) continue;
    entries.set(page.pathname, {
      url: `${siteUrl}${page.pathname}`,
      lastModified: page.lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return [...entries.values()];
}
