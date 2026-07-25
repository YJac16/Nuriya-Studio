import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableBody } from "@/components/content/portable-text";
import { CtaBand } from "@/components/marketing/cta-band";
import { PageIntro } from "@/components/marketing/page-intro";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getResource, getResourceSlugs } from "@/lib/content/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getResourceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResource(slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.summary || resource.title,
  };
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params;
  const resource = await getResource(slug);
  if (!resource) notFound();

  return (
    <>
      <PageIntro
        title={resource.title}
        description={resource.summary || "Practical guidance from Nuriya Studio."}
      />
      <Container className="max-w-prose space-y-8 py-16">
        <p className="font-mono text-xs tracking-wide text-accent uppercase">
          {resource.type || "resource"}
        </p>
        {resource.body?.length ? (
          <PortableBody value={resource.body} />
        ) : (
          <div className="space-y-4 text-base leading-relaxed text-fg-muted">
            <p>{resource.summary}</p>
            <p>
              Prefer a working session? Book a consultation and we will apply this
              checklist directly to your project.
            </p>
          </div>
        )}
        {resource.fileUrl ? (
          <Button href={resource.fileUrl} external variant="secondary">
            Download / open file
          </Button>
        ) : null}
        <div className="flex flex-wrap gap-3 border-t border-border pt-8">
          <Button href="/book">Book Consultation</Button>
          <Button href="/contact" variant="secondary">
            Request Quote
          </Button>
        </div>
      </Container>
      <CtaBand />
    </>
  );
}
