import Link from "next/link";
import { Reveal } from "@/components/marketing/reveal";
import { getStaggerDelay } from "@/lib/motion";
import { services, type Service } from "@/lib/content/services";
import { cn } from "@/lib/utils";

function formatPrice(service: Service) {
  if (service.priceAmount === null) return service.priceLabel;
  return service.pricePrefix
    ? `${service.pricePrefix} ${service.priceLabel}`
    : service.priceLabel;
}

export function ServiceGrid({
  items = services,
  className,
}: {
  items?: Service[];
  className?: string;
}) {
  return (
    <ul className={cn("mt-10 grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3", className)}>
      {items.map((service, index) => (
        <li key={service.slug} className="bg-bg">
          <Reveal variant="card" delay={getStaggerDelay(index)}>
            <Link
              href={`/services/${service.slug}`}
              className="group flex h-full flex-col p-6 transition-[background-color,border-color] duration-200 hover:border-accent/20 hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:p-8"
            >
              <p className="font-mono text-xs tracking-wide text-accent uppercase">
                {formatPrice(service)}
              </p>
              <h3 className="mt-3 font-display text-2xl text-fg">{service.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{service.summary}</p>
              <p className="mt-4 text-xs text-fg-muted">Delivery · {service.delivery}</p>
              <span className="mt-6 inline-flex min-h-10 items-center gap-1 text-sm font-medium text-fg underline-offset-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:underline motion-reduce:transform-none">
                View package
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
