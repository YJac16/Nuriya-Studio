export type CaseStudyTheme = {
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  border: string;
  panel: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  label: string;
  problem: string;
  built: string;
  result: string;
  href: string;
  image?: {
    src: string;
    alt: string;
  };
  theme: CaseStudyTheme;
};

/** Hardcoded production source for selected work. Not Sanity. */
export const caseStudies: CaseStudy[] = [
  {
    slug: "fouza-physiotherapy",
    title: "Fouza Physiotherapy",
    label: "Booking",
    problem: "A Cape Town clinic needed patients to book on their own site.",
    built: "Live site with native booking, patient and admin, and invoices.",
    result: "Live at fouzaphysiotherapy.co.za.",
    href: "https://fouzaphysiotherapy.co.za",
    image: {
      src: "/images/case-studies/fouza-physiotherapy.jpg",
      alt: "Fouza Physiotherapy public homepage",
    },
    theme: {
      background: "#f7fbfc",
      foreground: "#2d2f31",
      muted: "#5a6164",
      accent: "#3aa0ad",
      border: "#b9dce0",
      panel: "#e6f4f6",
    },
  },
  {
    slug: "move-in-africa",
    title: "Move in Africa",
    label: "Tours / ops site",
    problem: "A Cape transport operator needed fleet and experiences on the web, not a PDF.",
    built: "Live site with catalogue coverflows for home, experiences, and fleet.",
    result: "Live at moveinafrica.co.za.",
    href: "https://moveinafrica.co.za",
    image: {
      src: "/images/case-studies/move-in-africa.jpg",
      alt: "Move in Africa public homepage",
    },
    theme: {
      background: "#1a1f24",
      foreground: "#f8fafb",
      muted: "#c5cdd3",
      accent: "#c9b07a",
      border: "#2c343c",
      panel: "#2c343c",
    },
  },
  {
    slug: "workops",
    title: "WorkOps",
    label: "Custom software",
    problem: "Small transport teams run drivers, trips, and invoices in spreadsheets.",
    built: "Invite-only multi-tenant ops: role hubs, trips, GPS, invoices, membership.",
    result: "Live invite-only platform.",
    href: "https://workops-mu.vercel.app",
    theme: {
      background: "#0b0f17",
      foreground: "#f3f4f6",
      muted: "#9ca3af",
      accent: "#3b82f6",
      border: "#1f2937",
      panel: "#111827",
    },
  },
  {
    slug: "the-savoury-lab",
    title: "The Savoury Lab",
    label: "Food storefront",
    problem: "A food brand needed a live catalogue so customers can order without a paper menu.",
    built: "Live storefront with product catalogue and WhatsApp order.",
    result: "Live at https://the-savoury-lab.vercel.app",
    href: "https://the-savoury-lab.vercel.app",
    image: {
      src: "/images/case-studies/the-savoury-lab.jpg",
      alt: "The Savoury Lab public catalogue",
    },
    theme: {
      background: "#ffffff",
      foreground: "#111111",
      muted: "#6b6b6b",
      accent: "#c79a52",
      border: "#e8e8e8",
      panel: "#f4f4f4",
    },
  },
  {
    slug: "metanoia-events-collective",
    title: "Metanoia Events Collective",
    label: "Events site",
    problem: "A Cape Town events collective needed a custom-domain site people can actually book from.",
    built: "Live events site on a custom domain, WhatsApp booking.",
    result: "Live at https://metanoiaeventscollective.co.za",
    href: "https://metanoiaeventscollective.co.za",
    image: {
      src: "/images/case-studies/metanoia-events-collective.jpg",
      alt: "Metanoia Events Collective public homepage",
    },
    theme: {
      background: "#0b0b0b",
      foreground: "#f5f0e8",
      muted: "#c9c2b6",
      accent: "#d4af37",
      border: "#2a2a2a",
      panel: "#141414",
    },
  },
];
