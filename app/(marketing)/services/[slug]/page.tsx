import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/content/services";
import { PageIntro } from "@/components/marketing/page-intro";
import { CtaBand } from "@/components/marketing/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/forms/whatsapp-button";
import { absoluteUrl, serviceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.name,
      description: service.summary,
      url: absoluteUrl(`/services/${service.slug}`),
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const priceLine = service.pricePrefix
    ? `${service.pricePrefix} ${service.priceLabel}`
    : service.priceLabel;

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <PageIntro title={service.name} description={service.summary} />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-mono text-sm text-accent">{priceLine}</p>
          <p className="mt-2 text-sm text-fg-muted">Delivery · {service.delivery}</p>
          <p className="mt-6 text-base leading-relaxed text-fg-muted">{service.idealFor}</p>

          <h2 className="mt-10 font-display text-2xl text-fg">Includes</h2>
          <ul className="mt-4 space-y-2 text-sm text-fg">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="text-accent">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="border border-border bg-bg-elevated p-6 sm:p-8">
          <h2 className="font-display text-2xl text-fg">Next step</h2>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">
            {service.quotationRequired
              ? "This package is quotation-based. Tell us about your requirements and we will respond with scope and investment."
              : "Book a consultation or request a quote to confirm timeline and kickoff."}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button href="/book">Book Consultation</Button>
            <Button href={`/contact?service=${encodeURIComponent(service.name)}`} variant="secondary">
              Request Quote
            </Button>
            <WhatsAppButton className="justify-center" />
          </div>
        </aside>
      </Container>
      <CtaBand />
    </>
  );
}
