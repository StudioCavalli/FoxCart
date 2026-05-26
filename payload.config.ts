import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),

  collections: [
    {
      slug: "users",
      auth: true,
      fields: [
        {
          name: "role",
          type: "select",
          defaultValue: "editor",
          options: [
            { label: "Admin", value: "admin" },
            { label: "Editor", value: "editor" },
          ],
        },
      ],
    },
    {
      slug: "media",
      upload: {
        mimeTypes: ["image/*", "application/pdf"],
      },
      fields: [
        {
          name: "alt",
          type: "text",
          localized: true,
        },
      ],
    },
  ],

  globals: [],

  localization: {
    locales: [
      { label: "Français", code: "fr" },
      { label: "English", code: "en" },
    ],
    defaultLocale: "fr",
    fallback: true,
  },

  secret: process.env.PAYLOAD_SECRET || "CHANGE-ME-IN-PRODUCTION-MIN-32-CHARS",

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
});
