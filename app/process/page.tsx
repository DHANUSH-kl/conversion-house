import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Process — ConversionHouse",
  description: "The ConversionHouse Growth Loop: From idea to growth. Build, measure, learn, improve, repeat.",
};

const STEPS = [
  {
    num: "01",
    title: "Discover",
    subtitle: "Understand before we build",
    desc: "We learn about your business, customers, competition, goals and current digital presence.",
  },
  {
    num: "02",
    title: "Define",
    subtitle: "Find what actually needs to change",
    desc: "We identify the positioning, user journey, growth opportunities and priorities that matter most.",
  },
  {
    num: "03",
    title: "Build",
    subtitle: "Turn strategy into something real",
    desc: "Brand identity, website, store, landing pages and tracking are designed and developed around the strategy.",
  },
  {
    num: "04",
    title: "Launch",
    subtitle: "Put it in front of the right people",
    desc: "We launch the digital experience, tracking and acquisition campaigns where required.",
  },
  {
    num: "05",
    title: "Measure",
    subtitle: "See what is actually happening",
    desc: "We track traffic, enquiries, conversions, rankings, campaign performance and user behaviour.",
  },
  {
    num: "06",
    title: "Optimize",
    subtitle: "Make what's working work harder",
    desc: "We use the data to improve SEO, advertising, conversion rates, performance and the overall customer journey.",
  },
];

export default function ProcessPage() {
  return (
    <main className="bg-black text-white pt-32 pb-24">
      <div className="container-x">
        
        {/* Intro */}
        <div className="max-w-3xl mb-20 space-y-4">
          <span className="text-[#ff5722] text-xs font-mono uppercase tracking-widest">[ Our Process ]</span>
          <h1 className="font-display text-4xl sm:text-6xl text-white leading-tight">
            From idea to growth.
          </h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            The ConversionHouse Growth Loop is an operating system designed around continuous validation. We connect strategy, execution, and tracking.
          </p>
        </div>

        {/* Growth Loop Visual Header */}
        <div className="bg-neutral-950 border border-neutral-900 rounded-3xl p-8 mb-16 text-center max-w-4xl mx-auto">
          <span className="text-[#ff5722] text-xs font-mono uppercase tracking-widest block mb-4">Underlying Philosophy</span>
          <h2 className="font-display text-3xl sm:text-5xl text-white tracking-tight">
            Build → Measure → Learn → Improve → Repeat.
          </h2>
          <p className="text-neutral-500 text-xs font-mono mt-4">
            This loop runs across every engagement: brand, website, e-commerce, SEO, ads, and optimization.
          </p>
        </div>

        {/* Steps display list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-neutral-950 border border-neutral-900 p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-[#ff5722] block mb-6">{step.num}</span>
                <h3 className="font-display text-2xl text-white mb-2">{step.title}</h3>
                <p className="text-xs text-[#ff5722] font-mono mb-4">{step.subtitle}</p>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed mt-4">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-neutral-900 pt-12 text-center max-w-lg mx-auto space-y-4">
          <p className="text-neutral-400 text-sm">
            Ready to deploy this growth framework to your business? Let's discuss.
          </p>
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
