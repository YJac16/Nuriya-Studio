import Image from "next/image";
import Link from "next/link";
import type { ProjectListItem } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

export function ProjectCard({ project }: { project: ProjectListItem }) {
  const coverUrl = project.cover
    ? urlForImage(project.cover)?.width(900).height(600).url()
    : null;

  return (
    <article className="flex flex-col border border-border bg-bg">
      {coverUrl ? (
        <div className="relative aspect-[3/2] w-full bg-bg-elevated">
          <Image
            src={coverUrl}
            alt={project.cover?.alt || project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs tracking-wide text-accent uppercase">
          {project.industry || project.client || "Case study"}
        </p>
        <h2 className="mt-2 font-display text-2xl text-fg">
          <Link
            href={`/portfolio/${project.slug}`}
            className="hover:underline underline-offset-4"
          >
            {project.title}
          </Link>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">{project.overview}</p>
        <Link
          href={`/portfolio/${project.slug}`}
          className="mt-auto pt-6 text-sm font-medium text-fg underline-offset-4 hover:underline"
        >
          View case study
        </Link>
      </div>
    </article>
  );
}
