import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4.25rem)] overflow-hidden">
      <Image
        src="/images/nuriya-logo-vector.png"
        alt=""
        fill
        priority
        className="object-cover object-center opacity-[0.14] dark:opacity-[0.2]"
        sizes="100vw"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/75 to-bg"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-hero-glow opacity-80" />

      <Container className="relative flex min-h-[calc(100vh-4.25rem)] flex-col justify-center py-20">
        <div className="max-w-3xl animate-fade-up">
          <p className="font-sans text-sm font-semibold tracking-[0.22em] text-fg uppercase sm:text-base">
            {SITE_NAME}
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-7xl">
            Digital products that help businesses grow.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            Websites, software, and automation — built to be fast, reliable, and ready to
            scale.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/book">Book Consultation</Button>
            <Button href="/services" variant="secondary">
              View Services
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
