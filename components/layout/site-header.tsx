import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/85 backdrop-blur-md">
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

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="min-h-10 px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

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
