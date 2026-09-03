import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ProductForm } from "@/components/product";
import { Card } from "@/components/ui/card";

import { mockProducts } from "@/data/mockProducts";
import type { ProductDraft } from "@/types/product";

export function EditProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{
    productId: string;
  }>();

  const product = useMemo(() => {
    return mockProducts.find((item) => item.id === productId);
  }, [productId]);

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        <Card variant="default" padding="lg" className="text-center">
          <h1 className="text-xl font-bold text-slate-900">
            Produit introuvable
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Le produit que tu souhaites modifier n'existe pas ou n'est plus
            disponible.
          </p>

          <button
            type="button"
            onClick={() => navigate("/seller/products")}
            className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Retour aux produits
          </button>
        </Card>
      </div>
    );
  }

  const initialValues: Partial<ProductDraft> = {
    image: null,
    name: product.name,
    price: String(product.price),
    description: product.description ?? "",
  };

  function handleSubmit(values: ProductDraft) {
    console.log("Produit modifié :", {
      productId: product?.id,
      ...values,
    });

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
            Modifier le produit
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Mets à jour les informations de ton produit. Tu pourras les modifier
            à nouveau plus tard.
          </p>
        </div>

        <ProductForm
          initialValues={initialValues}
          initialImagePreview={product.imageUrl}
          submitLabel="Enregistrer les modifications"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Card>
    </div>
  );
}
