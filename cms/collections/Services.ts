import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: { useAsTitle: "name", defaultColumns: ["name", "category", "pricingType", "_status"] },
  versions: { drafts: true },
  fields: [
    { name: "name", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "tagline", type: "text", required: true, localized: true, maxLength: 120 },
    { name: "description", type: "richText", localized: true },
    { name: "icon", type: "text", required: true },
    { name: "category", type: "relationship", relationTo: "service-categories", required: true },
    {
      name: "pricingType",
      type: "select",
      required: true,
      defaultValue: "fixed",
      options: [
        { label: "Fixed", value: "fixed" },
        { label: "From", value: "from" },
        { label: "Quote", value: "quote" },
        { label: "Hourly", value: "hourly" },
      ],
    },
    {
      name: "pricing",
      type: "array",
      fields: [
        { name: "tier", type: "text", required: true },
        { name: "price", type: "number", required: true },
        { name: "unit", type: "text" },
        {
          name: "features",
          type: "array",
          fields: [{ name: "feature", type: "text", required: true }],
        },
        { name: "highlighted", type: "checkbox", defaultValue: false },
        { name: "cta", type: "text", required: true },
        { name: "ctaLink", type: "text", required: true },
      ],
    },
    {
      name: "process",
      type: "array",
      fields: [
        { name: "step", type: "number", required: true },
        { name: "title", type: "text", required: true, localized: true },
        { name: "description", type: "textarea", required: true, localized: true },
      ],
    },
    {
      name: "deliverables",
      type: "array",
      fields: [{ name: "item", type: "text", required: true, localized: true }],
    },
    { name: "timeline", type: "text", localized: true },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "order", type: "number", defaultValue: 0 },
    { name: "publishedAt", type: "date" },
  ],
};
