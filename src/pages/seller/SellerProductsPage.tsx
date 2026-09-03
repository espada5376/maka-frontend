import { Eye, MoreVertical, PackagePlus, Pencil, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { mockProducts } from "@/data/mockProducts";

interface SellerProductStats {
  views: number;
  orders: number;
  status: "active" | "draft" | "unavailable";
}

const mockProductStats: Record<string, SellerProductStats> = {
  "1": {
    views: 128,
    orders: 6,
    status: "active",
  },
  "2": {
    views: 74,
    orders: 3,
    status: "active",
  },
  "3": {
    views: 51,
    orders: 2,
    status: "unavailable",
  },
  "4": {
    views: 0,
    orders: 0,
    status: "draft",
  },
};

type ProductFilter = "all" | "active" | "draft" | "unavailable";

function getStatusLabel(status: SellerProductStats["status"]) {
  const labels = {
    active: "Actif",
    draft: "Brouillon",
    unavailable: "Indisponible",
  };

  return labels[status];
}

function getStatusVariant(status: SellerProductStats["status"]) {
  if (status === "active") {
    return "success" as const;
  }

  if (status === "unavailable") {
    return "warning" as const;
  }

  return "neutral" as const;
}

export function SellerProductsPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ProductFilter>("all");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return mockProducts.filter((product) => {
      const stats = mockProductStats[product.id];

      if (!stats) {
        return false;
      }

      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch);

      const matchesFilter = filter === "all" || stats.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Catalogue</p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Mes produits
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Gère les produits que tes clients peuvent découvrir et commander.
            </p>
          </div>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => navigate("/seller/products/new")}
          >
            <PackagePlus className="h-5 w-5" />
            Ajouter un produit
          </Button>
        </header>

        {/* Search + filters */}
        <Card variant="default" padding="md">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher un produit..."
                aria-label="Rechercher un produit"
                className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-base text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div
              className="flex gap-2 overflow-x-auto pb-1"
              role="group"
              aria-label="Filtrer les produits"
            >
              {[
                ["all", "Tous"],
                ["active", "Actifs"],
                ["draft", "Brouillons"],
                ["unavailable", "Indisponibles"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value as ProductFilter)}
                  aria-pressed={filter === value}
                  className={[
                    "shrink-0 rounded-full px-4 py-2",
                    "text-sm font-medium transition-colors",
                    "focus:outline-none focus:ring-2",
                    "focus:ring-primary focus:ring-offset-2",
                    filter === value
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => {
              const stats = mockProductStats[product.id];

              return (
                <Card
                  key={product.id}
                  variant="default"
                  className="overflow-hidden"
                >
                  {/* Product image */}
                  <div className="aspect-square overflow-hidden bg-slate-100">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <PackagePlus
                          className="h-8 w-8 text-slate-300"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>

                  {/* Product information */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold text-slate-900">
                          {product.name}
                        </h2>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                          {product.price.toLocaleString("fr-FR")} FCFA
                        </p>
                      </div>

                      <Badge variant={getStatusVariant(stats.status)}>
                        {getStatusLabel(stats.status)}
                      </Badge>
                    </div>

                    {/* Statistics */}
                    <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Eye className="h-4 w-4" aria-hidden="true" />
                        {stats.views} vues
                      </span>

                      <span>{stats.orders} commandes</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="md"
                        fullWidth
                        onClick={() =>
                          navigate(`/seller/products/${product.id}/edit`)
                        }
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                        Modifier
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="md"
                        aria-label={`Plus d'actions pour ${product.name}`}
                      >
                        <MoreVertical className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <Card variant="default" padding="lg" className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
              <PackagePlus
                className="h-6 w-6 text-slate-400"
                aria-hidden="true"
              />
            </div>

            <h2 className="mt-4 text-base font-semibold text-slate-900">
              Aucun produit trouvé
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Essaie une autre recherche ou ajoute ton premier produit.
            </p>

            <div className="mt-5">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => navigate("/seller/products/new")}
              >
                Ajouter un produit
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
