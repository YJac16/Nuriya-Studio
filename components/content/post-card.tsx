import Image from "next/image";
import Link from "next/link";
import type { PostListItem } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

export function PostCard({ post }: { post: PostListItem }) {
  const coverUrl = post.cover ? urlForImage(post.cover)?.width(800).height(500).url() : null;
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-ZA", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <article className="flex flex-col border border-border bg-bg">
      {coverUrl ? (
        <div className="relative aspect-[16/10] w-full bg-bg-elevated">
          <Image
            src={coverUrl}
            alt={post.cover?.alt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {date ? <p className="font-mono text-xs text-fg-muted">{date}</p> : null}
        <h2 className="mt-2 font-display text-2xl text-fg">
          <Link href={`/blog/${post.slug}`} className="hover:underline underline-offset-4">
            {post.title}
          </Link>
        </h2>
        {post.excerpt ? (
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
        ) : null}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto pt-6 text-sm font-medium text-fg underline-offset-4 hover:underline"
        >
          Read article
        </Link>
      </div>
    </article>
  );
}
