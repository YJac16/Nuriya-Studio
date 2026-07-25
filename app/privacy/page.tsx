import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for Nuriya Studio.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        title="Privacy"
        description="A full privacy policy will be published before analytics and cookie consent go live."
      />
      <Container className="prose-sm py-12 text-fg-muted">
        <p>
          We collect only the information needed to respond to enquiries and deliver
          services. Contact hello@nuriyastudio.com for privacy requests.
        </p>
      </Container>
    </>
  );
}
