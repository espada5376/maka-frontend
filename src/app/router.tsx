import { createBrowserRouter, Navigate } from "react-router-dom";

import { LandingPage } from "@/pages/LandingPage";
import { FeedPage } from "@/pages/FeedPage";
import { ProductPage } from "@/pages/products/ProductPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { CheckoutSuccessPage } from "@/pages/CheckoutSuccessPage";
import { CartPage } from "@/pages/CartPage";

import { SearchPage } from "@/pages/SearchPage";

import { NotificationsPage } from "@/pages/NotificationsPage";

import { AccountLoginPage } from "@/pages/AccountLoginPage";
import { AccountCreatePage } from "@/pages/AccountCreatePage";
import { AccountVerifyPage } from "@/pages/AccountVerifyPage";

import { SellPage } from "@/pages/SellPage";

import { OrdersPage } from "@/pages/OrdersPage";
import { OrderDetailPage } from "@/pages/OrderDetailPage";

import { SellerDashboardPage } from "@/pages/seller/SellerDashboardPage";
import { SellerProductsPage } from "@/pages/seller/SellerProductsPage";
import { NewProductPage } from "@/pages/seller/NewProductPage";
import { EditProductPage } from "@/pages/seller/EditProductPage";

import { SellerOnboardingSuccessPage } from "@/pages/seller/SellerOnboardingSuccessPage";
import { SellerOnboardingStorePage } from "@/pages/seller/SellerOnboardingStorePage";
import { SellerOnboardingProductPage } from "@/pages/seller/SellerOnboardingProductPage";
import { SellerOnboardingPublishPage } from "@/pages/seller/SellerOnboardingPublishPage";

import { PublicLayout } from "@/layouts/PublicLayout";
import { SellerLayout } from "@/layouts/SellerLayout";

import { IdentityGate } from "@/guards/IdentityGate";
import { AccountGuard } from "@/guards/AccountGuard";
import { SellerGuard } from "@/guards/SellerGuard";

export const router = createBrowserRouter([
  /*
   * Public
   */
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/landing",
        element: <LandingPage />,
      },

{
  path: "/search",
  element: <SearchPage />,
},

{
  path: "/notifications",
  element: <NotificationsPage />,
},
      {
        path: "/",
        element: <Navigate to="/feed" replace />,
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
        path: "/cart",
        element: <CartPage />,
      },

      /*
       * Checkout
       */

      {
        path: "/checkout",
        element: <CheckoutPage />,
      },

      {
        path: "/order/:productId",
        element: <CheckoutPage />,
      },

      {
        path: "/checkout/success",
        element: <CheckoutSuccessPage />,
      },

      /*
       * Identity
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
        path: "/profile",
        element: <div>Profile</div>,
      },

      /*
       * Seller acquisition
       */

      {
        path: "/sell",
        element: <SellPage />,
      },

      /*
       * Buyer orders
       */

      {
        element: <IdentityGate purpose="view_orders" />,
        children: [
          {
            path: "/orders",
            element: <OrdersPage />,
          },

          {
            path: "/orders/:orderId",
            element: <OrderDetailPage />,
          },
        ],
      },
    ],
  },

  /*
   * Seller
   */

  {
    element: <AccountGuard />,
    children: [
      /*
       * Seller onboarding
       */

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
        path: "/seller/onboarding/success",
        element: <SellerOnboardingSuccessPage />,
      },

      /*
       * Seller application
       */

      {
        element: <SellerGuard />,
        children: [
          {
            element: <SellerLayout />,
            children: [
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
