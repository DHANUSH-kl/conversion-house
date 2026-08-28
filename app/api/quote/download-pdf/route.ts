import { NextResponse } from "next/server";
import { generateQuotePdfBuffer, PdfQuotePayload } from "@/lib/pdfGenerator";
import { formatIndianPrice } from "@/lib/otpStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { quoteId, name, email, phone, industry, goal, timeline, selectedServices, projectContext, budget } = body;

    if (!name || !email || !quoteId) {
      return NextResponse.json(
        { error: "Missing required details for PDF generation." },
        { status: 400 }
      );
    }

    // Recalculate price range for verification
    const SERVICE_PRICING: Record<string, { min: number; max: number }> = {
      "Strategy & Positioning": { min: 25, max: 50 },
      "Logo & Wordmark": { min: 20, max: 40 },
      "Visual Identity System": { min: 30, max: 60 },
      "Brand Guidelines": { min: 15, max: 30 },
      "Packaging & Collateral": { min: 20, max: 45 },
      "Custom Website (5-10 pages)": { min: 35, max: 75 },
      "High-Converting Landing Page": { min: 20, max: 40 },
      "Shopify E-Commerce Store": { min: 45, max: 95 },
      "Headless Shopify Commerce": { min: 75, max: 150 },
      "Web Application / Portal": { min: 80, max: 180 },
      "Technical & On-Page SEO": { min: 25, max: 50 },
      "Local SEO & Maps": { min: 15, max: 35 },
      "Meta Ads Acquisition": { min: 25, max: 55 },
      "Google Search & Shopping Ads": { min: 25, max: 55 },
      "Conversion Rate Optimization (CRO)": { min: 20, max: 45 },
      "Analytics & Tracking Setup": { min: 15, max: 30 },
      "UX Friction Audit": { min: 15, max: 25 },
    };

    let min = 0;
    let max = 0;
    if (selectedServices && selectedServices.length > 0) {
      selectedServices.forEach((s: string) => {
        const p = SERVICE_PRICING[s] || { min: 15, max: 35 };
        min += p.min;
        max += p.max;
      });
    } else {
      min = 25;
      max = 60;
    }

    if (timeline === "In the next 30 days") {
      min = Math.round(min * 1.15);
      max = Math.round(max * 1.15);
    }

    const estimatedRangeStr = `${formatIndianPrice(min)} – ${formatIndianPrice(max)}+`;

    const pdfPayload: PdfQuotePayload = {
      quoteId,
      name,
      email,
      phone,
      industry: industry || "Not specified",
      goal: goal || "Not specified",
      timeline: timeline || "Not specified",
      selectedServices: selectedServices || [],
      projectContext,
      budget,
      estimatedRange: estimatedRangeStr,
      submittedAt: new Date().toISOString(),
    };

    const pdfBuffer = await generateQuotePdfBuffer(pdfPayload);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="conversionhouse-estimate-${quoteId}.pdf"`,
      },
    });
  } catch (err) {
    console.error("[Download PDF API Error]:", err);
    return NextResponse.json(
      { error: "Failed to generate estimate PDF." },
      { status: 500 }
    );
  }
}
