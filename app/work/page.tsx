import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Selected Work — ConversionHouse",
  description: "A curated set of brand systems, websites, e-commerce and growth projects shipped for founders and leadership teams.",
};

const CASE_STUDIES = [
  {
    slug: "sheen",
    name: "SHEEN — Mobile Car Care",
    domain: "sheen.co.in",
    tag: "From brand identity to digital launch.",
    desc: "Sheen wanted to introduce a new mobile car-care experience to Mysuru. ConversionHouse helped bring the brand to life across physical and digital spaces — building the identity, digital presence, and Meta acquisition campaigns.",
    website: "sheen.co.in",
    url: "https://sheen.co.in",
    image: "/a look at work/sheen landing page mockup (Digital Experiences).jpeg",
    pills: ["Branding", "Web Development", "Meta Ads"],
  },
  {
    slug: "race-division",
    name: "RACE DIVISION — Performance Digital",
    domain: "racedivision.in",
    tag: "A website built to be found.",
    desc: "Race Division needed more than an attractive website. The objective was to create a high-performance digital presence capable of competing for search queries while communicating clearly and driving intent.",
    website: "racedivision.in",
    url: "https://racedivision.in",
    image: "/a look at work/racedivision lanind page mockup (Digital Experiences).jpeg",
    pills: ["Web Development", "SEO", "Performance"],
  },
  {
    slug: "irani-motohub",
    name: "IRANI MOTOHUB — E-Commerce",
    domain: "iranimotohub.in",
    tag: "E-commerce storefront designed to sell.",
    desc: "Irani MotoHub needed a modern e-commerce storefront built on Shopify while using headless technology for premium customer interactions, fast page loads, and seamless checkout journeys.",
    website: "iranimotohub.in",
    url: "https://iranimotohub.in",
    image: "/a look at work/iranimotohub shopify website mockup (Digital Experiences).jpeg",
    pills: ["E-Commerce", "Headless Shopify", "UX/UI"],
  },
];

export default function WorkPage() {
  return (
    <main className="bg-white text-black pt-32 pb-24 border-t border-neutral-100">
      <div className="container-x">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Portfolio ]</span>
          <h1 className="font-display text-4xl sm:text-6xl text-black font-semibold leading-tight tracking-tight">
            Select work from <span className="text-[#ff4500] font-bold">our projects.</span>
          </h1>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
            A curated set of brand systems, websites, e-commerce and growth projects shipped for founders and leadership teams. Each one starts with a business problem, not a moodboard.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.slug}
              className="border border-neutral-200/80 rounded-[32px] overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group"
            >
              {/* Top Image Mockup Showcase */}
              <div className="h-[240px] sm:h-[280px] w-full relative overflow-hidden bg-neutral-950 group/hero">
                <img
                  src={cs.image}
                  alt={cs.name}
                  className="w-full h-full object-cover group-hover/hero:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <span className="text-[11px] font-mono text-white bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20">
                    [ Live Platform ]
                  </span>
                  <span className="text-[11px] font-mono text-[#ff4500] bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#ff4500]/30 font-medium">
                    {cs.website}
                  </span>
                </div>
              </div>

              {/* Bottom Details */}
              <div className="p-7 flex flex-col justify-between flex-1 space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-[#ff4500] font-semibold uppercase tracking-wider block">
                    {cs.tag}
                  </span>
                  <h2 className="font-display font-bold text-2xl text-black tracking-normal group-hover:text-[#ff4500] transition-colors">
                    {cs.domain}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                    {cs.desc}
                  </p>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cs.pills.map((pill, pIdx) => (
                      <span
                        key={pill}
                        className={
                          pIdx === 0
                            ? "bg-[#ff4500] text-white text-[11px] font-semibold px-3 py-1 rounded-full"
                            : "bg-neutral-100 text-neutral-700 text-[11px] font-medium px-3 py-1 rounded-full"
                        }
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-neutral-100 flex items-center justify-between gap-4 flex-wrap mt-auto">
                  <Link
                    href={`/work/${cs.slug}`}
                    className="text-xs font-sans font-semibold text-black group-hover:text-[#ff4500] flex items-center gap-1.5 transition-colors"
                  >
                    View Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={cs.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-sans text-[#ff4500] hover:underline flex items-center gap-1.5 font-semibold"
                  >
                    Visit Website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Engagement CTA */}
        <div className="mt-24 bg-neutral-50 border border-neutral-200/80 p-8 md:p-12 rounded-3xl max-w-2xl mx-auto text-center space-y-6 shadow-sm">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ ENGAGEMENT LIMIT ]</span>
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-black">
            We take on a limited number of new engagements each year.
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Tell us about the brand, website, or growth system you're trying to build. We are ready to help you take digital seriously.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-black hover:bg-[#ff4500] text-white font-semibold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </main>
  );
}
