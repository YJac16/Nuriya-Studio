import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Nuriya Studio")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("project").title("Portfolio"),
      S.documentTypeListItem("post").title("Blog"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("teamMember").title("Team"),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("resource").title("Resources"),
    ]);
