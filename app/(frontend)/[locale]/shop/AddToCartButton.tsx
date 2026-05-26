"use client";

import { useCartStore } from "@/lib/cart";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export function AddToCartButton({
  productId,
  name,
  price,
  variantSku,
}: {
  productId: string;
  name: string;
  price: number;
  variantSku?: string;
}) {
  const t = useTranslations("Shop");
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      type="button"
      onClick={() => addItem({ productId, name, price, variantSku })}
      className="group flex w-full items-center justify-center gap-2 border border-border py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:border-foreground"
    >
      <Plus className="h-3 w-3" />
      {t("add_to_cart")}
    </button>
  );
}
