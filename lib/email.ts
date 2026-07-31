import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getContactToEmail(): string {
  return process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL;
}

export async function sendLeadEmail({
  subject,
  replyTo,
  text,
}: {
  subject: string;
  replyTo: string;
  text: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "EMAIL_NOT_CONFIGURED" };
  }

  const from =
    process.env.RESEND_FROM_EMAIL || "Nūriya Studios <onboarding@resend.dev>";
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [getContactToEmail()],
    replyTo,
    subject,
    text,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
