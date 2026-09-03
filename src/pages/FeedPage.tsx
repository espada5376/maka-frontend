import { useNavigate } from "react-router-dom";

import {
  ProductFeed,
  ProductFeedEmpty,
  ProductFeedError,
  ProductFeedSkeleton,
} from "@/components/feed";
import type { Product } from "@/components/product";

import { mockProducts } from "@/data/mockProducts";

export function FeedPage() {
  const navigate = useNavigate();

  const handleOpenProduct = (product: Product) => {
    navigate(`/p/${product.slug}`);
  };

  const handleOrderProduct = (product: Product) => {
    navigate(`/order/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Feed */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <ProductFeed
          products={mockProducts}
          onOpenProduct={handleOpenProduct}
          onOrderProduct={handleOrderProduct}
        />
      </main>
    </div>
  );
}
