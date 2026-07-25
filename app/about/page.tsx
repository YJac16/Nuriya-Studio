import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nuriya Studio is a software studio building digital products that help businesses grow.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        title="About"
        description="We help businesses modernise through websites, business software, AI automation, SaaS, and client systems."
      />
      <Container className="py-12">
        <Button href="/book">Book Consultation</Button>
      </Container>
    </>
  );
}
