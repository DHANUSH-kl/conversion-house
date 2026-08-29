import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, ArrowRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG, getCanonicalUrl } from "@/lib/seo";
import { getCreativeWorkSchema, getBreadcrumbSchema } from "@/lib/structured-data";

interface CaseStudy {
  slug: string;
  name: string;
  headline: string;
  objective: string;
  website: string;
  url: string;
  heroImage: string;
  galleryImages: string[];
  bullets: {
    category: string;
    items: string[];
  }[];
  statement: string;
  results: {
    title: string;
    desc: string;
  }[];
}

const STUDIES: Record<string, CaseStudy> = {
  sheen: {
    slug: "sheen",
    name: "SHEEN — Mobile Car Care",
    headline: "From brand identity to digital launch & Meta advertising.",
    objective:
      "Sheen wanted to introduce a new mobile car-care experience to Mysuru. ConversionHouse helped bring the brand to life across the places customers would actually encounter it — building the identity, vehicle branding, digital presence, and Meta acquisition campaigns.",
    website: "sheen.co.in",
    url: "https://sheen.co.in",
    heroImage: "/a look at work/sheen landing page mockup (Digital Experiences).jpeg",
    galleryImages: [
      "/a look at work/sheen logo mockup (branding).jpeg",
      "/a look at work/sheen van mockup (branding).jpeg",
      "/a look at work/sheen visiting card mockup (branding).jpeg",
    ],
    bullets: [
      {
        category: "Branding & Visuals",
        items: ["Logo design", "Brand identity system", "Mobile service vehicle graphics", "Business stationery"],
      },
      {
        category: "Digital Platform",
        items: ["Website design & development", "Mobile-first booking UX"],
      },
      {
        category: "Growth & Acquisition",
        items: ["Meta Ads campaigns", "Social creatives & video ad hooks"],
      },
    ],
    statement: "We didn't just design the brand. We built the identity, digital presence and acquisition foundation around it.",
    results: [
      { title: "Brand Identity", desc: "Created a recognisable visual system across digital and physical touchpoints." },
      { title: "Digital Presence", desc: "Built the website around the new service proposition and Mysuru market launch." },
      { title: "Customer Acquisition", desc: "Launched paid social campaigns and creative assets targeting vehicle owners." },
    ],
  },
  "race-division": {
    slug: "race-division",
    name: "RACE DIVISION — Performance Digital",
    headline: "A high-performance website built for search visibility.",
    objective:
      "Race Division needed more than an attractive website. The objective was to create a digital presence capable of competing for relevant search queries while communicating the business clearly.",
    website: "racedivision.in",
    url: "https://racedivision.in",
    heroImage: "/a look at work/racedivision lanind page mockup (Digital Experiences).jpeg",
    galleryImages: [],
    bullets: [
      {
        category: "What we did",
        items: [
          "Website design & UX",
          "Custom Next.js development",
          "SEO-first architecture",
          "On-page & Technical SEO",
          "Core Web Vitals performance optimization",
        ],
      },
    ],
    statement: "Built for people. Structured for search. Optimized for performance.",
    results: [
      { title: "SEO Keywords", desc: "Ranking for relevant generic search queries in high-intent categories." },
      { title: "Query Performance", desc: "Custom structured tags enabling higher organic click-through rates." },
    ],
  },
  "irani-motohub": {
    slug: "irani-motohub",
    name: "IRANI MOTOHUB — Headless E-Commerce",
    headline: "E-commerce storefront designed to convert & sell.",
    objective:
      "Irani MotoHub needed a modern e-commerce experience built on Shopify while giving the frontend greater flexibility, speed, and premium product interaction.",
    website: "iranimotohub.in",
    url: "https://iranimotohub.in",
    heroImage: "/a look at work/iranimotohub shopify website mockup (Digital Experiences).jpeg",
    galleryImages: [],
    bullets: [
      {
        category: "What we did",
        items: [
          "Headless Shopify storefront",
          "Custom React frontend architecture",
          "Product & Collection UX design",
          "SEO implementation & metadata",
          "Performance optimization & analytics tracking",
        ],
      },
    ],
    statement: "A headless Shopify experience designed to give the brand more control over performance, experience and future growth.",
    results: [
      { title: "Modular Architecture", desc: "Headless content management system decoupling backend Shopify administration." },
      { title: "Storefront Performance", desc: "Optimized storefront speeds yielding lower customer bounce rates." },
    ],
  },
};

export async function generateStaticParams() {
  return [
    { slug: "sheen" },
    { slug: "race-division" },
    { slug: "irani-motohub" },
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = STUDIES[slug];

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  const canonicalUrl = getCanonicalUrl(`/work/${study.slug}`);
  const ogImageUrl = study.heroImage.startsWith("http")
    ? study.heroImage
    : `${SITE_CONFIG.url}${study.heroImage}`;

  return {
    title: `${study.name} Case Study`,
    description: study.objective,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${study.name} — ConversionHouse Case Study`,
      description: study.objective,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: "en_US",
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: study.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.name} — ConversionHouse Case Study`,
      description: study.objective,
      images: [ogImageUrl],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = STUDIES[slug];

  if (!study) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Work", item: "/work" },
    { name: study.name, item: `/work/${study.slug}` },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const workSchema = getCreativeWorkSchema({
    title: study.name,
    description: study.objective,
    url: `/work/${study.slug}`,
    image: study.heroImage,
  });

  return (
    <main className="bg-white text-black pt-32 pb-24 border-t border-neutral-100">
      <JsonLd data={[breadcrumbSchema, workSchema]} />

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
              <Link href="/work" className="hover:text-[#ff4500] transition-colors">
                Work
              </Link>
            </li>
            <li>/</li>
            <li className="text-black font-medium">{study.name}</li>
          </ol>
        </nav>

        {/* Back button */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#ff4500] hover:underline mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Case Studies
        </Link>

        {/* Case Study Header */}
        <div className="max-w-4xl mb-12 space-y-4">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Case Study ]</span>
          <h1 className="font-display font-semibold text-4xl sm:text-6xl text-black leading-tight tracking-tight">
            {study.name}
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-700 font-display leading-snug">
            {study.headline}
          </p>
          <div className="pt-2">
            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#ff4500] hover:underline font-semibold"
            >
              Visit Live Site ({study.website}) <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden border border-neutral-200 shadow-md mb-16 max-h-[520px] bg-neutral-950">
          <img
            src={study.heroImage}
            alt={`Hero banner showcase for ${study.name}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Objective & Scope */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Objective ]</span>
            <h2 className="font-display text-2xl sm:text-3xl text-black font-semibold">The Challenge</h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans">
              {study.objective}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6 bg-neutral-50 p-8 rounded-3xl border border-neutral-200/80">
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Scope of Work ]</span>
            <div className="space-y-4">
              {study.bullets.map((bGroup, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-xs font-mono text-black font-bold uppercase tracking-wider">{bGroup.category}</h3>
                  <ul className="space-y-1.5">
                    {bGroup.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2 text-xs text-neutral-600 font-sans">
                        <Check className="w-3.5 h-3.5 text-[#ff4500] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Statement */}
        <div className="bg-neutral-950 text-white p-8 md:p-12 rounded-3xl text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Core Takeaway ]</span>
          <p className="font-display text-2xl sm:text-3xl leading-snug">"{study.statement}"</p>
        </div>

        {/* Results Delivered */}
        <div className="mb-20 space-y-8">
          <div>
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Measured Outcomes ]</span>
            <h2 className="font-display text-3xl sm:text-4xl text-black mt-2 font-semibold">Results & Impact:</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {study.results.map((res, i) => (
              <div key={i} className="border border-neutral-200/80 p-6 rounded-2xl bg-neutral-50/50 space-y-2">
                <h3 className="font-display text-xl font-semibold text-black">{res.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{res.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contextual Links to Relevant Services */}
        <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-3xl mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">Related Capabilities</span>
            <h3 className="font-display text-xl font-semibold text-black mt-1">Looking for similar results?</h3>
            <p className="text-xs text-neutral-600 mt-1">Explore our Meta Ads, Lead Generation, and CRO services.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services/meta-ads"
              className="text-xs font-mono bg-white border border-neutral-300 px-4 py-2 rounded-full hover:border-[#ff4500] hover:text-[#ff4500] transition-colors"
            >
              Meta Ads Agency
            </Link>
            <Link
              href="/services/lead-generation"
              className="text-xs font-mono bg-white border border-neutral-300 px-4 py-2 rounded-full hover:border-[#ff4500] hover:text-[#ff4500] transition-colors"
            >
              Lead Generation
            </Link>
          </div>
        </div>

        {/* Next CTA */}
        <div className="text-center max-w-xl mx-auto space-y-6">
          <h2 className="font-display text-3xl text-black font-semibold">Want to build something similar?</h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-black hover:bg-[#ff4500] text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-colors"
          >
            Get a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}
