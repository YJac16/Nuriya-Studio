import Link from "next/link";
import { monthlyPlans } from "@/lib/content/pricing";
import { services } from "@/lib/content/services";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function OneTimePricing({ className }: { className?: string }) {
  return (
    <ul className={cn("mt-10 divide-y divide-border border border-border", className)}>
      {services.map((service) => (
        <li
          key={service.slug}
          className="grid gap-4 p-5 sm:grid-cols-[1.2fr_0.8fr_auto] sm:items-center sm:gap-6 sm:p-6"
        >
          <div>
            <h3 className="font-display text-xl text-fg">{service.name}</h3>
            <p className="mt-2 text-sm text-fg-muted">{service.summary}</p>
          </div>
          <div>
            <p className="font-mono text-sm text-fg">
              {service.pricePrefix ? `${service.pricePrefix} ` : null}
              {service.priceLabel}
            </p>
            <p className="mt-1 text-xs text-fg-muted">{service.delivery}</p>
          </div>
          <Button
            href={service.quotationRequired ? "/contact" : `/services/${service.slug}`}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            {service.quotationRequired ? "Request quote" : "Details"}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export function MonthlyPricing({ className }: { className?: string }) {
  return (
    <ul className={cn("mt-10 grid gap-px bg-border md:grid-cols-3", className)}>
      {monthlyPlans.map((plan) => (
        <li
          key={plan.slug}
          className={cn(
            "flex flex-col bg-bg p-6 sm:p-8",
            plan.highlighted && "bg-bg-elevated ring-1 ring-inset ring-accent/40",
          )}
        >
          <p className="font-mono text-xs tracking-wide text-accent uppercase">
            {plan.highlighted ? "Popular" : "Plan"}
          </p>
          <h3 className="mt-3 font-display text-2xl text-fg">{plan.name}</h3>
          <p className="mt-3 font-mono text-lg text-fg">
            {plan.priceLabel}
            <span className="text-sm text-fg-muted">/month</span>
          </p>
          <p className="mt-3 text-sm text-fg-muted">{plan.description}</p>
          <ul className="mt-6 space-y-2 text-sm text-fg">
            {plan.features.map((feature) => (
              <li key={feature} className="flex gap-2">
                <span aria-hidden="true" className="text-accent">
                  —
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center text-sm font-medium text-fg underline-offset-4 hover:underline"
          >
            Start {plan.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
