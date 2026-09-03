export function ProductFeedEmpty() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <span className="text-xl">🛍️</span>
      </div>

      <h2 className="text-lg font-semibold text-gray-900">
        Aucun produit pour le moment
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-5 text-gray-500">
        De nouveaux produits pourront apparaître ici prochainement.
      </p>
    </div>
  );
}
