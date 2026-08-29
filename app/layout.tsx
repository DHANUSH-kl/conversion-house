import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/seo";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/structured-data";

const clashDisplay = localFont({
  src: "../public/fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "ConversionHouse — Performance Marketing & Growth Agency",
    template: "%s | ConversionHouse",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "performance marketing agency",
    "lead generation agency",
    "Meta Ads agency",
    "Google Ads agency",
    "conversion rate optimization agency",
    "UGC ads agency",
    "Shopify e-commerce development",
    "digital growth studio India",
  ],
  authors: [{ name: "ConversionHouse", url: SITE_CONFIG.url }],
  creator: "ConversionHouse",
  publisher: "ConversionHouse",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: "ConversionHouse — Performance Marketing & Growth Agency",
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`,
        width: 1200,
        height: 630,
        alt: "ConversionHouse — Brand. Build. Convert. Grow.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ConversionHouse — Performance Marketing & Growth Agency",
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`],
    creator: "@conversionhouse",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/CONVERION HOUSE LOGO .png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <html lang="en" className={`${clashDisplay.variable} scroll-smooth`}>
      <head>
        <JsonLd data={[organizationSchema, websiteSchema]} />
      </head>
      <body className="antialiased bg-white text-black selection:bg-[#ff4500] selection:text-white font-sans">
        <Header />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
