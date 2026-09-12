"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useScrolled } from "@/hooks/use-scrolled";
import { LOGO_MARK, SITE_NAME, SITE_SHORT_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrolled = useScrolled(24);
  const headerRef = useRef<HTMLElement>(null);

  const solid = !isHome || scrolled;

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${node.getBoundingClientRect().height}px`,
      );
    };

    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(node);
    window.addEventListener("resize", updateHeaderHeight, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, [solid]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 isolate"
      style={{ zIndex: "var(--z-nav)" }}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-200 ease-out motion-reduce:transition-none",
          solid
            ? "border-b border-border bg-bg/95 shadow-sm backdrop-blur-sm"
            : "border-b border-transparent bg-transparent",
        )}
      />
      <Container
        className={cn(
          "relative flex items-center justify-between gap-4 transition-[height] duration-200 ease-out motion-reduce:transition-none",
          solid ? "h-[3.75rem]" : "h-[4.25rem]",
        )}
      >
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
          <Button href="/book" className="hidden sm:inline-flex" variant="primary" showArrow>
            Start a Project
          </Button>
          <MobileNav />
        </div>
      </Container>
      <ScrollProgress />
    </header>
  );
}
