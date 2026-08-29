import Link from "next/link";
import QuoteCalculator from "@/components/QuoteCalculator";
import { MessageSquare, Mail, Briefcase, LifeBuoy } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG, getCanonicalUrl } from "@/lib/seo";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact & Project Quote Calculator",
  description:
    "Contact ConversionHouse or calculate an estimated investment for Meta Ads, Google Ads, website development, e-commerce, or CRO.",
  alternates: {
    canonical: getCanonicalUrl("/contact"),
  },
  openGraph: {
    title: "Contact & Project Quote Calculator — ConversionHouse",
    description:
      "Contact ConversionHouse or calculate an estimated investment for Meta Ads, Google Ads, website development, e-commerce, or CRO.",
    url: getCanonicalUrl("/contact"),
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`,
        width: 1200,
        height: 630,
        alt: "Contact ConversionHouse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Project Quote Calculator — ConversionHouse",
    description:
      "Contact ConversionHouse or calculate an estimated investment for Meta Ads, Google Ads, website development, e-commerce, or CRO.",
    images: [`${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`],
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Contact", item: "/contact" },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact ConversionHouse",
    description: "Get in touch or calculate a project estimate.",
    url: getCanonicalUrl("/contact"),
    mainEntity: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
  };

  const contactChannels = [
    {
      title: "General Inquiries",
      email: "contact@conversionhouse.in",
      desc: "For general questions, studio info, and introduction calls.",
      icon: Mail,
    },
    {
      title: "New Projects & Scope",
      email: "projects@conversionhouse.in",
      desc: "Ready to start a performance marketing campaign, Meta Ads, website, or growth system?",
      icon: Briefcase,
    },
    {
      title: "Client Support & Maintenance",
      email: "support@conversionhouse.in",
      desc: "For ongoing optimization, analytics, and retainer updates.",
      icon: LifeBuoy,
    },
  ];

  return (
    <main className="bg-white text-black pt-32 pb-24 border-t border-neutral-100">
      <JsonLd data={[breadcrumbSchema, contactPageSchema]} />

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
            <li className="text-black font-medium">Contact</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Estimate & Contact ]</span>
          <h1 className="font-display font-semibold text-4xl sm:text-6xl text-black leading-tight tracking-tight">
            Let's talk about <span className="text-[#ff4500] font-bold">your project.</span>
          </h1>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
            Use our interactive quote calculator below to select your requirements and calculate an estimated investment, or reach out to our team directly.
          </p>
        </div>

        {/* Interactive Quote Calculator */}
        <div className="mb-20">
          <QuoteCalculator />
        </div>

        {/* Direct Contact Channels */}
        <div className="border-t border-neutral-100 pt-16 space-y-8">
          <div>
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Direct Channels ]</span>
            <h2 className="font-display font-semibold text-3xl text-black mt-2">
              Reach out directly:
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactChannels.map((channel, idx) => {
              const Icon = channel.icon;
              return (
                <div
                  key={idx}
                  className="bg-neutral-50/70 border border-neutral-200/80 p-6 rounded-2xl space-y-3"
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#ff4500]" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-black">{channel.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-sans">{channel.desc}</p>
                  <div className="pt-2">
                    <a
                      href={`mailto:${channel.email}`}
                      className="text-xs font-mono text-[#ff4500] hover:underline font-semibold"
                    >
                      {channel.email}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick WhatsApp Banner */}
          <div className="bg-neutral-950 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-3xl mx-auto mt-12">
            <div>
              <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest block mb-1">
                Fast Response
              </span>
              <h3 className="font-display text-xl font-semibold text-white">Prefer to chat on WhatsApp?</h3>
              <p className="text-xs text-neutral-400 mt-1">Get immediate project feedback from our team.</p>
            </div>
            <a
              href="https://wa.me/919900447762"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ff4500] hover:bg-[#e03d00] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-colors flex items-center gap-2 shrink-0"
            >
              <MessageSquare className="w-4 h-4" /> Message Us on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
