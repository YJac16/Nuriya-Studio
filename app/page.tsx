import { Hero } from "@/components/marketing/hero";
import { Section, SectionHeading } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section tone="muted">
        <SectionHeading
          eyebrow="What we build"
          title="Websites, software, and systems that compound."
          description="Landing pages, business platforms, booking engines, and custom tools — designed for SMEs that need clarity, speed, and reliability."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/book">Book Consultation</Button>
          <Button href="/contact" variant="secondary">
            Request Quote
          </Button>
        </div>
      </Section>
    </>
  );
}
