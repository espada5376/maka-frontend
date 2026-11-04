import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { CartItem, CartSummary } from "@/components/cart";

import { useCart } from "@/contexts/CartContext";

export function CartPage() {
  const navigate = useNavigate();
  const { items, error, clearCart } = useCart();

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <Link
            to="/feed"
            aria-label="Retour"
            className="flex h-10 w-10 items-center justify-center rounded-ful bg-white text-slate-700 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">Mon panier</h1>

            <p className="mt-1 text-sm text-slate-500">
              Vérifie tes articles avant de passer commande.
            </p>
          </div>
        </div>

        {/* Erreur */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Panier vide */}
        {isEmpty ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <ShoppingBag className="h-7 w-7 text-slate-400" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Ton panier est vide
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Découvre les produits disponibles et ajoute ceux qui t'intéressent
              à ton panier.
            </p>

            <Button
              size="lg"
              className="mt-6"
              onClick={() => navigate("/feed")}
            >
              Découvrir les produits
            </Button>
          </div>
        ) : (
          <>
            {/* Actions */}
            <div className="mb-4 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => void clearCart()}
              >
                Vider le panier
              </Button>
            </div>

            {/* Contenu */}
            <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
              {/* Articles */}
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Résumé */}
              <div className="lg:sticky lg:top-24">
                <CartSummary />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
