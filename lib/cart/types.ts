export interface CartItem {
  productId: string;
  variantSku?: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discountAmount: number;
}

export interface CartActions {
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, variantSku?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantSku?: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  itemCount: () => number;
  subtotal: () => number;
  total: () => number;
}
