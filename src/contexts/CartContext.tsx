import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { mockCart } from "@/data/mockCart";
import { mockProducts } from "@/data/mockProducts";

import type { Cart, CartItem } from "@/types/cart";

interface CartContextValue {
  cart: Cart;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isLoading: boolean;
  error: string | null;

  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart>(mockCart);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItem = useCallback(
    async (productId: string, quantity = 1) => {
      setError(null);

      if (quantity <= 0) {
        setError("La quantité doit être supérieure à 0.");
        return;
      }

      const product = mockProducts.find((item) => item.id === productId);

      if (!product) {
        setError("Produit introuvable.");
        return;
      }

      if (!product.isAvailable) {
        setError("Ce produit n'est plus disponible.");
        return;
      }

      setIsLoading(true);

      try {
        setCart((currentCart) => {
          const existingItem = currentCart.items.find(
            (item) => item.productId === productId,
          );

          if (existingItem) {
            return {
              ...currentCart,
              items: currentCart.items.map((item) =>
                item.id === existingItem.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                    }
                  : item,
              ),
            };
          }

          const newItem: CartItem = {
            id: `cart-item-${Date.now()}`,
            cartId: currentCart.id,
            productId: product.id,
            quantity,
            state: "available",
            product: {
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
            },
          };

          return {
            ...currentCart,
            items: [...currentCart.items, newItem],
          };
        });
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      setError(null);

      if (quantity <= 0) {
        setError("La quantité doit être supérieure à 0.");
        return;
      }

      setIsLoading(true);

      try {
        setCart((currentCart) => ({
          ...currentCart,
          items: currentCart.items.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  quantity,
                }
              : item,
          ),
        }));
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const removeItem = useCallback(async (itemId: string) => {
    setError(null);
    setIsLoading(true);

    try {
      setCart((currentCart) => ({
        ...currentCart,
        items: currentCart.items.filter((item) => item.id !== itemId),
      }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      setCart((currentCart) => ({
        ...currentCart,
        items: [],
      }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const itemCount = useMemo(() => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }, [cart.items]);

  const subtotal = useMemo(() => {
    return cart.items
      .filter((item) => item.state === "available")
      .reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      );
  }, [cart.items]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      items: cart.items,
      itemCount,
      subtotal,
      isLoading,
      error,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      cart,
      itemCount,
      subtotal,
      isLoading,
      error,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider.");
  }

  return context;
}
