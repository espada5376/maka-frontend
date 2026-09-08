import { ArrowLeft, ShoppingCart, Truck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { SellerCard } from "@/components/seller";
import { useCart } from "@/contexts/CartContext";
import { mockProducts } from "@/data/mockProducts";

export function ProductPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const { addItem, isLoading } = useCart();

  const product = mockProducts.find((item) => item.slug === slug);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900">
          Produit introuvable
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Ce produit n'existe pas ou n'est plus disponible.
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

  const formattedPrice = product.price.toLocaleString("fr-FR");

  const handleOrder = () => {
    if (!product.isAvailable) return;

    navigate(`/order/${product.id}`);
  };

  const handleAddToCart = async () => {
    if (!product.isAvailable) return;

    await addItem(product.id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:h-16 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Retour"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary "
          >
            <ArrowLeft size={20} />
          </button>

          <span className="ml-2 text-lg font-semibold text-gray-900">
            Produit
          </span>
        </div>
      </header>

      {/* Product */}
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-4 sm:px-6 sm:pb-10 sm:pt-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-start lg:gap-10">
          {/* Image */}
          <div className="overflow-hidden rounded-xl bg-gray-100">
            <div className="aspect-square w-full">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  Image indisponible
                </div>
              )}
            </div>
          </div>

          {/* Information */}
          <div className="flex flex-col">
            <div>
              <h1 className="text-2xl font-bold leading-8 text-gray-900 sm:text-3xl">
                {product.name}
              </h1>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {formattedPrice} FCFA
              </p>
            </div>

            {/* Availability */}
            <div className="mt-4">
              {product.isAvailable ? (
                <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                  Disponible
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-500">
                  Rupture de stock
                </span>
              )}
            </div>

            {/* Seller */}
            <div className="mt-8 border-t border-border pt-6">
              <p className="mb-3 text-sm font-medium text-gray-500">
                Vendu par
              </p>

              <SellerCard seller={product.seller} />
            </div>

            {/* Delivery */}
            <div className="mt-6 border-t border-border pt-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <Truck size={18} className="text-gray-700" />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Livraison disponible
                  </p>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Les informations de livraison seront précisées lors de la
                    commande.
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="mt-8 hidden gap-3 sm:flex">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.isAvailable || isLoading}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-primary px-6 text-base font-semibold text-primary transition-colors hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
              >
                <ShoppingCart size={18} />

                {isLoading ? "Ajout..." : "Ajouter au panier"}
              </button>

              <button
                type="button"
                onClick={handleOrder}
                disabled={!product.isAvailable}
                className="flex h-12 flex-1 items-center justify-center rounded-lg bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
              >
                {product.isAvailable ? "Commander" : "Indisponible"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-white/95 p-4 backdrop-blur sm:hidden">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.isAvailable || isLoading}
            aria-label="Ajouter au panier"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-primary text-primary transition-colors hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
          >
            <ShoppingCart size={20} />
          </button>

          <button
            type="button"
            onClick={handleOrder}
            disabled={!product.isAvailable}
            className="flex h-12 flex-1 items-center justify-center rounded-lg bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
          >
            {product.isAvailable ? "Commander" : "Indisponible"}
          </button>
        </div>
      </div>
    </div>
  );
}
