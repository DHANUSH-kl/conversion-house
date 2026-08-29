import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date().toISOString();

  const staticPages = [
    "",
    "/about",
    "/services",
    "/services/meta-ads",
    "/services/google-ads",
    "/services/lead-generation",
    "/services/conversion-rate-optimization",
    "/services/ugc-ads",
    "/process",
    "/work",
    "/insights",
    "/contact",
  ];

  const caseStudySlugs = ["sheen", "race-division", "irani-motohub"];
  const insightSlugs = [
    "why-pretty-design-without-purpose-fails",
    "setting-up-google-search-console-foundations",
    "headless-shopify-vs-shopify-templates",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.8,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const insightEntries: MetadataRoute.Sitemap = insightSlugs.map((slug) => ({
    url: `${baseUrl}/insights/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...caseStudyEntries, ...insightEntries];
}
