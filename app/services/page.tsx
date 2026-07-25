import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Landing pages, business websites, booking systems, custom software, and enterprise solutions from Nuriya Studio.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        title="Services"
        description="From launch-ready landing pages to custom business software — scoped packages with clear delivery windows."
      />
      <Container className="py-12">
        <Button href="/book">Book Consultation</Button>
      </Container>
    </>
  );
}
