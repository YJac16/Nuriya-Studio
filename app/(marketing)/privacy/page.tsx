import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";
import { PageIntro } from "@/components/marketing/page-intro";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for Nuriya Studio.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        title="Privacy"
        description="How Nuriya Studio collects and uses information when you use this website or contact us."
      />
      <Container className="max-w-prose space-y-8 py-16 text-sm leading-relaxed text-fg-muted">
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-fg">What we collect</h2>
          <p>
            When you contact us, request a quote, book a consultation, or join a product
            waitlist, we collect the details you submit — typically name, email, phone,
            company, and message content.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-fg">Cookies & analytics</h2>
          <p>
            Essential cookies keep the site working (for example theme preference). Optional
            analytics cookies — Google Analytics, Microsoft Clarity, and Meta Pixel when
            configured — load only after you accept the cookie banner. You can reject
            optional cookies and continue using the site.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-fg">How we use it</h2>
          <p>
            We use enquiry data to respond to you, prepare proposals, deliver services, and
            improve our products. Waitlist emails are used for product updates related to
            the product you selected. Analytics data helps us understand aggregated usage.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-fg">Sharing</h2>
          <p>
            We use processors such as hosting, email, CMS, analytics, and database providers
            to operate this site. We do not sell personal information.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-fg">Retention & requests</h2>
          <p>
            We keep enquiry records as long as needed for business and legal purposes. To
            access, correct, or delete your information, email{" "}
            <a className="text-fg underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
        <p className="text-xs">Last updated: 25 July 2026</p>
      </Container>
    </>
  );
}
