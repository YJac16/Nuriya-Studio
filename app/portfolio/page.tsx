import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { Button } from "@/components/ui/button";
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
        description="Selected engagements with overview, problem, solution, tech stack, and results."
      />
      <Container className="py-12">
        <Button href="/book">Book Consultation</Button>
      </Container>
    </>
  );
}
