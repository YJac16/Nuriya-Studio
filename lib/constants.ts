export const SITE_NAME = "Nūriya Studios";
export const SITE_SHORT_NAME = "Nūriya";
export const SITE_TAGLINE =
  "A software studio building digital products that help businesses grow.";
export const SITE_DESCRIPTION =
  "Nūriya Studios builds websites, business software, booking systems, and AI automation for growing businesses.";

/** Mark only — circular emblem (transparent edges) */
export const LOGO_MARK = "/images/nuriya-logo-no-background.png";
/** Full lockup — mark + Nūriya + STUDIOS (transparent edges) */
export const LOGO_LOCKUP = "/images/nuriya-logo-and-name-no-background.png";

export const CONTACT_EMAIL = "yaseenjacobs97@gmail.com";
/** Digits only, country code, no + — used for wa.me links */
export const CONTACT_WHATSAPP_NUMBER = "27823277446";
export const CONTACT_WHATSAPP_DISPLAY = "+27 82 327 7446";

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
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
    CONTACT_WHATSAPP_NUMBER;
  if (!number) return null;
  return `https://wa.me/${number}`;
}
