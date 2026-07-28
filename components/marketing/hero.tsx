import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4.25rem)] overflow-hidden">
      <Image
        src="/images/yaseen-jacobs.jpg"
        alt=""
        fill
        priority
        quality={75}
        className="object-cover object-[center_20%] sm:object-[center_25%]"
        sizes="100vw"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-bg via-bg/92 to-bg/55 dark:from-bg dark:via-bg/90 dark:to-bg/50"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40"
      />
      <Image
        src="/images/nuriya-logo.png"
        alt=""
        width={280}
        height={280}
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 bottom-8 size-48 opacity-[0.06] sm:size-64 dark:opacity-[0.1]"
      />

      <Container className="relative flex min-h-[calc(100vh-4.25rem)] flex-col justify-center py-20">
        <div className="max-w-3xl animate-fade-up">
          <h1 className="font-display text-5xl leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl">
            {SITE_NAME}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg/80 sm:text-xl">
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
