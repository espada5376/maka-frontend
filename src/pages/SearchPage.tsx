import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ProductCard } from "@/components/product/ProductCard";
import { Input } from "@/components/ui/input";

import { mockProducts } from "@/data/mockProducts";

export function SearchPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return mockProducts.filter((product) => {
      const name = product.name.toLowerCase();
      const seller = product.seller.name.toLowerCase();

      return (
        name.includes(normalizedQuery) ||
        seller.includes(normalizedQuery)
      );
    });
  }, [normalizedQuery]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleClear() {
    setQuery("");
    inputRef.current?.focus();
  }

  function handleOpenProduct(product: (typeof mockProducts)[number]) {
    navigate(`/p/${product.slug}`);
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Retour"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-white hover:text-slate-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <h1 className="text-xl font-semibold text-slate-900">
            Rechercher
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            />

            <Input
              ref={inputRef}
              id="search"
              type="search"
              aria-label="Rechercher un produit"
              placeholder="Rechercher un produit..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-12 pr-12"
            />

            {query && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Effacer la recherche"
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>

        {!normalizedQuery ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="max-w-sm text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-400">
                <Search className="h-6 w-6" />
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Que recherches-tu ?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Recherche un produit ou une boutique pour commencer.
              </p>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="max-w-sm text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-400">
                <Search className="h-6 w-6" />
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Aucun résultat
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Aucun produit ou boutique ne correspond à « {query.trim()} ».
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <p className="text-sm text-slate-500">
                {results.length}{" "}
                {results.length === 1 ? "résultat" : "résultats"} pour{" "}
                <span className="font-medium text-slate-900">
                  « {query.trim()} »
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleOpenProduct(product)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
