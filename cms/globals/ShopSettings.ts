import type { GlobalConfig } from "payload";

export const ShopSettings: GlobalConfig = {
  slug: "shop-settings",
  fields: [
    { name: "currency", type: "text", required: true, defaultValue: "EUR" },
    { name: "defaultTaxRate", type: "number", required: true, defaultValue: 20, min: 0, max: 100 },
    { name: "freeShippingThreshold", type: "number", min: 0 },
    { name: "cartMessage", type: "text", localized: true },
    { name: "returnPolicySummary", type: "textarea", localized: true },
  ],
};
