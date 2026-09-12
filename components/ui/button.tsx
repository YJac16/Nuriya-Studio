import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent/90 focus-visible:ring-accent",
  secondary:
    "border border-fg/25 bg-transparent text-fg hover:border-fg/40 hover:bg-fg/5 focus-visible:ring-fg/30",
  ghost: "bg-transparent text-fg hover:bg-fg/5 focus-visible:ring-fg/30",
} as const;

type Variant = keyof typeof variants;

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  showArrow?: boolean;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function ButtonLabel({ children, showArrow }: { children: ReactNode; showArrow?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none">
      {children}
      {showArrow ? (
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none">
          →
        </span>
      ) : null}
    </span>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  showArrow = false,
  ...props
}: ButtonProps) {
  const classes = cn(
    "group inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium tracking-[0.02em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className,
  );

  if ("href" in props && props.href) {
    const { href, external, onClick, ...rest } = props;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          <ButtonLabel showArrow={showArrow}>{children}</ButtonLabel>
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick} {...rest}>
        <ButtonLabel showArrow={showArrow}>{children}</ButtonLabel>
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} type={buttonProps.type ?? "button"} {...buttonProps}>
      <ButtonLabel showArrow={showArrow}>{children}</ButtonLabel>
    </button>
  );
}
