import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-10 border border-border bg-bg-elevated px-6 py-10 sm:px-8 sm:py-12",
        className,
      )}
    >
      <p className="font-display text-2xl tracking-tight text-fg">{title}</p>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-fg-muted">{description}</p>
      {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
