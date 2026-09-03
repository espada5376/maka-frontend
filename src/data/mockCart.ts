
import { mockProducts } from "@/data/mockProducts";

import type { Cart } from "@/types/cart";

export const mockCart: Cart = {
  id: "cart-1",
  sessionId: "session-demo",
  items: [
    {
      id: "cart-item-1",
      cartId: "cart-1",
      productId: "1",
      quantity: 2,
      state: "available",
      product: {
        name: mockProducts[0].name,
        price: mockProducts[0].price,
        imageUrl: mockProducts[0].imageUrl,
      },
    },
    {
      id: "cart-item-2",
      cartId: "cart-1",
      productId: "2",
      quantity: 1,
      state: "available",
      product: {
        name: mockProducts[1].name,
        price: mockProducts[1].price,
        imageUrl: mockProducts[1].imageUrl,
      },
    },
  ],
};

