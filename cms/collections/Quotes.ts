import type { CollectionConfig } from "payload";

export const Quotes: CollectionConfig = {
  slug: "quotes",
  admin: {
    useAsTitle: "quoteNumber",
    defaultColumns: ["quoteNumber", "firstName", "lastName", "service", "status", "createdAt"],
  },
  fields: [
    { name: "quoteNumber", type: "text", required: true, unique: true, admin: { readOnly: true } },
    { name: "firstName", type: "text", required: true },
    { name: "lastName", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "company", type: "text" },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Particulier", value: "individual" },
        { label: "Professionnel", value: "professional" },
      ],
    },
    { name: "service", type: "relationship", relationTo: "services" },
    {
      name: "budget",
      type: "select",
      options: ["< 1 000 EUR", "1 000 - 5 000 EUR", "5 000 - 15 000 EUR", "> 15 000 EUR"],
    },
    {
      name: "timeline",
      type: "select",
      options: ["< 1 mois", "1 - 3 mois", "3 - 6 mois", "> 6 mois"],
    },
    { name: "description", type: "textarea", required: true },
    {
      name: "attachments",
      type: "array",
      fields: [{ name: "file", type: "upload", relationTo: "media" }],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        { label: "Nouveau", value: "new" },
        { label: "Contacte", value: "contacted" },
        { label: "Devis envoye", value: "quoted" },
        { label: "Accepte", value: "accepted" },
        { label: "Refuse", value: "rejected" },
      ],
    },
    { name: "internalNote", type: "textarea" },
    { name: "quotedAmount", type: "number", min: 0 },
  ],
};
