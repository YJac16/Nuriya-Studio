import { CTA_CONTACT, CTA_QUOTE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/forms/whatsapp-button";
import { Section, SectionHeading } from "@/components/marketing/section";

export function CtaBand({
  title = "Ready to modernise your business?",
  description = "Request a quote or get in touch. We respond with clear next steps.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Section tone="muted">
      <SectionHeading title={title} description={description} />
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button href={CTA_QUOTE.href}>{CTA_QUOTE.label}</Button>
        <Button href={CTA_CONTACT.href} variant="secondary">
          {CTA_CONTACT.label}
        </Button>
        <WhatsAppButton variant="ghost" />
      </div>
    </Section>
  );
}
