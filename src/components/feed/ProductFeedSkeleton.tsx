export function ProductFeedSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-label="Chargement des produits"
      aria-busy="true"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl bg-white"
        >
          <div className="aspect-square animate-pulse bg-gray-200" />

          <div className="space-y-4 p-4">
            <div className="space-y-2">
              <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            </div>

            <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
