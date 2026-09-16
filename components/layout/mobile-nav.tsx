"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CTA_CONSULT, CTA_QUOTE, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function measureHeaderBottom() {
  const header = document.getElementById("site-header");
  if (!header) return null;
  return Math.ceil(header.getBoundingClientRect().bottom);
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [headerOffset, setHeaderOffset] = useState<number | null>(null);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const syncHeaderOffset = useCallback(() => {
    const bottom = measureHeaderBottom();
    if (bottom !== null) {
      setHeaderOffset(bottom);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    syncHeaderOffset();
    const frame = window.requestAnimationFrame(syncHeaderOffset);

    const header = document.getElementById("site-header");
    const observer = header ? new ResizeObserver(syncHeaderOffset) : null;
    if (header && observer) {
      observer.observe(header);
    }

    window.addEventListener("scroll", syncHeaderOffset, { passive: true });
    window.addEventListener("resize", syncHeaderOffset);
    window.visualViewport?.addEventListener("resize", syncHeaderOffset);
    window.visualViewport?.addEventListener("scroll", syncHeaderOffset);

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", syncHeaderOffset);
      window.removeEventListener("resize", syncHeaderOffset);
      window.visualViewport?.removeEventListener("resize", syncHeaderOffset);
      window.visualViewport?.removeEventListener("scroll", syncHeaderOffset);
    };
  }, [open, syncHeaderOffset]);

  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const { body } = document;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.touchAction = "none";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const openMenu = () => {
    syncHeaderOffset();
    setOpen(true);
  };

  const panelPaddingTop =
    headerOffset !== null
      ? `${headerOffset + 32}px`
      : "calc(var(--site-header-height, 4.25rem) + 2rem)";

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? closeMenu() : openMenu())}
        className="inline-flex size-10 items-center justify-center text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span className="sr-only">{open ? "Close" : "Menu"}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {mounted
        ? createPortal(
            <>
              {open ? (
                <button
                  type="button"
                  aria-label="Close menu"
                  className="fixed inset-0 z-30 bg-fg/20 md:hidden"
                  onClick={closeMenu}
                />
              ) : null}

              <div
                id={panelId}
                className={cn(
                  "fixed inset-0 z-40 overflow-hidden bg-bg transition-opacity duration-200 md:hidden",
                  open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
                )}
                aria-hidden={!open}
              >
                <div
                  className="h-full overflow-y-auto px-5 pb-8"
                  style={{ paddingTop: panelPaddingTop }}
                >
                  <nav aria-label="Mobile" className="flex flex-col gap-1">
                    {NAV_LINKS.map((link) => {
                      const active =
                        pathname === link.href || pathname.startsWith(`${link.href}/`);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "min-h-12 px-2 py-3 text-lg transition-colors",
                            active ? "font-medium text-fg" : "text-fg/80 hover:text-fg",
                          )}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>
                  <div className="mt-8 flex flex-col gap-3">
                    <Button href={CTA_QUOTE.href} className="w-full">
                      {CTA_QUOTE.label}
                    </Button>
                    <Button href={CTA_CONSULT.href} variant="secondary" className="w-full">
                      {CTA_CONSULT.label}
                    </Button>
                  </div>
                </div>
              </div>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}
