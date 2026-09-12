"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { Reveal } from "@/components/marketing/reveal";
import { getStaggerDelay, type RevealVariant } from "@/lib/motion";

export function RevealGroup({
  children,
  variant = "card",
  className,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        return (
          <Reveal key={child.key ?? index} variant={variant} delay={getStaggerDelay(index)}>
            {child}
          </Reveal>
        );
      })}
    </div>
  );
}
