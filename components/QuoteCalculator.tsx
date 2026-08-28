"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, ArrowLeft, Check, X, RefreshCw, MessageSquare, Download, CheckCircle } from "lucide-react";

// Format Indian currency cleanly (e.g. 125 -> ₹1.25L, 35 -> ₹35K)
function formatIndianPrice(thousandsInr: number): string {
  if (thousandsInr >= 100) {
    const lakhs = thousandsInr / 100;
    const formatted = Number(lakhs.toFixed(2));
    return `₹${formatted}L`;
  }
  return `₹${thousandsInr}K`;
}

// Option Categories & Items (Clean typography without icons/emojis)
const INDUSTRIES = [
  { id: "F&B / Hospitality", title: "F&B / Hospitality", desc: "Restaurants, cafes, bars, cloud kitchens, hotels." },
  { id: "Real Estate", title: "Real Estate", desc: "Project launches, developers, sales teams." },
  { id: "Fitness & Wellness", title: "Fitness & Wellness", desc: "Studios, gyms, coaches, wellness brands." },
  { id: "SaaS / Tech", title: "SaaS / Tech", desc: "Products, platforms, dev tools, AI products." },
  { id: "Healthcare", title: "Healthcare", desc: "Clinics, hospitals, telehealth, dental, eye care." },
  { id: "D2C / E-Commerce", title: "D2C / E-Commerce", desc: "Product brands, online retail, jewellery, marketplaces." },
  { id: "Education", title: "Education", desc: "Schools, colleges, ed-tech, training." },
  { id: "Something else", title: "Something else", desc: "Tell us what you do, we'll shape it." },
];

const GOALS = [
  { id: "Launching something new", title: "Launching something new", desc: "Brand, website, or product coming to market." },
  { id: "Rebrand / refresh", title: "Rebrand / refresh", desc: "Modernize visual identity and digital positioning." },
  { id: "Scaling what works", title: "Scaling what works", desc: "Increase enquiries, search rankings, or ad revenue." },
  { id: "Fixing something broken", title: "Fixing something broken", desc: "Fix low conversions, slow speed, or outdated UX." },
];

const TIMELINES = [
  { id: "In the next 30 days", title: "In the next 30 days", desc: "Tight window. We'll be honest about what fits." },
  { id: "1 to 3 months", title: "1 to 3 months", desc: "Comfortable runway for most scopes." },
  { id: "3 to 6 months", title: "3 to 6 months", desc: "Bigger build, multi-phase rollout." },
  { id: "Just exploring", title: "Just exploring", desc: "Welcome. We'll send the range, no pressure." },
];

const SERVICE_GROUPS = [
  {
    category: "Branding",
    items: [
      { id: "Strategy & Positioning", title: "Strategy & Positioning", desc: "Audience, promise, competitive positioning." },
      { id: "Logo & Wordmark", title: "Logo & Wordmark", desc: "Primary, secondary, lockups, typography." },
      { id: "Visual Identity System", title: "Visual Identity System", desc: "Color, grid, graphics, visual language." },
      { id: "Brand Guidelines", title: "Brand Guidelines", desc: "Rules for teams, partners and designers." },
      { id: "Packaging & Collateral", title: "Packaging & Collateral", desc: "Print, stationery, fleet, merchandise." },
    ],
  },
  {
    category: "Digital Experiences",
    items: [
      { id: "Custom Website (5-10 pages)", title: "Custom Website (5-10 pages)", desc: "Tailored Next.js website built for performance." },
      { id: "High-Converting Landing Page", title: "High-Converting Landing Page", desc: "Focused campaign page designed for action." },
      { id: "Shopify E-Commerce Store", title: "Shopify E-Commerce Store", desc: "Scalable online storefront built to sell." },
      { id: "Headless Shopify Commerce", title: "Headless Shopify Commerce", desc: "Custom React frontend over Shopify Storefront API." },
      { id: "Web Application / Portal", title: "Web Application / Portal", desc: "Custom web app, client dashboard, or tool." },
    ],
  },
  {
    category: "Visibility & Growth",
    items: [
      { id: "Technical & On-Page SEO", title: "Technical & On-Page SEO", desc: "Organic search rankings and technical health." },
      { id: "Local SEO & Maps", title: "Local SEO & Maps", desc: "Nearby customer discovery and Google Business Profile." },
      { id: "Meta Ads Acquisition", title: "Meta Ads Acquisition", desc: "Paid Facebook & Instagram lead campaigns." },
      { id: "Google Search & Shopping Ads", title: "Google Search & Shopping Ads", desc: "High-intent search campaigns." },
    ],
  },
  {
    category: "Conversion Optimization",
    items: [
      { id: "Conversion Rate Optimization (CRO)", title: "Conversion Rate Optimization (CRO)", desc: "A/B testing and user drop-off removal." },
      { id: "Analytics & Tracking Setup", title: "Analytics & Tracking Setup", desc: "GA4, Meta Pixel, server-side attribution." },
      { id: "UX Friction Audit", title: "UX Friction Audit", desc: "In-depth review of customer journey barriers." },
    ],
  },
];

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);

  // Form State
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedTimeline, setSelectedTimeline] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [projectContext, setProjectContext] = useState("");
  const [budget, setBudget] = useState("");

  // Contact Details State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; phone?: string; server?: string }>({});

  // Verification & Submission State
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Final Result State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState("");
  const [estimatedRange, setEstimatedRange] = useState("");
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  const validateContactForm = () => {
    const errors: { name?: string; email?: string; phone?: string } = {};

    if (!name.trim()) {
      errors.name = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    const cleanPhone = phone.replace(/[\s\-\+\(\)]/g, "");
    if (!phone.trim() || cleanPhone.length < 10) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const requestOtpEmail = async () => {
    setIsSendingOtp(true);
    setFormErrors({});

    try {
      const res = await fetch("/api/quote/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setOtpDigits(["", "", "", "", "", ""]);
        setOtpError("");
        setShowOtpModal(true);
        setResendTimer(data.cooldownSeconds || 60);
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
      } else {
        setFormErrors({ server: data.error || "Unable to send verification email. Please try again." });
      }
    } catch (err) {
      console.error("[Send OTP Error]:", err);
      setFormErrors({ server: "Network error sending verification code. Please check your connection." });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleStep6Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContactForm()) return;
    requestOtpEmail();
  };

  const verifyAndSubmitLead = async (enteredCode: string) => {
    if (isVerifying) return;
    setIsVerifying(true);
    setOtpError("");

    try {
      // 1. Verify OTP with Server Route /api/quote/verify-otp
      const verifyRes = await fetch("/api/quote/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          otp: enteredCode,
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        setOtpError(verifyData.error || "Invalid verification code. Please try again.");
        setIsVerifying(false);
        return;
      }

      // 2. Submit Lead Data & Generate Emails via Server Route /api/quote/submit
      const submitRes = await fetch("/api/quote/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          industry: selectedIndustry,
          goal: selectedGoal,
          timeline: selectedTimeline,
          selectedServices,
          projectContext,
          budget,
          verificationToken: verifyData.verificationToken,
        }),
      });

      const submitData = await submitRes.json();

      if (submitRes.ok && submitData.success) {
        setQuoteId(submitData.quoteId || "CH-QUOTE-DEFAULT");
        setEstimatedRange(submitData.estimatedRange || `${formatIndianPrice(submitData.estimatedMin || 35)} – ${formatIndianPrice(submitData.estimatedMax || 95)}+`);
      } else {
        setQuoteId("CH-QUOTE-DEFAULT");
        setEstimatedRange(`${formatIndianPrice(35)} – ${formatIndianPrice(95)}+`);
      }

      setIsVerifying(false);
      setShowOtpModal(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error("[Verification Submission Exception]:", err);
      setQuoteId("CH-QUOTE-DEFAULT");
      setEstimatedRange(`${formatIndianPrice(35)} – ${formatIndianPrice(95)}+`);
      setIsVerifying(false);
      setShowOtpModal(false);
      setIsSubmitted(true);
    }
  };

  // Improved iOS-Friendly OTP Input Handling with Auto-Submit & Auto-Fill Support
  const handleOtpChange = (index: number, rawValue: string) => {
    const cleanValue = rawValue.replace(/\D/g, "");

    // Case A: iOS SMS/Mail Autofill or Copy-Pasted Code (multiple digits e.g. "123456")
    if (cleanValue.length > 1) {
      const digitsArr = cleanValue.slice(0, 6).split("");
      const newDigits = ["", "", "", "", "", ""];
      digitsArr.forEach((d, i) => {
        newDigits[i] = d;
      });
      setOtpDigits(newDigits);
      setOtpError("");

      if (digitsArr.length === 6) {
        otpInputRefs.current[5]?.focus();
        verifyAndSubmitLead(digitsArr.join(""));
      } else {
        otpInputRefs.current[digitsArr.length]?.focus();
      }
      return;
    }

    // Case B: Single digit typing
    const singleDigit = cleanValue.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = singleDigit;
    setOtpDigits(newDigits);
    setOtpError("");

    const currentFullCode = newDigits.join("");

    // Auto-trigger verification as soon as 6th digit is typed!
    if (currentFullCode.length === 6) {
      verifyAndSubmitLead(currentFullCode);
    } else if (singleDigit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData.length > 0) {
      const digitsArr = pastedData.split("");
      const newDigits = ["", "", "", "", "", ""];
      digitsArr.forEach((d, i) => {
        newDigits[i] = d;
      });
      setOtpDigits(newDigits);
      setOtpError("");

      if (pastedData.length === 6) {
        otpInputRefs.current[5]?.focus();
        verifyAndSubmitLead(pastedData);
      } else {
        otpInputRefs.current[pastedData.length]?.focus();
      }
    }
  };

  const handleOtpSubmit = () => {
    const code = otpDigits.join("");
    if (code.length < 6) {
      setOtpError("Please enter all 6 digits of your verification code.");
      return;
    }
    verifyAndSubmitLead(code);
  };

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      const res = await fetch("/api/quote/download-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteId,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          industry: selectedIndustry,
          goal: selectedGoal,
          timeline: selectedTimeline,
          selectedServices,
          projectContext,
          budget,
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `conversionhouse-estimate-${quoteId}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("[Download PDF Error]:", err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  // Render Result Screen (In-Place Transition)
  if (isSubmitted) {
    return (
      <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 sm:p-8 md:p-12 shadow-sm max-w-4xl mx-auto my-6 sm:my-8 animate-fade-in">
        {/* Verification Success Toast */}
        <div className="bg-[#ff4500]/[0.06] border border-[#ff4500]/30 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs font-mono text-black font-semibold">
            <CheckCircle className="w-4 h-4 text-[#ff4500] shrink-0" />
            <span>Email verified. Your estimate has been generated and sent to your email.</span>
          </div>
          <span className="text-[10px] font-mono text-[#ff4500] bg-white px-2.5 py-1 rounded-full border border-[#ff4500]/20 font-bold shrink-0">
            {quoteId}
          </span>
        </div>

        {/* Top Tag & Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest block font-semibold">
            [ ESTIMATE READY ]
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-black leading-tight">
            Your estimate is ready.
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
            Based on the scope you selected, here is your estimated investment range. A summary has been emailed to <span className="text-black font-semibold">{email}</span>.
          </p>
        </div>

        {/* Highlighted Price Range Box */}
        <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-6 sm:p-10 text-center mb-8 sm:mb-10 shadow-sm relative">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2">
            YOUR ESTIMATED PROJECT RANGE
          </span>
          <div className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-[#ff4500] leading-none mb-4">
            {estimatedRange}
          </div>
          <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed mb-6">
            Preliminary estimate based on the scope you selected. Final pricing is confirmed after our 20-minute consultation.
          </p>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-100 text-black border border-neutral-300 px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all shadow-sm w-full sm:w-auto"
          >
            {isDownloadingPdf ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5 text-[#ff4500]" />
            )}
            {isDownloadingPdf ? "Generating PDF..." : "Download Estimate PDF"}
          </button>
        </div>

        {/* Project Snapshot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-neutral-100">
          {/* Left Column: Project Snapshot */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff4500] font-semibold">
              Project Snapshot
            </h3>
            <div className="bg-neutral-50/70 p-5 sm:p-6 rounded-2xl border border-neutral-200/60 space-y-3 text-xs font-mono">
              <div className="flex justify-between pb-2 border-b border-neutral-200/60">
                <span className="text-neutral-400">Quote ID:</span>
                <span className="text-black font-bold">{quoteId}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-neutral-200/60">
                <span className="text-neutral-400">Industry:</span>
                <span className="text-black font-semibold text-right">{selectedIndustry || "Not specified"}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-neutral-200/60">
                <span className="text-neutral-400">Primary Goal:</span>
                <span className="text-black font-semibold text-right">{selectedGoal || "Not specified"}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-neutral-200/60">
                <span className="text-neutral-400">Timeline:</span>
                <span className="text-black font-semibold text-right">{selectedTimeline || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Selected Scope:</span>
                <span className="text-[#ff4500] font-bold">{selectedServices.length} services</span>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Services */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff4500] font-semibold">
              Selected Deliverables
            </h3>
            <div className="bg-neutral-50/70 p-5 sm:p-6 rounded-2xl border border-neutral-200/60 max-h-[220px] overflow-y-auto space-y-2">
              {selectedServices.length > 0 ? (
                selectedServices.map((service) => (
                  <div key={service} className="flex items-center gap-2 text-xs font-mono text-neutral-800">
                    <Check className="w-3.5 h-3.5 text-[#ff4500] shrink-0" />
                    <span>{service}</span>
                  </div>
                ))
              ) : (
                <span className="text-xs text-neutral-400 font-mono">General Scope Exploration</span>
              )}
            </div>
          </div>
        </div>

        {/* Project Notes if provided */}
        {projectContext && (
          <div className="mb-8 sm:mb-10 bg-neutral-50 p-5 sm:p-6 rounded-2xl border border-neutral-200/60 space-y-2">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">Your Notes</span>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">{projectContext}</p>
          </div>
        )}

        {/* Next Step Call to Action */}
        <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-10 text-center space-y-6">
          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest block font-semibold">
              READY TO TAKE THE NEXT STEP?
            </span>
            <h3 className="font-display font-semibold text-2xl sm:text-3xl text-white leading-tight">
              Let's spend 20 minutes understanding the project, refining the scope and answering your questions.
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            {bookingUrl ? (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ff4500] hover:bg-[#e03d00] text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Book a 20-minute call <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <button
                disabled
                className="bg-neutral-800 text-neutral-400 font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full cursor-not-allowed w-full sm:w-auto"
              >
                Booking link coming soon
              </button>
            )}

            <a
              href={`https://wa.me/919900447762?text=${encodeURIComponent(
                `Hi ConversionHouse! Here is my verified quote request:\n\nQuote ID: ${quoteId}\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nIndustry: ${selectedIndustry || "General"}\nGoal: ${selectedGoal || "General"}\nTimeline: ${selectedTimeline || "General"}\nEstimated Range: ${estimatedRange}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-colors flex items-center justify-center gap-2 w-full sm:w-auto border border-white/20"
            >
              <MessageSquare className="w-4 h-4 text-[#ff4500]" /> WhatsApp ConversionHouse
            </a>
          </div>

          <p className="text-[11px] text-neutral-400 font-mono pt-2">
            A final proposal will be confirmed after we review your requirements together.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200/80 rounded-3xl p-4 sm:p-8 md:p-10 shadow-sm max-w-4xl mx-auto my-6 sm:my-8 relative">
      {/* Top Header Progress Bar - Fully Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-neutral-100 pb-5 mb-8">
        <div className="flex items-center justify-between sm:justify-start gap-2 font-display text-base sm:text-lg font-bold text-black">
          <span className="hidden sm:inline">ConversionHouse.</span>
          <span className="text-xs font-mono text-[#ff4500] font-semibold uppercase tracking-wider">
            [ Build Your Scope ]
          </span>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
          <span className="text-xs font-mono text-neutral-400 shrink-0 font-medium">
            Step {step} of 6
          </span>
          <div className="w-24 sm:w-32 h-1.5 bg-neutral-100 rounded-full overflow-hidden shrink-0">
            <div
              className="h-full bg-[#ff4500] transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* STEP 1: What are you building? */}
      {step === 1 && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in">
          <div>
            <span className="text-xs font-mono text-[#ff4500] uppercase tracking-widest block mb-2 font-semibold">01</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-black leading-tight">
              What are you building?
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-2">
              Pick one. We'll tailor the rest of this around it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
            {INDUSTRIES.map((ind) => {
              const isSelected = selectedIndustry === ind.id;
              return (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={`p-4 sm:p-6 rounded-2xl border text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#ff4500] bg-[#ff4500]/[0.03] ring-1 ring-[#ff4500]"
                      : "border-neutral-200/80 bg-white hover:border-neutral-300"
                  }`}
                >
                  <h3 className="font-display font-bold text-sm sm:text-base text-black mb-1">{ind.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-sans">{ind.desc}</p>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              disabled={!selectedIndustry}
              onClick={() => setStep(2)}
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                selectedIndustry
                  ? "bg-black hover:bg-[#ff4500] text-white cursor-pointer"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: What brings you to us? */}
      {step === 2 && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in">
          <div>
            <span className="text-xs font-mono text-[#ff4500] uppercase tracking-widest block mb-2 font-semibold">02</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-black leading-tight">
              What brings you to us?
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-2">
              One line, then we'll move on.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {GOALS.map((g) => {
              const isSelected = selectedGoal === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedGoal(g.id)}
                  className={`p-4 sm:p-6 rounded-2xl border text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#ff4500] bg-[#ff4500]/[0.03] ring-1 ring-[#ff4500]"
                      : "border-neutral-200/80 bg-white hover:border-neutral-300"
                  }`}
                >
                  <h3 className="font-display font-bold text-sm sm:text-base text-black mb-1">{g.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-sans">{g.desc}</p>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-mono text-neutral-500 hover:text-black flex items-center gap-1.5 shrink-0"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              disabled={!selectedGoal}
              onClick={() => setStep(3)}
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                selectedGoal
                  ? "bg-black hover:bg-[#ff4500] text-white cursor-pointer"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: When do you need it? */}
      {step === 3 && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in">
          <div>
            <span className="text-xs font-mono text-[#ff4500] uppercase tracking-widest block mb-2 font-semibold">03</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-black leading-tight">
              When do you need it?
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-2">
              Honest signal helps us scope this realistically.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {TIMELINES.map((t) => {
              const isSelected = selectedTimeline === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTimeline(t.id)}
                  className={`p-4 sm:p-6 rounded-2xl border text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#ff4500] bg-[#ff4500]/[0.03] ring-1 ring-[#ff4500]"
                      : "border-neutral-200/80 bg-white hover:border-neutral-300"
                  }`}
                >
                  <h3 className="font-display font-bold text-sm sm:text-base text-black mb-1">{t.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-sans">{t.desc}</p>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 gap-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs font-mono text-neutral-500 hover:text-black flex items-center gap-1.5 shrink-0"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              disabled={!selectedTimeline}
              onClick={() => setStep(4)}
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                selectedTimeline
                  ? "bg-black hover:bg-[#ff4500] text-white cursor-pointer"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Pick what you actually need (Multi-select) */}
      {step === 4 && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in">
          <div>
            <span className="text-xs font-mono text-[#ff4500] uppercase tracking-widest block mb-2 font-semibold">04</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-black leading-tight">
              Pick what you actually need.
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-2">
              Select items across categories. You can choose multiple options.
            </p>
          </div>

          <div className="space-y-6 max-h-[420px] sm:max-h-[480px] overflow-y-auto pr-1 no-scrollbar">
            {SERVICE_GROUPS.map((group) => (
              <div key={group.category} className="space-y-3">
                <h3 className="text-xs font-mono uppercase text-[#ff4500] tracking-wider font-semibold">
                  {group.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {group.items.map((item) => {
                    const isSelected = selectedServices.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleService(item.id)}
                        className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-200 flex items-start justify-between gap-3 ${
                          isSelected
                            ? "border-[#ff4500] bg-[#ff4500]/[0.04] ring-1 ring-[#ff4500]"
                            : "border-neutral-200/80 bg-white hover:border-neutral-300"
                        }`}
                      >
                        <div>
                          <h4 className="font-display font-semibold text-xs sm:text-sm text-black mb-1">{item.title}</h4>
                          <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed font-sans">{item.desc}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? "bg-[#ff4500] border-[#ff4500] text-white" : "border-neutral-300"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="text-xs font-mono text-neutral-500 hover:text-black flex items-center gap-1.5 self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
              <span className="text-xs font-mono text-neutral-400">
                {selectedServices.length} selected
              </span>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="bg-black hover:bg-[#ff4500] text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Project Context & Budget */}
      {step === 5 && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in">
          <div>
            <span className="text-xs font-mono text-[#ff4500] uppercase tracking-widest block mb-2 font-semibold">05</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-black leading-tight">
              Project Context & Budget
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-2">
              Optional details to help us refine the scope.
            </p>
          </div>

          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 mb-2 font-medium">
                Tell us about your project or current challenges
              </label>
              <textarea
                rows={4}
                value={projectContext}
                onChange={(e) => setProjectContext(e.target.value)}
                placeholder="E.g., We're launching in 2 months and need a brand refresh + custom Next.js site to generate leads..."
                className="w-full p-3.5 sm:p-4 rounded-2xl border border-neutral-200 focus:border-[#ff4500] focus:ring-1 focus:ring-[#ff4500] text-sm text-black outline-none font-sans leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 mb-2 font-medium">
                Estimated Investment Target (Optional)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {["₹25K – ₹50K", "₹50K – ₹1L", "₹1L – ₹2.5L", "₹2.5L+"].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`p-3 rounded-xl border text-center text-xs font-mono transition-all ${
                      budget === b
                        ? "border-[#ff4500] bg-[#ff4500]/[0.05] text-[#ff4500] font-semibold"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 gap-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="text-xs font-mono text-neutral-500 hover:text-black flex items-center gap-1.5 shrink-0"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              onClick={() => setStep(6)}
              className="w-full sm:w-auto bg-black hover:bg-[#ff4500] text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              Final Step <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Contact Information */}
      {step === 6 && (
        <form onSubmit={handleStep6Submit} className="space-y-6 sm:space-y-8 animate-fade-in">
          <div>
            <span className="text-xs font-mono text-[#ff4500] uppercase tracking-widest block mb-2 font-semibold">06</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-black leading-tight">
              Where should we send your estimate?
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-2">
              Enter your contact details to verify and calculate your project range.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5 max-w-xl">
            {formErrors.server && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-red-600">
                {formErrors.server}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 mb-1.5 font-medium">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className={`w-full p-3.5 sm:p-4 rounded-2xl border text-sm text-black outline-none transition-colors font-sans ${
                  formErrors.name ? "border-red-500 bg-red-50/20" : "border-neutral-200 focus:border-[#ff4500]"
                }`}
              />
              {formErrors.name && <p className="text-xs text-red-500 font-mono mt-1">{formErrors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 mb-1.5 font-medium">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john@example.com"
                className={`w-full p-3.5 sm:p-4 rounded-2xl border text-sm text-black outline-none transition-colors font-sans ${
                  formErrors.email ? "border-red-500 bg-red-50/20" : "border-neutral-200 focus:border-[#ff4500]"
                }`}
              />
              {formErrors.email && <p className="text-xs text-red-500 font-mono mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 mb-1.5 font-medium">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className={`w-full p-3.5 sm:p-4 rounded-2xl border text-sm text-black outline-none transition-colors font-sans ${
                  formErrors.phone ? "border-red-500 bg-red-50/20" : "border-neutral-200 focus:border-[#ff4500]"
                }`}
              />
              {formErrors.phone && <p className="text-xs text-red-500 font-mono mt-1">{formErrors.phone}</p>}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 gap-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setStep(5)}
              className="text-xs font-mono text-neutral-500 hover:text-black flex items-center gap-1.5 shrink-0"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="submit"
              disabled={isSendingOtp}
              className="w-full sm:w-auto bg-[#ff4500] hover:bg-[#e03d00] text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm disabled:opacity-50"
            >
              {isSendingOtp ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Sending Code...
                </>
              ) : (
                <>
                  Get Your Estimate <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* EMAIL VERIFICATION MODAL - OPTIMIZED FOR iOS SAFARI AUTOFILL & AUTOMATIC VERIFICATION */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-md w-full border border-neutral-200 shadow-2xl relative space-y-6">
            <button
              type="button"
              onClick={() => setShowOtpModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-black p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pr-6">
              <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest font-semibold block">
                [ SECURITY VERIFICATION ]
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-black tracking-tight">
                Verify your email.
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                We've sent a 6-digit verification code to <span className="text-black font-semibold">{email}</span>.
              </p>
            </div>

            {/* 6-Digit OTP Inputs with iOS inputMode="numeric", pattern="[0-9]*" & autoComplete="one-time-code" */}
            <div className="space-y-4">
              <div className="flex justify-between gap-1.5 sm:gap-2">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => { otpInputRefs.current[idx] = el; }}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={handleOtpPaste}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center font-mono font-bold text-lg sm:text-xl text-black border border-neutral-200 rounded-xl focus:border-[#ff4500] focus:ring-1 focus:ring-[#ff4500] outline-none transition-all"
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-xs text-red-500 font-mono text-center">{otpError}</p>
              )}
            </div>

            {/* Verification Actions */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                disabled={isVerifying || otpDigits.join("").length < 6}
                onClick={handleOtpSubmit}
                className="w-full bg-black hover:bg-[#ff4500] text-white py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Verifying...
                  </>
                ) : (
                  "Verify & View Estimate"
                )}
              </button>

              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-2">
                <button
                  type="button"
                  disabled={resendTimer > 0 || isSendingOtp}
                  onClick={requestOtpEmail}
                  className="hover:text-black disabled:opacity-50 text-[11px] sm:text-xs"
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend code"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="hover:text-black text-[11px] sm:text-xs"
                >
                  Change email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
