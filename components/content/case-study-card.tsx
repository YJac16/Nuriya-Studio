import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/content/case-studies";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const { theme } = study;
  const mobileImage = study.imageMobile ?? study.image;
  const desktopImage = study.imageDesktop ?? study.image;
  const href = `/portfolio/${study.slug}`;

  return (
    <article
      className="flex h-full flex-col overflow-hidden border"
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        borderColor: theme.border,
      }}
    >
      <Link href={href} className="group block">
        {mobileImage || desktopImage ? (
          <div
            className="relative aspect-[3/2] w-full overflow-hidden"
            style={{ backgroundColor: theme.panel }}
          >
            {mobileImage ? (
              <Image
                src={mobileImage.src}
                alt={mobileImage.alt}
                fill
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] md:hidden"
                sizes="100vw"
              />
            ) : null}
            {desktopImage ? (
              <Image
                src={desktopImage.src}
                alt={desktopImage.alt}
                fill
                className={`object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] ${mobileImage ? "hidden md:block" : ""}`}
                sizes="(max-width: 1280px) 50vw, 33vw"
              />
            ) : null}
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
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p
          className="font-mono text-xs tracking-wide uppercase"
          style={{ color: theme.accent }}
        >
          {study.label}
        </p>
        <h2 className="mt-2 font-display text-2xl" style={{ color: theme.foreground }}>
          <Link href={href} className="transition-opacity hover:opacity-80">
            {study.title}
          </Link>
        </h2>
        <p className="mt-2 text-xs" style={{ color: theme.muted }}>
          {study.sector} · {study.location}
        </p>
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
        <Link
          href={href}
          className="mt-5 inline-flex text-sm font-medium transition-opacity hover:opacity-80"
          style={{ color: theme.accent }}
        >
          View case study →
        </Link>
      </div>
    </article>
  );
}
