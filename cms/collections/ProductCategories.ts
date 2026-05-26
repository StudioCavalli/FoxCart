import type { CollectionConfig } from "payload";

export const ProductCategories: CollectionConfig = {
  slug: "product-categories",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "description", type: "textarea", localized: true },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "parent", type: "relationship", relationTo: "product-categories" },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
