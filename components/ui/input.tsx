import { type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-11 w-full border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-fg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
