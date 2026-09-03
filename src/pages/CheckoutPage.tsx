import { ArrowLeft, MapPin, Phone, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import type { Product } from "@/components/product";

const mockProducts: Product[] = [
  {
    id: "1",
    slug: "robe-elegante",
    name: "Robe élégante",
    price: 15000,
    imageUrl:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
    seller: {
      id: "seller-1",
      name: "Boutique Nova",
      username: "boutiquenova",
      isVerified: true,
    },
    isAvailable: true,
  },
  {
    id: "2",
    slug: "sac-a-main",
    name: "Sac à main tendance",
    price: 12000,
    imageUrl:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    seller: {
      id: "seller-2",
      name: "Style House",
      username: "stylehouse",
    },
    isAvailable: true,
  },
  {
    id: "3",
    slug: "ensemble-femme",
    name: "Ensemble femme",
    price: 18000,
    imageUrl:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    seller: {
      id: "seller-3",
      name: "Fashion Lomé",
      username: "fashionlome",
      isVerified: true,
    },
    isAvailable: true,
  },
  {
    id: "4",
    slug: "chaussures-femme",
    name: "Chaussures femme",
    price: 10000,
    imageUrl:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    seller: {
      id: "seller-4",
      name: "Chic Store",
      username: "chicstore",
    },
    isAvailable: false,
  },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const product = mockProducts.find((item) => item.id === productId);

  if (!product) {
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

  const formattedPrice = product.price.toLocaleString("fr-FR");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Pour le moment, aucune requête API.
    // On simulera simplement la confirmation.
    navigate(`/order/${product.id}/success`);
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

          <h1 className="ml-2 text-lg font-semibold text-gray-900">
            Votre commande
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product summary */}
          <section className="rounded-xl border border-border bg-white p-4 sm:p-5">
            <h2 className="text-base font-semibold text-gray-900">
              Produit
            </h2>

            <div className="mt-4 flex gap-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">
                    Image
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-gray-900">
                  {product.name}
                </h3>

                <p className="mt-1 text-base font-bold text-gray-900">
                  {formattedPrice} FCFA
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Vendu par {product.seller.name}
                </p>
              </div>
            </div>
          </section>

          {/* Customer information */}
          <section className="rounded-xl border border-border bg-white p-4 sm:p-5">
            <h2 className="text-base font-semibold text-gray-900">
              Vos informations
            </h2>

            <div className="mt-5 space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Nom
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Votre nom"
                    className="h-12 w-full rounded-lg border border-border bg-white pl-11 pr-4 text-base text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Téléphone
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+228 90 00 00 00"
                    className="h-12 w-full rounded-lg border border-border bg-white pl-11 pr-4 text-base text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Delivery */}
          <section className="rounded-xl border border-border bg-white p-4 sm:p-5">
            <h2 className="text-base font-semibold text-gray-900">
              Livraison
            </h2>

            <div className="mt-5">
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Adresse de livraison
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="pointer-events-none absolute left-4 top-4 text-gray-400"
                />

                <textarea
                  id="address"
                  name="address"
                  required
                  rows={4}
                  placeholder="Ex. Agoè, près du marché..."
                  className="w-full resize-none rounded-lg border border-border bg-white py-3 pl-11 pr-4 text-base text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Indique une adresse suffisamment précise pour faciliter la
                livraison.
              </p>
            </div>
          </section>

          {/* Total */}
          <section className="rounded-xl border border-border bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Produit
              </span>

              <span className="text-sm font-medium text-gray-900">
                {formattedPrice} FCFA
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="text-base font-semibold text-gray-900">
                Total
              </span>

              <span className="text-xl font-bold text-gray-900">
                {formattedPrice} FCFA
              </span>
            </div>
          </section>

          {/* CTA */}
          <button
            type="submit"
            disabled={!product.isAvailable}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
          >
            {product.isAvailable
              ? "Confirmer la commande"
              : "Produit indisponible"}
          </button>
        </form>
      </main>
    </div>
  );
}
