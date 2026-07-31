import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { ProductGrid } from "@/components/marketing/product-grid";
import { CtaBand } from "@/components/marketing/cta-band";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Future Nūriya Studios software products — transport, fleet, booking, invoicing, and AI automation.",
};

export default function ProductsPage() {
  return (
    <>
      <PageIntro
        title="Products"
        description="Software products designed for recurring value. Join a waitlist for early access, or ask us to build a custom system in the same domain today."
      />
      <Container className="pb-20">
        <ProductGrid />
      </Container>
      <CtaBand
        title="Need this sooner as a custom build?"
        description="Many products start as client systems. We can scope a tailored version while the platform matures."
      />
    </>
  );
}
