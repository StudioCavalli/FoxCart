import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  fields: [
    {
      name: "header",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true, localized: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "footerGroups",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true, localized: true },
        {
          name: "links",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true, localized: true },
            { name: "href", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "cta",
      type: "group",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          localized: true,
          defaultValue: "Devis gratuit",
        },
        { name: "href", type: "text", required: true, defaultValue: "/quote" },
      ],
    },
  ],
};
