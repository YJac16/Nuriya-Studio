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

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

type MobileNavProps = {
  onOpenChange?: (open: boolean) => void;
};

export function MobileNav({ onOpenChange }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [headerOffset, setHeaderOffset] = useState<number | null>(null);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelCloseRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const setOpenState = useCallback(
    (value: boolean) => {
      setOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange],
  );

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
    setOpenState(false);
  }, [pathname, setOpenState]);

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

  const closeMenu = useCallback(() => {
    setOpenState(false);
    buttonRef.current?.focus();
  }, [setOpenState]);

  const openMenu = useCallback(() => {
    syncHeaderOffset();
    setOpenState(true);
  }, [setOpenState, syncHeaderOffset]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closeMenu]);

  const panelTop =
    headerOffset !== null
      ? `${headerOffset}px`
      : "var(--site-header-height, 4.25rem)";

  const panelMaxHeight =
    headerOffset !== null
      ? `min(70vh, calc(100dvh - ${headerOffset}px))`
      : "min(70vh, calc(100dvh - var(--site-header-height, 4.25rem)))";

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? closeMenu() : openMenu())}
        className="relative z-[110] inline-flex size-10 items-center justify-center text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span className="sr-only">{open ? "Close" : "Menu"}</span>
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {mounted
        ? createPortal(
            <>
              {open ? (
                <button
                  type="button"
                  aria-label="Close menu"
                  className="fixed inset-x-0 bottom-0 z-[90] bg-fg/20 md:hidden"
                  style={{ top: panelTop }}
                  onClick={closeMenu}
                />
              ) : null}

              <div
                id={panelId}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                className={cn(
                  "fixed inset-x-0 z-[100] flex flex-col overflow-hidden border-b border-border bg-bg shadow-[0_10px_40px_-10px_rgba(61,47,31,0.12)] transition-[opacity,transform] duration-200 ease-out md:hidden",
                  open
                    ? "visible translate-y-0 opacity-100"
                    : "invisible pointer-events-none -translate-y-1 opacity-0",
                )}
                style={{ top: panelTop, maxHeight: panelMaxHeight }}
                aria-hidden={!open}
              >
                <div className="flex shrink-0 items-center justify-between border-b border-border px-3 py-1.5">
                  <span className="font-mono text-[0.65rem] tracking-[0.2em] text-fg-muted uppercase">
                    Menu
                  </span>
                  <button
                    ref={panelCloseRef}
                    type="button"
                    aria-label="Close menu"
                    onClick={closeMenu}
                    className="inline-flex size-10 items-center justify-center text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="overflow-y-auto px-5 py-4">
                  <nav aria-label="Mobile" className="flex flex-col gap-0.5">
                    {NAV_LINKS.map((link) => {
                      const active =
                        pathname === link.href || pathname.startsWith(`${link.href}/`);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "min-h-11 rounded-sm px-2 py-2.5 text-base transition-colors",
                            active ? "font-medium text-fg" : "text-fg/80 hover:text-fg",
                          )}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>
                  <div className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5">
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
