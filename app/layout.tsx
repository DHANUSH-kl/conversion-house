import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-white text-black selection:bg-[#ff4500] selection:text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
