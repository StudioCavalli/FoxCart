import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "basePrice", "fulfillmentType", "_status"],
  },
  versions: { drafts: true },
  fields: [
    { name: "name", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "shortDescription", type: "textarea", localized: true, maxLength: 200 },
    { name: "description", type: "richText", localized: true },
    { name: "category", type: "relationship", relationTo: "product-categories", required: true },
    {
      name: "images",
      type: "array",
      minRows: 1,
      maxRows: 10,
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
    { name: "costPrice", type: "number", min: 0, admin: { description: "Prix d'achat fournisseur (centimes)" } },
    { name: "marginPercent", type: "number", min: 0, max: 500, admin: { description: "Marge en % (ex: 50 = x1.5)" } },
    { name: "basePrice", type: "number", required: true, min: 0, admin: { description: "Prix de vente TTC (centimes)" } },
    { name: "compareAtPrice", type: "number", min: 0 },
    { name: "supplierUrl", type: "text", admin: { description: "Lien vers le produit chez le fournisseur" } },
    { name: "taxRate", type: "number", required: true, defaultValue: 20, min: 0, max: 100 },
    { name: "hasVariants", type: "checkbox", defaultValue: false },
    {
      name: "variants",
      type: "array",
      admin: { condition: (_, siblingData) => siblingData?.hasVariants },
      fields: [
        { name: "name", type: "text", required: true },
        {
          name: "options",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "priceModifier", type: "number", defaultValue: 0 },
            { name: "sku", type: "text", required: true },
            { name: "stock", type: "number", defaultValue: 0, min: 0 },
          ],
        },
      ],
    },
    {
      name: "fulfillmentType",
      type: "select",
      required: true,
      defaultValue: "internal",
      options: [
        { label: "Internal", value: "internal" },
        { label: "Gelato", value: "gelato" },
        { label: "Lulu Direct", value: "lulu" },
        { label: "Alibaba", value: "alibaba" },
      ],
    },
    { name: "externalProductId", type: "text" },
    { name: "weight", type: "number", min: 0 },
    {
      name: "dimensions",
      type: "group",
      fields: [
        { name: "length", type: "number", min: 0 },
        { name: "width", type: "number", min: 0 },
        { name: "height", type: "number", min: 0 },
      ],
    },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "isSubscription", type: "checkbox", defaultValue: false },
    {
      name: "subscriptionInterval",
      type: "select",
      admin: { condition: (_, siblingData) => siblingData?.isSubscription },
      options: [
        { label: "Mensuel", value: "monthly" },
        { label: "Trimestriel", value: "quarterly" },
        { label: "Annuel", value: "yearly" },
      ],
    },
    { name: "stripeProductId", type: "text", admin: { readOnly: true } },
    { name: "stripePriceId", type: "text", admin: { readOnly: true } },
    { name: "publishedAt", type: "date" },
  ],
};
