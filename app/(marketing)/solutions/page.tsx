import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { SolutionGrid } from "@/components/marketing/solution-grid";
import { CtaBand } from "@/components/marketing/cta-band";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Industry solutions for SMEs, transport, medical, hospitality, trades, professional services, and startups.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageIntro
        title="Solutions"
        description="Industry-focused approaches for the businesses we serve — from first website to custom software."
      />
      <Container className="pb-20">
        <SolutionGrid />
      </Container>
      <CtaBand
        title="Need a hybrid approach?"
        description="Tell us your industry and constraints — we will recommend the leanest path."
      />
    </>
  );
}
