interface ProductFeedErrorProps {
  onRetry?: () => void;
}

export function ProductFeedError({
  onRetry,
}: ProductFeedErrorProps) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
        <span className="text-xl">!</span>
      </div>

      <h2 className="text-lg font-semibold text-gray-900">
        Impossible de charger les produits
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-5 text-gray-500">
        Une erreur est survenue. Vérifie ta connexion puis réessaie.
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}
