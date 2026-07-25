import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { OneTimePricing, MonthlyPricing } from "@/components/marketing/pricing-tables";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { CtaBand } from "@/components/marketing/cta-band";
import { Section, SectionHeading } from "@/components/marketing/section";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent packages from R2,499 and monthly plans from R299 for websites, booking systems, and custom software.",
};

export default function PricingPage() {
  return (
    <>
      <PageIntro
        title="Pricing"
        description="Transparent packages and monthly plans. Enterprise and custom software are quoted after discovery."
      />
      <Container className="py-16">
        <h2 className="font-display text-3xl text-fg">One-time packages</h2>
        <OneTimePricing />
        <h2 className="mt-16 font-display text-3xl text-fg">Monthly plans</h2>
        <MonthlyPricing />
      </Container>
      <Section tone="muted">
        <SectionHeading
          eyebrow="FAQ"
          title="Pricing questions"
          description="If you need a hybrid or phased approach, we will propose one."
        />
        <FaqAccordion />
      </Section>
      <CtaBand />
    </>
  );
}
