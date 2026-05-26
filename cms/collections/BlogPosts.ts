import type { CollectionConfig } from "payload";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: { useAsTitle: "title", defaultColumns: ["title", "tags", "publishedAt", "_status"] },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "lead", type: "textarea", localized: true, maxLength: 280 },
    { name: "body", type: "richText", required: true, localized: true },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "author", type: "text", required: true },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text", required: true }],
    },
    { name: "readingTimeMinutes", type: "number", min: 1, max: 120 },
    { name: "publishedAt", type: "date" },
  ],
};
