import type { CmsTestimonial } from "@/lib/sanity/types";

export function TestimonialList({ items }: { items: CmsTestimonial[] }) {
  if (!items.length) return null;

  return (
    <ul className="mt-10 grid gap-8 md:grid-cols-3">
      {items.map((item) => (
        <li key={item._id}>
          <blockquote className="font-display text-xl leading-snug text-fg">
            “{item.quote}”
          </blockquote>
          <p className="mt-4 text-sm text-fg-muted">
            {item.author}
            {item.role || item.company
              ? ` · ${[item.role, item.company].filter(Boolean).join(", ")}`
              : null}
          </p>
        </li>
      ))}
    </ul>
  );
}
