"use client";

import { type FormEvent, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm({
  productSlug,
  productName,
}: {
  productSlug: string;
  productName: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      email: String(form.get("email") || ""),
      name: String(form.get("name") || ""),
      company: String(form.get("company") || ""),
      notes: String(form.get("notes") || ""),
      productSlug,
      productName,
      website: String(form.get("website") || ""),
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        if (data.error === "WAITLIST_NOT_CONFIGURED") {
          setError(`Waitlist is not configured yet. Email ${CONTACT_EMAIL}.`);
        } else {
          setError(data.error || "Something went wrong. Please try again.");
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="waitlist-email">Email</Label>
        <Input
          id="waitlist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="waitlist-name">Name (optional)</Label>
          <Input id="waitlist-name" name="name" autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="waitlist-company">Company (optional)</Label>
          <Input id="waitlist-company" name="company" autoComplete="organization" />
        </div>
      </div>
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="waitlist-website">Website</Label>
        <Input id="waitlist-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Joining…" : "Join waitlist"}
      </Button>
      {status === "success" ? (
        <p className="text-sm text-accent" role="status">
          You are on the list. We will reach out when early access opens.
        </p>
      ) : null}
      {status === "error" && error ? (
        <p className="text-sm text-red-700 dark:text-red-300" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
