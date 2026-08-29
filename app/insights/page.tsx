import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG, getCanonicalUrl } from "@/lib/seo";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Performance Marketing Insights & Growth Strategy",
  description:
    "Read insights on performance marketing, Meta Ads ROAS, Search Console setup, lead generation strategies, CRO, and headless Shopify engineering.",
  alternates: {
    canonical: getCanonicalUrl("/insights"),
  },
  openGraph: {
    title: "Performance Marketing Insights — ConversionHouse",
    description:
      "Read insights on performance marketing, Meta Ads ROAS, Search Console setup, lead generation strategies, CRO, and headless Shopify engineering.",
    url: getCanonicalUrl("/insights"),
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`,
        width: 1200,
        height: 630,
        alt: "ConversionHouse Growth Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Performance Marketing Insights — ConversionHouse",
    description:
      "Read insights on performance marketing, Meta Ads ROAS, Search Console setup, lead generation strategies, CRO, and headless Shopify engineering.",
    images: [`${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`],
  },
};

export const INSIGHT_POSTS = [
  {
    slug: "why-pretty-design-without-purpose-fails",
    title: "Why pretty design without purpose fails to convert visitors",
    excerpt: "Design matters. But design without intent is decoration. We breakdown why brand strategy must inform visual architecture for conversion systems.",
    date: "August 24, 2026",
    readTime: "5 min read",
    category: "Conversion Rate Optimization",
  },
  {
    slug: "setting-up-google-search-console-foundations",
    title: "Setting up Google Search Console foundations from day one",
    excerpt: "SEO, technical optimization, analytics and search indexing are not things to bolt on after launch. We cover the setup blueprint.",
    date: "July 18, 2026",
    readTime: "7 min read",
    category: "Search Engine Optimization",
  },
  {
    slug: "headless-shopify-vs-shopify-templates",
    title: "Headless Shopify vs Shopify templates: The performance breakdown",
    excerpt: "Every millisecond counts. Explore how headless Shopify custom storefronts yield faster interactions and give brands control over growth.",
    date: "June 05, 2026",
    readTime: "6 min read",
    category: "E-Commerce Engineering",
  },
];

export default function InsightsPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Insights", item: "/insights" },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "ConversionHouse Insights",
    description: "Notes on brand, performance marketing, SEO, and building digital systems that perform.",
    url: getCanonicalUrl("/insights"),
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
  };

  return (
    <main className="bg-white text-black pt-32 pb-24 border-t border-neutral-100">
      <JsonLd data={[breadcrumbSchema, blogSchema]} />

      <div className="container-x">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <li>
              <Link href="/" className="hover:text-[#ff4500] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-black font-medium">Insights</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Studio Journal ]</span>
          <h1 className="font-display font-semibold text-4xl sm:text-6xl text-black leading-tight tracking-tight">
            Insights on <span className="text-[#ff4500] font-bold">digital growth & performance.</span>
          </h1>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
            Notes on brand positioning, Meta Ads strategy, search engine optimization, UX engineering, and building digital systems that perform for real businesses.
          </p>
        </div>

        {/* Blog Post List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INSIGHT_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="bg-neutral-50/70 border border-neutral-200/80 p-8 rounded-3xl flex flex-col justify-between group hover:border-[#ff4500] hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4500] font-semibold">
                    {post.category}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h2 className="font-display font-semibold text-xl text-black mb-4 group-hover:text-[#ff4500] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-sans">
                  {post.excerpt}
                </p>
              </div>

              <div className="border-t border-neutral-200/80 pt-4 mt-auto flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400">{post.date}</span>
                <span className="text-xs font-sans font-semibold text-black group-hover:text-[#ff4500] flex items-center gap-1 transition-colors">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
