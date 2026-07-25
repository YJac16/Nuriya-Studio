import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";
import { PageIntro } from "@/components/marketing/page-intro";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Nuriya Studio website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageIntro
        title="Terms"
        description="Terms of use for this website. Project work is governed by written proposals and contracts."
      />
      <Container className="max-w-prose space-y-8 py-16 text-sm leading-relaxed text-fg-muted">
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-fg">Website use</h2>
          <p>
            Content on this site is provided for general information about {SITE_NAME}{" "}
            services and products. We may update pages, pricing, and packaging without
            prior notice.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-fg">Engagements</h2>
          <p>
            Delivery timelines, scope, and fees for client work are defined in a written
            proposal or agreement. Website package prices are starting points and may vary
            with custom requirements.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-fg">Intellectual property</h2>
          <p>
            Site design, copy, logos, and product names remain the property of {SITE_NAME}{" "}
            or their respective owners unless otherwise agreed in writing.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-fg">Limitation</h2>
          <p>
            To the extent permitted by law, {SITE_NAME} is not liable for indirect or
            consequential loss arising from use of this website. Nothing on this site
            forms a binding offer until confirmed in writing.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-fg">Contact</h2>
          <p>
            Questions about these terms:{" "}
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
