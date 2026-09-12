export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      style={{ zIndex: "var(--z-skip)" }}
    >
      Skip to content
    </a>
  );
}
