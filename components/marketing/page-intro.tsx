import { Container } from "@/components/ui/container";

export function PageIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-border py-20 sm:py-24">
      <Container>
        <h1 className="max-w-3xl font-display text-4xl tracking-tight text-fg sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
          {description}
        </p>
      </Container>
    </section>
  );
}
