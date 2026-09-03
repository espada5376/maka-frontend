
export type CartItemState =
  | "available"
  | "unavailable";

export interface CartProduct {
  name: string;
  price: number;
  imageUrl?: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  state: CartItemState;
  product: CartProduct;
}

export interface Cart {
  id: string;
  sessionId: string;
  items: CartItem[];
}

