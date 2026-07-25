import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Nuriya Studio.",
};

export default function TermsPage() {
  return (
    <>
      <PageIntro
        title="Terms"
        description="Website terms of use. Project agreements are issued per engagement."
      />
      <Container className="py-12 text-sm leading-relaxed text-fg-muted">
        <p>
          Content on this site is provided for general information. Engagements are
          governed by written proposals and contracts issued by Nuriya Studio.
        </p>
      </Container>
    </>
  );
}
