import Image from "next/image";
import Link from "next/link";
import type { ProjectListItem } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

export function ProjectCard({ project }: { project: ProjectListItem }) {
  const coverUrl = project.cover
    ? urlForImage(project.cover)?.width(900).height(600).url()
    : null;
  const href = `/portfolio/${project.slug}`;

  return (
    <article className="group flex h-full flex-col border border-border bg-bg transition-colors hover:border-accent/40">
      <Link
        href={href}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        {coverUrl ? (
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-bg-elevated">
            <Image
              src={coverUrl}
              alt={project.cover?.alt || project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-xs tracking-wide text-accent uppercase">
            {project.industry || project.client || "Case study"}
          </p>
          <h2 className="mt-2 font-display text-2xl text-fg">{project.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{project.overview}</p>
          <span className="mt-auto pt-6 text-sm font-medium text-fg underline-offset-4 group-hover:underline">
            View case study
          </span>
        </div>
      </Link>
    </article>
  );
}
