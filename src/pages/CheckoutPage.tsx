import { ArrowLeft, MapPin, Phone, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useCart } from "@/contexts/CartContext";
import { mockProducts } from "@/data/mockProducts";

import type { Order, OrderItem } from "@/types/order";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const { items: cartItems, subtotal: cartSubtotal } = useCart();

  const isDirectPurchase = Boolean(productId);

  const directProduct = isDirectPurchase
    ? mockProducts.find((item) => item.id === productId)
    : undefined;

  const availableCartItems = cartItems.filter(
    (item) => item.state === "available",
  );

  /*
   * Achat direct : /order/:productId
   */
  if (isDirectPurchase && !directProduct) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900">
          Produit introuvable
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Impossible de préparer cette commande.
        </p>

        <button
          type="button"
          onClick={() => navigate("/feed")}
          className="mt-6 h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Retour aux produits
        </button>
      </div>
    );
  }

  /*
   * Achat depuis le panier : /checkout
   */
  if (!isDirectPurchase && availableCartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900">
          Aucun article à commander
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Ton panier ne contient aucun article disponible.
        </p>

        <button
          type="button"
          onClick={() => navigate("/cart")}
          className="mt-6 h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Retour au panier
        </button>
      </div>
    );
  }

  const directSubtotal = directProduct?.price ?? 0;

  const subtotal = isDirectPurchase ? directSubtotal : cartSubtotal;

  /*
   * Construit les OrderItem à partir de la source du checkout.
   */
  const buildOrderItems = (): OrderItem[] => {
    if (isDirectPurchase && directProduct) {
      return [
        {
          id: `order-item-${directProduct.id}`,
          productId: directProduct.id,
          name: directProduct.name,
          price: directProduct.price,
          quantity: 1,
          imageUrl: directProduct.imageUrl,
          sellerName: directProduct.seller.name,
        },
      ];
    }

    return availableCartItems.map((item) => {
      const product = mockProducts.find(
        (mockProduct) => mockProduct.id === item.productId,
      );

      return {
        id: `order-item-${item.id}`,
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl,
        sellerName: product?.seller.name ?? "Vendeur Maka",
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const orderItems = buildOrderItems();

    /*
     * Pour le MVP frontend, la livraison reste temporairement
     * à 0 FCFA. Cela ne signifie pas que la livraison est gratuite :
     * la règle métier sera définie lors de l'intégration backend.
     */
    const deliveryFee = 0;

    const order: Order = {
      id: `order-${Date.now()}`,
      number: `MK-2026-${String(Date.now()).slice(-4)}`,
      status: "confirmed",
      items: orderItems,
      customer: {
        name: "Client Maka",
        phone: "+228 90 00 00 00",
        address: "Adresse de livraison",
      },
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      createdAt: new Date().toISOString(),
    };

    navigate("/checkout/success", {
      state: {
        order,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center px-4 sm:h-16 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Retour"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="ml-2">
            <h1 className="text-lg font-semibold text-gray-900">
              Finaliser la commande
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Articles */}
          <section className="rounded-xl border border-border bg-white p-4 sm:p-6">
            <h2 className="text-base font-semibold text-gray-900">
              Ta commande
            </h2>

            <div className="mt-5 divide-y divide-border">
              {buildOrderItems().map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {item.quantity} × {item.price.toLocaleString("fr-FR")}{" "}
                      FCFA
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-gray-900">
                    {(item.price * item.quantity).toLocaleString("fr-FR")} FCFA
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Informations client */}
          <section className="rounded-xl border border-border bg-white p-4 sm:p-6">
            <h2 className="text-base font-semibold text-gray-900">
              Tes informations
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Nom complet
                </label>

                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue="Client Maka"
                    required
                    className="h-12 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Numéro de téléphone
                </label>

                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue="+228 90 00 00 00"
                    required
                    className="h-12 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Adresse de livraison
                </label>

                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={18}
                  />

                  <textarea
                    id="address"
                    name="address"
                    defaultValue="Adresse de livraison"
                    required
                    rows={3}
                    className="w-full resize-none rounded-lg border border-border bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Résumé */}
          <section className="rounded-xl border border-border bg-white p-4 sm:p-6">
            <h2 className="text-base font-semibold text-gray-900">Résumé</h2>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Sous-total</span>

                <span className="font-medium text-gray-900">
                  {subtotal.toLocaleString("fr-FR")} FCFA
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Livraison</span>

                <span className="font-medium text-gray-900">À définir</span>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Total</span>

                  <span className="text-lg font-bold text-gray-900">
                    {subtotal.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <button
            type="submit"
            className="h-12 w-full rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Confirmer la commande
          </button>
        </form>
      </main>
    </div>
  );
}
