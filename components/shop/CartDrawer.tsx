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
  const { items, removeItem, updateQuantity, clearCart, subtotal, itemCount } = useCartStore();
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

      <SheetContent side="right" className="flex w-full flex-col bg-background sm:w-[420px]">
        <SheetTitle className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t("title")} ({count})
        </SheetTitle>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/30" strokeWidth={1} />
            <p className="text-sm text-muted-foreground">{t("empty")}</p>
            <Button
              variant="outline"
              className="rounded-none font-mono text-xs uppercase tracking-widest"
              onClick={() => setOpen(false)}
            >
              {t("continue_shopping")}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantSku ?? ""}`}
                    className="flex gap-4 border-b border-border pb-4"
                  >
                    {item.image && <div className="h-16 w-16 shrink-0 bg-surface" />}
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.name}</div>
                      {item.variantSku && (
                        <div className="font-mono text-[10px] text-muted-foreground">
                          {item.variantSku}
                        </div>
                      )}
                      <div className="mt-1 text-sm text-accent">{formatPrice(item.price)}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1, item.variantSku)
                          }
                          className="flex h-7 w-7 items-center justify-center border border-border transition-colors hover:bg-surface"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center font-mono text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1, item.variantSku)
                          }
                          className="flex h-7 w-7 items-center justify-center border border-border transition-colors hover:bg-surface"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.variantSku)}
                      className="self-start text-muted-foreground transition-colors hover:text-destructive"
                      aria-label={t("remove")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div className="flex gap-2 border-t border-border pt-4">
              <Input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder={t("coupon_placeholder")}
                className="rounded-none border-border font-mono text-xs"
              />
              <Button variant="outline" className="shrink-0 rounded-none font-mono text-xs">
                {t("coupon_apply")}
              </Button>
            </div>

            {/* Totals */}
            <div className="space-y-2 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("subtotal")}</span>
                <span className="font-mono tabular-nums">{formatPrice(subtotal())}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>{t("total")}</span>
                <span className="font-mono tabular-nums text-accent">
                  {formatPrice(subtotal())}
                </span>
              </div>
            </div>

            {/* Checkout */}
            <Button
              className="group w-full gap-2 rounded-none bg-accent text-accent-foreground hover:bg-accent-hover"
              onClick={() => setOpen(false)}
            >
              {t("checkout")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export { CartDrawer };
