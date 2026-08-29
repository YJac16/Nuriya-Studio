import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { CtaBand } from "@/components/marketing/cta-band";
import { EmptyState } from "@/components/marketing/empty-state";
import { ProjectCard } from "@/components/content/project-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getProjects } from "@/lib/content/data";

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
          <EmptyState
            className="mt-0"
            title="Case studies will appear here."
            description="We publish work once clients are ready to share it. Book a consultation if you would like to review examples relevant to your industry."
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
      <CtaBand />
    </>
  );
}
