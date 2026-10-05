import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { programs } from "@/lib/programs";
import { locations } from "@/lib/locations";

const routes = [
  "/", "/about", "/courses", "/courses/jee", "/courses/neet",
  "/courses/ib", "/courses/sat", "/learn-with-us", "/locations",
  "/success-stories", "/blog", "/contact", "/assessment"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...programs.map((program) => `/courses/${program.slug}`), ...locations.map((location) => `/locations/${location.slug}`)].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }));
}
