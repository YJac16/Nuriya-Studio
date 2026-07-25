import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-24",
        tone === "muted" && "border-y border-border bg-bg-elevated",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="font-mono text-xs tracking-wide text-accent uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-display text-3xl tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
