import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/content/products";
import { PageIntro } from "@/components/marketing/page-intro";
import { CtaBand } from "@/components/marketing/cta-band";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} · Coming Soon`,
    description: product.summary,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <PageIntro title={product.name} description={product.summary} />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-xs tracking-wide text-accent uppercase">Coming soon</p>
          <h2 className="mt-4 font-display text-2xl text-fg">What we are building</h2>
          <ul className="mt-4 space-y-2 text-sm text-fg-muted">
            {product.highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="text-accent">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-fg-muted">
            Join the waitlist for early access updates. If you need this capability now, we
            can scope a custom build while the product platform matures.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact" variant="secondary">
              Request custom build
            </Button>
            <Button href="/book" variant="ghost">
              Book Consultation
            </Button>
          </div>
        </div>
        <aside className="border border-border bg-bg-elevated p-6 sm:p-8">
          <h2 className="font-display text-2xl text-fg">Join the waitlist</h2>
          <p className="mt-3 mb-6 text-sm text-fg-muted">
            Early access notes for {product.name}. No spam — product updates only.
          </p>
          <WaitlistForm productSlug={product.slug} productName={product.name} />
        </aside>
      </Container>
      <CtaBand
        title={`Interested in ${product.name}?`}
        description="Tell us your use case — waitlist for the product, or custom delivery now."
      />
    </>
  );
}
