import Link from "next/link";
import { solutions } from "@/lib/content/solutions";

export function SolutionGrid() {
  return (
    <ul className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
      {solutions.map((solution) => (
        <li key={solution.slug} className="bg-bg p-6 sm:p-8">
          <h2 className="font-display text-2xl text-fg">
            <Link
              href={`/solutions/${solution.slug}`}
              className="underline-offset-4 hover:underline"
            >
              {solution.name}
            </Link>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{solution.summary}</p>
          <Link
            href={`/solutions/${solution.slug}`}
            className="mt-6 inline-flex min-h-10 items-center text-sm font-medium text-fg underline-offset-4 hover:underline"
          >
            View solution
          </Link>
        </li>
      ))}
    </ul>
  );
}
