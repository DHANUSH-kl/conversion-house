export const SITE_CONFIG = {
  name: "ConversionHouse",
  legalName: "ConversionHouse Digital Growth Studio",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://conversionhouse.in",
  description:
    "ConversionHouse is a performance marketing agency and digital growth studio specializing in Meta Ads, Google Ads, high-intent lead generation, conversion rate optimization (CRO), and conversion-focused creative.",
  tagline: "Brand. Build. Convert. Grow.",
  email: "contact@conversionhouse.in",
  phone: "+919900447762",
  whatsapp: "https://wa.me/919900447762",
  address: {
    addressLocality: "Mysuru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  social: {
    linkedin: "https://linkedin.com/company/conversionhouse",
    twitter: "https://x.com/conversionhouse",
    instagram: "https://instagram.com/conversionhouse.in",
  },
};

export function getCanonicalUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath === "/" ? "" : cleanPath}`;
}
