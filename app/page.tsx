"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Star, MessageSquare, ExternalLink, Target, Cpu, TrendingUp, Zap, Users, Rocket, ShieldCheck } from "lucide-react";
import Accordion from "@/components/Accordion";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, useScroll, useTransform } from "framer-motion";

// 1. HERO
const HERO_TITLE_LINE1 = "When someone searches for your business…";
const HERO_TITLE_LINE2 = "Do they find you?";
const HERO_SUBTITLE = "Or do they find your competitors first?";
const HERO_COPY =
  "We build the brand, website and growth systems that help businesses get discovered, get trusted and get chosen.";

// 2. CORE IDEA
const PILLARS = [
  {
    num: "01",
    title: "Be remembered",
    desc: "Build a brand people recognize and trust.",
  },
  {
    num: "02",
    title: "Be found",
    desc: "Build websites and digital experiences designed for search and discovery.",
  },
  {
    num: "03",
    title: "Be chosen",
    desc: "Turn visitors and attention into enquiries, leads and sales.",
  },
  {
    num: "04",
    title: "Keep growing",
    desc: "Use SEO, paid advertising, analytics and optimization to improve what happens next.",
  },
];

// 3. SERVICES
const SERVICES = [
  {
    title: "Branding & Rebranding",
    tag: "Make them remember you.",
    desc: "We create identities that give your business a clear presence across digital and physical touchpoints.",
    engagement: "Typical engagement ₹35K – ₹1.5L",
    cta: "Build My Brand",
    images: [
      "/a look at work/sheen logo mockup (branding).jpeg",
      "/a look at work/sheen van mockup (branding).jpeg",
      "/a look at work/sheen visiting card mockup (branding).jpeg",
    ],
  },
  {
    title: "Digital Experiences",
    tag: "Give them somewhere to go.",
    desc: "We turn your brand into fast, purposeful digital experiences built to earn trust and drive action.",
    engagement: "Typical engagement ₹25K – ₹1L+",
    cta: "Build My Website",
    images: [
      "/a look at work/sheen landing page mockup (Digital Experiences).jpeg",
      "/a look at work/racedivision lanind page mockup (Digital Experiences).jpeg",
      "/a look at work/iranimotohub shopify website mockup (Digital Experiences).jpeg",
      "/a look at work/rewio landing page mockup (Digital Experiences).jpeg",
    ],
  },
  {
    title: "Visibility & Growth",
    tag: "Make sure they find you.",
    desc: "We put your business in front of the right people through search, social and performance-driven campaigns.",
    engagement: "Ongoing engagement ₹30K – ₹60K+ / month",
    cta: "Grow My Business",
    images: [],
  },
  {
    title: "Conversion & Intelligence",
    tag: "Give them a reason to choose you.",
    desc: "We turn clicks into customers by understanding what people do, where they drop off and what makes them act.",
    engagement: "Engagements from ₹20K+",
    cta: "Improve My Results",
    images: [],
  },
];

// 4. WHY US
const WHY_US = [
  {
    title: "Built around your business",
    desc: "We don't force every business into the same package, template or strategy. Your actual goals determine what we build.",
    icon: Target,
    badge: "Custom Architecture",
  },
  {
    title: "Brand meets technology",
    desc: "Your branding shouldn't live separately from your website. Your website shouldn't live separately from your marketing. We connect the pieces.",
    icon: Cpu,
    badge: "Unified System",
  },
  {
    title: "Built for conversion",
    desc: "Design matters. But design without action is decoration. We build experiences around what you want the customer to do next.",
    icon: TrendingUp,
    badge: "Action Driven UX",
  },
  {
    title: "Search & performance from day 1",
    desc: "SEO, performance, analytics and conversion aren't things we bolt on after launch. They're considered while the experience is being built.",
    icon: Zap,
    badge: "Native SEO Engine",
  },
  {
    title: "One dedicated team",
    desc: "Branding. Design. Development. SEO. Ads. Optimization. One partner accountable for the outcome.",
    icon: Users,
    badge: "Single Partner",
  },
  {
    title: "We stay after launch",
    desc: "The launch is where most agencies finish. For us, it's where the next phase begins. You can continue working with us for ongoing growth.",
    icon: Rocket,
    badge: "Continuous Growth",
  },
  {
    title: "Straightforward communication",
    desc: "Clear scope. Clear deliverables. Clear timelines. Clear communication. No unnecessary agency jargon.",
    icon: ShieldCheck,
    badge: "Zero Jargon",
  },
];

const CASE_STUDIES = [
  {
    name: "sheen.co.in",
    title: "SHEEN — Mobile Car Care",
    badge: "LIVE • PUBLICLY AVAILABLE",
    tag: "From brand identity to digital launch.",
    desc: "Sheen wanted to introduce a new mobile car-care experience to Mysuru. ConversionHouse helped bring the brand to life across the places customers would actually encounter it — building the identity, digital presence, and Meta acquisition campaigns.",
    pills: ["Branding", "Web Development", "Meta Ads"],
    statement: "We didn't just design the brand. We built the identity, digital presence and acquisition foundation around it.",
    slug: "sheen",
    website: "sheen.co.in",
    url: "https://sheen.co.in",
    gradient: "from-[#1a1c1e] via-[#0d0e10] to-[#000000]",
    image: "/a look at work/sheen landing page mockup (Digital Experiences).jpeg",
  },
  {
    name: "racedivision.in",
    title: "RACE DIVISION — Performance Digital",
    badge: "LIVE • PUBLICLY AVAILABLE",
    tag: "A website built to be found.",
    desc: "Race Division needed more than an attractive website. The objective was to create a high-performance digital presence capable of competing for search queries while communicating clearly and driving intent.",
    pills: ["Web Development", "SEO", "Performance"],
    statement: "Built for people. Structured for search. Optimized for performance.",
    slug: "race-division",
    website: "racedivision.in",
    url: "https://racedivision.in",
    gradient: "from-[#0f172a] via-[#090d16] to-[#000000]",
    image: "/a look at work/racedivision lanind page mockup (Digital Experiences).jpeg",
  },
];

// 6. PROOF CARDS
const PROOF_CARDS = [
  { title: "Search Visibility", desc: "Organic rankings and search growth." },
  { title: "Lead Generation", desc: "Enquiries generated through paid campaigns and websites." },
  { title: "Performance", desc: "Website speed, technical health and Core Web Vitals." },
  { title: "Conversion", desc: "Improved enquiry or purchase journeys." },
  { title: "Business Growth", desc: "Sales, bookings or leads where clients allow public reporting." },
];

// 7. THE LOOP
const PROCESS_STEPS = [
  { num: "01", title: "Discover", subtitle: "Audit & Insight", desc: "We learn about your business, customers, competition, goals and current digital presence." },
  { num: "02", title: "Define", subtitle: "Positioning & Roadmap", desc: "We identify the positioning, user journey, growth opportunities and priorities that matter most." },
  { num: "03", title: "Build", subtitle: "Engineering & Design", desc: "Brand identity, website, store, landing pages and tracking are designed and developed around the strategy." },
  { num: "04", title: "Launch", subtitle: "Deployment & Tracking", desc: "We launch the digital experience, tracking and acquisition campaigns where required." },
  { num: "05", title: "Measure", subtitle: "Attribution & Data", desc: "We track traffic, enquiries, conversions, rankings, campaign performance and user behaviour." },
  { num: "06", title: "Optimize", subtitle: "Continuous Growth", desc: "We use data to improve SEO, advertising, conversion rates, performance and the overall customer journey." },
];

// 13. FAQ
const FAQ_ITEMS = [
  { question: "What does ConversionHouse do?", answer: "ConversionHouse helps businesses build and grow online through branding, website development, e-commerce, SEO, paid advertising and conversion optimization." },
  { question: "Do you only build websites?", answer: "No. A website is one part of what we do. We can also help with branding, SEO, Meta Ads, Google Ads, Shopify, analytics, conversion optimization and ongoing digital support." },
  { question: "Can I hire you for only one service?", answer: "Yes. You can work with us for an individual requirement such as a website, branding project, SEO or paid advertising." },
  { question: "Do you provide ongoing SEO?", answer: "Yes. We offer ongoing SEO focused on improving search visibility, technical health, content relevance and organic growth." },
  { question: "Do you manage Meta Ads?", answer: "Yes. We can handle campaign strategy, setup, targeting, creative direction, tracking, optimization and reporting. Ad spend is separate from our management fee." },
  { question: "Do you work with Shopify?", answer: "Yes. We work with Shopify and can build advanced headless Shopify experiences where the project requires greater control over the frontend, performance or customer experience." },
  { question: "Do you guarantee Google rankings?", answer: "No. Nobody can honestly guarantee a specific Google ranking. What we can do is build and continuously optimize the technical, content and authority foundations that improve your chances of earning sustainable search visibility." },
  { question: "How much does a project cost?", answer: "Every project is different. Instead of forcing every client into a fixed price, we calculate an estimated range based on the services and scope you select. Get a Quote to see your estimated investment." },
  { question: "Can you work with businesses outside India?", answer: "Yes. ConversionHouse works with businesses remotely and can support clients across different markets." },
  { question: "What happens after my website launches?", answer: "You can continue working with us for SEO, paid advertising, maintenance, analytics, conversion optimization and ongoing growth." },
  { question: "How long does a website take?", answer: "The timeline depends on the scope, number of pages, content, integrations and approval cycles. Once we understand your requirements, we'll provide a realistic timeline before development begins." },
];

interface TimelineRowProps {
  step: {
    num: string;
    title: string;
    subtitle: string;
    desc: string;
  };
  idx: number;
  total: number;
}

function TimelineRow({ step, idx, total }: TimelineRowProps) {
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 85%", "start 35%"],
  });
  const tickHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const isLast = idx === total - 1;

  return (
    <div
      ref={rowRef}
      className={`grid grid-cols-12 gap-2 sm:gap-4 md:gap-8 lg:gap-10 py-6 sm:py-10 md:py-14 ${
        !isLast ? "border-b border-neutral-100" : ""
      }`}
    >
      {/* Numeral column */}
      <div className="col-span-2 sm:col-span-2 lg:col-span-2 relative flex justify-start sm:justify-end pr-1 sm:pr-2">
        <div className="sticky top-24 md:top-32">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block font-display text-[32px] sm:text-[64px] md:text-[96px] lg:text-[112px] leading-none font-extralight select-none"
            style={{ color: "rgba(0,0,0,0.025)", WebkitTextStroke: "1.25px #d4d4d4" }}
          >
            {step.num}
          </motion.span>
        </div>
      </div>

      {/* Rail + content column */}
      <div className="col-span-10 sm:col-span-10 lg:col-span-10 flex gap-3 sm:gap-6 md:gap-10">
        <div className="relative w-px shrink-0 bg-neutral-100">
          <motion.div
            style={{ height: tickHeight }}
            className="absolute top-0 left-0 w-px bg-[#ff4500] origin-top"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="group max-w-2xl min-w-0"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
            <span className="text-[9px] sm:text-[10px] font-mono text-[#ff4500] uppercase tracking-[0.15em] sm:tracking-[0.2em] whitespace-nowrap">
              Stage {step.num}
            </span>
            <span className="w-3 sm:w-6 h-px bg-neutral-300" />
            <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
              {step.subtitle}
            </span>
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-[42px] text-black leading-[1.1] mb-2 sm:mb-3 transition-colors duration-500 group-hover:text-[#ff4500]">
            {step.title}
          </h3>

          <p className="text-xs sm:text-sm md:text-base text-neutral-500 leading-relaxed font-sans max-w-xl">
            {step.desc}
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-3 sm:mt-4 h-px w-10 sm:w-16 bg-neutral-200 origin-left group-hover:bg-[#ff4500] group-hover:w-16 sm:group-hover:w-24 transition-all duration-500"
          />
        </motion.div>
      </div>
    </div>
  );
}

function GrowthTimeline() {
  return (
    <div className="max-w-4xl mx-auto">
      {PROCESS_STEPS.map((step, idx) => (
        <TimelineRow key={step.num} step={step} idx={idx} total={PROCESS_STEPS.length} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-white text-black overflow-x-hidden">
      {/* A. HERO SECTION */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        <div className="container-x text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-black leading-tight mb-8">
              <span className="font-display block text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-semibold leading-tight mb-2">
                When people search for your business,
              </span>
              <span className="font-display block text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight">
                will <span className="text-[#ff4500] font-bold">they find you</span>{" "}
                <span className="text-black font-semibold">or your competitors?</span>
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
              We build the brand, website and growth systems that help businesses get discovered, get trusted and get chosen.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/contact"
                className="bg-[#ff4500] hover:bg-[#e03d00] text-white font-semibold px-8 py-4 rounded-full transition-colors flex items-center gap-2 group w-full sm:w-auto justify-center shadow-sm"
              >
                Get Your Estimate <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/work"
                className="btn-ghost font-semibold px-8 py-4 rounded-full w-full sm:w-auto text-center"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* A2. SHOWCASE CAROUSEL - "A look at the work." */}
      <section className="py-12 sm:py-16 overflow-hidden relative border-t border-neutral-100 bg-white">
        <ScrollReveal className="container-x mb-8 sm:mb-10 relative z-30">
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-black leading-none">
            A look at the <span className="text-[#ff4500] font-bold">work.</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

          <div className="flex overflow-hidden select-none">
            <motion.div
              className="flex gap-6 shrink-0 pr-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 35,
              }}
            >
              {[
                {
                  title: "Sheen Mobile Car Care",
                  type: "Brand Identity & Digital Launch",
                  src: "/a look at work/sheen landing page mockup (Digital Experiences).jpeg",
                },
                {
                  title: "Race Division",
                  type: "SEO & High-Performance Web",
                  src: "/a look at work/racedivision lanind page mockup (Digital Experiences).jpeg",
                },
                {
                  title: "Irani MotoHub",
                  type: "Shopify E-Commerce Storefront",
                  src: "/a look at work/iranimotohub shopify website mockup (Digital Experiences).jpeg",
                },
                {
                  title: "Join Our Tour",
                  type: "Travel & Experience Platform",
                  src: "/a look at work/join our tour website mockup.jpeg",
                },
                {
                  title: "Rewio",
                  type: "AI & Growth Platform",
                  src: "/a look at work/rewio landing page mockup (Digital Experiences).jpeg",
                },
                {
                  title: "Sheen Logo Identity",
                  type: "Visual Identity & Brand System",
                  src: "/a look at work/sheen logo mockup (branding).jpeg",
                },
                {
                  title: "Sheen Vehicle Branding",
                  type: "Fleet & Physical Brand System",
                  src: "/a look at work/sheen van mockup (branding).jpeg",
                },
                {
                  title: "Sheen Business Cards",
                  type: "Print & Stationery Collateral",
                  src: "/a look at work/sheen visiting card mockup (branding).jpeg",
                },
                {
                  title: "Sheen Mobile Car Care",
                  type: "Brand Identity & Digital Launch",
                  src: "/a look at work/sheen landing page mockup (Digital Experiences).jpeg",
                },
                {
                  title: "Race Division",
                  type: "SEO & High-Performance Web",
                  src: "/a look at work/racedivision lanind page mockup (Digital Experiences).jpeg",
                },
                {
                  title: "Irani MotoHub",
                  type: "Shopify E-Commerce Storefront",
                  src: "/a look at work/iranimotohub shopify website mockup (Digital Experiences).jpeg",
                },
                {
                  title: "Join Our Tour",
                  type: "Travel & Experience Platform",
                  src: "/a look at work/join our tour website mockup.jpeg",
                },
                {
                  title: "Rewio",
                  type: "AI & Growth Platform",
                  src: "/a look at work/rewio landing page mockup (Digital Experiences).jpeg",
                },
                {
                  title: "Sheen Logo Identity",
                  type: "Visual Identity & Brand System",
                  src: "/a look at work/sheen logo mockup (branding).jpeg",
                },
                {
                  title: "Sheen Vehicle Branding",
                  type: "Fleet & Physical Brand System",
                  src: "/a look at work/sheen van mockup (branding).jpeg",
                },
                {
                  title: "Sheen Business Cards",
                  type: "Print & Stationery Collateral",
                  src: "/a look at work/sheen visiting card mockup (branding).jpeg",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="w-[280px] sm:w-[360px] md:w-[420px] h-[360px] sm:h-[440px] rounded-3xl overflow-hidden shadow-md shrink-0 relative group border border-neutral-200/80 bg-neutral-950"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-white pt-16 flex flex-col justify-end">
                    <span className="text-[10px] font-mono text-[#ff4500] uppercase tracking-wider block mb-1">
                      {item.type}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* B. CORE IDEA SECTION */}
      <section className="py-16 sm:py-20 border-t border-neutral-900 bg-black text-white overflow-hidden">
        <div className="container-x">
          <ScrollReveal className="max-w-4xl space-y-4 mb-12 sm:mb-16">
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ The Core Philosophy ]</span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.02]">
              Your business has one goal. Your digital presence should work <span className="text-[#ff4500] font-bold">towards it.</span>
            </h2>
          </ScrollReveal>

          <div className="border-t border-neutral-900 divide-y divide-neutral-900">
            {PILLARS.map((pillar, idx) => (
              <ScrollReveal
                key={pillar.num}
                delay={idx * 0.1}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 md:py-8 group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-neutral-950/90 rounded-2xl px-3 md:px-6 cursor-pointer"
              >
                <div className="md:col-span-3 lg:col-span-2 flex items-start pt-1">
                  <span className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-[#ff4500] leading-none select-none opacity-90 group-hover:opacity-100 transition-opacity">
                    0{idx + 1}
                  </span>
                </div>

                <div className="md:col-span-9 lg:col-span-10 space-y-1.5 md:space-y-2">
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight transition-all duration-500 group-hover:text-[#ff4500] group-hover:translate-x-1">
                    {pillar.title}.
                  </h3>
                  <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed font-sans max-w-3xl transition-colors duration-500 group-hover:text-neutral-300">
                    {pillar.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* C. WHAT WE DO (SERVICES OVERVIEW - REDUCED GAP) */}
      <section className="py-16 sm:py-20 border-t border-neutral-100 bg-white">
        <div className="container-x">
          <ScrollReveal className="mb-12 sm:mb-16 text-left max-w-4xl space-y-4">
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Capabilities ]</span>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold text-black leading-[1.02]">
              From first impression<br />to <span className="text-[#ff4500] font-bold">final click.</span>
            </h2>
            <p className="text-neutral-500 text-sm md:text-base max-w-xl leading-relaxed pt-1">
              We don't promise a magic ranking. We build the systems that give your business a better chance of earning sustainable search visibility.
            </p>
          </ScrollReveal>

          <div className="space-y-12 sm:space-y-16">
            {SERVICES.map((s, idx) => (
              <ScrollReveal
                key={s.title}
                delay={0.1}
                className="pb-8 sm:pb-10 space-y-6 group relative border-b border-neutral-100/80"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-start">
                  <div className="lg:col-span-7 flex items-start gap-4 md:gap-6 min-w-0">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-display font-light text-[#ff4500] leading-none select-none shrink-0 pt-1">
                      0{idx + 1}
                    </span>
                    <div className="space-y-2 min-w-0">
                      <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-bold text-black leading-none transition-colors duration-500 hover:text-[#ff4500] cursor-pointer">
                        {s.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-[#ff4500] font-medium tracking-wide">
                        {s.tag}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-5 max-w-lg text-sm md:text-base text-neutral-600 leading-relaxed font-sans pt-1">
                    {s.desc}
                  </div>
                </div>

                {s.images && s.images.length > 0 && (
                  <div
                    className={`grid gap-4 md:gap-5 w-full pt-2 ${
                      s.images.length === 3
                        ? "grid-cols-1 sm:grid-cols-3"
                        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
                    }`}
                  >
                    {s.images.map((imgSrc, imgIdx) => (
                      <div
                        key={imgIdx}
                        className="aspect-[4/3] rounded-3xl overflow-hidden relative border border-neutral-200/60 shadow-sm group/card bg-neutral-950"
                      >
                        <img
                          src={imgSrc}
                          alt=""
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href="/contact"
                  className="group/bar block relative overflow-hidden rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] p-4 sm:p-5 bg-transparent hover:bg-[#fff2ed] cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 relative z-10">
                    <span className="text-xs md:text-sm font-sans text-neutral-700 font-medium">
                      {s.engagement}
                    </span>

                    <span className="text-xs md:text-sm font-sans font-semibold text-black group-hover/bar:text-[#ff4500] flex items-center gap-2 transition-colors duration-500">
                      {s.cta} <span className="transition-transform duration-500 group-hover/bar:translate-x-1.5">→</span>
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-[#ff4500] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/bar:scale-x-100" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* E. SELECTED WORK */}
      <section className="py-16 sm:py-20 border-t border-neutral-100 bg-white">
        <div className="container-x">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div className="space-y-3">
              <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Shipped Projects ]</span>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-black leading-none">
                We build. Here's the <span className="text-[#ff4500] font-bold">proof.</span>
              </h2>
              <p className="text-neutral-500 text-sm max-w-md">
                A selection of work across branding, websites, e-commerce and growth. Every project solves a different problem.
              </p>
            </div>
            <Link
              href="/work"
              className="bg-black hover:bg-[#ff4500] text-white text-xs font-mono uppercase tracking-wider px-6 py-3 rounded-full transition-colors self-start md:self-auto"
            >
              [ View All Work ]
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {CASE_STUDIES.map((cs, idx) => (
              <ScrollReveal key={cs.slug} delay={idx * 0.15}>
                <div className="border border-neutral-200/80 rounded-[32px] overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group">
                  <div className="h-[280px] sm:h-[340px] md:h-[380px] w-full relative overflow-hidden bg-neutral-950 group/hero">
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

                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-5 bg-white">
                    <div className="space-y-3">
                      <span className="text-[#ff4500] text-xs font-mono font-semibold uppercase tracking-wider block">
                        {cs.badge}
                      </span>

                      <h3 className="font-display font-bold text-3xl sm:text-4xl text-black group-hover:text-[#ff4500] transition-colors">
                        {cs.name}
                      </h3>

                      <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans">
                        {cs.desc}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {cs.pills.map((pill, pIdx) => (
                          <span
                            key={pill}
                            className={
                              pIdx === 0
                                ? "bg-[#ff4500] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full"
                                : "bg-neutral-100 text-neutral-700 text-xs font-medium px-3.5 py-1.5 rounded-full"
                            }
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 border-t border-neutral-100 flex items-center justify-between gap-4 flex-wrap">
                      <Link
                        href={`/work/${cs.slug}`}
                        className="text-xs sm:text-sm font-sans font-semibold text-black group-hover:text-[#ff4500] flex items-center gap-1.5 transition-colors"
                      >
                        View Case Study <ArrowRight className="w-4 h-4" />
                      </Link>
                      
                      <a
                        href={cs.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-sans font-semibold text-[#ff4500] hover:underline flex items-center gap-1.5"
                      >
                        Visit Website <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2} className="mt-12 text-center bg-neutral-50/40 p-6 rounded-2xl border border-neutral-100 max-w-xl mx-auto space-y-3">
            <h3 className="font-display text-xl text-black">Have a project that belongs here?</h3>
            <p className="text-neutral-500 text-xs">Let's build it.</p>
            <Link
              href="/contact"
              className="inline-block bg-black hover:bg-[#ff4500] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-colors"
            >
              Get a Quote
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* F. RESULTS / PROOF SECTION */}
      <section className="py-16 sm:py-20 border-t border-neutral-100 bg-neutral-50/30">
        <div className="container-x">
          <ScrollReveal className="mb-10 max-w-xl">
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Sustainable Growth ]</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-black mt-3 leading-none">
              We care about what happens <span className="text-[#ff4500] font-bold">after launch.</span>
            </h2>
            <p className="text-neutral-500 text-sm mt-3 leading-relaxed">
              The work isn't finished when the website goes live. A successful project should create something measurable: More visibility, enquiries, sales, conversions, and a stronger brand.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PROOF_CARDS.map((card, idx) => (
              <ScrollReveal key={card.title} delay={idx * 0.08} className="bg-white border border-neutral-105 p-5 rounded-2xl shadow-sm">
                <h3 className="font-display text-lg text-black mb-2">{card.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{card.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* G. HOW WE WORK (PROCESS TIMELINE) */}
      <section className="relative py-20 md:py-28 border-t border-neutral-100 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#ff4500]/[0.035] blur-3xl" />
          <div className="absolute top-1/2 -right-40 w-[520px] h-[520px] rounded-full bg-[#ff4500]/[0.03] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage: "radial-gradient(#00000009 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="container-x relative z-10">
          <ScrollReveal className="mb-14 md:mb-20 max-w-2xl">
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest block mb-3">
              [ Operating System ]
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-black leading-[1.05] mb-4">
              The ConversionHouse <span className="text-[#ff4500] font-bold">Growth Loop</span>
            </h2>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4500]" />
              <span className="text-xs sm:text-sm font-mono text-neutral-500 tracking-wide">
                Build → Measure → Learn → Improve → Repeat.
              </span>
            </div>
          </ScrollReveal>

          <GrowthTimeline />
        </div>
      </section>

      {/* I. QUOTE CALCULATOR TEASER */}
      <section className="py-16 sm:py-20 border-t border-neutral-100 bg-white">
        <ScrollReveal className="container-x text-center max-w-xl mx-auto space-y-5">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Dynamic Estimator ]</span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-black leading-none">
            Tell us what you're <span className="text-[#ff4500] font-bold">building.</span>
          </h2>
          <p className="text-neutral-500 text-sm">
            Select what you need. Get an estimated investment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-3">
            <Link
              href="/contact"
              className="bg-black hover:bg-[#ff4500] text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-colors w-full sm:w-auto"
            >
              Get a Quote
            </Link>
            <a
              href="https://wa.me/919900447762"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost text-black font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4 text-[#ff4500]" /> Talk on WhatsApp
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* J. ABOUT TEASER */}
      <section className="py-16 sm:py-20 border-t border-neutral-100 bg-neutral-50/30">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <ScrollReveal className="lg:col-span-6 space-y-5">
              <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Who We Are ]</span>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-black">
                Pretty is good. <span className="text-[#ff4500] font-bold">Purpose is better.</span>
              </h2>
              <p className="text-neutral-500 leading-relaxed text-sm">
                ConversionHouse exists to close the gap between looking good online and performing well online. We bring together creative thinking, technology and digital growth to help businesses build stronger brands, better experiences and more effective customer journeys.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15} className="lg:col-span-6 bg-white border border-neutral-100 p-8 rounded-2xl relative overflow-hidden shadow-sm">
              <h3 className="text-xs font-mono uppercase text-[#ff4500] tracking-widest mb-4">
                ABOUT PHILOSOPHY
              </h3>
              <div className="space-y-4">
                <p className="font-display text-2xl text-black">
                  "Pretty is good. Purpose is better."
                </p>
                <div className="space-y-2 text-xs text-neutral-500 font-mono">
                  <p>• Strategy informs design.</p>
                  <p>• Design supports experience.</p>
                  <p>• Technology enables performance.</p>
                  <p>• Marketing creates demand.</p>
                  <p>• Data tells us what to improve.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* N. FAQ */}
      <section id="faq" className="py-20 border-t border-neutral-100 bg-white">
        <div className="container-x">
          <ScrollReveal className="mb-12 max-w-5xl mx-auto space-y-3">
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest block">[ Clear Answers ]</span>
            <h2 className="font-display font-semibold text-4xl sm:text-6xl text-black leading-tight">
              Things founders ask before <span className="text-[#ff4500] font-bold">hiring us.</span>
            </h2>
          </ScrollReveal>
          <Accordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* O. FINAL CTA */}
      <section className="py-24 border-t border-neutral-100 bg-white relative overflow-hidden">
        <ScrollReveal className="container-x relative z-10 text-center max-w-3xl space-y-6">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Get Started ]</span>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold text-black leading-tight">
            Ready to turn your digital presence into a <span className="text-[#ff4500] font-bold">growth engine?</span>
          </h2>
          <p className="text-neutral-500 text-sm max-w-lg mx-auto leading-relaxed">
            Whether you're building a brand from scratch, replacing an outdated website, launching an e-commerce store or looking for more customers — let's figure out what you actually need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              href="/contact"
              className="bg-black hover:bg-[#ff4500] text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-colors w-full sm:w-auto"
            >
              Get Your Estimate
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
