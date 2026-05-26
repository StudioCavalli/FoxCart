import type { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
  slug: "customers",
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [
    { name: "firstName", type: "text", required: true },
    { name: "lastName", type: "text", required: true },
    { name: "company", type: "text" },
    { name: "phone", type: "text" },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "individual",
      options: [
        { label: "Particulier", value: "individual" },
        { label: "Professionnel", value: "professional" },
      ],
    },
    {
      name: "addresses",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        {
          name: "addressType",
          type: "select",
          required: true,
          defaultValue: "shipping",
          options: [
            { label: "Livraison", value: "shipping" },
            { label: "Facturation", value: "billing" },
          ],
        },
        { name: "firstName", type: "text", required: true },
        { name: "lastName", type: "text", required: true },
        { name: "company", type: "text" },
        { name: "address1", type: "text", required: true },
        { name: "address2", type: "text" },
        { name: "city", type: "text", required: true },
        { name: "postalCode", type: "text", required: true },
        { name: "country", type: "text", required: true, defaultValue: "FR" },
        { name: "phone", type: "text" },
        { name: "isDefault", type: "checkbox", defaultValue: false },
      ],
    },
    { name: "stripeCustomerId", type: "text", admin: { readOnly: true } },
  ],
};
