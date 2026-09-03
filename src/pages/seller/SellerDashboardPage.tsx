import {
  ArrowRight,
  Eye,
  Package,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DashboardStat {
  label: string;
  value: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}

interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "new" | "confirmed" | "preparing" | "delivering" | "delivered";
}

const stats: DashboardStat[] = [
  {
    label: "Ventes",
    value: "0 FCFA",
    icon: ShoppingBag,
  },
  {
    label: "Commandes",
    value: "0",
    icon: Package,
  },
  {
    label: "Vues",
    value: "0",
    icon: Eye,
  },
  {
    label: "Ajouts au panier",
    value: "0",
    icon: ShoppingCart,
  },
];

const recentOrders: RecentOrder[] = [];

function getOrderStatusLabel(status: RecentOrder["status"]) {
  const labels = {
    new: "Nouvelle",
    confirmed: "Confirmée",
    preparing: "En préparation",
    delivering: "En livraison",
    delivered: "Livrée",
  };

  return labels[status];
}

function getOrderStatusVariant(status: RecentOrder["status"]) {
  if (status === "delivered") {
    return "success" as const;
  }

  if (status === "new") {
    return "info" as const;
  }

  return "neutral" as const;
}

export function SellerDashboardPage() {
  const navigate = useNavigate();

  const hasOrders = recentOrders.length > 0;
  const hasProducts = false;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <header>
          <p className="text-sm font-medium text-primary">Espace vendeur</p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Bonjour 👋
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Voici ce qui se passe dans ta boutique.
          </p>
        </header>

        {/* Action principale */}
        {!hasProducts && (
          <Card variant="default" padding="lg" className="overflow-hidden">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-semibold text-primary">
                  Première étape
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  Mets ton premier produit en vente.
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Ajoute un produit, partage son lien et commence à recevoir tes
                  premières commandes.
                </p>
              </div>

              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={() => navigate("/seller/products/new")}
              >
                Ajouter un produit
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        )}

        {/* Statistiques */}
        <section>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <Card key={stat.label} variant="default" padding="md">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>

                      <p className="mt-2 text-xl font-bold text-slate-900">
                        {stat.value}
                      </p>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                      <Icon className="h-5 w-5 text-slate-500" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Commandes récentes */}
        <section>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Commandes récentes
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Les dernières commandes de ta boutique.
              </p>
            </div>

            {hasOrders && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => navigate("/seller/orders")}
              >
                Voir tout
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="mt-4">
            {hasOrders ? (
              <Card variant="default">
                <div className="divide-y divide-slate-100">
                  {recentOrders.map((order) => (
                    <button
                      key={order.id}
                      type="button"
                      onClick={() => navigate(`/seller/orders/${order.id}`)}
                      className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-slate-50"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {order.customer}
                        </p>

                        <p className="mt-1 truncate text-sm text-slate-500">
                          {order.product}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-sm font-semibold text-slate-900">
                          {order.amount.toLocaleString("fr-FR")} FCFA
                        </p>

                        <div className="mt-1">
                          <Badge variant={getOrderStatusVariant(order.status)}>
                            {getOrderStatusLabel(order.status)}
                          </Badge>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            ) : (
              <Card variant="default" padding="lg" className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
                  <ShoppingBag className="h-6 w-6 text-slate-400" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  Pas encore de commande
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Tes premières commandes apparaîtront ici dès qu'un client
                  achètera un produit.
                </p>
              </Card>
            )}
          </div>
        </section>

        {/* Observation */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            Ce que tu dois savoir
          </h2>

          <Card variant="default" padding="lg" className="mt-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Observation
              </p>

              <h3 className="mt-2 text-base font-semibold text-slate-900">
                Nous n'avons pas encore assez de données.
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Publie et partage ton premier produit. Maka pourra ensuite
                commencer à observer les vues, les intentions d'achat et les
                commandes.
              </p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
