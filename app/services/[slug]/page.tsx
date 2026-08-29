import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Zap } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Accordion from "@/components/Accordion";
import { SERVICES_DATA } from "@/lib/services-data";
import { SITE_CONFIG, getCanonicalUrl } from "@/lib/seo";
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema } from "@/lib/structured-data";

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const canonicalUrl = getCanonicalUrl(`/services/${service.slug}`);

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.title} — ConversionHouse`,
      description: service.metaDescription,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} — ConversionHouse`,
      description: service.metaDescription,
      images: [`${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: service.title, item: `/services/${service.slug}` },
  ];

  const serviceSchema = getServiceSchema({
    name: service.title,
    description: service.summary,
    url: `/services/${service.slug}`,
    serviceType: service.serviceType,
  });

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = service.faqs.length > 0 ? getFAQSchema(service.faqs) : null;

  return (
    <main className="bg-white text-black pt-32 pb-24 border-t border-neutral-100">
      <JsonLd data={[serviceSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]} />

      <div className="container-x">
        {/* Breadcrumb Links */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <li>
              <Link href="/" className="hover:text-[#ff4500] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/services" className="hover:text-[#ff4500] transition-colors">
                Services
              </Link>
            </li>
            <li>/</li>
            <li className="text-black font-medium">{service.title}</li>
          </ol>
        </nav>

        {/* Back link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#ff4500] hover:underline mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Services
        </Link>

        {/* Hero Header */}
        <div className="max-w-4xl mb-16 space-y-4">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ {service.serviceType} ]</span>
          <h1 className="font-display font-semibold text-4xl sm:text-6xl text-black leading-tight tracking-tight">
            {service.title}
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-700 font-display leading-snug">
            {service.headline}
          </p>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-3xl pt-2">
            {service.summary}
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#ff4500] hover:bg-[#e03d00] text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-colors"
            >
              Get Started with {service.title} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Problems Addressed */}
        <div className="mb-20 bg-neutral-950 text-white p-8 md:p-12 rounded-3xl space-y-6">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Problems We Eliminate ]</span>
          <h2 className="font-display text-2xl sm:text-3xl text-white">
            Common growth challenges this service solves:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {service.problemsAddressed.map((prob, i) => (
              <div key={i} className="flex items-start gap-3 bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
                <ShieldCheck className="w-5 h-5 text-[#ff4500] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{prob}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities Breakdown */}
        <div className="mb-20 space-y-8">
          <div>
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Service Deliverables ]</span>
            <h2 className="font-display text-3xl sm:text-4xl text-black mt-2 font-semibold">
              What we build & deliver:
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {service.capabilities.map((cap, i) => (
              <div key={i} className="border border-neutral-200/80 p-6 rounded-2xl bg-neutral-50/50 space-y-2">
                <h3 className="font-display text-xl font-semibold text-black">{cap.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Step Process */}
        <div className="mb-20 space-y-8 border-t border-neutral-100 pt-16">
          <div>
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Execution Roadmap ]</span>
            <h2 className="font-display text-3xl sm:text-4xl text-black mt-2 font-semibold">
              Our 4-step implementation process:
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {service.processSteps.map((proc) => (
              <div key={proc.step} className="border border-neutral-200 p-6 rounded-2xl bg-white space-y-3">
                <span className="text-xs font-mono text-[#ff4500] block">{proc.step}</span>
                <h3 className="font-display text-lg font-semibold text-black">{proc.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Business Outcomes */}
        <div className="mb-20 bg-neutral-50 border border-neutral-200/80 p-8 rounded-3xl space-y-6">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Measurable Outcomes ]</span>
          <h2 className="font-display text-2xl sm:text-3xl text-black">What your business gains:</h2>
          <ul className="space-y-3">
            {service.outcomes.map((out, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-neutral-700">
                <Check className="w-4 h-4 text-[#ff4500] shrink-0" />
                <span>{out}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQs */}
        {service.faqs.length > 0 && (
          <div className="mb-20 border-t border-neutral-100 pt-16 space-y-6">
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest block">[ Common Questions ]</span>
            <h2 className="font-display text-3xl text-black font-semibold">Frequently Asked Questions</h2>
            <Accordion items={service.faqs} />
          </div>
        )}

        {/* CTA */}
        <div className="bg-black text-white p-10 md:p-14 rounded-3xl text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Ready to grow? ]</span>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white">
            Let's build your {service.title} strategy.
          </h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto">
            Get an estimated scope and campaign strategy tailored to your growth targets.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-block bg-[#ff4500] hover:bg-[#e03d00] text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-colors"
            >
              Get Your Estimate
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
