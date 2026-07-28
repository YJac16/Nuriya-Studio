import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { Section, SectionHeading } from "@/components/marketing/section";
import { ServiceGrid } from "@/components/marketing/service-grid";
import { ProcessSteps } from "@/components/marketing/process-steps";
import { TestimonialList } from "@/components/marketing/testimonial-list";
import { CtaBand } from "@/components/marketing/cta-band";
import { ProjectCard } from "@/components/content/project-card";
import { Button } from "@/components/ui/button";
import { getProjects, getTestimonials } from "@/lib/content/data";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { services } from "@/lib/content/services";

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const FEATURED_SERVICE_SLUGS = ["landing-pages", "business-website", "custom-software"] as const;

export default async function HomePage() {
  const [testimonials, projects] = await Promise.all([getTestimonials(), getProjects()]);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const portfolioPreview = featuredProjects.length ? featuredProjects : projects.slice(0, 3);
  const featuredServices = FEATURED_SERVICE_SLUGS.map((slug) =>
    services.find((service) => service.slug === slug),
  ).filter((service): service is (typeof services)[number] => Boolean(service));

  return (
    <>
      <Hero />

      <Section id="portfolio">
        <SectionHeading
          eyebrow="Work"
          title={portfolioPreview.length ? "Selected work." : "Selected work, coming into view."}
          description={
            portfolioPreview.length
              ? "Case studies covering overview, problem, solution, tech stack, and results."
              : "Case studies will appear here once published in Sanity Studio."
          }
        />
        {portfolioPreview.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {portfolioPreview.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : null}
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
