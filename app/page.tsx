import { Hero } from "@/components/marketing/hero";
import { Section, SectionHeading } from "@/components/marketing/section";
import { ServiceGrid } from "@/components/marketing/service-grid";
import { ProductGrid } from "@/components/marketing/product-grid";
import { ProcessSteps } from "@/components/marketing/process-steps";
import { OneTimePricing, MonthlyPricing } from "@/components/marketing/pricing-tables";
import { TestimonialList } from "@/components/marketing/testimonial-list";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { CtaBand } from "@/components/marketing/cta-band";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/content/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="services">
        <SectionHeading
          eyebrow="Services"
          title="Packages built for clarity and delivery."
          description="From launch pages to custom software — priced transparently, scoped cleanly."
        />
        <ServiceGrid />
        <div className="mt-8">
          <Button href="/services" variant="secondary">
            All services
          </Button>
        </div>
      </Section>

      <Section id="software" tone="muted">
        <SectionHeading
          eyebrow="Software"
          title="Products in progress."
          description="Future platforms for transport, booking, invoicing, and automation — designed to become recurring revenue."
        />
        <ProductGrid />
      </Section>

      <Section id="portfolio">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected work, coming into view."
          description="Case studies will cover overview, problem, solution, tech stack, and results."
        />
        <div className="mt-8">
          <Button href="/portfolio" variant="secondary">
            View portfolio
          </Button>
        </div>
      </Section>

      <Section id="process" tone="muted">
        <SectionHeading
          eyebrow="Process"
          title="Discover. Design. Build. Grow."
          description="A calm operating rhythm from first call to launched product."
        />
        <ProcessSteps />
      </Section>

      <Section id="pricing">
        <SectionHeading
          eyebrow="Pricing"
          title="One-time builds and monthly care."
          description="Start with a package. Stay with a plan when you want ongoing momentum."
        />
        <OneTimePricing />
        <div className="mt-14">
          <h3 className="font-display text-2xl text-fg">Monthly plans</h3>
          <MonthlyPricing />
        </div>
        <div className="mt-8">
          <Button href="/pricing" variant="secondary">
            Full pricing
          </Button>
        </div>
      </Section>

      {testimonials.length > 0 ? (
        <Section id="testimonials" tone="muted">
          <SectionHeading
            eyebrow="Testimonials"
            title="What clients say."
            description="Direct feedback from teams we have partnered with."
          />
          <TestimonialList />
        </Section>
      ) : null}

      <Section id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title="Straight answers."
          description="A few things businesses usually ask before we start."
        />
        <FaqAccordion />
      </Section>

      <CtaBand />
    </>
  );
}
