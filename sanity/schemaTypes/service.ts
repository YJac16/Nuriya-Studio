import { defineArrayMember, defineField, defineType } from "sanity";

/** Optional CMS override for services. Site currently uses typed static packages as fallback. */
export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "priceLabel", type: "string" }),
    defineField({ name: "priceAmount", type: "number" }),
    defineField({ name: "delivery", type: "string" }),
    defineField({
      name: "includes",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "body", type: "blockContent" }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
});
