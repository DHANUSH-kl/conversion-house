"use client";

import { useState, useMemo } from "react";
import { Check, ArrowRight, MessageSquare, Calculator } from "lucide-react";

// Pricing Blueprint details
const PRICING_SERVICES = {
  branding: [
    { id: "logo", label: "Logo Design", price: 15000 },
    { id: "brand_id", label: "Brand Identity Setup", price: 35000 },
    { id: "rebranding", label: "Rebranding Strategy & Identity", price: 45000 },
  ],
  website: [
    { id: "basic_web", label: "Professional Website", price: 35000 },
    { id: "custom_web", label: "Premium/Custom Website", price: 60000 },
    { id: "landing", label: "Landing Page System", price: 20000 },
    { id: "maintenance", label: "Ongoing Website Support Retainer", price: 10000 },
  ],
  ecommerce: [
    { id: "shopify", label: "Shopify Store Development", price: 35000 },
    { id: "headless_shopify", label: "Headless Shopify Storefront", price: 55000 },
  ],
  growth: [
    { id: "seo", label: "SEO Campaign Setup & Strategy", price: 30000 },
    { id: "meta_ads", label: "Meta Ads Campaign Strategy & Mgmt", price: 25000 },
    { id: "google_ads", label: "Google Ads Strategy & Optimization", price: 20000 },
    { id: "cro", label: "Conversion Rate Optimization (CRO)", price: 15000 },
    { id: "analytics", label: "Advanced Analytics & Tracking System", price: 10000 },
  ],
};

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);
  
  // Selection States
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [traffic, setTraffic] = useState("");
  const [enquiries, setEnquiries] = useState("");
  const [adSpend, setAdSpend] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [achieveOption, setAchieveOption] = useState("");
  const [timeline, setTimeline] = useState("");

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const estimateRange = useMemo(() => {
    let sum = 0;
    
    const allServices = [
      ...PRICING_SERVICES.branding,
      ...PRICING_SERVICES.website,
      ...PRICING_SERVICES.ecommerce,
      ...PRICING_SERVICES.growth,
    ];
    
    selectedServices.forEach((sid) => {
      const match = allServices.find((s) => s.id === sid);
      if (match) sum += match.price;
    });

    if (sum === 0) return null;

    if (sum < 35000) {
      sum = 35000;
    }

    const lower = Math.round((sum * 0.9) / 1000) * 1000;
    const upper = Math.round((sum * 1.25) / 1000) * 1000;

    return {
      lower: lower.toLocaleString("en-IN"),
      upper: upper.toLocaleString("en-IN"),
    };
  }, [selectedServices]);

  const handleNext = () => setStep((s) => Math.min(s + 1, 5));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const displayPackageType = useMemo(() => {
    const isGrowth = selectedServices.some(s => ["seo", "meta_ads", "google_ads", "cro"].includes(s));
    const isEcommerceOrPremium = selectedServices.some(s => ["headless_shopify", "custom_web"].includes(s));
    
    if (isEcommerceOrPremium) return "Scale Engagement Range";
    if (isGrowth) return "Growth Engagement Range";
    return "Launch Foundation Range";
  }, [selectedServices]);

  return (
    <div className="bg-white border border-neutral-150 rounded-3xl p-6 md:p-10 max-w-4xl mx-auto text-black shadow-sm">
      {/* Progress Line */}
      <div className="w-full bg-neutral-100 h-1 rounded-full mb-8 overflow-hidden">
        <div
          className="bg-[#ff4500] h-full transition-all duration-300"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      <div className="mb-6 flex justify-between items-center text-xs font-mono text-neutral-400">
        <span>STEP 0{step} OF 05</span>
        <span className="text-[#ff4500] uppercase tracking-widest font-semibold">
          {step === 1 && "What do you need?"}
          {step === 2 && "About your business"}
          {step === 3 && "What are you trying to achieve?"}
          {step === 4 && "Timeline"}
          {step === 5 && "Estimated investment"}
        </span>
      </div>

      {/* STEP 1: What do you need */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-display font-semibold mb-4 text-black">
            Select the components of your digital system:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Branding Column */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono tracking-wider uppercase text-[#ff4500]">Branding</h3>
              {PRICING_SERVICES.branding.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleService(s.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm flex justify-between items-center transition-all ${
                    selectedServices.includes(s.id)
                      ? "border-[#ff4500] bg-[#ff4500]/5 text-black"
                      : "border-neutral-200 bg-neutral-50/50 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  <span>{s.label}</span>
                  {selectedServices.includes(s.id) && <Check className="w-4 h-4 text-[#ff4500]" />}
                </button>
              ))}
            </div>

            {/* Websites Column */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono tracking-wider uppercase text-[#ff4500]">Websites</h3>
              {PRICING_SERVICES.website.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleService(s.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm flex justify-between items-center transition-all ${
                    selectedServices.includes(s.id)
                      ? "border-[#ff4500] bg-[#ff4500]/5 text-black"
                      : "border-neutral-200 bg-neutral-50/50 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  <span>{s.label}</span>
                  {selectedServices.includes(s.id) && <Check className="w-4 h-4 text-[#ff4500]" />}
                </button>
              ))}
            </div>

            {/* E-commerce Column */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono tracking-wider uppercase text-[#ff4500]">E-commerce</h3>
              {PRICING_SERVICES.ecommerce.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleService(s.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm flex justify-between items-center transition-all ${
                    selectedServices.includes(s.id)
                      ? "border-[#ff4500] bg-[#ff4500]/5 text-black"
                      : "border-neutral-200 bg-neutral-50/50 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  <span>{s.label}</span>
                  {selectedServices.includes(s.id) && <Check className="w-4 h-4 text-[#ff4500]" />}
                </button>
              ))}
            </div>

            {/* Growth Column */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono tracking-wider uppercase text-[#ff4500]">Growth & Tracking</h3>
              {PRICING_SERVICES.growth.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleService(s.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm flex justify-between items-center transition-all ${
                    selectedServices.includes(s.id)
                      ? "border-[#ff4500] bg-[#ff4500]/5 text-black"
                      : "border-neutral-200 bg-neutral-50/50 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  <span>{s.label}</span>
                  {selectedServices.includes(s.id) && <Check className="w-4 h-4 text-[#ff4500]" />}
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* STEP 2: Tell us about your business */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-display font-semibold mb-4 text-black">
            Brief context about your operation:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff4500]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Retail, Healthcare"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff4500]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">Current Website URL</label>
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="e.g. www.acme.com"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff4500]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">Target Market</label>
              <input
                type="text"
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                placeholder="e.g. Local, National, USA"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff4500]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">Current Monthly Traffic</label>
              <input
                type="text"
                value={traffic}
                onChange={(e) => setTraffic(e.target.value)}
                placeholder="e.g. 5,000 visitors"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff4500]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">Current Advertising Spend</label>
              <input
                type="text"
                value={adSpend}
                onChange={(e) => setAdSpend(e.target.value)}
                placeholder="e.g. ₹20,000 / month"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#ff4500]"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: What are you trying to achieve? */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-display font-semibold mb-4 text-black">
            What is your primary commercial focus?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Generate more enquiries",
              "Generate more sales",
              "Improve Google visibility",
              "Launch a new business",
              "Rebrand",
              "Build an online store",
              "Improve an existing website",
              "Generate more bookings",
              "Scale paid advertising",
              "Improve conversion rate",
              "Other",
            ].map((option) => (
              <button
                key={option}
                onClick={() => setAchieveOption(option)}
                className={`w-full text-left p-3.5 rounded-xl border text-sm flex justify-between items-center transition-all ${
                  achieveOption === option
                    ? "border-[#ff4500] bg-[#ff4500]/5 text-black"
                    : "border-neutral-200 bg-neutral-50/50 text-neutral-600 hover:border-neutral-300"
                }`}
              >
                <span>{option}</span>
                {achieveOption === option && <Check className="w-4 h-4 text-[#ff4500]" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: Timeline */}
      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-display font-semibold mb-4 text-black">
            When do we launch the engine?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {["ASAP", "Within 1 month", "1–3 months", "3–6 months", "Flexible"].map((time) => (
              <button
                key={time}
                onClick={() => setTimeline(time)}
                className={`w-full text-left p-4 rounded-xl border text-sm flex justify-between items-center transition-all ${
                  timeline === time
                    ? "border-[#ff4500] bg-[#ff4500]/5 text-black"
                    : "border-neutral-200 bg-neutral-50/50 text-neutral-600 hover:border-neutral-300"
                }`}
              >
                <span>{time}</span>
                {timeline === time && <Check className="w-4 h-4 text-[#ff4500]" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: Calculated Output */}
      {step === 5 && (
        <div className="text-center space-y-6 py-8">
          <Calculator className="w-12 h-12 text-[#ff4500] mx-auto mb-2" />
          
          <div>
            <span className="text-xs font-mono uppercase text-[#ff4500] tracking-widest">{displayPackageType}</span>
            {estimateRange ? (
              <h2 className="text-4xl md:text-5xl font-display font-bold text-black tracking-tight mt-2">
                ₹{estimateRange.lower} – ₹{estimateRange.upper}
              </h2>
            ) : (
              <h2 className="text-xl md:text-2xl font-display text-black tracking-tight mt-2">
                No components selected. Let's start with a customized plan.
              </h2>
            )}
          </div>

          <p className="text-neutral-500 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            This is an estimated range based on the services and scope you've selected. Your final quote will depend on the requirements discussed with our team.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <a
              href={`https://wa.me/919999999999?text=Hi%20ConversionHouse,%20I%20just%20calculated%20my%20digital%20scope:%20${encodeURIComponent(
                selectedServices.join(", ")
              )}%20and%20need%20a%20quote.`}
              target="_blank"
              rel="noreferrer"
              className="bg-neutral-100 hover:bg-neutral-200 text-black px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-neutral-200"
            >
              <MessageSquare className="w-4 h-4 text-[#ff4500]" /> Talk to us on WhatsApp
            </a>
            
            <button
              onClick={() => alert("Scope submitted! Our studio strategist will contact you shortly.")}
              className="bg-black hover:bg-[#ff4500] text-white px-8 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Get My Final Quote
            </button>
          </div>
        </div>
      )}

      {/* Nav Controls */}
      <div className="flex justify-between items-center mt-10 pt-6 border-t border-neutral-100">
        <button
          onClick={handlePrev}
          disabled={step === 1}
          className="text-xs font-mono text-neutral-400 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          [ PREVIOUS ]
        </button>

        {step < 5 ? (
          <button
            onClick={handleNext}
            className="bg-black hover:bg-[#ff4500] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-full flex items-center gap-2 transition-all"
          >
            Continue <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={() => setStep(1)}
            className="text-xs font-mono text-neutral-400 hover:text-black transition-colors"
          >
            [ RECALCULATE ]
          </button>
        )}
      </div>
    </div>
  );
}
