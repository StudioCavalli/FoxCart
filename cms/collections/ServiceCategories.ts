import type { CollectionConfig } from "payload";

export const ServiceCategories: CollectionConfig = {
  slug: "service-categories",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "description", type: "textarea", localized: true },
    { name: "icon", type: "text", required: true },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
