import type { Metadata } from "next";
import HomePageContent from "./HomePageContent";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG, getCanonicalUrl } from "@/lib/seo";
import { getFAQSchema } from "@/lib/structured-data";
import { FAQ_ITEMS } from "@/lib/home-data";

export const metadata: Metadata = {
  title: "Performance Marketing & Lead Generation Agency",
  description:
    "ConversionHouse is a performance marketing agency specializing in Meta Ads, Google Ads, high-intent lead generation, CRO, and conversion-focused creative.",
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
  openGraph: {
    title: "ConversionHouse — Performance Marketing & Lead Generation Agency",
    description:
      "ConversionHouse is a performance marketing agency specializing in Meta Ads, Google Ads, high-intent lead generation, CRO, and conversion-focused creative.",
    url: getCanonicalUrl("/"),
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`,
        width: 1200,
        height: 630,
        alt: "ConversionHouse Performance Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ConversionHouse — Performance Marketing & Lead Generation Agency",
    description:
      "ConversionHouse is a performance marketing agency specializing in Meta Ads, Google Ads, high-intent lead generation, CRO, and conversion-focused creative.",
    images: [`${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`],
  },
};

export default function Home() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <>
      <JsonLd data={faqSchema} />
      <HomePageContent />
    </>
  );
}
