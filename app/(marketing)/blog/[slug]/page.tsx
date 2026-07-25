import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableBody } from "@/components/content/portable-text";
import { CtaBand } from "@/components/marketing/cta-band";
import { Container } from "@/components/ui/container";
import { getPost, getPostSlugs } from "@/lib/content/data";
import { urlForImage } from "@/lib/sanity/image";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const coverUrl = post.cover ? urlForImage(post.cover)?.width(1600).height(900).url() : null;
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-ZA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <article>
        <Container className="py-16 sm:py-20">
          <p className="font-mono text-xs tracking-wide text-accent uppercase">Blog</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl tracking-tight text-fg sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-fg-muted">
            {date ? <span>{date}</span> : null}
            {post.author ? <span>{post.author}</span> : null}
          </div>
          {post.excerpt ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">{post.excerpt}</p>
          ) : null}
        </Container>

        {coverUrl ? (
          <div className="relative mx-auto aspect-[16/9] w-full max-w-content overflow-hidden bg-bg-elevated px-5 sm:px-8">
            <div className="relative h-full w-full">
              <Image
                src={coverUrl}
                alt={post.cover?.alt || post.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </div>
        ) : null}

        <Container className="max-w-prose py-16">
          <PortableBody value={post.body} />
        </Container>
      </article>
      <CtaBand title="Want this built for your business?" />
    </>
  );
}
