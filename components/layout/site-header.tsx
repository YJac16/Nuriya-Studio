"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LOGO_MARK, SITE_NAME, SITE_SHORT_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !isHome || scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        solid
          ? "border-b border-border bg-bg/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-[4.25rem] items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={SITE_NAME}
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Image
            src={LOGO_MARK}
            alt=""
            width={40}
            height={38}
            className="logo-asset size-9 object-contain"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-sans text-[0.95rem] font-medium tracking-[0.04em] text-fg">
              {SITE_SHORT_NAME}
            </span>
            <span className="mt-1 font-sans text-[0.62rem] font-medium tracking-[0.28em] text-fg-muted uppercase">
              Studios
            </span>
          </span>
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button href="/book" className="hidden sm:inline-flex" variant="primary">
            Book
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
