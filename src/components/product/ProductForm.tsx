import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/ui/image-uploader";

import type { ProductDraft } from "@/types/product";

interface ProductFormProps {
  initialValues?: Partial<ProductDraft>;
  initialImagePreview?: string;

  submitLabel?: string;
  loading?: boolean;

  onSubmit: (values: ProductDraft) => void;
  onCancel?: () => void;
}

interface ProductFormErrors {
  image: string;
  name: string;
  price: string;
  description: string;
}

const emptyErrors: ProductFormErrors = {
  image: "",
  name: "",
  price: "",
  description: "",
};

export function ProductForm({
  initialValues,
  initialImagePreview,
  submitLabel = "Continuer",
  loading = false,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [image, setImage] = useState<File | null>(initialValues?.image ?? null);

  const [name, setName] = useState(initialValues?.name ?? "");

  const [price, setPrice] = useState(initialValues?.price ?? "");

  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );

  const [errors, setErrors] = useState<ProductFormErrors>(emptyErrors);

  useEffect(() => {
    setImage(initialValues?.image ?? null);
    setName(initialValues?.name ?? "");
    setPrice(initialValues?.price ?? "");
    setDescription(initialValues?.description ?? "");
  }, [initialValues]);

  function clearError(field: keyof ProductFormErrors) {
    setErrors((current) => ({
      ...current,
      [field]: "",
    }));
  }

  function validate() {
    const nextErrors: ProductFormErrors = {
      image: "",
      name: "",
      price: "",
      description: "",
    };

    let hasError = false;

    if (!image && !initialImagePreview) {
      nextErrors.image = "Ajoute une photo du produit.";
      hasError = true;
    }

    if (!name.trim()) {
      nextErrors.name = "Entre le nom du produit.";
      hasError = true;
    }

    if (!price.trim()) {
      nextErrors.price = "Entre le prix du produit.";
      hasError = true;
    } else {
      const numericPrice = Number(price);

      if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
        nextErrors.price = "Entre un prix valide.";
        hasError = true;
      }
    }

    if (!description.trim()) {
      nextErrors.description = "Ajoute une courte description du produit.";
      hasError = true;
    }

    setErrors(nextErrors);

    return !hasError;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      image,
      name: name.trim(),
      price: price.trim(),
      description: description.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <ImageUploader
        value={image}
        initialPreview={initialImagePreview}
        onChange={(file) => {
          setImage(file);
          clearError("image");
        }}
        error={errors.image}
        disabled={loading}
      />

      <Input
        id="product-name"
        label="Nom du produit"
        type="text"
        placeholder="Ex. Robe élégante"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          clearError("name");
        }}
        error={errors.name}
        disabled={loading}
      />

      <Input
        id="product-price"
        label="Prix"
        type="number"
        inputMode="numeric"
        min="1"
        step="1"
        placeholder="Ex. 15000"
        value={price}
        onChange={(event) => {
          setPrice(event.target.value);
          clearError("price");
        }}
        error={errors.price}
        disabled={loading}
      />

      <div>
        <label
          htmlFor="product-description"
          className="mb-2 block text-sm font-medium text-slate-900"
        >
          Description
        </label>

        <textarea
          id="product-description"
          rows={4}
          placeholder="Décris brièvement ton produit..."
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            clearError("description");
          }}
          disabled={loading}
          className={[
            "w-full resize-none rounded-lg border",
            "bg-white px-4 py-3 text-base text-slate-900",
            "outline-none transition-colors",
            "placeholder:text-slate-400",
            "focus:border-primary focus:ring-2",
            "focus:ring-primary/20",
            errors.description ? "border-red-500" : "border-slate-200",
            loading ? "cursor-not-allowed bg-slate-100" : "",
          ].join(" ")}
        />

        {errors.description && (
          <p className="mt-2 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row-reverse">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          {submitLabel}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            size="lg"
            fullWidth
            disabled={loading}
            onClick={onCancel}
          >
            Annuler
          </Button>
        )}
      </div>
    </form>
  );
}
