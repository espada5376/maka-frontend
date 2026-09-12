import { RouterProvider } from "react-router-dom";

import { IdentityProvider } from "@/contexts/IdentityContext";
import { CartProvider } from "@/contexts/CartContext";
import { NotificationProvider } from "@/contexts/NotificationContext";

import { router } from "./router";

export function App() {
  return (
    <IdentityProvider>
      <CartProvider>
         <NotificationProvider>
          <RouterProvider router={router} />
         </NotificationProvider>
      </CartProvider>
    </IdentityProvider>
  );
}
