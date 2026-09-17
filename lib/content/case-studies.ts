export type CaseStudyTheme = {
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  border: string;
  panel: string;
};

export type CaseStudyImage = {
  src: string;
  alt: string;
};

export type CaseStudyBuiltLabel = "Site" | "Booking" | "Ops";

export type CaseStudyAccess =
  | { type: "live"; url?: string; label?: string; note?: string }
  | { type: "private"; note: string };

export type CaseStudy = {
  slug: string;
  title: string;
  label: string;
  sector: string;
  location: string;
  problem: string;
  built: string;
  builtLabels: CaseStudyBuiltLabel[];
  result: string;
  access: CaseStudyAccess;
  stack?: string[];
  /** @deprecated Use imageMobile / imageDesktop */
  image?: CaseStudyImage;
  imageMobile?: CaseStudyImage;
  imageDesktop?: CaseStudyImage;
  theme: CaseStudyTheme;
};

/** Hardcoded production source for selected work. Not Sanity. */
export const caseStudies: CaseStudy[] = [
  {
    slug: "fouza-physiotherapy",
    title: "Fouza Physiotherapy",
    label: "Booking",
    sector: "Healthcare · Physiotherapy",
    location: "Cape Town, South Africa",
    problem: "A Cape Town clinic needed patients to book on their own site.",
    built: "Live site with native booking, patient and admin, and invoices.",
    builtLabels: ["Site", "Booking"],
    result: "Live booking site for Fouza Physiotherapy.",
    access: { type: "live", url: "https://fouzaphysiotherapy.co.za", label: "fouzaphysiotherapy.co.za" },
    stack: ["Next.js", "Booking", "Admin"],
    imageMobile: {
      src: "/images/case-studies/fouza-physiotherapy-mobile.jpg",
      alt: "Fouza Physiotherapy public booking calendar on mobile",
    },
    imageDesktop: {
      src: "/images/case-studies/fouza-physiotherapy-desktop.jpg",
      alt: "Fouza Physiotherapy public booking calendar on desktop",
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
    sector: "Transport · Tourism",
    location: "Western Cape, South Africa",
    problem: "A Cape transport operator needed fleet and experiences on the web, not a PDF.",
    built: "Live site with catalogue coverflows for home, experiences, and fleet.",
    builtLabels: ["Site"],
    result: "Live fleet and experiences site for Move in Africa.",
    access: { type: "live", url: "https://moveinafrica.co.za", label: "moveinafrica.co.za" },
    stack: ["Next.js", "Catalogue"],
    imageMobile: {
      src: "/images/case-studies/move-in-africa-mobile.jpg",
      alt: "Move in Africa fleet coverflow carousel on mobile",
    },
    imageDesktop: {
      src: "/images/case-studies/move-in-africa-desktop.jpg",
      alt: "Move in Africa fleet coverflow carousel on desktop",
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
    slug: "goops",
    title: "GoOps",
    label: "Operations platform",
    sector: "Transport · Fleet operations",
    location: "South Africa",
    problem: "Small transport teams run drivers, trips, GPS, and invoices in spreadsheets.",
    built: "Invite-only multi-tenant ops for drivers, trips, GPS tracking, and invoicing.",
    builtLabels: ["Ops"],
    result: "Live in production — invite-only platform for transport teams.",
    access: { type: "private", note: "Invite-only — live in production for enrolled transport teams." },
    stack: ["Next.js", "Multi-tenant", "GPS", "Invoicing"],
    imageMobile: {
      src: "/images/case-studies/goops-mobile.jpg",
      alt: "GoOps login and role hub on mobile",
    },
    imageDesktop: {
      src: "/images/case-studies/goops-desktop.jpg",
      alt: "GoOps login and role hub on desktop",
    },
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
    sector: "Food & beverage",
    location: "South Africa",
    problem: "A food brand needed a live catalogue so customers can order without a paper menu.",
    built: "Live storefront with product catalogue and WhatsApp order.",
    builtLabels: ["Site"],
    result: "Live storefront for The Savoury Lab.",
    access: { type: "live", note: "Live storefront on a custom domain." },
    stack: ["Next.js", "Catalogue", "WhatsApp"],
    imageMobile: {
      src: "/images/case-studies/the-savoury-lab-mobile.jpg",
      alt: "The Savoury Lab catalogue carousel with prices and WhatsApp order on mobile",
    },
    imageDesktop: {
      src: "/images/case-studies/the-savoury-lab-desktop.jpg",
      alt: "The Savoury Lab catalogue carousel with prices and WhatsApp order on desktop",
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
    sector: "Events · Hospitality",
    location: "Cape Town, South Africa",
    problem: "A Cape Town events collective needed a custom-domain site people can actually book from.",
    built: "Live events site on a custom domain, WhatsApp booking.",
    builtLabels: ["Site", "Booking"],
    result: "Live events site for Metanoia Events Collective.",
    access: { type: "live", note: "Live events site on a custom domain." },
    stack: ["Next.js", "WhatsApp booking"],
    imageMobile: {
      src: "/images/case-studies/metanoia-events-collective-mobile.jpg",
      alt: "Metanoia Events Collective services gallery carousel on mobile",
    },
    imageDesktop: {
      src: "/images/case-studies/metanoia-events-collective-desktop.jpg",
      alt: "Metanoia Events Collective services gallery carousel on desktop",
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

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.slug);
}

export function getCaseStudyImages(study: CaseStudy): CaseStudyImage[] {
  const images: CaseStudyImage[] = [];
  if (study.imageMobile) images.push(study.imageMobile);
  if (study.imageDesktop && study.imageDesktop.src !== study.imageMobile?.src) {
    images.push(study.imageDesktop);
  }
  if (!images.length && study.image) images.push(study.image);
  return images;
}

export function getCaseStudySummary(study: CaseStudy): string {
  return `${study.problem} ${study.built}`.slice(0, 160);
}
