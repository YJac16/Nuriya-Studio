import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Industry solutions for SMEs, transport, medical, hospitality, trades, and startups.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageIntro
        title="Solutions"
        description="Industry-focused approaches for transport, medical, hospitality, trades, and professional services."
      />
      <Container className="py-12">
        <Button href="/services">View Services</Button>
      </Container>
    </>
  );
}
