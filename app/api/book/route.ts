import { NextResponse } from "next/server";
import { sendLeadEmail, isEmailConfigured } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { bookingSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limited = rateLimit(`book:${ip}`, 6);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "BOOKING_NOT_CONFIGURED" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "BOOKING_NOT_CONFIGURED" }, { status: 503 });
  }

  const { error } = await supabase.from("consultation_bookings").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    company: parsed.data.company || null,
    preferred_date: parsed.data.preferredDate,
    preferred_time: parsed.data.preferredTime,
    notes: parsed.data.notes || null,
    status: "pending",
    source: "website",
  });

  if (error) {
    return NextResponse.json(
      { error: "Unable to save booking right now." },
      { status: 500 },
    );
  }

  if (isEmailConfigured()) {
    await sendLeadEmail({
      subject: `Booking · ${parsed.data.preferredDate} ${parsed.data.preferredTime} · ${parsed.data.name}`,
      replyTo: parsed.data.email,
      text: [
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        `Phone: ${parsed.data.phone || "—"}`,
        `Company: ${parsed.data.company || "—"}`,
        `Preferred date: ${parsed.data.preferredDate}`,
        `Preferred time: ${parsed.data.preferredTime}`,
        "",
        parsed.data.notes || "No notes provided.",
      ].join("\n"),
    });
  }

  return NextResponse.json({ ok: true });
}
