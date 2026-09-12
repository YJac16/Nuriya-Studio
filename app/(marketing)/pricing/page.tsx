import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { OneTimePricing, MonthlyPricing } from "@/components/marketing/pricing-tables";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { CtaBand } from "@/components/marketing/cta-band";
import { Section, SectionHeading } from "@/components/marketing/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { getFaqs } from "@/lib/content/data";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Website, booking, and custom software packages from Nūriya Studios — scoped and quoted after discovery.",
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  const faqs = await getFaqs();

  return (
    <>
      {faqs.length ? <JsonLd data={faqJsonLd(faqs)} /> : null}
      <PageIntro
        title="Pricing"
        description="Clear package scopes and monthly care plans. Every engagement is quoted after discovery."
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
        <FaqAccordion items={faqs} />
      </Section>
      <CtaBand />
    </>
  );
}
