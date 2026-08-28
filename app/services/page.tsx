import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata = {
  title: "Services — ConversionHouse",
  description: "Branding, websites, e-commerce, SEO, paid advertising, conversion optimization and analytics under one roof.",
};

const SERVICES = [
  {
    title: "Branding & Rebranding",
    tag: "Make them remember you.",
    desc: "We create identities that give your business a clear presence across digital and physical touchpoints.",
    engagement: "Typical engagement ₹35K – ₹1.5L",
    cards: [
      { title: "Brand Identity", desc: "Logo, colour, typography and visual systems that make your brand recognizable." },
      { title: "Rebranding", desc: "Refresh how your business looks, feels and is perceived." },
      { title: "Visual Systems", desc: "Create a consistent language across every brand touchpoint." },
      { title: "Brand Applications", desc: "Social media, packaging, vehicles, marketing materials and more." },
    ],
  },
  {
    title: "Digital Experiences",
    tag: "Give them somewhere to go.",
    desc: "We turn your brand into fast, purposeful digital experiences built to earn trust and drive action.",
    engagement: "Typical engagement ₹25K – ₹1L+",
    cards: [
      { title: "Websites", desc: "Custom-designed websites built around your business and customers." },
      { title: "Landing Pages", desc: "Focused experiences designed around one clear action." },
      { title: "E-commerce", desc: "Scalable Shopify stores built for seamless shopping experiences." },
      { title: "Headless Commerce", desc: "High-performance Shopify storefronts with complete frontend flexibility." },
    ],
  },
  {
    title: "Visibility & Growth",
    tag: "Make sure they find you.",
    desc: "We put your business in front of the right people through search, social and performance-driven campaigns.",
    engagement: "Ongoing engagement ₹30K – ₹60K+ / month",
    cards: [
      { title: "SEO", desc: "Build sustainable organic visibility and attract relevant traffic." },
      { title: "Local SEO", desc: "Get discovered by customers searching for businesses like yours nearby." },
      { title: "Meta Ads", desc: "Reach the right audiences and turn attention into enquiries." },
      { title: "Google Ads", desc: "Capture high-intent searches when customers are ready to act." },
    ],
  },
  {
    title: "Conversion & Intelligence",
    tag: "Give them a reason to choose you.",
    desc: "We turn clicks into customers by understanding what people do, where they drop off and what makes them act.",
    engagement: "Engagements from ₹20K+",
    cards: [
      { title: "CRO", desc: "Remove friction and make more visitors take action." },
      { title: "Analytics", desc: "Understand how people actually interact with your digital experience." },
      { title: "Tracking", desc: "Measure the actions that matter — from clicks to enquiries and purchases." },
      { title: "Optimization", desc: "Test, learn and continuously improve what isn't performing." },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-black text-white pt-32 pb-24">
      <div className="container-x">
        
        {/* Intro */}
        <div className="max-w-3xl mb-20 space-y-4">
          <span className="text-[#ff5722] text-xs font-mono uppercase tracking-widest">[ Our Expertise ]</span>
          <h1 className="font-display text-4xl sm:text-6xl text-white leading-tight">
            Everything your business needs to grow online.
          </h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            Branding, websites, e-commerce, SEO, paid advertising, conversion optimization and analytics — under one roof.
          </p>
        </div>

        {/* Services List Breakdown */}
        <div className="space-y-16">
          {SERVICES.map((s, idx) => (
            <div
              key={s.title}
              className="border-b border-neutral-900 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-1 text-xs font-mono text-[#ff5722]">
                0{idx + 1}
              </div>
              
              <div className="lg:col-span-5 space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl text-white">{s.title}</h2>
                <p className="text-xs font-mono text-[#ff5722]">{s.tag}</p>
                <p className="text-sm text-neutral-400 leading-relaxed">{s.desc}</p>
                <p className="text-xs font-mono text-neutral-500 pt-1">{s.engagement}</p>
                
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 hover:border-[#ff5722] px-6 py-3 rounded-full text-xs font-mono transition-all text-white"
                  >
                    Select Capability <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 bg-neutral-950 p-6 md:p-8 rounded-2xl border border-neutral-900">
                <h3 className="text-xs font-mono uppercase text-neutral-500 mb-4">Included Capabilities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {s.cards.map((c) => (
                    <div key={c.title} className="space-y-1">
                      <div className="text-xs text-white font-medium flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#ff5722] shrink-0" />
                        <span>{c.title}</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 pl-5 leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Guide Alert */}
        <div className="mt-20 bg-neutral-950 border border-neutral-900 p-8 rounded-2xl max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase text-[#ff5722] tracking-wider block">[ Investment Guide ]</span>
          <h3 className="font-display text-xl text-white">Investment Scope Framework</h3>
          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
            Projects typically start around ₹35K–₹40K, with most growth engagements in the ₹60K–₹1.5L+ range. Final scope and investment depend on your goals and requirements.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-block bg-[#ff5722] hover:bg-[#e64a19] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-colors"
            >
              Get Custom Quote
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
