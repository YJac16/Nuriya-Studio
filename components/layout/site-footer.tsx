import Image from "next/image";
import Link from "next/link";
import {
  CONTACT_EMAIL,
  FOOTER_LINKS,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-elevated">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/nuriya-logo.png"
                alt=""
                width={32}
                height={32}
                className="size-8"
              />
              <span className="text-sm font-semibold tracking-[0.14em] text-fg uppercase">
                {SITE_NAME}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
              {SITE_TAGLINE}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-block text-sm text-fg transition-colors hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {(
            [
              ["Company", FOOTER_LINKS.company],
              ["Commercial", FOOTER_LINKS.commercial],
              ["Connect", FOOTER_LINKS.connect],
            ] as const
          ).map(([title, links]) => (
            <div key={title}>
              <p className="font-mono text-xs tracking-wide text-fg-muted uppercase">
                {title}
              </p>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_NAME}
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-fg">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-fg">
              Terms
            </Link>
            <Link href="/brands" className="hover:text-fg">
              Our Brands
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
