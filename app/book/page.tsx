import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Book Consultation",
  description: "Book a consultation with Nuriya Studio.",
};

export default function BookPage() {
  return (
    <>
      <PageIntro
        title="Book Consultation"
        description="Book a consultation with Nuriya Studio. Our own scheduling system is launching next — availability, confirmations, and reminders included."
      />
      <Container className="py-12">
        <Button href="/contact" variant="secondary">
          Request Quote Instead
        </Button>
      </Container>
    </>
  );
}
