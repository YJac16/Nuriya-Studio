import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Coming Soon", value: "comingSoon" },
          { title: "Live", value: "live" },
        ],
        layout: "radio",
      },
      initialValue: "comingSoon",
    }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "body", type: "blockContent" }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
});
