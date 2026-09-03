import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { ProductDraft } from "@/types/product";

export function SellerOnboardingPublishPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isPublishing, setIsPublishing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const draft = location.state as ProductDraft | null;

  useEffect(() => {
    if (!draft?.image) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(draft.image);

    setImagePreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [draft?.image]);

  function handlePublish() {
    if (!draft) {
      navigate("/seller/onboarding/first-product", {
        replace: true,
      });

      return;
    }

    setIsPublishing(true);

    // Publication temporaire.
    // Le branchement API sera ajouté ultérieurement.
    window.setTimeout(() => {
      setIsPublishing(false);

      navigate("/seller/onboarding/success", {
        replace: true,
        state: {
          publishedProduct: {
            name: draft.name,
            price: Number(draft.price),
          },
        },
      });
    }, 800);
  }

  function handleBack() {
    navigate("/seller/onboarding/first-product", {
      state: draft,
    });
  }

  if (!draft) {
    return (
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
        <Card
          variant="default"
          padding="lg"
          className="w-full max-w-lg text-center"
        >
          <h1 className="text-xl font-bold text-slate-900">
            Produit introuvable
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Reviens à l'étape précédente pour ajouter ton produit.
          </p>

          <div className="mt-6">
            <Button
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => navigate("/seller/onboarding/first-product")}
            >
              Ajouter mon produit
            </Button>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <Card variant="default" padding="lg" className="w-full max-w-lg">
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-medium text-primary">Étape 3 sur 3</span>

            <span className="text-slate-400">Publication</span>
          </div>

          <div
            className="h-1.5 overflow-hidden rounded-full bg-slate-100"
            aria-label="Progression : étape 3 sur 3"
          >
            <div className="h-full w-full rounded-full bg-primary" />
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
            Ton produit est prêt
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Vérifie les informations avant de mettre ton produit en ligne.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="aspect-square w-full overflow-hidden bg-slate-100">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt={draft.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                Image indisponible
              </div>
            )}
          </div>

          <div className="space-y-4 p-5">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {draft.name}
              </h2>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {Number(draft.price).toLocaleString("fr-FR")} FCFA
              </p>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <p className="text-sm leading-6 text-slate-600">
                {draft.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            loading={isPublishing}
            disabled={isPublishing}
            onClick={handlePublish}
          >
            Publier le produit
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="md"
            fullWidth
            disabled={isPublishing}
            onClick={handleBack}
          >
            Modifier
          </Button>
        </div>
      </Card>
    </section>
  );
}
