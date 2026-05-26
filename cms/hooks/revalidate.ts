import { revalidateTag } from "next/cache";
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from "payload";

export const revalidateCollection =
  (tag: string): CollectionAfterChangeHook =>
  ({ doc }) => {
    revalidateTag(tag, { expire: 0 });
    if (doc?.slug) {
      revalidateTag(`${tag}-${doc.slug}`, { expire: 0 });
    }
    return doc;
  };

export const revalidateGlobal =
  (tag: string): GlobalAfterChangeHook =>
  ({ doc }) => {
    revalidateTag(tag, { expire: 0 });
    return doc;
  };
