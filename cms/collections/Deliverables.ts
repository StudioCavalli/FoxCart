import type { CollectionConfig } from "payload";

export const Deliverables: CollectionConfig = {
  slug: "deliverables",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "subscription", "type", "status", "dueDate"],
  },
  fields: [
    { name: "subscription", type: "relationship", relationTo: "subscriptions", required: true },
    { name: "title", type: "text", required: true },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Visuel", value: "visual" },
        { label: "Vidéo", value: "video" },
        { label: "Rapport", value: "report" },
        { label: "Media Kit", value: "media_kit" },
        { label: "Post réseaux", value: "post" },
        { label: "Newsletter", value: "newsletter" },
        { label: "Stratégie", value: "strategy" },
        { label: "Autre", value: "other" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Brouillon", value: "draft" },
        { label: "En cours", value: "in_progress" },
        { label: "À valider", value: "review" },
        { label: "Approuvé", value: "approved" },
        { label: "Révision demandée", value: "revision_requested" },
        { label: "Livré", value: "delivered" },
      ],
    },
    { name: "description", type: "textarea" },
    {
      name: "files",
      type: "array",
      fields: [{ name: "file", type: "upload", relationTo: "media", required: true }],
    },
    { name: "previewUrl", type: "text" },
    {
      name: "adminNotes",
      type: "textarea",
      admin: { description: "Notes internes (non visibles par le client)" },
    },
    { name: "clientFeedback", type: "textarea" },
    { name: "dueDate", type: "date" },
    { name: "deliveredAt", type: "date" },
    {
      name: "priority",
      type: "select",
      defaultValue: "normal",
      options: [
        { label: "Basse", value: "low" },
        { label: "Normale", value: "normal" },
        { label: "Haute", value: "high" },
        { label: "Urgente", value: "urgent" },
      ],
    },
  ],
};
