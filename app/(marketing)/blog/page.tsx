import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { PostCard } from "@/components/content/post-card";
import { Container } from "@/components/ui/container";
import { getPosts } from "@/lib/content/data";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights from Nuriya Studio on software, websites, and automation.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageIntro
        title="Blog"
        description="Practical writing on software, websites, and automation for growing businesses."
      />
      <Container className="py-16">
        {posts.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="max-w-2xl text-base leading-relaxed text-fg-muted">
            {isSanityConfigured()
              ? "No published articles yet. Add Post documents in Sanity Studio."
              : "Connect Sanity and publish posts to populate the blog."}
          </p>
        )}
      </Container>
    </>
  );
}
