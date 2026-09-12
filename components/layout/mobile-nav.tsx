"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, NAV_SERVICES_DROPDOWN } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(68);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const servicesId = useId();

  useEffect(() => {
    setMounted(true);
    const updateHeaderHeight = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
      const parsed = parseFloat(value);
      setHeaderHeight(Number.isFinite(parsed) ? parsed : 68);
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight, { passive: true });
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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
    setServicesOpen(false);
    buttonRef.current?.focus();
  };

  const overlay = open && mounted ? (
    createPortal(
      <>
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-x-0 bottom-0 bg-fg/20 md:hidden"
          style={{ top: headerHeight, zIndex: "var(--z-mobile-nav)" }}
          onClick={closeMenu}
        />
        <div
          id={panelId}
          className="fixed inset-x-0 bottom-0 overflow-y-auto overflow-x-hidden border-b border-border bg-bg px-5 py-8 md:hidden"
          style={{ top: headerHeight, zIndex: "calc(var(--z-mobile-nav) + 1)" }}
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMenu}
                  className={cn(
                    "min-h-12 px-2 py-3 text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    active ? "font-medium text-fg" : "text-fg/80 hover:text-fg",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="border-t border-border/80 pt-2">
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls={servicesId}
                onClick={() => setServicesOpen((value) => !value)}
                className="flex min-h-12 w-full items-center justify-between px-2 py-3 text-lg text-fg/80 transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Services
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                  className={cn("transition-transform duration-200", servicesOpen && "rotate-180")}
                >
                  <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <div
                id={servicesId}
                className={cn(
                  "grid transition-[grid-template-rows] duration-200 ease-out",
                  servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <ul className="flex flex-col gap-0.5 pb-2 pl-2">
                    {NAV_SERVICES_DROPDOWN.map((item) => {
                      const active =
                        pathname === item.href || pathname.startsWith(`${item.href}/`);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            onClick={closeMenu}
                            className={cn(
                              "block min-h-11 px-2 py-2.5 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                              active ? "font-medium text-fg" : "text-fg/75 hover:text-fg",
                            )}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <Link
                        href="/services"
                        onClick={closeMenu}
                        className="block min-h-11 px-2 py-2.5 text-base font-medium text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        All services
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <Button href="/book" className="w-full" showArrow onClick={closeMenu}>
              Start a Project
            </Button>
            <Button href="/contact" variant="secondary" className="w-full" onClick={closeMenu}>
              Request Quote
            </Button>
          </div>
        </div>
      </>,
      document.body,
    )
  ) : null;

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
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
      {overlay}
    </div>
  );
}
