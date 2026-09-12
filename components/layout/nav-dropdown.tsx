"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type NavDropdownItem = {
  href: string;
  label: string;
  description?: string;
};

type NavDropdownProps = {
  label: string;
  href: string;
  items: readonly NavDropdownItem[];
  footerLink?: { href: string; label: string };
};

export function NavDropdown({ label, href, items, footerLink }: NavDropdownProps) {
  const pathname = usePathname();
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, minWidth: 0 });
  const prefersReduced = usePrefersReducedMotion();

  const active =
    pathname === href ||
    pathname.startsWith(`${href}/`) ||
    items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 8,
      left: rect.left,
      minWidth: Math.max(rect.width, 240),
    });
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    updatePosition();

    let rafId = 0;
    const onScrollOrResize = () => {
      if (!rafId) rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updatePosition();
      });
    };

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      close();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown as unknown as EventListener);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown as unknown as EventListener);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [open, close, updatePosition]);

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen((value) => !value);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => {
        panelRef.current?.querySelector<HTMLElement>("a")?.focus();
      });
    }
  };

  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const links = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a") ?? []);
    const index = links.indexOf(document.activeElement as HTMLElement);
    if (index === -1) return;
    const next =
      event.key === "ArrowDown"
        ? links[(index + 1) % links.length]
        : links[(index - 1 + links.length) % links.length];
    next?.focus();
  };

  const panel = open && mounted ? (
    createPortal(
      <div
        ref={panelRef}
        id={menuId}
        role="menu"
        aria-label={`${label} menu`}
        onKeyDown={onPanelKeyDown}
        style={{
          position: "fixed",
          top: position.top,
          left: position.left,
          minWidth: position.minWidth,
          zIndex: "var(--z-nav-dropdown)",
          transitionDuration: prefersReduced ? "0ms" : `${MOTION.dropdown.duration}ms`,
          transitionTimingFunction: MOTION.dropdown.easing,
        }}
        className={cn(
          "origin-top rounded-md border border-border bg-bg/95 p-2 shadow-lg backdrop-blur-sm transition-[opacity,transform]",
          open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-1 scale-[0.98] opacity-0",
        )}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <ul className="flex flex-col gap-0.5">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                role="menuitem"
                onClick={close}
                className="block rounded px-3 py-2 transition-colors hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="text-sm font-medium text-fg">{item.label}</span>
                {item.description ? (
                  <span className="mt-0.5 block text-xs text-fg-muted">{item.description}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
        {footerLink ? (
          <div className="mt-1 border-t border-border/80 pt-1">
            <Link
              href={footerLink.href}
              role="menuitem"
              onClick={close}
              className="block rounded px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {footerLink.label}
            </Link>
          </div>
        ) : null}
      </div>,
      document.body,
    )
  ) : null;

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "inline-flex min-h-10 items-center gap-1 px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          active ? "font-medium text-fg" : "text-fg/80 hover:text-fg",
        )}
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={cn("transition-transform duration-200", open && "rotate-180")}
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {panel}
    </div>
  );
}
