import { NextResponse } from "next/server";
import crypto from "crypto";
import { formatIndianPrice } from "@/lib/otpStore";
import { sendLeadNotificationEmail, sendClientEstimateEmail } from "@/lib/email";
import { sendWhatsAppNotification } from "@/lib/whatsapp";
import { generateQuotePdfBuffer, PdfQuotePayload } from "@/lib/pdfGenerator";

export interface QuotePayload {
  name: string;
  email: string;
  phone: string;
  industry: string;
  goal: string;
  timeline: string;
  selectedServices: string[];
  projectContext?: string;
  budget?: string;
  verificationToken?: string;
}

// Service base prices in INR (thousands)
const SERVICE_PRICING: Record<string, { min: number; max: number }> = {
  // Branding
  "Strategy & Positioning": { min: 25, max: 50 },
  "Logo & Wordmark": { min: 20, max: 40 },
  "Visual Identity System": { min: 30, max: 60 },
  "Brand Guidelines": { min: 15, max: 30 },
  "Packaging & Collateral": { min: 20, max: 45 },

  // Digital Experiences
  "Custom Website (5-10 pages)": { min: 35, max: 75 },
  "High-Converting Landing Page": { min: 20, max: 40 },
  "Shopify E-Commerce Store": { min: 45, max: 95 },
  "Headless Shopify Commerce": { min: 75, max: 150 },
  "Web Application / Portal": { min: 80, max: 180 },

  // Visibility & Growth
  "Technical & On-Page SEO": { min: 25, max: 50 },
  "Local SEO & Maps": { min: 15, max: 35 },
  "Meta Ads Acquisition": { min: 25, max: 55 },
  "Google Search & Shopping Ads": { min: 25, max: 55 },

  // Conversion & Intelligence
  "Conversion Rate Optimization (CRO)": { min: 20, max: 45 },
  "Analytics & Tracking Setup": { min: 15, max: 30 },
  "UX Friction Audit": { min: 15, max: 25 },
};

function calculateEstimate(selectedServices: string[], timeline: string) {
  let min = 0;
  let max = 0;

  if (!selectedServices || selectedServices.length === 0) {
    min = 25;
    max = 60;
  } else {
    selectedServices.forEach((service) => {
      const price = SERVICE_PRICING[service] || { min: 15, max: 35 };
      min += price.min;
      max += price.max;
    });
  }

  // Adjust for urgent timeline (In the next 30 days)
  if (timeline === "In the next 30 days") {
    min = Math.round(min * 1.15);
    max = Math.round(max * 1.15);
  }

  return { min, max };
}

export async function POST(req: Request) {
  try {
    const body: QuotePayload = await req.json();
    const { name, email, phone, industry, goal, timeline, selectedServices, projectContext, budget } = body;

    // Server-side input validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required contact details (Name, Email, Phone)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // 1. Generate Unique Canonical Quote ID & Calculation
    const quoteId = `CH-QUOTE-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const { min, max } = calculateEstimate(selectedServices, timeline);
    const estimatedRangeStr = `${formatIndianPrice(min)} – ${formatIndianPrice(max)}+`;
    const submittedAt = new Date().toISOString();

    const pdfPayload: PdfQuotePayload = {
      quoteId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      industry: industry || "Not specified",
      goal: goal || "Not specified",
      timeline: timeline || "Not specified",
      selectedServices: selectedServices || [],
      projectContext,
      budget,
      estimatedRange: estimatedRangeStr,
      submittedAt,
    };

    // 2. Generate PDF Buffer for Attachments
    let pdfBuffer: Buffer | undefined;
    try {
      pdfBuffer = await generateQuotePdfBuffer(pdfPayload);
    } catch (pdfErr) {
      console.error("[PDF Generation Error]:", pdfErr);
    }

    // 3. Await Internal Lead Email to contact@conversionhouse.in (with PDF attached)
    try {
      const internalEmailSent = await sendLeadNotificationEmail(pdfPayload, pdfBuffer);
      console.log(`[Internal Lead Email Status]: ${internalEmailSent ? "SUCCESS" : "FAILED"}`);
    } catch (emailErr) {
      console.error("[Internal Lead Email Dispatch Exception]:", emailErr);
    }

    // 4. Await Client Estimate Email to verified user email (with PDF attached)
    try {
      const clientEmailSent = await sendClientEstimateEmail(
        {
          quoteId,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          estimatedRange: estimatedRangeStr,
        },
        pdfBuffer
      );
      console.log(`[Client Estimate Email Status]: ${clientEmailSent ? "SUCCESS" : "FAILED"}`);
    } catch (clientEmailErr) {
      console.error("[Client Estimate Email Dispatch Exception]:", clientEmailErr);
    }

    // 5. Await WhatsApp Notification Dispatch to +91 9900447762
    try {
      const waSent = await sendWhatsAppNotification(pdfPayload);
      console.log(`[WhatsApp Dispatch Status]: ${waSent.success ? "SUCCESS" : "NOT_CONFIGURED/LOGGED"}`);
    } catch (waErr) {
      console.error("[WhatsApp Dispatch Exception]:", waErr);
    }

    // 6. Return canonical estimate & quote ID to user
    return NextResponse.json({
      success: true,
      quoteId,
      estimatedMin: min,
      estimatedMax: max,
      estimatedRange: estimatedRangeStr,
      submittedAt,
    });
  } catch (err) {
    console.error("[Quote Submit API Error]:", err);
    return NextResponse.json(
      { error: "Server error processing lead submission. Please try again." },
      { status: 500 }
    );
  }
}
