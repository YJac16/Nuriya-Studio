import { processSteps } from "@/lib/content/process";

export function ProcessSteps() {
  return (
    <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
      {processSteps.map((item) => (
        <li
          key={item.step}
          className="relative border-l-2 border-accent/30 pl-5 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-6 lg:pr-8 last:lg:pr-0"
        >
          <p className="font-mono text-xs tracking-wide text-accent">{item.step}</p>
          <h3 className="mt-3 font-display text-2xl text-fg">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
