import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { ProductForm } from "@/components/product";
import type { ProductDraft } from "@/types/product";

export function SellerOnboardingProductPage() {
  const navigate = useNavigate();

  function handleSubmit(values: ProductDraft) {
    navigate("/seller/onboarding/publish", {
      state: values,
    });
  }

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <Card variant="default" padding="lg" className="w-full max-w-lg">
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-medium text-primary">Étape 2 sur 3</span>

            <span className="text-slate-400">Premier produit</span>
          </div>

          <div
            className="h-1.5 overflow-hidden rounded-full bg-slate-100"
            aria-label="Progression : étape 2 sur 3"
          >
            <div className="h-full w-2/3 rounded-full bg-primary" />
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
            Ajoute ton premier produit
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Présente ton produit simplement. Tu pourras modifier ces
            informations plus tard.
          </p>
        </div>

        <ProductForm submitLabel="Continuer" onSubmit={handleSubmit} />
      </Card>
    </section>
  );
}
