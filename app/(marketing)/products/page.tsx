import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { ProductGrid } from "@/components/marketing/product-grid";
import { CtaBand } from "@/components/marketing/cta-band";
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
        description="Software products designed for recurring value — starting with transport, booking, invoicing, and automation."
      />
      <Container className="pb-20">
        <ProductGrid />
      </Container>
      <CtaBand />
    </>
  );
}
