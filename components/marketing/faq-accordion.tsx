"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(items.length ? 0 : null);

  if (!items.length) return null;

  return (
    <div className="mt-10 divide-y divide-border border-y border-border">
      {items.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={`${faq.question}-${index}`}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span className="font-medium text-fg">{faq.question}</span>
                <span className="font-mono text-accent" aria-hidden="true">
                  {open ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-200",
                open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl text-sm leading-relaxed text-fg-muted">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
