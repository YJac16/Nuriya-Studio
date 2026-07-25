import { processSteps } from "@/lib/content/process";

export function ProcessSteps() {
  return (
    <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((item) => (
        <li key={item.step}>
          <p className="font-mono text-xs tracking-wide text-accent">{item.step}</p>
          <h3 className="mt-3 font-display text-2xl text-fg">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
