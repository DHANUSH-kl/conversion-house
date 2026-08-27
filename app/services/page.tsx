import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata = {
  title: "Services — ConversionHouse",
  description: "Branding, websites, e-commerce, SEO, paid advertising, conversion optimization and analytics under one roof.",
};

const SERVICES = [
  {
    title: "Branding",
    tag: "Build a brand people remember.",
    desc: "We create identities that give your business a clear presence across digital and physical touchpoints.",
    bullets: [
      "Logo design",
      "Brand identity setup",
      "Brand strategy development",
      "Full rebranding campaigns",
      "Visual identity systems & templates",
      "Brand guidelines & specs",
      "Social media visual identity",
      "Vehicle & physical store branding",
    ],
  },
  {
    title: "Websites",
    tag: "Not another template. A website built around your business.",
    desc: "We design and develop high-performance websites that communicate your value clearly, build trust and guide visitors towards action.",
    bullets: [
      "Website design strategy",
      "UX/UI custom layout design",
      "Next.js / custom responsive build",
      "High performance landing pages",
      "Conversion-focused layouts",
      "SEO-ready technical structure",
      "Core Web Vitals optimization",
      "Google Analytics 4 setup",
      "Website support & maintenance",
    ],
  },
  {
    title: "E-commerce",
    tag: "Build an online store that is made to sell.",
    desc: "From Shopify stores to advanced headless commerce experiences, we build e-commerce systems designed around performance, usability and growth.",
    bullets: [
      "Shopify customization & setup",
      "Headless Shopify store architecture",
      "Tailored custom frontend designs",
      "Product collection templates",
      "Cart & checkout optimization",
      "Technical store e-commerce SEO",
      "Integrations & payment gateways",
      "Advanced tracking & data tracking",
    ],
  },
  {
    title: "SEO",
    tag: "Get found when your customers are searching.",
    desc: "We build search visibility into your digital presence — then continuously improve it. We don't promise a magic ranking. We build the systems that give your business a better chance of earning sustainable search visibility.",
    bullets: [
      "Keyword research & maps",
      "SEO-first site architecture",
      "On-page layout optimizations",
      "Technical audits & indexing",
      "Local SEO maps optimization",
      "Content plans & page structures",
      "Search Console setup & reporting",
      "Google Business Profile settings",
      "Monthly SEO campaign tracking",
    ],
  },
  {
    title: "Paid Growth",
    tag: "Turn advertising spend into measurable opportunities.",
    desc: "We create, launch and optimize paid campaigns designed around your actual business goals. Meta ads strategy and Google ads setup.",
    bullets: [
      "Meta Ads campaign management",
      "Google Search keywords alignment",
      "Creative layout configurations",
      "Audience custom targeting segments",
      "Retargeting funnels setup",
      "Conversion tracking pixels integration",
      "Landing page visual optimizations",
      "Monthly ad performance reports",
    ],
  },
  {
    title: "Conversion Optimization (CRO)",
    tag: "More visitors aren't always the answer. Better conversion is.",
    desc: "We analyze how people interact with your digital experience and identify opportunities to turn more of that traffic into action.",
    bullets: [
      "Landing page optimizations",
      "CTA copy & positions alignment",
      "User session behavior analysis",
      "Lead forms optimization",
      "Checkout conversion rate tests",
      "Copy adjustments & key messaging",
      "Page hierarchy adjustments",
    ],
  },
  {
    title: "Analytics & Tracking",
    tag: "If you can't measure it, you can't improve it.",
    desc: "We connect the right analytics and tracking systems so you can understand where your customers come from, what they do and where they drop off.",
    bullets: [
      "Google Tag Manager custom events",
      "GA4 conversion custom settings",
      "E-commerce purchase trackers setup",
      "Form submission triggers setup",
      "User path drops dashboard",
    ],
  },
  {
    title: "Ongoing Support",
    tag: "Launching isn't the finish line. We don't disappear.",
    desc: "After your website goes live, we can continue supporting your business with website maintenance, SEO, Meta Ads, Google Ads, conversion optimization, performance improvements, analytics, and growth recommendations.",
    bullets: [
      "Monthly server health updates",
      "SEO indexing fixes",
      "Paid ads audience tuning",
      "Conversion tracking validations",
      "Growth updates and strategy sessions",
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
                  {s.bullets.map((b) => (
                    <div key={b} className="text-xs text-neutral-400 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#ff5722] shrink-0" />
                      <span>{b}</span>
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
