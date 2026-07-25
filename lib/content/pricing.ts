export type MonthlyPlan = {
  slug: string;
  name: string;
  priceLabel: string;
  priceAmount: number;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const monthlyPlans: MonthlyPlan[] = [
  {
    slug: "starter",
    name: "Starter",
    priceLabel: "R299",
    priceAmount: 299,
    description: "Reliable hosting and upkeep for a live site.",
    features: ["Hosting", "SSL", "Monitoring", "Backups"],
  },
  {
    slug: "growth",
    name: "Growth",
    priceLabel: "R699",
    priceAmount: 699,
    description: "Keep content fresh and visibility improving.",
    highlighted: true,
    features: [
      "Everything in Starter",
      "Content updates",
      "SEO checks",
      "Analytics",
      "Support",
    ],
  },
  {
    slug: "business",
    name: "Business",
    priceLabel: "R1,299",
    priceAmount: 1299,
    description: "Priority partnership with ongoing development time.",
    features: [
      "Everything in Growth",
      "Priority support",
      "Feature updates",
      "Monthly reports",
      "4 hours development",
    ],
  },
];
