import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata = {
  title: "About Us — ConversionHouse",
  description: "ConversionHouse exists to close the gap between looking good online and performing well online.",
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
  return (
    <main className="bg-black text-white pt-32 pb-24">
      <div className="container-x">
        
        {/* H1 header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[#ff5722] text-xs font-mono uppercase tracking-widest">[ Studio Identity ]</span>
          <h1 className="font-display text-4xl sm:text-6xl text-white leading-tight">
            We build with one question in mind: Will this actually help the business?
          </h1>
        </div>

        {/* Section 1: Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 border-t border-neutral-900">
          <div className="lg:col-span-4 text-xs font-mono text-[#ff5722] uppercase">
            [ 01 — Studio ]
          </div>
          <div className="lg:col-span-8 space-y-6 text-neutral-400 text-sm md:text-base leading-relaxed">
            <p className="font-display text-xl text-white">
              ConversionHouse exists to close the gap between looking good online and performing well online.
            </p>
            <p>
              We bring together creative thinking, technology and digital growth to help businesses build stronger brands, better experiences and more effective customer journeys.
            </p>
            <p>
              We believe your website shouldn't just tell people who you are. It should help them understand: Why you? Why now? What should I do next? And your marketing shouldn't simply generate traffic. It should create opportunities.
            </p>
          </div>
        </div>

        {/* Section 2: Story / Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 border-t border-neutral-900 bg-neutral-950/40 p-6 md:p-8 rounded-2xl">
          <div className="lg:col-span-4 text-xs font-mono text-[#ff5722] uppercase">
            [ 02 — Philosophy ]
          </div>
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-display text-3xl text-white">
              Pretty is good. Purpose is better.
            </h2>
            <div className="text-neutral-400 text-sm space-y-4 max-w-xl leading-relaxed">
              <p>
                A beautiful brand that nobody remembers isn't enough. A fast website that nobody understands isn't enough. Traffic that doesn't convert isn't enough. We believe every decision should have a reason.
              </p>
              <div className="space-y-2 text-xs font-mono text-[#ff5722] pl-4 border-l border-neutral-800">
                <p>• Strategy informs design.</p>
                <p>• Design supports experience.</p>
                <p>• Technology enables performance.</p>
                <p>• Marketing creates demand.</p>
                <p>• Data tells us what to improve.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Who we work with */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 border-t border-neutral-900">
          <div className="lg:col-span-4 text-xs font-mono text-[#ff5722] uppercase">
            [ 03 — Alignment ]
          </div>
          
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="font-display text-2xl text-white mb-6">Suitable For</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {AUDIENCES.map((aud) => (
                  <div key={aud.title} className="bg-neutral-950 border border-neutral-900 p-6 rounded-xl">
                    <h3 className="font-display text-base text-white mb-2">{aud.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">{aud.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-900 p-6 md:p-8 rounded-2xl">
              <h3 className="font-display text-lg text-[#ff5722] mb-6">
                We're probably not the right fit if...
              </h3>
              <ul className="space-y-3">
                {NOT_FOR.map((item, idx) => (
                  <li key={idx} className="text-xs text-neutral-400 flex items-start gap-2.5">
                    <span className="text-neutral-600 font-semibold">[✕]</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="border-t border-neutral-900 pt-6 mt-6">
                <p className="text-xs italic text-neutral-500">
                  "We'd rather build something meaningful with the right clients than take every project that comes our way."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Client Support */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 border-t border-neutral-900">
          <div className="lg:col-span-4 text-xs font-mono text-[#ff5722] uppercase">
            [ 04 — Ongoing Support ]
          </div>
          <div className="lg:col-span-8 space-y-6 text-neutral-400 text-sm leading-relaxed">
            <p>
              Your website going live shouldn't mean your relationship with us ends. Depending on your requirements, ConversionHouse can continue working with you through SEO, paid advertising, website maintenance, conversion optimization, performance improvements, analytics, and strategy.
            </p>
            <div className="text-xs font-mono text-[#ff5722] uppercase tracking-wider mt-4">
              "Launch is not the end of the project. It's the beginning of growth."
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 border-t border-neutral-900 pt-12 text-center max-w-xl mx-auto space-y-4">
          <p className="text-neutral-400 text-sm">
            Working on something serious? Tell us about the brand, website, or growth system you're building.
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
