export type ResourceItem = {
  slug: string;
  title: string;
  type: string;
  summary: string;
};

/** Static scaffold until Sanity Resource documents are published. */
export const fallbackResources: ResourceItem[] = [
  {
    slug: "website-brief-checklist",
    title: "Website brief checklist",
    type: "checklist",
    summary: "What to prepare before a discovery call so scope and timeline stay clear.",
  },
  {
    slug: "booking-system-readiness",
    title: "Booking system readiness guide",
    type: "guide",
    summary: "Questions that determine whether you need a booking add-on or a custom engine.",
  },
  {
    slug: "sme-software-roadmap",
    title: "SME software roadmap",
    type: "guide",
    summary: "A practical sequence from website cash flow to recurring software revenue.",
  },
];
