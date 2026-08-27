import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Selected Work — ConversionHouse",
  description: "A curated set of brand systems, websites, e-commerce and growth projects shipped for founders and leadership teams.",
};

const CASE_STUDIES = [
  {
    slug: "sheen",
    name: "SHEEN",
    tag: "From brand identity to digital launch.",
    desc: "Sheen wanted to introduce a new mobile car-care experience to Mysuru. ConversionHouse helped bring the brand to life across physical and digital spaces.",
  },
  {
    slug: "race-division",
    name: "RACE DIVISION",
    tag: "A website built to be found.",
    desc: "Race Division needed more than an attractive website. The objective was to compete for search queries while communicating the brand proposition.",
  },
  {
    slug: "irani-motohub",
    name: "IRANI MOTOHUB",
    tag: "E-commerce storefront designed to sell.",
    desc: "Irani MotoHub needed a modern e-commerce storefront built on Shopify while using headless technology for premium customer interactions.",
  },
];

export default function WorkPage() {
  return (
    <main className="bg-black text-white pt-32 pb-24">
      <div className="container-x">
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[#ff5722] text-xs font-mono uppercase tracking-widest">[ Portfolio ]</span>
          <h1 className="font-display text-4xl sm:text-6xl text-white leading-tight">
            Select work from our projects.
          </h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            A curated set of brand systems, websites, e-commerce and growth projects shipped for founders and leadership teams. Each one starts with a business problem, not a moodboard.
          </p>
        </div>

        {/* Filter Placeholder UI */}
        <div className="flex flex-wrap gap-4 border-b border-neutral-900 pb-8 mb-12 text-xs font-mono">
          <span className="text-[#ff5722] border-b border-[#ff5722] pb-1 cursor-pointer">All Work</span>
          <span className="text-neutral-500 hover:text-white cursor-pointer transition-colors">Branding</span>
          <span className="text-neutral-500 hover:text-white cursor-pointer transition-colors">Websites</span>
          <span className="text-neutral-500 hover:text-white cursor-pointer transition-colors">E-commerce</span>
          <span className="text-neutral-500 hover:text-white cursor-pointer transition-colors">Paid Ads</span>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.slug}
              className="bg-neutral-950 border border-neutral-900 p-8 rounded-2xl flex flex-col justify-between group hover:border-[#ff5722] transition-colors"
            >
              <div>
                <h2 className="font-display text-2xl text-white mb-2 group-hover:text-[#ff5722] transition-colors">
                  {cs.name}
                </h2>
                <p className="text-xs font-mono text-[#ff5722] mb-4">{cs.tag}</p>
                <p className="text-sm text-neutral-400 leading-relaxed mb-8">{cs.desc}</p>
              </div>
              <Link
                href={`/work/${cs.slug}`}
                className="text-xs font-mono uppercase text-white group-hover:text-[#ff5722] flex items-center gap-1.5 transition-colors mt-auto"
              >
                View Case Study <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* Engagement CTA */}
        <div className="mt-24 bg-neutral-950 border border-neutral-900 p-8 md:p-12 rounded-3xl max-w-2xl mx-auto text-center space-y-6">
          <span className="text-[#ff5722] text-xs font-mono uppercase tracking-widest">[ ENGAGEMENT LIMIT ]</span>
          <h2 className="font-display text-2xl md:text-3xl text-white">
            We take on a limited number of new engagements each year.
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Tell us about the brand, website, or growth system you're trying to build. We are ready to help you take digital seriously.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#ff5722] hover:bg-[#e64a19] text-white font-semibold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </main>
  );
}
