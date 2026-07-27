import Image from "next/image";
import Link from "next/link";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SITE_NAME } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg shadow-[0_1px_0_0_rgba(0,0,0,0.03)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)]">
      <Container className="flex h-[4.25rem] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Image
            src="/images/nuriya-logo.png"
            alt=""
            width={36}
            height={36}
            className="size-9"
            priority
          />
          <span className="font-sans text-sm font-semibold tracking-[0.14em] text-fg uppercase">
            {SITE_NAME}
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
