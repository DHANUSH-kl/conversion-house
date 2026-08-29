import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG, getCanonicalUrl } from "@/lib/seo";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/structured-data";

interface Article {
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  date: string;
  isoDate: string;
  readTime: string;
  author: string;
  intro: string;
  sections: {
    heading: string;
    content: string;
  }[];
  keyTakeaways: string[];
  relatedServiceSlug?: string;
  relatedServiceName?: string;
}

const ARTICLES: Record<string, Article> = {
  "why-pretty-design-without-purpose-fails": {
    slug: "why-pretty-design-without-purpose-fails",
    title: "Why pretty design without purpose fails to convert visitors",
    excerpt: "Design matters. But design without intent is decoration. We breakdown why brand strategy must inform visual architecture for conversion systems.",
    category: "Conversion Rate Optimization",
    date: "August 24, 2026",
    isoDate: "2026-08-24",
    readTime: "5 min read",
    author: "ConversionHouse Team",
    intro: "Many businesses spend months refining visual aesthetic, picking color palettes, and crafting micro-interactions, only to wonder why their bounce rates remain high and incoming lead enquiries stay flat. Design without intent is simply decoration.",
    sections: [
      {
        heading: "1. The Gap Between Aesthetics and Architecture",
        content: "A website is not an art gallery exhibit — it is a functional business engine. When a prospective customer lands on your homepage, they ask three unconscious questions within the first 3 seconds: What do you do? Is this for me? What should I do next? If your visual layout fails to answer these questions immediately, no amount of smooth scroll animations will save the conversion.",
      },
      {
        heading: "2. Strategic Hierarchy Drives User Action",
        content: "Visual hierarchy is about directing human attention intentionally. High-converting digital experiences use contrast, font weight, and negative space to establish a clear reading path. The most important business message must always claim the highest visual priority.",
      },
      {
        heading: "3. Aligning Brand Value with Customer Motivations",
        content: "Design should serve customer trust. This means replacing generic stock photography with authentic client proof, clear value propositions, transparent pricing structures, and friction-free call-to-action paths.",
      },
    ],
    keyTakeaways: [
      "Clarity always beats cleverness in digital UX.",
      "Every page element must serve a single predefined customer decision.",
      "Conversion Rate Optimization starts with strategy, not color picking.",
    ],
    relatedServiceSlug: "conversion-rate-optimization",
    relatedServiceName: "Conversion Rate Optimization (CRO)",
  },
  "setting-up-google-search-console-foundations": {
    slug: "setting-up-google-search-console-foundations",
    title: "Setting up Google Search Console foundations from day one",
    excerpt: "SEO, technical optimization, analytics and search indexing are not things to bolt on after launch. We cover the setup blueprint.",
    category: "Search Engine Optimization",
    date: "July 18, 2026",
    isoDate: "2026-07-18",
    readTime: "7 min read",
    author: "ConversionHouse Team",
    intro: "Search engine visibility isn't built overnight, but the foundational technical architecture established before launch determines how quickly Google indexes, understands, and ranks your pages.",
    sections: [
      {
        heading: "1. Immediate XML Sitemap Submission",
        content: "Once a website goes live, the very first action item is verifying ownership in Google Search Console and submitting a dynamic sitemap.xml. This instructs Google's web crawlers precisely which URLs are canonical and ready for indexing.",
      },
      {
        heading: "2. Monitoring Search Queries & Impressions",
        content: "Google Search Console provides real data on exact search queries driving impressions and clicks to your pages. By identifying keywords where your site ranks on page 2 or 3, you can optimize existing content to capture page 1 search traffic.",
      },
      {
        heading: "3. Inspecting Core Web Vitals & Coverage",
        content: "Technical health issues like 404 errors, soft-404 redirects, missing canonical tags, or slow Largest Contentful Paint (LCP) scores are flagged directly in Search Console. Fixing these errors ensures Google rates your site favorably.",
      },
    ],
    keyTakeaways: [
      "Submit sitemap.xml to Google Search Console on day 1 of launch.",
      "Track search impressions and click-through rates monthly to spot growth keywords.",
      "Fix indexing coverage warnings before scaling new content production.",
    ],
    relatedServiceSlug: "google-ads",
    relatedServiceName: "Google Ads & Search Engine Growth",
  },
  "headless-shopify-vs-shopify-templates": {
    slug: "headless-shopify-vs-shopify-templates",
    title: "Headless Shopify vs Shopify templates: The performance breakdown",
    excerpt: "Every millisecond counts. Explore how headless Shopify custom storefronts yield faster interactions and give brands control over growth.",
    category: "E-Commerce Engineering",
    date: "June 05, 2026",
    isoDate: "2026-06-05",
    readTime: "6 min read",
    author: "ConversionHouse Team",
    intro: "In e-commerce, site speed directly dictates checkout conversion rates. A 100ms delay in page load time can reduce conversion rates by up to 7%. Headless Shopify architecture decouples the frontend display layer from backend commerce APIs.",
    sections: [
      {
        heading: "1. The Performance Ceiling of Standard Templates",
        content: "Traditional liquid Shopify themes load dozens of third-party app scripts, CSS stylesheets, and unoptimized javascript bundles. Over time, as brands add apps for reviews, upsells, and popups, page load speeds drop significantly.",
      },
      {
        heading: "2. Why Headless React/Next.js Frontends Win",
        content: "By building the storefront in React/Next.js and consuming Shopify's GraphQL Storefront API, pages render instantaneously. Assets are server-side rendered, images are served in modern AVIF formats, and user navigation feels like a native mobile app.",
      },
    ],
    keyTakeaways: [
      "Page speed directly impacts e-commerce customer acquisition costs.",
      "Headless architecture gives brands total control over mobile UX and checkout funnels.",
      "Decoupled storefronts eliminate third-party script bloat.",
    ],
    relatedServiceSlug: "lead-generation",
    relatedServiceName: "Lead Generation & E-Commerce Systems",
  },
};

export async function generateStaticParams() {
  return [
    { slug: "why-pretty-design-without-purpose-fails" },
    { slug: "setting-up-google-search-console-foundations" },
    { slug: "headless-shopify-vs-shopify-templates" },
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const canonicalUrl = getCanonicalUrl(`/insights/${article.slug}`);

  return {
    title: article.title,
    description: article.excerpt || article.intro,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.title} — ConversionHouse Insights`,
      description: article.excerpt || article.intro,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: "en_US",
      type: "article",
      images: [
        {
          url: `${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} — ConversionHouse Insights`,
      description: article.excerpt || article.intro,
      images: [`${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Insights", item: "/insights" },
    { name: article.title, item: `/insights/${article.slug}` },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const articleSchema = getArticleSchema({
    title: article.title,
    description: article.excerpt || article.intro,
    url: `/insights/${article.slug}`,
    datePublished: article.isoDate,
    authorName: article.author,
  });

  return (
    <main className="bg-white text-black pt-32 pb-24 border-t border-neutral-100">
      <JsonLd data={[breadcrumbSchema, articleSchema]} />

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
            <li>
              <Link href="/insights" className="hover:text-[#ff4500] transition-colors">
                Insights
              </Link>
            </li>
            <li>/</li>
            <li className="text-black font-medium line-clamp-1">{article.title}</li>
          </ol>
        </nav>

        {/* Back link */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#ff4500] hover:underline mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Insights
        </Link>

        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ {article.category} ]</span>
            <span className="text-neutral-300">•</span>
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readTime}
            </span>
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl text-black leading-tight tracking-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 pt-2">
            <span>Published: {article.date}</span>
            <span>•</span>
            <span>By {article.author}</span>
          </div>
        </div>

        {/* Intro Banner */}
        <div className="max-w-3xl bg-neutral-50 border-l-4 border-[#ff4500] p-6 rounded-r-2xl mb-12">
          <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-sans italic">
            "{article.intro}"
          </p>
        </div>

        {/* Main Body Content */}
        <article className="max-w-3xl space-y-10 text-neutral-800 text-sm md:text-base leading-relaxed font-sans mb-16">
          {article.sections.map((sec, i) => (
            <div key={i} className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-black">{sec.heading}</h2>
              <p>{sec.content}</p>
            </div>
          ))}
        </article>

        {/* Key Takeaways */}
        <div className="max-w-3xl bg-neutral-950 text-white p-8 rounded-3xl mb-16 space-y-4">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Summary Takeaways ]</span>
          <h3 className="font-display text-xl text-white font-semibold">Key Principles:</h3>
          <ul className="space-y-2.5">
            {article.keyTakeaways.map((take, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                <span className="text-[#ff4500] font-mono font-bold">•</span>
                <span>{take}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contextual Internal Link to Related Service */}
        {article.relatedServiceSlug && (
          <div className="max-w-3xl bg-neutral-50 border border-neutral-200 p-6 rounded-2xl mb-16 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#ff4500] uppercase tracking-wider block">Commercial Capability</span>
              <p className="text-xs sm:text-sm font-semibold text-black mt-0.5">
                Need help implementing {article.relatedServiceName}?
              </p>
            </div>
            <Link
              href={`/services/${article.relatedServiceSlug}`}
              className="text-xs font-mono bg-black hover:bg-[#ff4500] text-white px-5 py-2.5 rounded-full transition-colors shrink-0"
            >
              Explore Service →
            </Link>
          </div>
        )}

        {/* CTA */}
        <div className="max-w-3xl bg-black text-white p-8 rounded-3xl text-center space-y-4">
          <h3 className="font-display text-2xl text-white">Ready to turn insights into revenue?</h3>
          <p className="text-neutral-400 text-xs max-w-md mx-auto">
            Discuss your brand positioning, website UX, or paid ad strategy with ConversionHouse.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#ff4500] hover:bg-[#e03d00] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-colors"
          >
            Get a Quote
          </Link>
        </div>

      </div>
    </main>
  );
}
