export type Solution = {
  slug: string;
  name: string;
  summary: string;
  challenges: string[];
  outcomes: string[];
  relatedServices: string[];
};

export const solutions: Solution[] = [
  {
    slug: "small-businesses",
    name: "Small Businesses",
    summary: "A clear digital presence and simple systems that save time without adding complexity.",
    challenges: [
      "Outdated or missing website",
      "Leads lost in WhatsApp and email threads",
      "No consistent booking or follow-up process",
    ],
    outcomes: [
      "Conversion-focused website or landing page",
      "Clear enquiry and quote paths",
      "Optional booking and monthly care plans",
    ],
    relatedServices: ["landing-pages", "business-website", "booking-system"],
  },
  {
    slug: "transport",
    name: "Transport Companies",
    summary: "Operational clarity for fleets, routes, and customer communication.",
    challenges: [
      "Spreadsheet-heavy operations",
      "Fragmented booking and dispatch",
      "Limited visibility for customers and staff",
    ],
    outcomes: [
      "Custom portals and dashboards",
      "Booking and customer management",
      "Path toward transport management software",
    ],
    relatedServices: ["custom-software", "booking-system", "business-website"],
  },
  {
    slug: "tour-operators",
    name: "Tour Operators",
    summary: "Sell trips with confidence — availability, payments, and guest communication in one flow.",
    challenges: [
      "Manual reservations and confirmations",
      "Seasonal peaks that overwhelm inboxes",
      "Weak mobile experience for travellers",
    ],
    outcomes: [
      "Online booking with payments",
      "Admin tools for schedules and guests",
      "Marketing site that converts enquiry traffic",
    ],
    relatedServices: ["booking-system", "business-website", "custom-software"],
  },
  {
    slug: "medical",
    name: "Medical Professionals",
    summary: "Professional sites and appointment systems that feel calm, clear, and trustworthy.",
    challenges: [
      "Phone-heavy appointment booking",
      "Patients struggling to find services online",
      "Compliance-sensitive communication needs",
    ],
    outcomes: [
      "Credible practice website",
      "Online booking and reminders",
      "Secure, scoped custom tools when needed",
    ],
    relatedServices: ["business-website", "booking-system", "custom-software"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    summary: "Position expertise clearly and turn interest into structured consultations.",
    challenges: [
      "Generic agency-style websites",
      "Unclear service packaging",
      "Leads without a defined next step",
    ],
    outcomes: [
      "Service-led website architecture",
      "Consultation booking",
      "Optional client portals and reporting",
    ],
    relatedServices: ["business-website", "landing-pages", "custom-software"],
  },
  {
    slug: "trades",
    name: "Trades",
    summary: "Win local work with fast pages, WhatsApp-ready CTAs, and simple job intake.",
    challenges: [
      "Hard-to-find online presence",
      "Missed calls during jobs",
      "No system for quotes and follow-ups",
    ],
    outcomes: [
      "Mobile-first landing or business site",
      "WhatsApp and form lead capture",
      "Optional quoting and scheduling tools",
    ],
    relatedServices: ["landing-pages", "business-website", "booking-system"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    summary: "Make rooms, tables, and experiences easy to discover and book.",
    challenges: [
      "Fragmented listings and direct bookings",
      "Seasonal demand spikes",
      "Brand experience that feels inconsistent",
    ],
    outcomes: [
      "Brand-led website with strong CTAs",
      "Booking integrations",
      "Guest communication and admin tooling",
    ],
    relatedServices: ["business-website", "booking-system", "custom-software"],
  },
  {
    slug: "startups",
    name: "Startups",
    summary: "Ship a credible product surface fast — then iterate toward software that scales.",
    challenges: [
      "Need to launch before the full product is ready",
      "Limited engineering bandwidth",
      "Messaging that changes every month",
    ],
    outcomes: [
      "Launch site or MVP portal",
      "Waitlists and early customer capture",
      "Custom software as the product hardens",
    ],
    relatedServices: ["landing-pages", "custom-software", "enterprise"],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}
