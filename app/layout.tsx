import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const clashDisplay = localFont({
  src: "../public/fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ConversionHouse — Brand. Build. Convert. Grow.",
  description:
    "We build brands, websites, e-commerce experiences and growth systems designed to help businesses move forward.",
  openGraph: {
    title: "ConversionHouse — Brand. Build. Convert. Grow.",
    description: "Digital growth studio that connects brand, technology, acquisition and optimization.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${clashDisplay.variable} scroll-smooth`}>
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
