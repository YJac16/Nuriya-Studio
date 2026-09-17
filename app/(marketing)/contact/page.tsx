import type { Metadata } from "next";
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY, STUDIO_LOCATION_DETAIL } from "@/lib/constants";
import { PageIntro } from "@/components/marketing/page-intro";
import { ContactForm } from "@/components/forms/contact-form";
import { QuoteForm } from "@/components/forms/quote-form";
import { WhatsAppButton } from "@/components/forms/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Nūriya Studios to request a quote or start a project.",
};

type Props = { searchParams: Promise<{ service?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { service } = await searchParams;

  return (
    <>
      <PageIntro
        title="Contact"
        description="Request a quote or get in touch — we respond with clear next steps. We confirm scope and timing by email or WhatsApp."
      />
      <Container className="pb-4 pt-2">
        <p className="text-sm text-fg-muted">{STUDIO_LOCATION_DETAIL}</p>
      </Container>
      <Container className="grid gap-16 py-16 lg:grid-cols-2">
        <div id="contact-form">
          <h2 className="font-display text-2xl text-fg">Get in touch</h2>
          <p className="mt-2 text-sm text-fg-muted">
            Tell us about your project. We will reply by email or WhatsApp to confirm scope and
            timing.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={`mailto:${CONTACT_EMAIL}`} external variant="ghost">
              {CONTACT_EMAIL}
            </Button>
            <WhatsAppButton label={CONTACT_WHATSAPP_DISPLAY} />
          </div>
        </div>
        <div id="quote">
          <h2 className="font-display text-2xl text-fg">Request a quote</h2>
          <div className="mt-6">
            <QuoteForm defaultService={service} />
          </div>
        </div>
      </Container>
    </>
  );
}
