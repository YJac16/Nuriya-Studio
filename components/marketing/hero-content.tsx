"use client";

import Image from "next/image";
import { LOGO_LOCKUP, SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

export function HeroContent() {
  return (
    <div className="max-w-3xl">
      <Reveal variant="text" delay={0}>
        <Image
          src={LOGO_LOCKUP}
          alt={SITE_NAME}
          width={314}
          height={266}
          priority
          className="logo-asset h-auto w-[11rem] object-contain sm:w-[13.5rem]"
        />
      </Reveal>

      <Reveal variant="text" delay={80}>
        <h1 className="sr-only">{SITE_NAME}</h1>
        <p className="mt-8 max-w-xl font-display text-3xl leading-[1.15] tracking-tight text-fg sm:text-4xl lg:text-5xl">
          Digital products that help businesses grow.
        </p>
      </Reveal>

      <Reveal variant="text" delay={140}>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-fg/75 sm:text-lg">
          Websites, software, and automation — built to be fast, reliable, and ready to scale.
        </p>
      </Reveal>

      <div className={cn("mt-9 flex flex-wrap gap-3 motion-reduce:opacity-100")}>
        <Button href="/book" showArrow>
          Start a Project
        </Button>
        <Button href="/portfolio" variant="secondary">
          View work
        </Button>
      </div>
    </div>
  );
}
