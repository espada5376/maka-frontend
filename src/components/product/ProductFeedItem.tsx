import type { Product } from "./product.types";

interface ProductFeedItemProps {
  product: Product;
  onOpen?: () => void;
}

export function ProductFeedItem({ product, onOpen }: ProductFeedItemProps) {
  return (
    <article className="overflow-hidden rounded-xl bg-white">
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
        aria-label={`Voir ${product.name}`}
      >
        {/* Image */}
        <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
              Image indisponible
            </div>
          )}
        </div>

        {/* Informations */}
        <div className="space-y-3 p-4">
          <div>
            <h2 className="line-clamp-2 text-base font-semibold leading-6 text-gray-900">
              {product.name}
            </h2>

            <p className="mt-1 text-lg font-bold text-gray-900">
              {product.price.toLocaleString("fr-FR")} FCFA
            </p>

            <div className="mt-2">
              {product.isAvailable ? (
                <span className="text-sm font-medium text-green-600">
                  Disponible
                </span>
              ) : (
                <span className="text-sm font-medium text-gray-500">
                  Rupture de stock
                </span>
              )}
            </div>
          </div>

          {/* Vendeur */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100">
              {product.seller.avatarUrl ? (
                <img
                  src={product.seller.avatarUrl}
                  alt={product.seller.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-600">
                  {product.seller.name
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((part) => part.charAt(0).toUpperCase())
                    .join("")}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">
                {product.seller.name}
              </p>

              {product.seller.username && (
                <p className="truncate text-xs text-gray-500">
                  @{product.seller.username}
                </p>
              )}
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}
