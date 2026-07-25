import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 font-display text-2xl tracking-tight text-fg">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-xl tracking-tight text-fg">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mt-4 text-base leading-relaxed text-fg-muted">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l border-accent pl-4 font-display text-xl text-fg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-fg-muted">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-fg underline-offset-4 hover:underline"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded bg-bg-elevated px-1 py-0.5 font-mono text-sm text-fg">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }) => {
      const url = value ? urlForImage(value)?.width(1200).height(800).url() : null;
      if (!url) return null;
      return (
        <figure className="relative mt-8 aspect-[3/2] w-full overflow-hidden bg-bg-elevated">
          <Image
            src={url}
            alt={value?.alt || ""}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </figure>
      );
    },
  },
};

export function PortableBody({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}
