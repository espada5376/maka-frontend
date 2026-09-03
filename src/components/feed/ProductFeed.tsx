import { ProductFeedItem } from "@/components/product";
import type { Product } from "@/components/product";

interface ProductFeedProps {
  products: Product[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  onOpenProduct?: (product: Product) => void;
  onOrderProduct?: (product: Product) => void;
}

export function ProductFeed({
  products,
  loading = false,
  error = false,
  onRetry,
  onOpenProduct,
  onOrderProduct,
}: ProductFeedProps) {
  if (loading) {
    return <ProductFeedSkeleton />;
  }

  if (error) {
    return <ProductFeedError onRetry={onRetry} />;
  }

  if (products.length === 0) {
    return <ProductFeedEmpty />;
  }

  return (
    <section
      aria-label="Produits disponibles"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product) => (
        <ProductFeedItem
          key={product.id}
          product={product}
          onOpen={() => onOpenProduct?.(product)}
          onOrder={() => onOrderProduct?.(product)}
        />
      ))}
    </section>
  );
}
