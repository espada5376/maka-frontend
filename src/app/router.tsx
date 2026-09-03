import { createBrowserRouter } from "react-router-dom";

import { LandingPage } from "@/pages/LandingPage";
import { FeedPage } from "@/pages/FeedPage";
import { ProductPage } from "@/pages/products/ProductPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { AccountLoginPage } from "@/pages/AccountLoginPage";

import { CartPage } from "@/pages/CartPage";
 
import { SellPage } from "@/pages/SellPage";

import { AccountCreatePage } from "@/pages/AccountCreatePage";
import { AccountVerifyPage } from "@/pages/AccountVerifyPage";

import { SellerProductsPage } from "@/pages/seller/SellerProductsPage";

import { SellerOnboardingSuccessPage } from "@/pages/seller/SellerOnboardingSuccessPage";
import { SellerOnboardingStorePage } from "@/pages/seller/SellerOnboardingStorePage";
import { SellerOnboardingProductPage } from "@/pages/seller/SellerOnboardingProductPage";
import { SellerOnboardingPublishPage } from "@/pages/seller/SellerOnboardingPublishPage";
import { EditProductPage } from "@/pages/seller/EditProductPage";
import { NewProductPage } from "@/pages/seller/NewProductPage";

import { PublicLayout } from "@/layouts/PublicLayout";
import { SellerLayout } from "@/layouts/SellerLayout";

import { IdentityGate } from "@/guards/IdentityGate";
import { AccountGuard } from "@/guards/AccountGuard";
import { SellerGuard } from "@/guards/SellerGuard";
import { SellerDashboardPage } from "@/pages/seller/SellerDashboardPage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/landing",
        element: <LandingPage />,
      },

{
  path: "/cart",
  element: <CartPage />,
},

      {
        path: "/",
        element: <FeedPage />,
      },

      {
        path: "/feed",
        element: <FeedPage />,
      },

      {
        path: "/p/:slug",
        element: <ProductPage />,
      },

      {
        path: "/order/:productId",
        element: <CheckoutPage />,
      },

      /*
       * Routes identité
       */

      {
        path: "/account/create",
        element: <AccountCreatePage />,
      },

      {
        path: "/account/login",
        element: <AccountLoginPage />,
      },

      {
        path: "/account/verify",
        element: <AccountVerifyPage />,
      },

      {
        path: "/account/create",
        element: <AccountCreatePage />,
      },

      {
        path: "/profile",
        element: <div>Profile</div>,
      },

      /*
       * Parcours vendeur
       */

      {
        path: "/sell",
        element: <SellPage />,
      },

      /*
       * Commandes acheteur
       */

      {
        element: <IdentityGate purpose="view_orders" />,
        children: [
          {
            path: "/orders",
            element: <div>Orders</div>,
          },

          {
            path: "/orders/:orderId",
            element: <div>Order detail</div>,
          },
        ],
      },
    ],
  },

  /*
   * Espace vendeur
   */

  {
    element: <AccountGuard />,
    children: [
      {
        path: "/seller/onboarding/success",
        element: <SellerOnboardingSuccessPage />,
      },
      {
        path: "/seller/onboarding/store",
        element: <SellerOnboardingStorePage />,
      },
      {
        path: "/seller/onboarding/first-product",
        element: <SellerOnboardingProductPage />,
      },
      {
        path: "/seller/onboarding/publish",
        element: <SellerOnboardingPublishPage />,
      },

      {
        element: <SellerGuard />,
        children: [
          {
            element: <SellerLayout />,
            children: [
              { path: "/seller/products", element: <SellerProductsPage /> },
              { path: "/seller/products/new", element: <NewProductPage /> },
              {
                path: "/seller",
                element: <SellerDashboardPage />,
              },

              {
                path: "/seller/products",
                element: <SellerProductsPage />,
              },

              {
                path: "/seller/products/new",
                element: <NewProductPage />,
              },

              {
                path: "/seller/products/:productId/edit",
                element: <EditProductPage />,
              },

              {
                path: "/seller/orders",
                element: <div>Seller Orders</div>,
              },

              {
                path: "/seller/orders/:orderId",
                element: <div>Seller Order Detail</div>,
              },

              {
                path: "/seller/store",
                element: <div>Seller Store</div>,
              },

              {
                path: "/seller/store/settings",
                element: <div>Store Settings</div>,
              },

              {
                path: "/seller/analytics",
                element: <div>Seller Analytics</div>,
              },

              {
                path: "/seller/settings",
                element: <div>Seller Settings</div>,
              },
            ],
          },
        ],
      },
    ],
  },
]);
