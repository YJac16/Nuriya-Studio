import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides and resources from Nuriya Studio.",
};

export default function ResourcesPage() {
  return (
    <PageIntro
      title="Resources"
      description="Guides, checklists, and downloads will be managed via CMS."
    />
  );
}
