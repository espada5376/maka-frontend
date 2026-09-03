import { Check, ExternalLink, Share2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PublishedProduct {
  id?: string;
  slug?: string;
  name: string;
  price: number;
}

interface SellerOnboardingSuccessState {
  publishedProduct: PublishedProduct;
}

export function SellerOnboardingSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as SellerOnboardingSuccessState | null;

  const product = state?.publishedProduct;

  function handleViewProduct() {
    if (!product?.slug) {
      return;
    }

    navigate(`/p/${product.slug}`);
  }

  async function handleShare() {
    if (!product) {
      return;
    }

    const productUrl = product.slug
      ? `${window.location.origin}/p/${product.slug}`
      : window.location.href;

    const shareData = {
      title: product.name,
      text: `Découvre ${product.name} sur Maka.`,
      url: productUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // L'utilisateur peut simplement avoir fermé
        // la fenêtre de partage.
      }

      return;
    }

    try {
      await navigator.clipboard.writeText(productUrl);
    } catch {
      // Le partage ou la copie peut être indisponible
      // selon le navigateur.
    }
  }

  function handleDashboard() {
    navigate("/seller", {
      replace: true,
    });
  }

  if (!product) {
    return (
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
        <Card
          variant="default"
          padding="lg"
          className="w-full max-w-lg text-center"
        >
          <h1 className="text-xl font-bold text-slate-900">
            Publication introuvable
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Ton produit semble avoir été publié, mais nous ne pouvons pas
            afficher son récapitulatif.
          </p>

          <div className="mt-6">
            <Button
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleDashboard}
            >
              Aller à mon espace vendeur
            </Button>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <Card variant="default" padding="lg" className="w-full max-w-lg">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
            <Check className="h-7 w-7 text-green-600" />
          </div>

          <p className="mt-5 text-sm font-semibold text-primary">
            Produit publié
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {product.name} est en ligne.
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            Ton produit peut maintenant être découvert et commandé par tes
            clients.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-500">Prix</span>

            <span className="text-base font-bold text-slate-900">
              {product.price.toLocaleString("fr-FR")} FCFA
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
            Partager le produit
          </Button>

          {product.slug && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              fullWidth
              onClick={handleViewProduct}
            >
              <ExternalLink className="h-5 w-5" />
              Voir le produit
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            size="md"
            fullWidth
            onClick={handleDashboard}
          >
            Aller à mon espace vendeur
          </Button>
        </div>
      </Card>
    </section>
  );
}
