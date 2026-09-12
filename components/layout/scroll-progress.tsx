"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ScrollProgress() {
  const ref = useScrollProgress<HTMLDivElement>();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="scroll-progress pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-border/40"
    >
      <div className="scroll-progress-fill h-full origin-left bg-accent/70 will-change-transform" />
    </div>
  );
}
