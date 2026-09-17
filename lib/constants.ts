export const SITE_NAME = "Nūriya Studios";
export const SITE_SHORT_NAME = "Nūriya";
export const SITE_TAGLINE =
  "We design and build the digital systems SMEs actually run on — sites, booking, and ops.";
export const SITE_DESCRIPTION =
  "Nūriya Studios designs and builds websites, booking systems, and operational software for SMEs — live in production.";

/** Mark only — circular emblem (transparent edges) */
export const LOGO_MARK = "/images/nuriya-logo-no-background.png";
/** Full lockup — mark + Nūriya + STUDIOS (transparent edges) */
export const LOGO_LOCKUP = "/images/nuriya-logo-and-name-no-background.png";

export const SITE_URL = "https://nuriyastudios.com";

/** Public studio inbox shown on the site */
export const CONTACT_EMAIL = "hello@nuriyastudios.com";
export const STUDIO_LOCATION_FOOTER = "Cape Town · remote-friendly";
export const STUDIO_LOCATION_DETAIL =
  "Based in Cape Town, South Africa — we work with clients remotely.";
export const STUDIO_RESPONSE_WINDOW =
  "Replies typically within one business day (SAST, UTC+2).";
/** Digits only, country code, no + — used for wa.me links */
export const CONTACT_WHATSAPP_NUMBER = "27823277446";
export const CONTACT_WHATSAPP_DISPLAY = "+27 82 327 7446";

/** Primary sitewide conversion path — quote request form on /contact */
export const CTA_QUOTE = { href: "/contact#quote", label: "Request a quote" } as const;
/** Secondary — general enquiry (no self-serve calendar) */
export const CTA_CONTACT = { href: "/contact", label: "Get in touch" } as const;

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
    { href: "/contact#quote", label: "Request a quote" },
    { href: "/resources", label: "Resources" },
  ],
} as const;

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured && !configured.includes(".up.railway.app")) {
    return configured;
  }
  if (process.env.NODE_ENV === "production") {
    return SITE_URL;
  }
  return configured || "http://localhost:3000";
}

export function getWhatsAppUrl(): string | null {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
    CONTACT_WHATSAPP_NUMBER;
  if (!number) return null;
  return `https://wa.me/${number}`;
}
