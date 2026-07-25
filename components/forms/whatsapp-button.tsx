import { getWhatsAppUrl } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function WhatsAppButton({
  label = "WhatsApp",
  variant = "secondary",
  className,
}: {
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const href = getWhatsAppUrl();
  if (!href) return null;

  return (
    <Button href={href} external variant={variant} className={className}>
      {label}
    </Button>
  );
}
