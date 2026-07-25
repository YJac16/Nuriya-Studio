import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSolutionBySlug, solutions } from "@/lib/content/solutions";
import { getServiceBySlug } from "@/lib/content/services";
import { PageIntro } from "@/components/marketing/page-intro";
import { CtaBand } from "@/components/marketing/cta-band";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/forms/whatsapp-button";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return {
    title: `${solution.name} Solutions`,
    description: solution.summary,
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const related = solution.relatedServices
    .map((serviceSlug) => getServiceBySlug(serviceSlug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <>
      <PageIntro title={solution.name} description={solution.summary} />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-2xl text-fg">Common challenges</h2>
            <ul className="mt-4 space-y-2 text-sm text-fg-muted">
              {solution.challenges.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-accent">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-2xl text-fg">What we deliver</h2>
            <ul className="mt-4 space-y-2 text-sm text-fg-muted">
              {solution.outcomes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-accent">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          {related.length ? (
            <section>
              <h2 className="font-display text-2xl text-fg">Related packages</h2>
              <ul className="mt-4 space-y-3">
                {related.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-sm font-medium text-fg underline-offset-4 hover:underline"
                    >
                      {service.name}
                      <span className="ml-2 font-mono text-xs text-fg-muted">
                        {service.priceLabel}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        <aside className="border border-border bg-bg-elevated p-6 sm:p-8">
          <h2 className="font-display text-2xl text-fg">Talk through your use case</h2>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">
            Book a consultation or request a quote — we will recommend a package that fits
            how {solution.name.toLowerCase()} actually operate.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button href="/book">Book Consultation</Button>
            <Button href="/contact" variant="secondary">
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
