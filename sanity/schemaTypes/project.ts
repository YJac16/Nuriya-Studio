import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "industry", type: "string" }),
    defineField({ name: "overview", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "problem", type: "text", rows: 4 }),
    defineField({ name: "solution", type: "text", rows: 4 }),
    defineField({
      name: "techStack",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        }),
      ],
    }),
    defineField({
      name: "results",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "value", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        }),
      ],
    }),
    defineField({ name: "body", type: "blockContent" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "publishedAt", type: "datetime" }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "gallery.0" },
  },
});
