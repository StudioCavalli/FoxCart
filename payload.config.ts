import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { BlogPosts } from "./cms/collections/BlogPosts";
import { Coupons } from "./cms/collections/Coupons";
import { Customers } from "./cms/collections/Customers";
import { Deliverables } from "./cms/collections/Deliverables";
import { Media } from "./cms/collections/Media";
import { Orders } from "./cms/collections/Orders";
import { Pages } from "./cms/collections/Pages";
import { ProductCategories } from "./cms/collections/ProductCategories";
import { Products } from "./cms/collections/Products";
import { Quotes } from "./cms/collections/Quotes";
import { Reviews } from "./cms/collections/Reviews";
import { ServiceCategories } from "./cms/collections/ServiceCategories";
import { Services } from "./cms/collections/Services";
import { Subscriptions } from "./cms/collections/Subscriptions";
import { Testimonials } from "./cms/collections/Testimonials";
import { Users } from "./cms/collections/Users";
import { Navigation } from "./cms/globals/Navigation";
import { Settings } from "./cms/globals/Settings";
import { ShopSettings } from "./cms/globals/ShopSettings";

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
    Users,
    Media,
    ServiceCategories,
    Services,
    ProductCategories,
    Products,
    Customers,
    Orders,
    Coupons,
    Quotes,
    Reviews,
    Subscriptions,
    Deliverables,
    Testimonials,
    BlogPosts,
    Pages,
  ],

  globals: [Settings, Navigation, ShopSettings],

  localization: {
    locales: [
      { label: "Francais", code: "fr" },
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
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
});
