export interface ServiceData {
  slug: string;
  title: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  serviceType: string;
  summary: string;
  problemsAddressed: string[];
  capabilities: { title: string; desc: string }[];
  processSteps: { step: string; title: string; desc: string }[];
  outcomes: string[];
  caseStudySlugs: string[];
  faqs: { question: string; answer: string }[];
}

export const SERVICES_DATA: Record<string, ServiceData> = {
  "meta-ads": {
    slug: "meta-ads",
    title: "Meta Ads Management",
    headline: "Scalable Facebook & Instagram Ads built for customer acquisition.",
    metaTitle: "Meta Ads Agency — Facebook & Instagram Advertising",
    metaDescription:
      "ConversionHouse is a Meta Ads agency delivering profitable Facebook and Instagram advertising campaigns with high-converting ad creative and real ROI attribution.",
    serviceType: "Paid Advertising & Media Buying",
    summary:
      "We design, build, and optimize Meta advertising campaigns across Facebook and Instagram. From ad copy and visual creative to custom conversion funnel tracking, we help brands lower CPL and maximize ROAS.",
    problemsAddressed: [
      "High cost-per-lead (CPL) and low quality lead submissions",
      "Ad fatigue causing ROAS degradation over time",
      "Lack of creative testing and hooks that grab customer attention",
      "Inaccurate Meta Pixel / Conversion API tracking",
    ],
    capabilities: [
      { title: "Campaign Strategy & Setup", desc: "Full funnel structure targeting cold audiences, retargeting, and lookalikes." },
      { title: "Performance Creative & UGC", desc: "High-converting video scripts, static banners, and direct response copy." },
      { title: "CAPI & Pixel Tracking", desc: "Server-side Conversion API setup to ensure full attribution accuracy." },
      { title: "Continuous A/B Testing", desc: "Systematic creative testing to scale winning ad formats." },
    ],
    processSteps: [
      { step: "01", title: "Auditing & Positioning", desc: "We analyze previous ad account data, creative fatigue, and audience targeting." },
      { step: "02", title: "Creative Production", desc: "We script, design, and produce high-converting image & video ad variations." },
      { step: "03", title: "Campaign Launch", desc: "We structure campaigns for optimal Meta algorithm learning and budget efficiency." },
      { step: "04", title: "Optimization & Scaling", desc: "We prune underperforming ads and scale top performers across target segments." },
    ],
    outcomes: [
      "Lower cost per qualified lead / customer acquisition cost (CAC)",
      "Higher return on ad spend (ROAS) across cold and retargeting audiences",
      "Sustainable funnel of creative concepts tested weekly",
    ],
    caseStudySlugs: ["sheen"],
    faqs: [
      {
        question: "How much ad spend do we need for Meta Ads?",
        answer: "We recommend starting with a minimum ad budget that allows sufficient testing data for Meta's learning phase, typically tailored to your target audience scale.",
      },
      {
        question: "Do you produce the ad creative?",
        answer: "Yes, we handle creative strategy, copywriting, static graphics, and UGC/video direction built specifically for conversion.",
      },
    ],
  },
  "google-ads": {
    slug: "google-ads",
    title: "Google Ads Management",
    headline: "Capture high-intent search demand on Google Search, Shopping & YouTube.",
    metaTitle: "Google Ads Agency — Search & Performance Max PPC",
    metaDescription:
      "Capture high-intent buyer searches with targeted Google Search, Performance Max, and Shopping campaigns optimized for leads and sales.",
    serviceType: "Pay-Per-Click (PPC) Advertising",
    summary:
      "When buyers actively search for your service or product on Google, you need to be visible. We structure hyper-targeted Search, Shopping, and Performance Max campaigns that capture high-intent traffic.",
    problemsAddressed: [
      "Wasted spend on low-intent or irrelevant search keywords",
      "Poor quality score leading to unnecessarily high cost-per-click (CPC)",
      "Unoptimized landing pages that fail to convert Google Search traffic",
      "Lack of negative keyword filtering and conversion tracking",
    ],
    capabilities: [
      { title: "Search Engine Advertising", desc: "Target high-commercial-intent buyer search queries with precision." },
      { title: "Performance Max & Shopping", desc: "Maximize sales across Google's entire ad network with automated smart bidding." },
      { title: "Keyword & Competitor Strategy", desc: "In-depth keyword research and competitor bidding defense." },
      { title: "Conversion Tracking Setup", desc: "Google Tag Manager and GA4 conversion goal implementation." },
    ],
    processSteps: [
      { step: "01", title: "Search Audit & Keyword Mapping", desc: "Identify high-intent buyer search queries and eliminate negative keywords." },
      { step: "02", title: "Ad Copy & Extension Design", desc: "Craft compelling Search ads with sitelinks, callouts, and structured snippets." },
      { step: "03", title: "Bidding & Smart Optimization", desc: "Set up automated target CPA / ROAS bidding strategies." },
      { step: "04", title: "Landing Page Sync", desc: "Align ad headlines directly with landing page messaging for higher quality scores." },
    ],
    outcomes: [
      "Higher CTR and lower CPC through quality score optimization",
      "Increased volume of qualified commercial search leads",
      "Transparent conversion attribution in Google Analytics 4",
    ],
    caseStudySlugs: ["race-division"],
    faqs: [
      {
        question: "What is the difference between Meta Ads and Google Ads?",
        answer: "Google Ads captures existing search intent when people actively search for your offer, whereas Meta Ads generates demand by putting your offer in front of targeted demographics.",
      },
      {
        question: "Do you manage Google Search Console and Analytics too?",
        answer: "Yes, we integrate Google Search Console and GA4 tracking to measure technical search performance alongside paid campaigns.",
      },
    ],
  },
  "lead-generation": {
    slug: "lead-generation",
    title: "Lead Generation Systems",
    headline: "Predictable lead acquisition engines for service businesses & B2B brands.",
    metaTitle: "Lead Generation Agency — High-Intent Client Acquisition",
    metaDescription:
      "Build a predictable lead generation engine with high-converting landing pages, paid advertising, and automated lead capture.",
    serviceType: "Customer Acquisition",
    summary:
      "We design end-to-end lead generation systems combining targeted paid ads, high-converting landing pages, instant WhatsApp/email notifications, and lead qualification mechanisms.",
    problemsAddressed: [
      "Inconsistent monthly lead volume and unpredictable pipeline",
      "Unqualified leads wasting sales team time",
      "High bounce rates on standard marketing website pages",
      "Slow follow-up times after lead submission",
    ],
    capabilities: [
      { title: "High-Converting Landing Pages", desc: "Dedicated conversion pages structured to convert visitors into inquiries." },
      { title: "Multi-Channel Ad Campaigns", desc: "Meta & Google Ads campaigns optimized specifically for lead forms & inquiries." },
      { title: "Lead Qualification & Filtering", desc: "Multi-step form logic to filter out low-budget or irrelevant inquiries." },
      { title: "Automated Lead Notifications", desc: "Instant CRM, WhatsApp, or email alerts for immediate sales follow-up." },
    ],
    processSteps: [
      { step: "01", title: "Customer Persona Mapping", desc: "Understand your ideal customer profile, pain points, and decision triggers." },
      { step: "02", title: "Landing Page & Funnel Build", desc: "Develop fast, mobile-first landing pages dedicated to lead capture." },
      { step: "03", title: "Traffic Activation", desc: "Deploy targeted Meta & Google ad campaigns to drive relevant traffic." },
      { step: "04", title: "Lead Optimization", desc: "A/B test offer positioning, form length, and messaging to lower CPL." },
    ],
    outcomes: [
      "Consistent, predictable flow of qualified inbound inquiries",
      "Improved lead-to-opportunity conversion rate",
      "Streamlined automated delivery of leads directly to your sales team",
    ],
    caseStudySlugs: ["sheen", "race-division"],
    faqs: [
      {
        question: "How do you ensure lead quality?",
        answer: "We use strategic qualification questions, custom form logic, and refined audience targeting to filter out tire-kickers.",
      },
    ],
  },
  "conversion-rate-optimization": {
    slug: "conversion-rate-optimization",
    title: "Conversion Rate Optimization (CRO)",
    headline: "Turn existing website traffic into more inquiries, bookings & sales.",
    metaTitle: "Conversion Rate Optimization Agency — High-Converting UX",
    metaDescription:
      "ConversionHouse optimizes user journeys, visual hierarchy, page speed, and copy to increase your website conversion rate.",
    serviceType: "Conversion Optimization",
    summary:
      "Increasing ad spend on a low-converting website wastes money. We analyze user behavior, pinpoint drop-off friction, and redesign user journeys to maximize the percentage of visitors who take action.",
    problemsAddressed: [
      "High website traffic but disappointing lead conversion rates",
      "Confusing page layout and unclear call-to-action (CTA) paths",
      "Mobile UX friction and slow page load speeds",
      "Lack of trust proof elements like testimonials, case studies, and guarantees",
    ],
    capabilities: [
      { title: "UX & Heuristic Audits", desc: "Identify usability friction and conversion blockers across customer touchpoints." },
      { title: "Heatmap & Funnel Analysis", desc: "Track user scroll depth, click maps, and drop-off points." },
      { title: "Landing Page Redesign", desc: "Rebuild key pages around single conversion objectives." },
      { title: "Copywriting & Value Messaging", desc: "Craft clear, persuasive headlines and value propositions." },
    ],
    processSteps: [
      { step: "01", title: "Data & Heatmap Audit", desc: "Review Google Analytics, session recordings, and conversion drop-offs." },
      { step: "02", title: "Hypothesis & UX Design", desc: "Design new wireframes focused on visual hierarchy and friction removal." },
      { step: "03", title: "Implementation & Build", desc: "Develop optimized React/Next.js components built for speed." },
      { step: "04", title: "Measure & Iterate", desc: "Monitor conversion rate changes and refine UX continuously." },
    ],
    outcomes: [
      "Higher conversion rate across landing pages and lead forms",
      "Decreased cost per acquisition without increasing ad spend",
      "Frictionless mobile experience for all site visitors",
    ],
    caseStudySlugs: ["sheen", "irani-motohub"],
    faqs: [
      {
        question: "What is CRO?",
        answer: "CRO stands for Conversion Rate Optimization. It is the process of improving your website design, messaging, and speed so a higher percentage of visitors convert into leads or sales.",
      },
    ],
  },
  "ugc-ads": {
    slug: "ugc-ads",
    title: "UGC Ads & Conversion Creative",
    headline: "Authentic, high-performing video ads and social creative.",
    metaTitle: "UGC Ads Agency — Direct Response Conversion Creative",
    metaDescription:
      "ConversionHouse produces high-performing User-Generated Content (UGC) ads, video hooks, and conversion creatives designed for social ad campaigns.",
    serviceType: "Creative Production & Video Advertising",
    summary:
      "Modern social media users scroll past polished corporate commercials. We produce authentic User-Generated Content (UGC) ads, video hooks, and dynamic visuals that stop the scroll and drive conversions.",
    problemsAddressed: [
      "Polished brand videos that look like traditional ads and get scrolled past",
      "Creative fatigue causing ad performance to drop after a few weeks",
      "Lack of video hooks that hook viewer attention in the first 3 seconds",
      "Difficulty scaling ad creatives across multiple products",
    ],
    capabilities: [
      { title: "UGC Scriptwriting & Direction", desc: "Write psychological hooks and benefit-driven video concepts." },
      { title: "Creator Sourcing & Production", desc: "Coordinate authentic creators matching your brand's target demographic." },
      { title: "Motion Design & Ad Editing", desc: "Add captions, split screens, dynamic overlays, and clear CTAs." },
      { title: "Creative Variations & Batching", desc: "Produce multiple hook variations to test in Meta & TikTok campaigns." },
    ],
    processSteps: [
      { step: "01", title: "Creative Strategy", desc: "Identify winning customer angles, pain points, and product demonstrations." },
      { step: "02", title: "Script & Creator Briefing", desc: "Provide creators with structured scripts and visual guidelines." },
      { step: "03", title: "Post-Production", desc: "Edit high-energy videos optimized for vertical 9:16 reels and feeds." },
      { step: "04", title: "Performance Analysis", desc: "Analyze thumb-stop rate and click-through rate to inform future creative batches." },
    ],
    outcomes: [
      "Higher thumb-stop rate (3-second video views) on Meta & TikTok",
      "Increased click-through rates (CTR) on performance campaigns",
      "Continuous library of fresh ad creative to fight ad fatigue",
    ],
    caseStudySlugs: ["sheen"],
    faqs: [
      {
        question: "What are UGC ads?",
        answer: "UGC stands for User-Generated Content. UGC ads are authentic, mobile-style video ads featuring real people demonstrating or reviewing products.",
      },
    ],
  },
};
