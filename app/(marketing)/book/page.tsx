import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { BookingForm } from "@/components/forms/booking-form";
import { WhatsAppButton } from "@/components/forms/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book Consultation",
  description: "Book a consultation with Nūriya Studios.",
};

export default function BookPage() {
  const bookingEnabled = isSupabaseConfigured();

  return (
    <>
      <PageIntro
        title="Book Consultation"
        description="Choose a preferred date and time. We will confirm by email and prepare a focused conversation."
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_0.8fr]">
        <BookingForm enabled={bookingEnabled} />
        <aside className="space-y-4 text-sm leading-relaxed text-fg-muted">
          <p>
            Consultations cover goals, constraints, recommended package, and a realistic
            timeline. No obligation.
          </p>
          <p>Prefer another channel?</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" variant="secondary">
              Request Quote
            </Button>
            <WhatsAppButton />
          </div>
        </aside>
      </Container>
    </>
  );
}
