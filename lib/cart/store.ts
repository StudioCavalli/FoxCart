"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartActions, CartItem, CartState } from "./types";

function matchItem(a: CartItem, productId: string, variantSku?: string) {
  return a.productId === productId && a.variantSku === variantSku;
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discountAmount: 0,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => matchItem(i, item.productId, item.variantSku));
          if (existing) {
            return {
              items: state.items.map((i) =>
                matchItem(i, item.productId, item.variantSku)
                  ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: item.quantity ?? 1 }] };
        });
      },

      removeItem: (productId, variantSku) => {
        set((state) => ({
          items: state.items.filter((i) => !matchItem(i, productId, variantSku)),
        }));
      },

      updateQuantity: (productId, quantity, variantSku) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantSku);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            matchItem(i, productId, variantSku) ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: null, discountAmount: 0 }),

      applyCoupon: (code) => {
        set({ couponCode: code, discountAmount: 0 });
      },

      removeCoupon: () => set({ couponCode: null, discountAmount: 0 }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      total: () => get().subtotal() - get().discountAmount,
    }),
    { name: "foxcart-cart" },
  ),
);
