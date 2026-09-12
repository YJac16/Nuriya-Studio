"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { MOTION, type RevealVariant } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  variant = "text",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const prefersReduced = usePrefersReducedMotion();
  const config = MOTION.reveal[variant];

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReduced) return;

    const rect = node.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (inView) return;

    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReduced]);

  const style: CSSProperties | undefined = prefersReduced
    ? undefined
    : {
        transitionDuration: `${config.duration}ms`,
        transitionTimingFunction: config.easing,
        transitionDelay: `${delay}ms`,
        ["--reveal-y" as string]: `${config.translateY}px`,
      };

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "transition-[opacity,transform] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-[var(--reveal-y,16px)] opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
