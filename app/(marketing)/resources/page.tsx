import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/marketing/page-intro";
import { Container } from "@/components/ui/container";
import { getResources } from "@/lib/content/data";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides, checklists, and practical resources from Nūriya Studios.",
};

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <>
      <PageIntro
        title="Resources"
        description="Guides and checklists for businesses planning websites, booking systems, and software."
      />
      <Container className="py-16">
        <ul className="divide-y divide-border border border-border">
          {resources.map((resource) => (
            <li key={resource._id} className="p-5 sm:p-6">
              <p className="font-mono text-xs tracking-wide text-accent uppercase">
                {resource.type || "resource"}
              </p>
              <h2 className="mt-2 font-display text-2xl text-fg">
                <Link
                  href={`/resources/${resource.slug}`}
                  className="underline-offset-4 hover:underline"
                >
                  {resource.title}
                </Link>
              </h2>
              {resource.summary ? (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
                  {resource.summary}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
