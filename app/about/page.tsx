import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG, getCanonicalUrl } from "@/lib/seo";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About ConversionHouse — Digital Growth Studio & Performance Agency",
  description:
    "Learn about ConversionHouse, a digital growth studio dedicated to closing the gap between looking good online and delivering measurable return on ad spend.",
  alternates: {
    canonical: getCanonicalUrl("/about"),
  },
  openGraph: {
    title: "About ConversionHouse — Digital Growth Studio & Performance Agency",
    description:
      "Learn about ConversionHouse, a digital growth studio dedicated to closing the gap between looking good online and delivering measurable return on ad spend.",
    url: getCanonicalUrl("/about"),
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`,
        width: 1200,
        height: 630,
        alt: "About ConversionHouse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About ConversionHouse — Digital Growth Studio & Performance Agency",
    description:
      "Learn about ConversionHouse, a digital growth studio dedicated to closing the gap between looking good online and delivering measurable return on ad spend.",
    images: [`${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`],
  },
};

const AUDIENCES = [
  { title: "Growing businesses", desc: "You already have something people want. Now your digital presence needs to catch up." },
  { title: "New businesses", desc: "You're launching and want to start with the right brand, website and growth foundation." },
  { title: "Service businesses", desc: "You need more qualified enquiries, bookings or calls." },
  { title: "E-commerce brands", desc: "You want a better storefront, stronger conversion and scalable acquisition." },
  { title: "Local businesses", desc: "You want customers to find you through Google, Maps, social and search." },
  { title: "Established brands", desc: "Your current website, branding or acquisition strategy is no longer keeping up with the business." },
  { title: "Founders", desc: "You know where you want to go but need the right team to build the digital system around it." },
];

const NOT_FOR = [
  "You only want the cheapest possible website.",
  "You're looking for a ₹5K logo with no strategic work.",
  "You expect guaranteed Google rankings.",
  "You want advertising without a realistic marketing budget.",
  "You're looking for someone to simply follow instructions without challenging bad ideas.",
  "You're not willing to invest in improving the business itself.",
];

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "About", item: "/about" },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About ConversionHouse",
    description: "ConversionHouse exists to close the gap between looking good online and performing well online.",
    url: getCanonicalUrl("/about"),
    mainEntity: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
  };

  return (
    <main className="bg-black text-white pt-32 pb-24">
      <JsonLd data={[breadcrumbSchema, aboutPageSchema]} />

      <div className="container-x">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <li>
              <Link href="/" className="hover:text-[#ff5722] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-white font-medium">About</li>
          </ol>
        </nav>

        {/* H1 header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[#ff5722] text-xs font-mono uppercase tracking-widest">[ Studio Identity ]</span>
          <h1 className="font-display text-4xl sm:text-6xl text-white leading-tight">
            We build with one question in mind: Will this actually help the business?
          </h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed pt-2">
            ConversionHouse was built on a simple premise: Most digital agencies sell deliverables like logos, websites, or ad packages without connecting them to actual revenue growth. We bridge brand, engineering, and performance marketing into one unified growth system.
          </p>
        </div>

        {/* Core Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-neutral-950 border border-neutral-900 p-8 rounded-3xl space-y-4">
            <span className="text-[#ff5722] text-xs font-mono uppercase tracking-widest">[ Who We Are ]</span>
            <h2 className="font-display text-2xl sm:text-3xl text-white">Pretty is good. Purpose is better.</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Design matters. Visual presence matters. But design without user intent is decoration. We build high-converting brand identities, fast Next.js & Shopify platforms, Meta Ads campaigns, and Google Ads setups built to convert attention into customers.
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-900 p-8 rounded-3xl space-y-4">
            <span className="text-[#ff5722] text-xs font-mono uppercase tracking-widest">[ How We Work ]</span>
            <h2 className="font-display text-2xl sm:text-3xl text-white">One dedicated partner accountable for growth.</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Instead of hiring separate agencies for branding, web development, SEO, Meta Ads, and CRO, ConversionHouse provides one dedicated team accountable for the overall outcome.
            </p>
          </div>
        </div>

        {/* Who We Work With */}
        <div className="mb-20 space-y-8">
          <div>
            <span className="text-[#ff5722] text-xs font-mono uppercase tracking-widest">[ Target Clients ]</span>
            <h2 className="font-display text-3xl sm:text-4xl text-white mt-2 font-semibold">Who we build for:</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AUDIENCES.map((aud, idx) => (
              <div key={idx} className="bg-neutral-950 border border-neutral-900 p-6 rounded-2xl space-y-2">
                <h3 className="font-display text-xl text-white font-semibold">{aud.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{aud.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Are NOT For */}
        <div className="mb-20 bg-neutral-950 border border-neutral-900 p-8 md:p-12 rounded-3xl space-y-6">
          <span className="text-[#ff5722] text-xs font-mono uppercase tracking-widest">[ Clear Expectations ]</span>
          <h2 className="font-display text-2xl sm:text-3xl text-white">Who we are NOT a good fit for:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NOT_FOR.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                <span className="text-[#ff5722] font-mono text-sm font-bold">✕</span>
                <p className="text-xs sm:text-sm text-neutral-300">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-xl mx-auto space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl text-white font-semibold">
            Ready to take digital growth seriously?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#ff5722] hover:bg-[#e64a19] text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-colors"
          >
            Get a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}
