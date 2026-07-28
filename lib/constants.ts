export const SITE_NAME = "Nuriya Studio";
export const SITE_TAGLINE =
  "A software studio building digital products that help businesses grow.";
export const SITE_DESCRIPTION =
  "Nuriya Studio builds websites, business software, booking systems, and AI automation for growing businesses.";

export const CONTACT_EMAIL = "hello@nuriyastudio.com";

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

export const FOOTER_LINKS = {
  company: [
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/brands", label: "Our Brands" },
  ],
  commercial: [
    { href: "/services", label: "Services" },
    { href: "/solutions", label: "Solutions" },
    { href: "/products", label: "Products" },
    { href: "/pricing", label: "Pricing" },
  ],
  connect: [
    { href: "/contact", label: "Contact" },
    { href: "/book", label: "Book Consultation" },
    { href: "/resources", label: "Resources" },
  ],
} as const;

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
}

export function getWhatsAppUrl(): string | null {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}`;
}
