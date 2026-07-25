import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent packages and monthly plans for websites, booking systems, and custom software.",
};

export default function PricingPage() {
  return (
    <>
      <PageIntro
        title="Pricing"
        description="One-time packages from R2,499 and monthly plans from R299 — transparent scope, clear delivery."
      />
      <Container className="py-12">
        <Button href="/contact">Request Quote</Button>
      </Container>
    </>
  );
}
