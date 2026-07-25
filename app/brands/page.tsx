import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/marketing/page-intro";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Our Brands",
  description: "Nuriya Studio, Athariq, and Little Light — the brands in our group.",
};

const brands = [
  {
    name: "Nuriya Studio",
    role: "Software",
    description: "Digital products that help businesses grow.",
    href: "/",
    image: "/images/nuriya-logo.png",
    external: false,
  },
  {
    name: "Athariq",
    role: "Games",
    description: "Interactive games and playful systems.",
    href: process.env.NEXT_PUBLIC_ATHARIQ_URL || "#",
    image: "/images/athariq-logo.png",
    external: true,
  },
  {
    name: "Little Light",
    role: "Education",
    description: "Gentle learning experiences for young minds.",
    href: process.env.NEXT_PUBLIC_LITTLE_LIGHT_URL || "#",
    image: "/images/little-light-logo.jpg",
    external: true,
  },
] as const;

export default function BrandsPage() {
  return (
    <>
      <PageIntro
        title="Our Brands"
        description="Nuriya Studio is the software company. Sibling brands extend the group without diluting the core offer."
      />
      <Container className="grid gap-10 py-16 md:grid-cols-3">
        {brands.map((brand) => (
          <article key={brand.name} className="flex flex-col gap-4">
            <Image
              src={brand.image}
              alt={`${brand.name} logo`}
              width={64}
              height={64}
              className="size-16 object-contain"
            />
            <p className="font-mono text-xs tracking-wide text-accent uppercase">
              {brand.role}
            </p>
            <h2 className="font-display text-2xl text-fg">{brand.name}</h2>
            <p className="text-sm leading-relaxed text-fg-muted">{brand.description}</p>
            <Button
              href={brand.href}
              variant="secondary"
              external={brand.external}
              className="mt-auto w-fit"
            >
              Visit
            </Button>
          </article>
        ))}
      </Container>
    </>
  );
}
