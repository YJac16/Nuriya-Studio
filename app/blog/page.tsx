import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights from Nuriya Studio on software, websites, and automation.",
};

export default function BlogPage() {
  return (
    <PageIntro
      title="Blog"
      description="Practical writing on software, websites, and automation for growing businesses."
    />
  );
}
