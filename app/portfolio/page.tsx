import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { CtaBand } from "@/components/marketing/cta-band";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected work and case studies from Nuriya Studio.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageIntro
        title="Portfolio"
        description="Case studies will include overview, problem, solution, tech stack, screenshots, and results."
      />
      <Container className="py-16">
        <p className="max-w-2xl text-base leading-relaxed text-fg-muted">
          Selected projects are being prepared for publication. If you need relevant
          references for your industry, ask during consultation.
        </p>
      </Container>
      <CtaBand />
    </>
  );
}
