import { RouterProvider } from "react-router-dom";

import { IdentityProvider } from "@/contexts/IdentityContext";
import { CartProvider } from "@/contexts/CartContext";

import { router } from "./router";

export function App() {
  return (
    <IdentityProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </IdentityProvider>
  );
}
