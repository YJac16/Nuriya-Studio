import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { ProcessSteps } from "@/components/marketing/process-steps";
import { CtaBand } from "@/components/marketing/cta-band";
import { Section, SectionHeading } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nuriya Studio is a software studio building digital products that help businesses grow.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        title="About"
        description="Nuriya Studio is a software studio building digital products that help businesses grow."
      />
      <Container className="space-y-8 py-16 text-base leading-relaxed text-fg-muted">
        <p>
          Client websites generate cash flow. Software products create recurring revenue.
          Over time, Nuriya Studio will own multiple SaaS platforms — starting from the
          systems we already build for businesses every day.
        </p>
        <p>
          We help businesses modernise through websites, business software, AI automation,
          SaaS, mobile apps, client portals, booking systems, and dashboards.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href="/brands" variant="secondary">
            Our Brands
          </Button>
          <Button href="/services">View Services</Button>
        </div>
      </Container>
      <Section tone="muted">
        <SectionHeading
          eyebrow="How we work"
          title="A process built for shipping."
          description="Discovery first. Delivery second. Growth as a partnership when you want it."
        />
        <ProcessSteps />
      </Section>
      <CtaBand />
    </>
  );
}
