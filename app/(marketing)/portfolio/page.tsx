import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { CtaBand } from "@/components/marketing/cta-band";
import { ProjectCard } from "@/components/content/project-card";
import { Container } from "@/components/ui/container";
import { getProjects } from "@/lib/content/data";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected work and case studies from Nūriya Studios.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <PageIntro
        title="Portfolio"
        description="Case studies with overview, problem, solution, tech stack, screenshots, and results."
      />
      <Container className="py-16">
        {projects.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="max-w-2xl text-base leading-relaxed text-fg-muted">
            {isSanityConfigured()
              ? "No published case studies yet. Add Project documents in Sanity Studio."
              : "Connect Sanity (NEXT_PUBLIC_SANITY_PROJECT_ID) and publish Project documents to populate this page."}
          </p>
        )}
      </Container>
      <CtaBand />
    </>
  );
}
