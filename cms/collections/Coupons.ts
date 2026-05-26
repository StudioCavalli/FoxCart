import type { CollectionConfig } from "payload";

export const Coupons: CollectionConfig = {
  slug: "coupons",
  admin: { useAsTitle: "code" },
  fields: [
    { name: "code", type: "text", required: true, unique: true },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Pourcentage", value: "percentage" },
        { label: "Montant fixe", value: "fixed" },
      ],
    },
    { name: "value", type: "number", required: true, min: 0 },
    { name: "minOrder", type: "number", min: 0 },
    { name: "maxUses", type: "number", min: 0 },
    { name: "usedCount", type: "number", defaultValue: 0, admin: { readOnly: true } },
    { name: "expiresAt", type: "date" },
    { name: "active", type: "checkbox", defaultValue: true },
  ],
};
