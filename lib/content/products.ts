export type Product = {
  slug: string;
  name: string;
  summary: string;
  highlights: string[];
};

export const products: Product[] = [
  {
    slug: "transport-management",
    name: "Transport Management",
    summary: "Operations software for transport companies and tour operators.",
    highlights: ["Jobs & dispatch", "Customer communication", "Operational reporting"],
  },
  {
    slug: "fleet-management",
    name: "Fleet Management",
    summary: "Vehicles, drivers, maintenance, and utilisation in one place.",
    highlights: ["Vehicle registry", "Maintenance schedules", "Utilisation insights"],
  },
  {
    slug: "booking-platform",
    name: "Booking Platform",
    summary: "Availability, payments, and customer management as a product.",
    highlights: ["Availability calendar", "Payments", "Admin dashboard"],
  },
  {
    slug: "invoice-platform",
    name: "Invoice Platform",
    summary: "Invoicing and cashflow tooling for service businesses.",
    highlights: ["Invoices & quotes", "Payment tracking", "Client records"],
  },
  {
    slug: "ai-automation-suite",
    name: "AI Automation Suite",
    summary: "Lead qualification, support drafts, and workflow automation.",
    highlights: ["Lead triage", "Draft replies", "Internal workflows"],
  },
  {
    slug: "productivity-apps",
    name: "Productivity Apps",
    summary: "Focused tools that remove busywork from daily operations.",
    highlights: ["Lightweight apps", "Team workflows", "Integrations"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
