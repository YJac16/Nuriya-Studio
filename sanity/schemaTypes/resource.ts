import { defineField, defineType } from "sanity";

export const resource = defineType({
  name: "resource",
  title: "Resource",
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
      name: "type",
      type: "string",
      options: {
        list: ["guide", "checklist", "download", "other"],
      },
    }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "body", type: "blockContent" }),
    defineField({ name: "fileUrl", type: "url", title: "External file URL" }),
  ],
});
