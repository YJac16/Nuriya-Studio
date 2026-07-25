import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";
import { PageIntro } from "@/components/marketing/page-intro";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Nuriya Studio to request a quote or start a project.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        title="Contact"
        description="Tell us what you need. Email works today; quote forms and WhatsApp follow shortly."
      />
      <Container className="flex flex-wrap gap-3 py-12">
        <Button href={`mailto:${CONTACT_EMAIL}`} external>
          Email {CONTACT_EMAIL}
        </Button>
        <Button href="/book" variant="secondary">
          Book Consultation
        </Button>
      </Container>
    </>
  );
}
