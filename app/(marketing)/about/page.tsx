import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/marketing/page-intro";
import { ProcessSteps } from "@/components/marketing/process-steps";
import { CtaBand } from "@/components/marketing/cta-band";
import { Section, SectionHeading } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getTeamMembers } from "@/lib/content/data";
import { urlForImage } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nuriya Studio is a software studio building digital products that help businesses grow.",
};

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <>
      <PageIntro
        title="About"
        description="Nuriya Studio is a software studio building digital products that help businesses grow."
      />
      <Container className="space-y-8 py-16 text-base leading-relaxed text-fg-muted">
        <p>
          Client websites generate cash flow. Software products create recurring revenue.
          Over time, Nuriya Studio will own multiple SaaS platforms — starting from the
          systems we already build for businesses every day.
        </p>
        <p>
          We help businesses modernise through websites, business software, AI automation,
          SaaS, mobile apps, client portals, booking systems, and dashboards.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href="/brands" variant="secondary">
            Our Brands
          </Button>
          <Button href="/services">View Services</Button>
        </div>
      </Container>

      {team.length ? (
        <Section tone="muted">
          <SectionHeading
            eyebrow="Team"
            title="People behind the work."
            description="The operators, designers, and builders shipping Nuriya Studio products."
          />
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => {
              const imageUrl = member.image
                ? urlForImage(member.image)?.width(480).height(480).url()
                : null;
              return (
                <li key={member._id}>
                  {imageUrl ? (
                    <div className="relative mb-4 aspect-square w-full max-w-[220px] overflow-hidden bg-bg">
                      <Image
                        src={imageUrl}
                        alt={member.image?.alt || member.name}
                        fill
                        className="object-cover"
                        sizes="220px"
                      />
                    </div>
                  ) : null}
                  <h3 className="font-display text-2xl text-fg">{member.name}</h3>
                  <p className="mt-1 font-mono text-xs tracking-wide text-accent uppercase">
                    {member.role}
                  </p>
                  {member.bio ? (
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">{member.bio}</p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </Section>
      ) : null}

      <Section>
        <SectionHeading
          eyebrow="How we work"
          title="A process built for shipping."
          description="Discovery first. Delivery second. Growth as a partnership when you want it."
        />
        <ProcessSteps />
      </Section>
      <CtaBand />
    </>
  );
}
