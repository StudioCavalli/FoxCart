import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "./store";

beforeEach(() => {
  useCartStore.setState({ items: [], couponCode: null, discountAmount: 0 });
});

describe("cart store", () => {
  it("adds an item", () => {
    useCartStore.getState().addItem({ productId: "p1", name: "Test", price: 1000 });
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0]?.quantity).toBe(1);
  });

  it("increments quantity when adding same item", () => {
    useCartStore.getState().addItem({ productId: "p1", name: "Test", price: 1000 });
    useCartStore.getState().addItem({ productId: "p1", name: "Test", price: 1000 });
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0]?.quantity).toBe(2);
  });

  it("treats different variants as different items", () => {
    useCartStore
      .getState()
      .addItem({ productId: "p1", name: "Test", price: 1000, variantSku: "A" });
    useCartStore
      .getState()
      .addItem({ productId: "p1", name: "Test", price: 1200, variantSku: "B" });
    expect(useCartStore.getState().items).toHaveLength(2);
  });

  it("removes an item", () => {
    useCartStore.getState().addItem({ productId: "p1", name: "Test", price: 1000 });
    useCartStore.getState().removeItem("p1");
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("updates quantity", () => {
    useCartStore.getState().addItem({ productId: "p1", name: "Test", price: 1000 });
    useCartStore.getState().updateQuantity("p1", 5);
    expect(useCartStore.getState().items[0]?.quantity).toBe(5);
  });

  it("removes item when quantity set to 0", () => {
    useCartStore.getState().addItem({ productId: "p1", name: "Test", price: 1000 });
    useCartStore.getState().updateQuantity("p1", 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("calculates subtotal", () => {
    useCartStore.getState().addItem({ productId: "p1", name: "A", price: 1000 });
    useCartStore.getState().addItem({ productId: "p2", name: "B", price: 2500, quantity: 3 });
    expect(useCartStore.getState().subtotal()).toBe(1000 + 2500 * 3);
  });

  it("calculates item count", () => {
    useCartStore.getState().addItem({ productId: "p1", name: "A", price: 1000, quantity: 2 });
    useCartStore.getState().addItem({ productId: "p2", name: "B", price: 500, quantity: 3 });
    expect(useCartStore.getState().itemCount()).toBe(5);
  });

  it("clears the cart", () => {
    useCartStore.getState().addItem({ productId: "p1", name: "A", price: 1000 });
    useCartStore.getState().addItem({ productId: "p2", name: "B", price: 2000 });
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
    expect(useCartStore.getState().couponCode).toBeNull();
  });

  it("applies and removes coupon", () => {
    useCartStore.getState().applyCoupon("PROMO10");
    expect(useCartStore.getState().couponCode).toBe("PROMO10");
    useCartStore.getState().removeCoupon();
    expect(useCartStore.getState().couponCode).toBeNull();
  });

  it("total equals subtotal minus discount", () => {
    useCartStore.getState().addItem({ productId: "p1", name: "A", price: 5000 });
    useCartStore.setState({ discountAmount: 500 });
    expect(useCartStore.getState().total()).toBe(4500);
  });
});
