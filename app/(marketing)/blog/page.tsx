import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { EmptyState } from "@/components/marketing/empty-state";
import { PostCard } from "@/components/content/post-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getPosts } from "@/lib/content/data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights from Nūriya Studios on software, websites, and automation.",
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
          <EmptyState
            className="mt-0"
            title="Writing will appear here."
            description="New articles on software, websites, and automation will be published here. In the meantime, explore our services or book a conversation."
            actions={
              <>
                <Button href="/book">Book Consultation</Button>
                <Button href="/services" variant="secondary">
                  View services
                </Button>
              </>
            }
          />
        )}
      </Container>
    </>
  );
}
