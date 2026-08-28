import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  renderToBuffer,
} from "@react-pdf/renderer";

export interface PdfQuotePayload {
  quoteId: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  goal: string;
  timeline: string;
  selectedServices: string[];
  projectContext?: string;
  budget?: string;
  estimatedRange: string;
  submittedAt: string;
}

// Clean PDF typography helper (Replaces Rupee symbol and special unicode dashes/arrows unsupported by Helvetica)
function sanitizePdfText(str: string): string {
  return str
    .replace(/₹/g, "Rs. ")
    .replace(/–/g, "-")
    .replace(/—/g, "-")
    .replace(/→/g, "->");
}

const styles = StyleSheet.create({
  page: {
    padding: 32,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    color: "#000000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    paddingBottom: 12,
    marginBottom: 16,
  },
  brand: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  accentDot: {
    color: "#ff4500",
  },
  docTitle: {
    fontSize: 9,
    fontFamily: "Courier",
    color: "#ff4500",
    textAlign: "right",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  metaGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  metaCol: {
    width: "48%",
  },
  metaLabel: {
    fontSize: 7,
    fontFamily: "Courier",
    color: "#888888",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  metaVal: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Courier",
    color: "#ff4500",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 10,
  },
  cardGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  card: {
    width: "31%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#eaeaea",
    borderRadius: 6,
    padding: 10,
  },
  cardTitle: {
    fontSize: 7,
    fontFamily: "Courier",
    color: "#666666",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  cardValue: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#000000",
  },
  servicesList: {
    marginBottom: 14,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 4,
  },
  serviceBullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#ff4500",
    marginRight: 6,
  },
  serviceText: {
    fontSize: 9,
    color: "#222222",
  },
  notesBox: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#eaeaea",
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
  },
  notesText: {
    fontSize: 8.5,
    color: "#444444",
    lineHeight: 1.4,
  },
  estimateBox: {
    backgroundColor: "#111111",
    borderRadius: 10,
    padding: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  estimateLabel: {
    fontSize: 7.5,
    fontFamily: "Courier",
    color: "#888888",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  estimateValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ff4500",
    marginBottom: 6,
  },
  estimateSub: {
    fontSize: 8,
    color: "#aaaaaa",
    lineHeight: 1.3,
  },
  ctaBox: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#eaeaea",
    borderRadius: 10,
    padding: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  ctaBtn: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#ff4500",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    textAlign: "center",
    textDecoration: "none",
    marginTop: 6,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 7.5,
    color: "#888888",
  },
  footerBrand: {
    fontSize: 8.5,
    fontFamily: "Courier",
    color: "#000000",
    fontWeight: "bold",
  },
});

const EstimatePdfDocument: React.FC<{ payload: PdfQuotePayload; bookingUrl: string }> = ({
  payload,
  bookingUrl,
}) => {
  const sanitizedEstimate = sanitizePdfText(payload.estimatedRange);
  const sanitizedName = sanitizePdfText(payload.name);
  const sanitizedContext = payload.projectContext ? sanitizePdfText(payload.projectContext) : "";

  return (
    <Document title={`ConversionHouse Estimate — ${payload.quoteId}`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header} wrap={false}>
          <Text style={styles.brand}>
            ConversionHouse<Text style={styles.accentDot}>.</Text>
          </Text>
          <View>
            <Text style={styles.docTitle}>PROJECT ESTIMATE</Text>
            <Text style={{ fontSize: 7.5, color: "#888888", textAlign: "right", marginTop: 2 }}>
              ID: {payload.quoteId}
            </Text>
          </View>
        </View>

        {/* Client Meta Grid */}
        <View style={styles.metaGrid} wrap={false}>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>PREPARED FOR</Text>
            <Text style={styles.metaVal}>{sanitizedName}</Text>
            <Text style={{ fontSize: 8.5, color: "#555555", marginTop: 2 }}>{payload.email}</Text>
            <Text style={{ fontSize: 8.5, color: "#555555", marginTop: 1 }}>{payload.phone}</Text>
          </View>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>DATE</Text>
            <Text style={styles.metaVal}>
              {new Date(payload.submittedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
            <Text style={{ fontSize: 7.5, color: "#888888", marginTop: 3 }}>STATUS: VERIFIED ESTIMATE</Text>
          </View>
        </View>

        {/* Project Overview */}
        <View wrap={false}>
          <Text style={styles.sectionTitle}>01. YOUR PROJECT SNAPSHOT</Text>
          <View style={styles.cardGrid}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>INDUSTRY</Text>
              <Text style={styles.cardValue}>{sanitizePdfText(payload.industry || "General")}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>GOAL</Text>
              <Text style={styles.cardValue}>{sanitizePdfText(payload.goal || "General")}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>TIMELINE</Text>
              <Text style={styles.cardValue}>{sanitizePdfText(payload.timeline || "Standard")}</Text>
            </View>
          </View>
        </View>

        {/* Selected Scope */}
        <View wrap={false}>
          <Text style={styles.sectionTitle}>
            02. WHAT YOU'RE LOOKING FOR ({payload.selectedServices.length})
          </Text>
          <View style={styles.servicesList}>
            {payload.selectedServices.length > 0 ? (
              payload.selectedServices.map((service, idx) => (
                <View key={idx} style={styles.serviceItem}>
                  <View style={styles.serviceBullet} />
                  <Text style={styles.serviceText}>{sanitizePdfText(service)}</Text>
                </View>
              ))
            ) : (
              <View style={styles.serviceItem}>
                <View style={styles.serviceBullet} />
                <Text style={styles.serviceText}>General Scope & Digital System Exploration</Text>
              </View>
            )}
          </View>
        </View>

        {/* Context Notes if provided */}
        {sanitizedContext ? (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>03. PROJECT CONTEXT & NOTES</Text>
            <View style={styles.notesBox}>
              <Text style={styles.notesText}>{sanitizedContext}</Text>
            </View>
          </View>
        ) : null}

        {/* Investment Estimate */}
        <View style={styles.estimateBox} wrap={false}>
          <Text style={styles.estimateLabel}>YOUR ESTIMATED INVESTMENT RANGE</Text>
          <Text style={styles.estimateValue}>{sanitizedEstimate}</Text>
          <Text style={styles.estimateSub}>
            Estimated based on the scope selected above. Final quote is confirmed after a 20-minute scope review.
          </Text>
        </View>

        {/* Next Step CTA */}
        <View style={styles.ctaBox} wrap={false}>
          <Text style={styles.ctaTitle}>Ready to finalize your project scope?</Text>
          <Text style={{ fontSize: 8.5, color: "#666666", marginBottom: 8 }}>
            Let's spend 20 minutes refining deliverables and answering your questions.
          </Text>
          {bookingUrl ? (
            <Link src={bookingUrl} style={styles.ctaBtn}>
              BOOK A 20-MINUTE CALL -&gt;
            </Link>
          ) : (
            <Text style={{ fontSize: 9, color: "#888888", fontStyle: "italic" }}>
              Booking link: https://conversionhouse.in/contact
            </Text>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer} wrap={false}>
          <Text style={styles.footerBrand}>ConversionHouse.</Text>
          <Text style={styles.footerText}>Branding • Technology • Growth</Text>
          <Text style={styles.footerText}>contact@conversionhouse.in</Text>
        </View>
      </Page>
    </Document>
  );
};

export async function generateQuotePdfBuffer(payload: PdfQuotePayload): Promise<Buffer> {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "https://conversionhouse.in/contact";
  const pdfStream = await renderToBuffer(
    <EstimatePdfDocument payload={payload} bookingUrl={bookingUrl} />
  );
  return Buffer.from(pdfStream);
}
