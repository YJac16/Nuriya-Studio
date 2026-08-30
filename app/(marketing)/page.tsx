import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { Section, SectionHeading } from "@/components/marketing/section";
import { ServiceGrid } from "@/components/marketing/service-grid";
import { ProcessSteps } from "@/components/marketing/process-steps";
import { TestimonialList } from "@/components/marketing/testimonial-list";
import { CtaBand } from "@/components/marketing/cta-band";
import { CaseStudyCard } from "@/components/content/case-study-card";
import { Button } from "@/components/ui/button";
import { getTestimonials } from "@/lib/content/data";
import { caseStudies } from "@/lib/content/case-studies";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { services } from "@/lib/content/services";

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const FEATURED_SERVICE_SLUGS = ["landing-pages", "business-website", "custom-software"] as const;

export default async function HomePage() {
  const testimonials = await getTestimonials();
  const featuredServices = FEATURED_SERVICE_SLUGS.map((slug) =>
    services.find((service) => service.slug === slug),
  ).filter((service): service is (typeof services)[number] => Boolean(service));

  return (
    <>
      <Hero />

      <Section id="portfolio">
        <SectionHeading
          eyebrow="Work"
          title="Selected work."
          description="Selected live work."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
        <div className="mt-8">
          <Button href="/portfolio" variant="secondary">
            View portfolio
          </Button>
        </div>
      </Section>

      <Section id="services" tone="muted">
        <SectionHeading
          eyebrow="Services"
          title="Packages built for clarity and delivery."
          description="From launch pages to custom software — priced transparently, scoped cleanly."
        />
        <ServiceGrid items={featuredServices} />
        <div className="mt-8">
          <Button href="/services" variant="secondary">
            All services
          </Button>
        </div>
      </Section>

      <Section id="process">
        <SectionHeading
          eyebrow="Process"
          title="Discover. Design. Build. Grow."
          description="A calm operating rhythm from first call to launched product."
        />
        <ProcessSteps />
      </Section>

      {testimonials.length > 0 ? (
        <Section id="testimonials" tone="muted">
          <SectionHeading
            eyebrow="Testimonials"
            title="What clients say."
            description="Direct feedback from teams we have partnered with."
          />
          <TestimonialList items={testimonials} />
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
