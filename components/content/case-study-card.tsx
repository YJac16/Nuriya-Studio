"use client";

import Image from "next/image";
import { Reveal } from "@/components/marketing/reveal";
import type { CaseStudy } from "@/lib/content/case-studies";
import { getStaggerDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function CaseStudyCard({ study, index = 0 }: { study: CaseStudy; index?: number }) {
  const { theme } = study;
  const mobileImage = study.imageMobile ?? study.image;
  const desktopImage = study.imageDesktop ?? study.image;

  return (
    <Reveal variant="portfolio" delay={getStaggerDelay(index)}>
      <article
        className="group flex h-full flex-col overflow-hidden border transition-[border-color,box-shadow] duration-200 hover:border-accent/30 hover:shadow-sm"
        style={{
          backgroundColor: theme.background,
          color: theme.foreground,
          borderColor: theme.border,
        }}
      >
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
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none md:hidden"
                sizes="100vw"
              />
            ) : null}
            {desktopImage ? (
              <Image
                src={desktopImage.src}
                alt={desktopImage.alt}
                fill
                className={cn(
                  "object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none",
                  mobileImage ? "hidden md:block" : "",
                )}
                sizes="(max-width: 1280px) 50vw, 33vw"
              />
            ) : null}
            <div className="pointer-events-none absolute inset-0 bg-fg/0 transition-colors duration-200 group-hover:bg-fg/[0.03]" />
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
            className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium underline-offset-4 transition-[color,transform] duration-200 hover:underline focus-visible:outline-none focus-visible:underline group-hover:translate-x-0.5 motion-reduce:transform-none"
            style={{ color: theme.foreground }}
          >
            Visit site
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    </Reveal>
  );
}
