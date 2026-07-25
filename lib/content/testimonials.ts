export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

/** Populated via Sanity in Phase 3. Empty until real client permission is granted. */
export const testimonials: Testimonial[] = [];
