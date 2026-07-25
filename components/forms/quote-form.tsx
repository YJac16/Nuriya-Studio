"use client";

import { FormEvent, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";
import { services } from "@/lib/content/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "loading" | "success" | "error";

export function QuoteForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      company: String(form.get("company") || ""),
      service: String(form.get("service") || ""),
      budget: String(form.get("budget") || ""),
      message: String(form.get("message") || ""),
      website: String(form.get("website") || ""),
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        if (data.error === "EMAIL_NOT_CONFIGURED") {
          setError(`Quote email is not configured yet. Write to ${CONTACT_EMAIL}.`);
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
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="quote-name">Name</Label>
          <Input id="quote-name" name="name" required autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="quote-email">Email</Label>
          <Input id="quote-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="quote-phone">Phone (optional)</Label>
          <Input id="quote-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div>
          <Label htmlFor="quote-company">Company (optional)</Label>
          <Input id="quote-company" name="company" autoComplete="organization" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="quote-service">Service</Label>
          <Select id="quote-service" name="service" required defaultValue={defaultService || ""}>
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="quote-budget">Budget (optional)</Label>
          <Select id="quote-budget" name="budget" defaultValue="">
            <option value="">Prefer not to say</option>
            <option value="Under R5,000">Under R5,000</option>
            <option value="R5,000–R15,000">R5,000–R15,000</option>
            <option value="R15,000–R50,000">R15,000–R50,000</option>
            <option value="R50,000+">R50,000+</option>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="quote-message">Project details</Label>
        <Textarea id="quote-message" name="message" required />
      </div>
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="quote-website">Website</Label>
        <Input id="quote-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request quote"}
      </Button>
      {status === "success" ? (
        <p className="text-sm text-accent" role="status">
          Quote request sent. We will follow up shortly.
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
