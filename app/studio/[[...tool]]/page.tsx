"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export default function StudioPage() {
  if (!isSanityConfigured()) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-4 px-6 py-16">
        <h1 className="font-display text-3xl text-fg">Sanity Studio</h1>
        <p className="text-sm leading-relaxed text-fg-muted">
          Set <code className="font-mono text-fg">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
          <code className="font-mono text-fg">NEXT_PUBLIC_SANITY_DATASET</code> to enable the
          CMS. Create a project at sanity.io, then reopen <code className="font-mono">/studio</code>.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
