"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CONSENT_STORAGE_KEY,
  type ConsentValue,
  hasAnalyticsConfigured,
} from "@/lib/analytics";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [ready, setReady] = useState(false);
  const analyticsConfigured = hasAnalyticsConfigured();

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentValue | null;
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
    }
    setReady(true);
  }, []);

  function save(value: ConsentValue) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    setConsent(value);
  }

  if (!ready) return null;

  return (
    <>
      {consent === "accepted" && analyticsConfigured ? <AnalyticsScripts /> : null}

      {analyticsConfigured && consent === null ? (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-bg/95 p-4 backdrop-blur-md sm:p-5"
        >
          <div className="mx-auto flex w-full max-w-content flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">
              We use optional analytics cookies (Google Analytics, Microsoft Clarity
              {process.env.NEXT_PUBLIC_META_PIXEL_ID ? ", Meta Pixel" : ""}) to understand
              site usage.{" "}
              <Link href="/privacy" className="text-fg underline-offset-4 hover:underline">
                Privacy policy
              </Link>
            </p>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={() => save("rejected")}>
                Reject
              </Button>
              <Button type="button" onClick={() => save("accepted")}>
                Accept
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
