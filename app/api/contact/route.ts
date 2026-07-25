import { NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limited = rateLimit(`contact:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const result = await sendLeadEmail({
    subject: `Contact · ${parsed.data.name}`,
    replyTo: parsed.data.email,
    text: [
      `Name: ${parsed.data.name}`,
      `Email: ${parsed.data.email}`,
      `Phone: ${parsed.data.phone || "—"}`,
      "",
      parsed.data.message,
    ].join("\n"),
  });

  if (!result.ok) {
    const status = result.error === "EMAIL_NOT_CONFIGURED" ? 503 : 500;
    return NextResponse.json(
      {
        error:
          result.error === "EMAIL_NOT_CONFIGURED"
            ? "EMAIL_NOT_CONFIGURED"
            : "Unable to send message right now.",
      },
      { status },
    );
  }

  return NextResponse.json({ ok: true });
}
