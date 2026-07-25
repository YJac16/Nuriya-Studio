import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableBody } from "@/components/content/portable-text";
import { CtaBand } from "@/components/marketing/cta-band";
import { PageIntro } from "@/components/marketing/page-intro";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/forms/whatsapp-button";
import { getProject, getProjectSlugs } from "@/lib/content/data";
import { urlForImage } from "@/lib/sanity/image";
import { absoluteUrl, creativeWorkJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const cover = project.gallery?.[0]
    ? urlForImage(project.gallery[0])?.width(1200).height(630).url()
    : undefined;
  return {
    title: project.title,
    description: project.overview,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.overview,
      url: absoluteUrl(`/portfolio/${project.slug}`),
      images: cover ? [{ url: cover }] : undefined,
    },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const coverUrl = project.gallery?.[0]
    ? urlForImage(project.gallery[0])?.width(1200).height(800).url()
    : undefined;

  return (
    <>
      <JsonLd
        data={creativeWorkJsonLd({
          title: project.title,
          description: project.overview,
          slug: project.slug,
          image: coverUrl,
        })}
      />
      <PageIntro title={project.title} description={project.overview} />
      <Container className="space-y-12 py-16">
        <div className="flex flex-wrap gap-4 font-mono text-xs tracking-wide text-fg-muted uppercase">
          {project.client ? <span>Client · {project.client}</span> : null}
          {project.industry ? <span>Industry · {project.industry}</span> : null}
        </div>

        {(project.problem || project.solution) && (
          <div className="grid gap-8 md:grid-cols-2">
            {project.problem ? (
              <section>
                <h2 className="font-display text-2xl text-fg">Problem</h2>
                <p className="mt-3 text-base leading-relaxed text-fg-muted">{project.problem}</p>
              </section>
            ) : null}
            {project.solution ? (
              <section>
                <h2 className="font-display text-2xl text-fg">Solution</h2>
                <p className="mt-3 text-base leading-relaxed text-fg-muted">{project.solution}</p>
              </section>
            ) : null}
          </div>
        )}

        {project.techStack?.length ? (
          <section>
            <h2 className="font-display text-2xl text-fg">Tech stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="border border-border px-3 py-1 font-mono text-xs text-fg-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.gallery?.length ? (
          <section>
            <h2 className="font-display text-2xl text-fg">Screenshots</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {project.gallery.map((image, index) => {
                const url = urlForImage(image)?.width(1200).height(800).url();
                if (!url) return null;
                return (
                  <div key={index} className="relative aspect-[3/2] overflow-hidden bg-bg-elevated">
                    <Image
                      src={url}
                      alt={image.alt || `${project.title} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {project.results?.length ? (
          <section>
            <h2 className="font-display text-2xl text-fg">Results</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.results.map((result, index) => (
                <li key={`${result.label}-${index}`} className="border border-border p-5">
                  <p className="font-mono text-lg text-fg">{result.value}</p>
                  <p className="mt-1 text-sm text-fg-muted">{result.label}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <PortableBody value={project.body} />

        <div className="flex flex-wrap gap-3 border-t border-border pt-8">
          <Button href="/book">Book Consultation</Button>
          <Button href="/contact" variant="secondary">
            Request Quote
          </Button>
          <WhatsAppButton />
        </div>
      </Container>
      <CtaBand />
    </>
  );
}
