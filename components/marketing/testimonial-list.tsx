import { testimonials } from "@/lib/content/testimonials";

export function TestimonialList() {
  if (testimonials.length === 0) return null;

  return (
    <ul className="mt-10 grid gap-8 md:grid-cols-3">
      {testimonials.map((item) => (
        <li key={`${item.author}-${item.company}`}>
          <blockquote className="font-display text-xl leading-snug text-fg">
            “{item.quote}”
          </blockquote>
          <p className="mt-4 text-sm text-fg-muted">
            {item.author} · {item.role}, {item.company}
          </p>
        </li>
      ))}
    </ul>
  );
}
