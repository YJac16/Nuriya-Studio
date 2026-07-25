import Link from "next/link";
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
      {items.map((service) => (
        <li key={service.slug} className="bg-bg p-6 sm:p-8">
          <p className="font-mono text-xs tracking-wide text-accent uppercase">
            {formatPrice(service)}
          </p>
          <h3 className="mt-3 font-display text-2xl text-fg">{service.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{service.summary}</p>
          <p className="mt-4 text-xs text-fg-muted">Delivery · {service.delivery}</p>
          <Link
            href={`/services/${service.slug}`}
            className="mt-6 inline-flex min-h-10 items-center text-sm font-medium text-fg underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View package
          </Link>
        </li>
      ))}
    </ul>
  );
}
