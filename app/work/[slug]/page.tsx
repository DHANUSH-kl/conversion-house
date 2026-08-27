import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";

interface CaseStudy {
  slug: string;
  name: string;
  headline: string;
  objective: string;
  bullets: {
    category: string;
    items: string[];
  }[];
  statement: string;
  results: {
    title: string;
    desc: string;
    metric?: string;
  }[];
}

const STUDIES: Record<string, CaseStudy> = {
  sheen: {
    slug: "sheen",
    name: "SHEEN",
    headline: "From brand identity to digital launch.",
    objective: "Sheen wanted to introduce a new mobile car-care experience to Mysuru. ConversionHouse helped bring the brand to life across the places customers would actually encounter it.",
    bullets: [
      {
        category: "Branding",
        items: ["Logo design", "Brand identity", "Vehicle branding", "Mobile service vehicle design"],
      },
      {
        category: "Digital",
        items: ["Website design & development"],
      },
      {
        category: "Growth",
        items: ["Meta Ads", "Social creatives"],
      },
    ],
    statement: "We didn't just design the brand. We built the identity, digital presence and acquisition foundation around it.",
    results: [
      { title: "Brand Identity", desc: "Created a recognisable visual system across digital and physical touchpoints." },
      { title: "Digital Presence", desc: "Built the website around the new service proposition." },
      { title: "Customer Acquisition", desc: "Launched paid social campaigns and creative assets." },
    ],
  },
  "race-division": {
    slug: "race-division",
    name: "RACE DIVISION",
    headline: "A website built to be found.",
    objective: "Race Division needed more than an attractive website. The objective was to create a digital presence capable of competing for relevant search queries while communicating the business clearly.",
    bullets: [
      {
        category: "What we did",
        items: [
          "Website design",
          "Website development",
          "SEO-first architecture",
          "On-page SEO",
          "Technical SEO",
          "Performance optimization",
        ],
      },
    ],
    statement: "Built for people. Structured for search. Optimized for performance.",
    results: [
      { title: "SEO Keywords", desc: "Ranking for relevant generic search queries." },
      { title: "Query Performance", desc: "Custom structured tags enabling organic click through rates." },
    ],
  },
  "irani-motohub": {
    slug: "irani-motohub",
    name: "IRANI MOTOHUB",
    headline: "E-commerce without the limitations of a traditional storefront.",
    objective: "Irani MotoHub needed a modern e-commerce experience built on Shopify while giving the frontend greater flexibility and performance.",
    bullets: [
      {
        category: "What we did",
        items: [
          "Headless Shopify",
          "Custom frontend",
          "Shopify integration",
          "Product experience",
          "Collection experience",
          "SEO implementation",
          "Performance optimization",
          "Analytics",
        ],
      },
    ],
    statement: "A headless Shopify experience designed to give the brand more control over performance, experience and future growth.",
    results: [
      { title: "Modular Architecture", desc: "Headless content management system decoupling backend administration." },
      { title: "E-commerce Optimization", desc: "Optimized storefront speeds yielding minimal customer bounce rate." },
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
    <main className="bg-black text-white pt-32 pb-24">
      <div className="container-x">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#ff5722] mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> [ BACK TO WORK ]
        </Link>

        {/* Hero detail */}
        <div className="border-b border-neutral-900 pb-12 mb-12">
          <span className="text-[#ff5722] text-xs font-mono uppercase tracking-widest">[ Selected Project Case Study ]</span>
          <h1 className="font-display text-4xl sm:text-6xl text-white leading-tight mt-4 mb-6">
            {study.name}
          </h1>
          <p className="text-xl text-neutral-300 font-display max-w-3xl leading-relaxed">
            {study.headline}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main info */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#ff5722] mb-4">Context & Objective</h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                {study.objective}
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-900 p-8 rounded-2xl">
              <span className="text-xs font-mono uppercase text-neutral-500 block mb-2">Core Philosophy</span>
              <p className="font-display text-lg italic text-[#ff5722]">
                "{study.statement}"
              </p>
            </div>

            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#ff5722] mb-6">Results</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {study.results.map((res) => (
                  <div key={res.title} className="border border-neutral-900 p-6 rounded-xl bg-neutral-950/40">
                    <h3 className="font-display text-base text-white mb-2">{res.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">{res.desc}</p>
                    {/* Note: Use real metrics here when available */}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar steps */}
          <div className="lg:col-span-4 space-y-6 bg-neutral-950 border border-neutral-900 p-6 md:p-8 rounded-2xl h-fit">
            <h3 className="text-xs font-mono uppercase text-[#ff5722] tracking-wider mb-4">What We Shipped</h3>
            <div className="space-y-6">
              {study.bullets.map((b) => (
                <div key={b.category} className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-white tracking-widest">{b.category}</h4>
                  <ul className="space-y-1 text-xs text-neutral-400 pl-4 border-l border-neutral-900">
                    {b.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#ff5722] shrink-0" />
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
        <div className="mt-20 border-t border-neutral-900 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-neutral-400 text-xs md:text-sm">
            Building something serious? We take a limited number of new engagements each year.
          </p>
          <Link
            href="/contact"
            className="bg-[#ff5722] hover:bg-[#e64a19] text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-colors flex items-center gap-2"
          >
            Get a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}
