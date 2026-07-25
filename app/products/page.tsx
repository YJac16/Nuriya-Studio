import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Future Nuriya Studio software products — transport, fleet, booking, invoicing, and AI automation.",
};

export default function ProductsPage() {
  return (
    <>
      <PageIntro
        title="Products"
        description="Software products in development — transport, fleet, booking, invoicing, and AI automation."
      />
      <Container className="py-12">
        <Button href="/contact" variant="secondary">
          Request Quote
        </Button>
      </Container>
    </>
  );
}
