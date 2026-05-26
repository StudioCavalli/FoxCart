import type { CollectionConfig } from "payload";

export const Subscriptions: CollectionConfig = {
  slug: "subscriptions",
  admin: {
    useAsTitle: "plan",
    defaultColumns: ["plan", "customer", "status", "monthlyPrice", "nextBillingDate"],
  },
  fields: [
    { name: "customer", type: "relationship", relationTo: "customers", required: true },
    { name: "product", type: "relationship", relationTo: "products", required: true },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        { label: "Actif", value: "active" },
        { label: "En pause", value: "paused" },
        { label: "Annulé", value: "cancelled" },
        { label: "Expiré", value: "expired" },
      ],
    },
    { name: "plan", type: "text", required: true },
    { name: "monthlyPrice", type: "number", required: true, min: 0 },
    { name: "startDate", type: "date", required: true },
    { name: "nextBillingDate", type: "date" },
    { name: "stripeSubscriptionId", type: "text" },
    { name: "notes", type: "textarea" },
  ],
};
