import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG, getCanonicalUrl } from "@/lib/seo";
import { getBreadcrumbSchema, getServiceSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Performance Marketing & Digital Services",
  description:
    "Explore ConversionHouse performance marketing services: Meta Ads management, Google Ads PPC, high-intent lead generation, CRO, and UGC ad creative.",
  alternates: {
    canonical: getCanonicalUrl("/services"),
  },
  openGraph: {
    title: "Performance Marketing Services — ConversionHouse",
    description:
      "Meta Ads, Google Ads, Lead Generation, Conversion Rate Optimization, and UGC Ads built to drive measurable revenue growth.",
    url: getCanonicalUrl("/services"),
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`,
        width: 1200,
        height: 630,
        alt: "ConversionHouse Performance Marketing Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Performance Marketing Services — ConversionHouse",
    description:
      "Meta Ads, Google Ads, Lead Generation, Conversion Rate Optimization, and UGC Ads built to drive measurable revenue growth.",
    images: [`${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`],
  },
};

const COMMERCIAL_SERVICES = [
  {
    slug: "meta-ads",
    title: "Meta Ads Agency",
    tag: "Scale Facebook & Instagram Ads",
    desc: "Profitable media buying, visual ad creative, CAPI server-side tracking, and continuous audience optimization for predictable customer acquisition.",
    href: "/services/meta-ads",
  },
  {
    slug: "google-ads",
    title: "Google Ads Agency",
    tag: "Capture Buyer Search Intent",
    desc: "High-intent Search campaigns, Shopping feeds, and Performance Max setups optimized to capture active demand and minimize wasted CPC spend.",
    href: "/services/google-ads",
  },
  {
    slug: "lead-generation",
    title: "Lead Generation Agency",
    tag: "Predictable Lead Flow",
    desc: "End-to-end client acquisition engines combining targeted ads, mobile-first landing pages, and lead qualification workflows.",
    href: "/services/lead-generation",
  },
  {
    slug: "conversion-rate-optimization",
    title: "Conversion Rate Optimization (CRO)",
    tag: "Turn Clicks Into Customers",
    desc: "Behavior audits, heatmap analysis, UX wireframing, and page speed optimization to maximize your site's conversion rate.",
    href: "/services/conversion-rate-optimization",
  },
  {
    slug: "ugc-ads",
    title: "UGC Ads & Conversion Creative",
    tag: "Scroll-Stopping Ad Concepts",
    desc: "Direct-response video scripts, authentic user-generated content, motion graphics, and high-converting ad hooks built for social feeds.",
    href: "/services/ugc-ads",
  },
];

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  const mainServiceSchema = getServiceSchema({
    name: "ConversionHouse Growth Services",
    description: "Performance marketing, Meta Ads, Google Ads, Lead Generation, and CRO services.",
    url: "/services",
    serviceType: "Digital Marketing Agency",
  });

  return (
    <main className="bg-white text-black pt-32 pb-24 border-t border-neutral-100">
      <JsonLd data={[breadcrumbSchema, mainServiceSchema]} />

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
            <li className="text-black font-medium">Services</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Commercial Capabilities ]</span>
          <h1 className="font-display font-semibold text-4xl sm:text-6xl text-black leading-tight tracking-tight">
            Services built for <span className="text-[#ff4500] font-bold">measurable return on ad spend.</span>
          </h1>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
            Performance marketing, paid advertising, landing page design, lead generation, and conversion optimization under one roof. No fluff — just metrics that move your business forward.
          </p>
        </div>

        {/* Commercial Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {COMMERCIAL_SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="bg-neutral-50/80 border border-neutral-200/80 p-8 rounded-3xl flex flex-col justify-between group hover:border-[#ff4500] hover:shadow-xl transition-all duration-300"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4500] font-semibold block mb-3">
                  {s.tag}
                </span>
                <h2 className="font-display font-bold text-2xl text-black mb-4 group-hover:text-[#ff4500] transition-colors">
                  {s.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans mb-6">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/80 mt-auto flex items-center justify-between">
                <span className="text-xs font-sans font-semibold text-black group-hover:text-[#ff4500] flex items-center gap-1.5 transition-colors">
                  View Dedicated Service <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-black text-white p-10 md:p-14 rounded-3xl text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Tailored Growth Scope ]</span>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white">
            Need a custom growth system for your business?
          </h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto leading-relaxed">
            Tell us about your target lead volume or ad spend goals. We will build a customized proposal.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-block bg-[#ff4500] hover:bg-[#e03d00] text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
