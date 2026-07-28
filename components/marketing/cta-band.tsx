import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/forms/whatsapp-button";
import { Section, SectionHeading } from "@/components/marketing/section";

export function CtaBand({
  title = "Ready to modernise your business?",
  description = "Book a consultation or request a quote. We will respond with clear next steps.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Section tone="muted">
      <SectionHeading title={title} description={description} />
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button href="/book">Book Consultation</Button>
        <Button href="/contact" variant="secondary">
          Request Quote
        </Button>
        <WhatsAppButton variant="ghost" />
      </div>
    </Section>
  );
}
