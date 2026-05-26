"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

function CartDrawer() {
  const t = useTranslations("Cart");
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCartStore();
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const count = itemCount();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="relative inline-flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        aria-label={t("title")}
      >
        <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
            {count}
          </span>
        )}
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full flex-col border-l border-border bg-background p-0 sm:w-[420px]"
      >
        {/* Header */}
        <div className="border-b border-border px-6 py-5">
          <SheetTitle className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">
            {t("title")} ({count})
          </SheetTitle>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
            <div className="flex h-20 w-20 items-center justify-center border border-border">
              <ShoppingBag className="h-8 w-8 text-muted-foreground/30" strokeWidth={1} />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {t("empty")}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="group inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:border-foreground"
            >
              {t("continue_shopping")}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.map((item, i) => (
                <div
                  key={`${item.productId}-${item.variantSku ?? ""}`}
                  className={`flex gap-4 px-6 py-5 ${i < items.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="h-16 w-16 shrink-0 bg-surface" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{item.name}</div>
                        {item.variantSku && (
                          <div className="font-mono text-[10px] text-muted-foreground">
                            {item.variantSku}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId, item.variantSku)}
                        className="shrink-0 text-muted-foreground/40 transition-colors hover:text-foreground"
                        aria-label={t("remove")}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1, item.variantSku)
                          }
                          className="flex h-7 w-7 items-center justify-center transition-colors hover:bg-surface"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="flex h-7 w-8 items-center justify-center border-x border-border font-mono text-xs tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1, item.variantSku)
                          }
                          className="flex h-7 w-7 items-center justify-center transition-colors hover:bg-surface"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-mono text-sm tabular-nums text-accent">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border">
              {/* Coupon */}
              <div className="flex gap-2 border-b border-border px-6 py-4">
                <Input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder={t("coupon_placeholder")}
                  className="rounded-none border-border font-mono text-xs uppercase tracking-wider"
                />
                <Button
                  variant="outline"
                  className="shrink-0 rounded-none border-border font-mono text-[10px] uppercase tracking-widest"
                >
                  {t("coupon_apply")}
                </Button>
              </div>

              {/* Totals */}
              <div className="space-y-2 px-6 py-4">
                <div className="flex justify-between font-mono text-xs">
                  <span className="uppercase tracking-[0.15em] text-muted-foreground">
                    {t("subtotal")}
                  </span>
                  <span className="tabular-nums">{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>{t("total")}</span>
                  <span className="font-mono tabular-nums text-accent">
                    {formatPrice(subtotal())}
                  </span>
                </div>
              </div>

              {/* Checkout */}
              <div className="px-6 pb-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="group flex w-full items-center justify-center gap-2 bg-accent py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-foreground transition-colors hover:bg-accent-hover"
                >
                  {t("checkout")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export { CartDrawer };
