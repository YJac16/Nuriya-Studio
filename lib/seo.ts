import {
  CONTACT_EMAIL,
  getSiteUrl,
  LOGO_MARK,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants";
import { services } from "@/lib/content/services";

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    email: CONTACT_EMAIL,
    description: SITE_DESCRIPTION,
    logo: absoluteUrl(LOGO_MARK),
    sameAs: [
      process.env.NEXT_PUBLIC_ATHARIQ_URL,
      process.env.NEXT_PUBLIC_LITTLE_LIGHT_URL,
      process.env.NEXT_PUBLIC_FOUNDER_URL,
    ].filter(Boolean),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: SITE_TAGLINE,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function serviceJsonLd(service: (typeof services)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    areaServed: "ZA",
    url: absoluteUrl(`/services/${service.slug}`),
    ...(service.priceAmount
      ? {
          offers: {
            "@type": "Offer",
            price: service.priceAmount,
            priceCurrency: "ZAR",
            url: absoluteUrl(`/services/${service.slug}`),
          },
        }
      : {}),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  slug,
  publishedAt,
  author,
  image,
}: {
  title: string;
  description?: string;
  slug: string;
  publishedAt?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    author: author
      ? { "@type": "Person", name: author }
      : { "@type": "Organization", name: SITE_NAME },
    image: image ? [image] : undefined,
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(LOGO_MARK),
      },
    },
  };
}

export function creativeWorkJsonLd({
  title,
  description,
  slug,
  image,
}: {
  title: string;
  description?: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: absoluteUrl(`/portfolio/${slug}`),
    image,
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}
