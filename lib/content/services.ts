export type Service = {
  slug: string;
  name: string;
  summary: string;
  priceLabel: string;
  priceAmount: number | null;
  pricePrefix?: string;
  delivery: string;
  includes: string[];
  idealFor: string;
  quotationRequired?: boolean;
};

export const services: Service[] = [
  {
    slug: "landing-pages",
    name: "Landing Pages",
    summary: "A focused single page built to convert — fast, mobile-ready, and clear.",
    priceLabel: "R2,499",
    priceAmount: 2499,
    delivery: "3–5 business days",
    idealFor: "Campaigns, local offers, and first digital presence.",
    includes: [
      "Single page",
      "WhatsApp integration",
      "Mobile responsive",
      "Basic SEO",
      "Contact form",
      "Google Maps",
      "Fast loading",
      "SSL",
      "Domain connection",
    ],
  },
  {
    slug: "business-website",
    name: "Business Website",
    summary: "A complete site for growing businesses — structure, content, and SEO included.",
    priceLabel: "R5,999",
    priceAmount: 5999,
    delivery: "1–2 weeks",
    idealFor: "SMEs that need a credible multi-page presence.",
    includes: [
      "Everything in Landing Pages",
      "Up to 8 pages",
      "Blog",
      "Gallery",
      "Testimonials",
      "FAQ",
      "Google Analytics",
      "Advanced SEO",
      "CMS ready",
    ],
  },
  {
    slug: "booking-system",
    name: "Booking System",
    summary: "Online booking with availability, payments, and an admin dashboard.",
    priceLabel: "R9,999",
    priceAmount: 9999,
    pricePrefix: "Starting from",
    delivery: "2–4 weeks",
    idealFor: "Clinics, salons, tours, trades, and appointment-based businesses.",
    includes: [
      "Everything in Business Website",
      "Online booking",
      "Availability calendar",
      "Admin dashboard",
      "Payment gateway integration",
      "Email confirmations",
      "Customer management",
      "Reports",
    ],
  },
  {
    slug: "custom-software",
    name: "Custom Software",
    summary: "Portals, dashboards, CRMs, and operational tools tailored to how you work.",
    priceLabel: "R15,000",
    priceAmount: 15000,
    pricePrefix: "Starting from",
    delivery: "Scoped per project",
    idealFor: "Teams that have outgrown spreadsheets and off-the-shelf tools.",
    quotationRequired: true,
    includes: [
      "Business portals",
      "Dashboards",
      "CRM",
      "Fleet management",
      "Transport software",
      "Booking engines",
      "Internal tools",
      "AI integrations",
      "API integrations",
    ],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    summary: "Complex systems, integrations, and multi-team delivery — quoted to scope.",
    priceLabel: "Custom quotation",
    priceAmount: null,
    delivery: "Agreed per engagement",
    idealFor: "Organisations with multi-stakeholder or multi-system requirements.",
    quotationRequired: true,
    includes: [
      "Discovery & architecture",
      "Custom product delivery",
      "Integrations & automation",
      "Security & compliance review",
      "Priority support options",
      "Dedicated project lead",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
