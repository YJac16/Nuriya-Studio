import Image from "next/image";
import { LOGO_MARK } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { HeroContent } from "@/components/marketing/hero-content";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-var(--header-height))] overflow-hidden bg-bg">
      <div aria-hidden="true" className="absolute inset-0 bg-hero-glow" />
      <Image
        src={LOGO_MARK}
        alt=""
        width={244}
        height={235}
        aria-hidden="true"
        className="logo-asset pointer-events-none absolute -right-6 bottom-6 size-44 opacity-[0.08] sm:size-56 dark:opacity-[0.14]"
      />

      <Container className="relative flex min-h-[calc(100vh-var(--header-height))] flex-col justify-center py-20">
        <HeroContent />
      </Container>
    </section>
  );
}
