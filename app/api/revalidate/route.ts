import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string; slug?: { current?: string } } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    body = {};
  }

  const type = body._type;
  if (type) {
    revalidateTag(type);
    if (body.slug?.current) {
      revalidateTag(`${type}:${body.slug.current}`);
    }
  } else {
    [
      "project",
      "post",
      "testimonial",
      "faq",
      "teamMember",
      "siteSettings",
      "resource",
    ].forEach((tag) => revalidateTag(tag));
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
