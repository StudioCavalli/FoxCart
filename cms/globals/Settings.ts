import type { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
  slug: "settings",
  fields: [
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text", defaultValue: "FoxCase — Agence digitale" },
        { name: "description", type: "textarea" },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "contact",
      type: "group",
      fields: [
        { name: "email", type: "email", defaultValue: "contact@foxcase.fr" },
        { name: "phone", type: "text" },
        { name: "address", type: "textarea" },
      ],
    },
    {
      name: "social",
      type: "array",
      fields: [
        { name: "platform", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },
    { name: "labUrl", type: "text", defaultValue: "https://studio.foxcase.fr" },
    { name: "logo", type: "upload", relationTo: "media" },
  ],
};
