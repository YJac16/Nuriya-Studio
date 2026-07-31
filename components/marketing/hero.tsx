import Image from "next/image";
import { LOGO_LOCKUP, LOGO_MARK, SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4.25rem)] overflow-hidden bg-bg">
      <div aria-hidden="true" className="absolute inset-0 bg-hero-glow" />
      <Image
        src={LOGO_MARK}
        alt=""
        width={320}
        height={320}
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 bottom-6 size-44 opacity-[0.07] sm:size-56 dark:opacity-[0.12]"
      />

      <Container className="relative flex min-h-[calc(100vh-4.25rem)] flex-col justify-center py-20">
        <div className="max-w-3xl animate-fade-up">
          <Image
            src={LOGO_LOCKUP}
            alt={SITE_NAME}
            width={280}
            height={320}
            priority
            className="h-auto w-[9.5rem] object-contain sm:w-[11.5rem]"
          />
          <h1 className="sr-only">{SITE_NAME}</h1>
          <p className="mt-8 max-w-xl font-display text-3xl leading-[1.15] tracking-tight text-fg sm:text-4xl lg:text-5xl">
            Digital products that help businesses grow.
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-fg/75 sm:text-lg">
            Websites, software, and automation — built to be fast, reliable, and ready to
            scale.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/book">Book Consultation</Button>
            <Button href="/portfolio" variant="secondary">
              View work
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
