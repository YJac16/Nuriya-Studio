import { redirect } from "next/navigation";

/** Self-serve booking is disabled — intake is quote + consult via /contact only. */
export default function BookPage() {
  redirect("/contact");
}
