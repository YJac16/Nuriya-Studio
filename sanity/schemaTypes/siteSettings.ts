import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", initialValue: "Site Settings" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({
      name: "brands",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string" }),
            defineField({ name: "role", type: "string" }),
            defineField({ name: "description", type: "text", rows: 2 }),
            defineField({ name: "url", type: "url" }),
            defineField({
              name: "logo",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Alt text" }],
            }),
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
