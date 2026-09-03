import { useEffect, useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  value?: File | null;
  initialPreview?: string;
  onChange?: (file: File | null) => void;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
}

export function ImageUploader({
  value = null,
  initialPreview,
  onChange,
  label = "Photo du produit",
  helperText = "JPG, PNG ou WebP. Une image claire fonctionne mieux.",
  error,
  disabled = false,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(initialPreview ?? null);

  useEffect(() => {
    if (!value) {
      return;
    }

    const objectUrl = URL.createObjectURL(value);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [value]);

  function handleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onChange?.(file);
  }

  function handleRemove() {
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onChange?.(null);
  }

  function handleOpenPicker() {
    if (disabled) {
      return;
    }

    inputRef.current?.click();
  }

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-900">
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleSelect}
        disabled={disabled}
        className="sr-only"
      />

      {preview ? (
        <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          <img
            src={preview}
            alt="Aperçu du produit"
            className="h-full w-full object-cover"
          />

          <div className="absolute right-3 top-3">
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={handleRemove}
              disabled={disabled}
              aria-label="Supprimer l'image"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute bottom-3 left-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleOpenPicker}
              disabled={disabled}
            >
              Modifier
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleOpenPicker}
          disabled={disabled}
          className={[
            "flex aspect-square w-full max-w-sm flex-col",
            "items-center justify-center rounded-xl",
            "border border-dashed bg-slate-50",
            "transition-colors",
            "focus:outline-none focus:ring-2",
            "focus:ring-primary focus:ring-offset-2",
            error ? "border-red-500" : "border-slate-300",
            disabled
              ? "cursor-not-allowed opacity-60"
              : "hover:border-primary hover:bg-primary/5",
          ].join(" ")}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <ImagePlus className="h-6 w-6 text-slate-500" />
          </div>

          <span className="mt-3 text-sm font-medium text-slate-700">
            Ajouter une photo
          </span>

          <span className="mt-1 px-6 text-center text-xs text-slate-500">
            {helperText}
          </span>
        </button>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
