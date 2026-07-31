import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";
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
        description="Send a message, request a quote, or book a consultation. We respond with clear next steps."
      />
      <Container className="grid gap-16 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-fg">Send a message</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/book" variant="secondary">
              Book Consultation
            </Button>
            <Button href={`mailto:${CONTACT_EMAIL}`} external variant="ghost">
              {CONTACT_EMAIL}
            </Button>
            <WhatsAppButton />
          </div>
        </div>
        <div>
          <h2 className="font-display text-2xl text-fg">Request a quote</h2>
          <div className="mt-6">
            <QuoteForm defaultService={service} />
          </div>
        </div>
      </Container>
    </>
  );
}
