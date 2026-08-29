import Image from "next/image";
import type { CaseStudy } from "@/lib/content/case-studies";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const { theme } = study;

  return (
    <article
      className="flex h-full flex-col overflow-hidden border"
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        borderColor: theme.border,
      }}
    >
      {study.image ? (
        <div
          className="relative aspect-[3/2] w-full overflow-hidden"
          style={{ backgroundColor: theme.panel }}
        >
          <Image
            src={study.image.src}
            alt={study.image.alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div
          className="flex aspect-[3/2] w-full items-center justify-center px-6"
          style={{ backgroundColor: theme.panel }}
        >
          <p className="font-display text-4xl tracking-tight" style={{ color: theme.foreground }}>
            {study.title}
          </p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <p
          className="font-mono text-xs tracking-wide uppercase"
          style={{ color: theme.accent }}
        >
          {study.label}
        </p>
        <h2 className="mt-2 font-display text-2xl" style={{ color: theme.foreground }}>
          {study.title}
        </h2>
        <dl className="mt-4 space-y-3 text-sm leading-relaxed">
          <div>
            <dt className="font-mono text-xs tracking-wide uppercase" style={{ color: theme.accent }}>
              Problem
            </dt>
            <dd className="mt-1" style={{ color: theme.muted }}>
              {study.problem}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs tracking-wide uppercase" style={{ color: theme.accent }}>
              Built
            </dt>
            <dd className="mt-1" style={{ color: theme.muted }}>
              {study.built}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs tracking-wide uppercase" style={{ color: theme.accent }}>
              Result
            </dt>
            <dd className="mt-1" style={{ color: theme.muted }}>
              {study.result}
            </dd>
          </div>
        </dl>
        <a
          href={study.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-6 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:underline"
          style={{ color: theme.foreground }}
        >
          Visit site
        </a>
      </div>
    </article>
  );
}
