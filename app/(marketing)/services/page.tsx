import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { ServiceGrid } from "@/components/marketing/service-grid";
import { CtaBand } from "@/components/marketing/cta-band";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Landing pages, business websites, booking systems, custom software, and enterprise solutions from Nūriya Studios.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        title="Services"
        description="Clear packages for websites, booking systems, and custom software — with delivery windows you can plan around."
      />
      <Container className="pb-20">
        <ServiceGrid />
      </Container>
      <CtaBand
        title="Not sure which package fits?"
        description="Book a consultation and we will recommend the leanest path to launch."
      />
    </>
  );
}
