import { NextResponse } from "next/server";
import { isEmailConfigured, sendLeadEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { waitlistSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limited = rateLimit(`waitlist:${ip}`, 6);
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

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const supabaseReady = isSupabaseConfigured();
  const emailReady = isEmailConfigured();

  if (!supabaseReady && !emailReady) {
    return NextResponse.json({ error: "WAITLIST_NOT_CONFIGURED" }, { status: 503 });
  }

  if (supabaseReady) {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: "WAITLIST_NOT_CONFIGURED" }, { status: 503 });
    }

    const { error } = await supabase.from("product_waitlist").insert({
      email: parsed.data.email.toLowerCase(),
      name: parsed.data.name || null,
      company: parsed.data.company || null,
      product_slug: parsed.data.productSlug,
      product_name: parsed.data.productName,
      notes: parsed.data.notes || null,
      source: "website",
    });

    if (error) {
      const duplicate =
        error.code === "23505" || error.message.toLowerCase().includes("duplicate");
      if (!duplicate) {
        return NextResponse.json(
          { error: "Unable to join the waitlist right now." },
          { status: 500 },
        );
      }
    }
  }

  if (emailReady) {
    await sendLeadEmail({
      subject: `Waitlist · ${parsed.data.productName} · ${parsed.data.email}`,
      replyTo: parsed.data.email,
      text: [
        `Product: ${parsed.data.productName} (${parsed.data.productSlug})`,
        `Email: ${parsed.data.email}`,
        `Name: ${parsed.data.name || "—"}`,
        `Company: ${parsed.data.company || "—"}`,
        "",
        parsed.data.notes || "No notes provided.",
      ].join("\n"),
    });
  }

  return NextResponse.json({ ok: true });
}
