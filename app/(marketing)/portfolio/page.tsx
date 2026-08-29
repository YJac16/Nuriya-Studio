import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { CtaBand } from "@/components/marketing/cta-band";
import { CaseStudyCard } from "@/components/content/case-study-card";
import { Container } from "@/components/ui/container";
import { caseStudies } from "@/lib/content/case-studies";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected work and case studies from Nūriya Studios.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageIntro title="Portfolio" description="Selected live work." />
      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </Container>
      <CtaBand />
    </>
  );
}
