import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  intro: string;
  sections: {
    heading: string;
    content: string;
  }[];
  keyTakeaways: string[];
}

const ARTICLES: Record<string, Article> = {
  "why-pretty-design-without-purpose-fails": {
    slug: "why-pretty-design-without-purpose-fails",
    title: "Why pretty design without purpose fails to convert visitors",
    category: "Conversion Optimization",
    date: "August 24, 2026",
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
  },
  "setting-up-google-search-console-foundations": {
    slug: "setting-up-google-search-console-foundations",
    title: "Setting up Google Search Console foundations from day one",
    excerpt: "SEO, technical optimization, analytics and search indexing are not things to bolt on after launch.",
    category: "Search Engine Optimization",
    date: "July 18, 2026",
    readTime: "7 min read",
    author: "ConversionHouse Team",
    intro: "Search engine visibility isn't built overnight, but the foundational technical architecture established before launch determines how quickly Google indexes, understands, and ranks your pages.",
    sections: [
      {
        heading: "1. Canonicalization and Sitemap Submission",
        content: "Before announcing your new digital platform, ensure your XML sitemap is properly generated, dynamic, and submitted directly to Google Search Console. Ensure non-www to www redirects, HTTPS protocols, and trailing slash rules are unified across all endpoints.",
      },
      {
        heading: "2. Structured Data and Schema Markup",
        content: "Structured JSON-LD schema helps Google understand your business entity, services, local presence, and customer reviews directly. Implementing Organization, LocalBusiness, and Service schema gives search crawlers explicit semantic clarity.",
      },
      {
        heading: "3. Core Web Vitals & Performance Monitoring",
        content: "Google uses Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) as ranking signals. Setting up continuous monitoring ensures performance regressions are caught before affecting organic rankings.",
      },
    ],
    keyTakeaways: [
      "Submit clean XML sitemaps before public marketing campaigns launch.",
      "Implement structured JSON-LD schema to communicate semantic business context.",
      "Monitor Core Web Vitals weekly to maintain search engine trust.",
    ],
  },
  "headless-shopify-vs-shopify-templates": {
    slug: "headless-shopify-vs-shopify-templates",
    title: "Headless Shopify vs Shopify templates: The performance breakdown",
    category: "E-Commerce Engineering",
    date: "June 05, 2026",
    readTime: "6 min read",
    author: "ConversionHouse Team",
    intro: "In modern e-commerce, site speed directly impacts bottom-line revenue. Every 100ms delay in page load time can reduce conversion rates by up to 7%. Headless commerce decouples the frontend presentation layer from the backend transactional engine.",
    sections: [
      {
        heading: "1. The Monolithic Liquid Bottleneck",
        content: "Standard Shopify Liquid templates load third-party app scripts, heavy CSS files, and unoptimized DOM trees on every navigation event. As an e-commerce brand scales and installs multiple marketing apps, page load speeds degrade significantly.",
      },
      {
        heading: "2. The Headless Advantage with Next.js",
        content: "By pairing Shopify's Storefront API with Next.js, product pages load instantaneously as pre-rendered static HTML with incremental static regeneration (ISR). Page transitions happen instantly in client memory without browser reloads.",
      },
      {
        heading: "3. Complete Frontend Flexibility for Custom Brand UX",
        content: "Headless storefronts give creative teams total freedom to build bespoke product configurators, custom interactive quiz flows, and fluid micro-interactions unconstrained by theme template boundaries.",
      },
    ],
    keyTakeaways: [
      "Headless architecture eliminates app script bloat and boosts Core Web Vitals.",
      "Sub-second page transitions keep customers engaged through product discovery.",
      "Decoupled frontend development allows rapid experimentation without backend risk.",
    ],
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

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-white text-black pt-32 pb-24 border-t border-neutral-100">
      <div className="container-x max-w-4xl">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-[#ff4500] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> [ BACK TO INSIGHTS ]
        </Link>

        {/* Article Meta */}
        <div className="mb-10 space-y-4">
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="bg-[#ff4500]/10 text-[#ff4500] px-3 py-1 rounded-full font-semibold">
              {article.category}
            </span>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readTime}
            </span>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-500">{article.date}</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl text-black leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="text-xs font-mono text-neutral-400 pt-2 border-b border-neutral-200/80 pb-6">
            By <span className="text-black font-semibold">{article.author}</span>
          </div>
        </div>

        {/* Lead Intro */}
        <div className="bg-neutral-50 border border-neutral-200/80 p-8 rounded-2xl mb-12 shadow-sm">
          <p className="text-base sm:text-lg text-neutral-800 leading-relaxed font-sans font-medium italic">
            "{article.intro}"
          </p>
        </div>

        {/* Main Body Sections */}
        <div className="space-y-10 text-neutral-700 leading-relaxed font-sans text-base">
          {article.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="font-display font-bold text-2xl text-black tracking-tight">
                {section.heading}
              </h2>
              <p className="leading-relaxed text-neutral-600">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Key Takeaways */}
        <div className="mt-16 bg-neutral-950 text-white p-8 sm:p-10 rounded-3xl space-y-4">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest block">[ KEY TAKEAWAYS ]</span>
          <ul className="space-y-3">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                <span className="text-[#ff4500] font-mono">0{idx + 1}.</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-xl text-black">Want to discuss your digital presence?</h3>
            <p className="text-xs text-neutral-500 mt-1">Let me help you build a system that performs.</p>
          </div>
          <Link
            href="/contact"
            className="bg-black hover:bg-[#ff4500] text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-colors flex items-center gap-2 shrink-0"
          >
            Get a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}
