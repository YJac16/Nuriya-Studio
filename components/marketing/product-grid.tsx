import Link from "next/link";
import { products } from "@/lib/content/products";

export function ProductGrid() {
  return (
    <ul className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.slug} className="bg-bg p-6 sm:p-8">
          <p className="font-mono text-xs tracking-wide text-fg-muted uppercase">
            Coming soon
          </p>
          <h3 className="mt-3 font-display text-2xl text-fg">{product.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{product.summary}</p>
          <ul className="mt-4 space-y-1 text-xs text-fg-muted">
            {product.highlights.slice(0, 3).map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
          <Link
            href={`/products/${product.slug}`}
            className="mt-6 inline-flex min-h-10 items-center text-sm font-medium text-fg underline-offset-4 hover:underline"
          >
            Join waitlist
          </Link>
        </li>
      ))}
    </ul>
  );
}
