import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: { defaultColumns: ["product", "rating", "verified", "createdAt"] },
  fields: [
    { name: "product", type: "relationship", relationTo: "products", required: true },
    { name: "customer", type: "relationship", relationTo: "customers" },
    { name: "authorName", type: "text", required: true },
    { name: "rating", type: "number", required: true, min: 1, max: 5 },
    { name: "title", type: "text" },
    { name: "comment", type: "textarea", required: true },
    { name: "verified", type: "checkbox", defaultValue: false },
    { name: "publishedAt", type: "date" },
  ],
};
