import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/marketing/page-intro";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getSiteSettings } from "@/lib/content/data";
import { LOGO_MARK, SITE_NAME } from "@/lib/constants";
import { urlForImage } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Our Brands",
  description: `${SITE_NAME}, Athariq, and Little Light — the brands in our group.`,
};

const fallbackBrands = [
  {
    name: SITE_NAME,
    role: "Software",
    description: "Digital products that help businesses grow.",
    href: "/",
    image: LOGO_MARK,
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

export default async function BrandsPage() {
  const settings = await getSiteSettings();
  const cmsBrands =
    settings?.brands
      ?.filter((brand) => brand.name)
      .map((brand) => {
        const logoUrl = brand.logo ? urlForImage(brand.logo)?.width(128).height(128).url() : null;
        return {
          name: brand.name || "",
          role: brand.role || "",
          description: brand.description || "",
          href: brand.url || "/",
          image: logoUrl || LOGO_MARK,
          external: Boolean(brand.url && !brand.url.startsWith("/")),
        };
      }) || [];

  const brands = cmsBrands.length ? cmsBrands : fallbackBrands;

  return (
    <>
      <PageIntro
        title="Our Brands"
        description={`${SITE_NAME} is the software company. Sibling brands extend the group without diluting the core offer.`}
      />
      <Container className="grid gap-10 py-16 md:grid-cols-3">
        {brands.map((brand) => (
          <article key={brand.name} className="flex flex-col gap-4">
            <Image
              src={brand.image}
              alt={`${brand.name} logo`}
              width={72}
              height={72}
              className="size-[4.5rem] object-contain"
            />
            {brand.role ? (
              <p className="font-mono text-xs tracking-wide text-accent uppercase">
                {brand.role}
              </p>
            ) : null}
            <h2 className="font-display text-2xl text-fg">{brand.name}</h2>
            {brand.description ? (
              <p className="text-sm leading-relaxed text-fg-muted">{brand.description}</p>
            ) : null}
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
