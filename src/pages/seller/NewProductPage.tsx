import { useNavigate } from "react-router-dom";

import { ProductForm } from "@/components/product";
import type { ProductDraft } from "@/types/product";
import { Card } from "@/components/ui/card";

export function NewProductPage() {
  const navigate = useNavigate();

  function handleSubmit(values: ProductDraft) {
    console.log("Produit à créer :", values);

    // Temporaire :
    // l'appel API sera ajouté plus tard.
    navigate("/seller/products");
  }

  function handleCancel() {
    navigate("/seller/products");
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <Card variant="default" padding="lg">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Catalogue</p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Ajouter un produit
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Ajoute un produit que tes clients pourront découvrir et commander.
          </p>
        </div>

        <ProductForm
          submitLabel="Ajouter le produit"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Card>
    </div>
  );
}
