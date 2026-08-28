import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, ArrowRight, ExternalLink } from "lucide-react";

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
    name: "SHEEN",
    headline: "From brand identity to digital launch.",
    objective: "Sheen wanted to introduce a new mobile car-care experience to Mysuru. ConversionHouse helped bring the brand to life across the places customers would actually encounter it — building the identity, vehicle branding, digital presence, and Meta acquisition campaigns.",
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
    name: "RACE DIVISION",
    headline: "A website built to be found.",
    objective: "Race Division needed more than an attractive website. The objective was to create a digital presence capable of competing for relevant search queries while communicating the business clearly.",
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
    name: "IRANI MOTOHUB",
    headline: "E-commerce without the limitations of a traditional storefront.",
    objective: "Irani MotoHub needed a modern e-commerce experience built on Shopify while giving the frontend greater flexibility, speed, and premium product interaction.",
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

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = STUDIES[slug];

  if (!study) {
    notFound();
  }

  return (
    <main className="bg-white text-black pt-32 pb-24 border-t border-neutral-100">
      <div className="container-x">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-[#ff4500] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> [ BACK TO WORK ]
        </Link>

        {/* Hero Detail Header */}
        <div className="border-b border-neutral-200/80 pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Selected Project Case Study ]</span>
            <h1 className="font-display font-bold text-4xl sm:text-6xl text-black leading-tight mt-2 mb-3">
              {study.name}
            </h1>
            <p className="text-xl text-neutral-700 font-display max-w-3xl leading-relaxed">
              {study.headline}
            </p>
          </div>
          <a
            href={study.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#ff4500] hover:bg-[#e03d00] text-white text-xs font-mono uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shrink-0 font-semibold shadow-sm"
          >
            Visit {study.website} <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Hero Mockup Image Showcase - Full Uncropped View */}
        <div className="w-full rounded-3xl overflow-hidden shadow-lg border border-neutral-200/80 mb-16 bg-neutral-950 p-2 sm:p-4 flex items-center justify-center">
          <img
            src={study.heroImage}
            alt={study.name}
            className="w-full h-auto max-h-[700px] object-contain rounded-2xl"
          />
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#ff4500] mb-4">Context & Objective</h2>
              <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                {study.objective}
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200/80 p-8 rounded-2xl">
              <span className="text-xs font-mono uppercase text-neutral-400 block mb-2">Core Philosophy</span>
              <p className="font-display text-lg sm:text-xl font-medium text-black">
                "{study.statement}"
              </p>
            </div>

            {/* Brand & Interface Assets (Only shown when distinct extra gallery images exist, like SHEEN) */}
            {study.galleryImages && study.galleryImages.length > 0 && (
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-[#ff4500] mb-6">Brand & Interface Assets</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {study.galleryImages.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl overflow-hidden border border-neutral-200/80 shadow-sm bg-neutral-950 p-2 flex items-center justify-center"
                    >
                      <img
                        src={imgSrc}
                        alt={`${study.name} Asset ${idx + 1}`}
                        className="w-full h-auto max-h-[380px] object-contain rounded-xl"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#ff4500] mb-6">Key Outcomes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {study.results.map((res) => (
                  <div key={res.title} className="border border-neutral-200/80 p-6 rounded-2xl bg-neutral-50/50 shadow-sm">
                    <h3 className="font-display font-semibold text-base text-black mb-2">{res.title}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">{res.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Steps */}
          <div className="lg:col-span-4 space-y-6 bg-neutral-50 border border-neutral-200/80 p-6 md:p-8 rounded-2xl h-fit shadow-sm">
            <h3 className="text-xs font-mono uppercase text-[#ff4500] tracking-wider mb-4">What We Shipped</h3>
            <div className="space-y-6">
              {study.bullets.map((b) => (
                <div key={b.category} className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-black tracking-widest font-semibold">{b.category}</h4>
                  <ul className="space-y-2 text-xs text-neutral-600 pl-4 border-l border-neutral-200">
                    {b.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#ff4500] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-20 border-t border-neutral-200/80 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-neutral-600 text-xs md:text-sm">
            Building something serious? We take a limited number of new engagements each year.
          </p>
          <Link
            href="/contact"
            className="bg-black hover:bg-[#ff4500] text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-colors flex items-center gap-2"
          >
            Get a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}
