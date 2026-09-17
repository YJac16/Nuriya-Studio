"use client";

import { FormEvent, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
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
      company: String(form.get("company") || ""),
      countryTimezone: String(form.get("countryTimezone") || ""),
      needs: String(form.get("needs") || ""),
      budget: String(form.get("budget") || ""),
      referral: String(form.get("referral") || ""),
      phone: String(form.get("phone") || ""),
      website: String(form.get("website") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        if (data.error === "EMAIL_NOT_CONFIGURED") {
          setError(`Email delivery is not configured yet. Write to ${CONTACT_EMAIL}.`);
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
          <Label htmlFor="contact-name">Name</Label>
          <Input id="contact-name" name="name" required autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-company">Company</Label>
          <Input id="contact-company" name="company" required autoComplete="organization" />
        </div>
        <div>
          <Label htmlFor="contact-country">Country / timezone</Label>
          <Input
            id="contact-country"
            name="countryTimezone"
            required
            placeholder="e.g. United Kingdom (GMT)"
            autoComplete="country-name"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="contact-needs">What you need</Label>
        <Textarea
          id="contact-needs"
          name="needs"
          required
          placeholder="Site, booking, ops — tell us what you are trying to solve."
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-budget">Budget band (optional)</Label>
          <Select id="contact-budget" name="budget" defaultValue="">
            <option value="">Prefer not to say</option>
            <option value="Under R5,000">Under R5,000</option>
            <option value="R5,000–R15,000">R5,000–R15,000</option>
            <option value="R15,000–R50,000">R15,000–R50,000</option>
            <option value="R50,000+">R50,000+</option>
            <option value="International — quote in my currency">
              International — quote in my currency
            </option>
          </Select>
        </div>
        <div>
          <Label htmlFor="contact-referral">How you found us (optional)</Label>
          <Input
            id="contact-referral"
            name="referral"
            placeholder="Referral, search, social, etc."
          />
        </div>
      </div>
      <div>
        <Label htmlFor="contact-phone">Phone (optional)</Label>
        <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="contact-website">Website</Label>
        <Input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>
      {status === "success" ? (
        <p className="text-sm text-accent" role="status">
          Message sent. We will reply shortly.
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
