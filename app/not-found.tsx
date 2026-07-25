import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="py-24">
        <Container className="max-w-xl">
          <p className="font-mono text-xs tracking-wide text-accent uppercase">404</p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-fg">Page not found</h1>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            The page you are looking for does not exist or has moved.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/">Home</Button>
            <Button href="/contact" variant="secondary">
              Contact
            </Button>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
