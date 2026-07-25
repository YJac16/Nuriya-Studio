import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/lib/content/products";
import { PageIntro } from "@/components/marketing/page-intro";
import { CtaBand } from "@/components/marketing/cta-band";
import { Container } from "@/components/ui/container";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} · Coming Soon`,
    description: product.summary,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  return (
    <>
      <PageIntro title={product.name} description={product.summary} />
      <Container className="py-16">
        <p className="font-mono text-xs tracking-wide text-accent uppercase">Coming soon</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">
          This product is on the Nuriya Studio roadmap. Book a consultation if you want
          early access or a custom build in this area today.
        </p>
      </Container>
      <CtaBand
        title={`Interested in ${product.name}?`}
        description="Tell us your use case — we can scope a custom system now while the product matures."
      />
    </>
  );
}
