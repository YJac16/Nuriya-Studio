import Image from "next/image";
import Link from "next/link";
import { CTA_CONTACT, CTA_QUOTE } from "@/lib/constants";
import type { CaseStudy } from "@/lib/content/case-studies";
import { getCaseStudyImages } from "@/lib/content/case-studies";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/forms/whatsapp-button";

export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const images = getCaseStudyImages(study);

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs tracking-wide text-fg-muted uppercase">
        <span>{study.sector}</span>
        <span>{study.location}</span>
        {study.builtLabels.map((label) => (
          <span key={label} className="text-accent">
            {label}
          </span>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl text-fg">Problem</h2>
          <p className="mt-3 text-base leading-relaxed text-fg-muted">{study.problem}</p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-fg">What we built</h2>
          <p className="mt-3 text-base leading-relaxed text-fg-muted">{study.built}</p>
        </section>
      </div>

      <section>
        <h2 className="font-display text-2xl text-fg">Result</h2>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">{study.result}</p>
        <p className="mt-4 text-sm text-fg-muted">
          {study.access.type === "live" ? (
            study.access.url ? (
              <>
                Live site ·{" "}
                <a
                  href={study.access.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  {study.access.label || study.access.url}
                </a>
              </>
            ) : (
              study.access.note || "Live in production."
            )
          ) : (
            study.access.note
          )}
        </p>
      </section>

      {study.stack?.length ? (
        <section>
          <h2 className="font-display text-2xl text-fg">Stack</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {study.stack.map((tech) => (
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

      {images.length ? (
        <section>
          <h2 className="font-display text-2xl text-fg">Screenshots</h2>
          <p className="mt-2 text-sm text-fg-muted">Demo views from the live build.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {images.map((image) => (
              <div key={image.src} className="relative aspect-[3/2] overflow-hidden bg-bg-elevated">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-3 border-t border-border pt-8">
        <Button href={CTA_QUOTE.href}>Similar project? Request a quote</Button>
        <Button href={CTA_CONTACT.href} variant="secondary">
          {CTA_CONTACT.label}
        </Button>
        <WhatsAppButton />
        <Link
          href="/portfolio"
          className="inline-flex items-center text-sm text-fg-muted transition-colors hover:text-fg"
        >
          ← All work
        </Link>
      </div>
    </div>
  );
}
