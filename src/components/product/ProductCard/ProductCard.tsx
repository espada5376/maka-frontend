import { useState } from "react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import type { ProductCardProps } from "./product-card.types";

function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-FR").format(price);
}

function ProductCard({
  product,
  onClick,
  loading = false,
  className = "",
  fallbackImage,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const showImage = Boolean(product.image) && !imageError;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!onClick) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <article
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={[
        "group overflow-hidden rounded-md",
        "border border-border bg-surface",
        onClick
          ? "cursor-pointer transition-shadow hover:shadow-sm active:shadow-none"
          : "",
        className,
      ].join(" ")}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-background">
        {loading ? (
          <div className="size-full animate-pulse bg-border" />
        ) : showImage ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className={[
              "size-full object-cover",
              "transition-transform duration-200",
              onClick ? "group-hover:scale-[1.02]" : "",
            ].join(" ")}
          />
        ) : (
          (fallbackImage ?? (
            <div className="flex size-full items-center justify-center">
              <span className="text-small text-muted">Image indisponible</span>
            </div>
          ))
        )}

        {product.badge && !loading && (
          <div className="absolute left-3 top-3">
            <Badge variant={product.badge.variant}>{product.badge.label}</Badge>
          </div>
        )}
      </div>

      {/* Product information */}
      <div className="p-4">
        <h3 className="line-clamp-2 text-body-medium">{product.name}</h3>

        <p className="mt-1 text-title font-bold">
          {formatPrice(product.price)} FCFA
        </p>

        <div className="mt-3 flex items-center gap-2">
          <Avatar
            src={product.sellerAvatar}
            alt={product.sellerName}
            name={product.sellerName}
            size="sm"
          />

          <span className="min-w-0 truncate text-small text-muted">
            {product.sellerName}
          </span>
        </div>
      </div>
    </article>
  );
}

export { ProductCard };
