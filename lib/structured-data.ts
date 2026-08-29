import { SITE_CONFIG, getCanonicalUrl } from "./seo";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`,
    image: `${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONFIG.address.addressLocality,
      addressRegion: SITE_CONFIG.address.addressRegion,
      addressCountry: SITE_CONFIG.address.addressCountry,
    },
    priceRange: "₹₹₹",
    sameAs: [SITE_CONFIG.social.linkedin, SITE_CONFIG.social.twitter, SITE_CONFIG.social.instagram],
    knowsAbout: [
      "Performance Marketing",
      "Lead Generation",
      "Meta Ads Management",
      "Google Ads Management",
      "Conversion Rate Optimization",
      "UGC Ads & Conversion Creative",
      "Headless Shopify E-Commerce",
      "Search Engine Optimization (SEO)",
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: "en-US",
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item.startsWith("http") ? crumb.item : getCanonicalUrl(crumb.item),
    })),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    url: getCanonicalUrl(service.url),
    serviceType: service.serviceType,
    areaServed: "Global",
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalUrl(article.url),
    },
    url: getCanonicalUrl(article.url),
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Organization",
      name: article.authorName || SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    image: article.image
      ? article.image.startsWith("http")
        ? article.image
        : `${SITE_CONFIG.url}${article.image}`
      : `${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`,
  };
}

export function getCreativeWorkSchema(work: {
  title: string;
  description: string;
  url: string;
  image?: string;
  clientName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: work.title,
    description: work.description,
    url: getCanonicalUrl(work.url),
    creator: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    image: work.image
      ? work.image.startsWith("http")
        ? work.image
        : `${SITE_CONFIG.url}${work.image}`
      : `${SITE_CONFIG.url}/CONVERION HOUSE LOGO .png`,
  };
}
