"use client";

import { FormEvent, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "loading" | "success" | "error";

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

export function BookingForm({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  if (!enabled) {
    return (
      <div className="space-y-4 border border-border bg-bg-elevated p-6">
        <p className="text-sm leading-relaxed text-fg-muted">
          Online booking is almost ready. Until Supabase is connected, email{" "}
          <a className="text-fg underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>{" "}
          or use the contact form to request a consultation slot.
        </p>
        <Button href="/contact" variant="secondary">
          Contact us
        </Button>
      </div>
    );
  }

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
      preferredDate: String(form.get("preferredDate") || ""),
      preferredTime: String(form.get("preferredTime") || ""),
      notes: String(form.get("notes") || ""),
      website: String(form.get("website") || ""),
    };

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        if (data.error === "BOOKING_NOT_CONFIGURED") {
          setError(`Booking is not configured yet. Email ${CONTACT_EMAIL}.`);
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

  const minDate = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="book-name">Name</Label>
          <Input id="book-name" name="name" required autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="book-email">Email</Label>
          <Input id="book-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="book-phone">Phone (optional)</Label>
          <Input id="book-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div>
          <Label htmlFor="book-company">Company (optional)</Label>
          <Input id="book-company" name="company" autoComplete="organization" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="book-date">Preferred date</Label>
          <Input id="book-date" name="preferredDate" type="date" required min={minDate} />
        </div>
        <div>
          <Label htmlFor="book-time">Preferred time (SAST)</Label>
          <Select id="book-time" name="preferredTime" required defaultValue="">
            <option value="" disabled>
              Select a time
            </option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="book-notes">Notes (optional)</Label>
        <Textarea id="book-notes" name="notes" />
      </div>
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="book-website">Website</Label>
        <Input id="book-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Booking…" : "Request consultation"}
      </Button>
      {status === "success" ? (
        <p className="text-sm text-accent" role="status">
          Request received. We will confirm your consultation by email.
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
