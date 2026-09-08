import { ArrowLeft, ChevronRight, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { mockOrders } from "@/data/mockOrders";
import type { OrderStatus } from "@/types/order";

function getStatusLabel(status: OrderStatus): string {
  switch (status) {
    case "pending":
      return "En attente";

    case "confirmed":
      return "Confirmée";

    case "preparing":
      return "En préparation";

    case "delivering":
      return "En livraison";

    case "delivered":
      return "Livrée";

    case "cancelled":
      return "Annulée";

    default:
      return status;
  }
}

function getStatusVariant(
  status: OrderStatus,
): "success" | "warning" | "error" | "info" | "neutral" {
  switch (status) {
    case "confirmed":
    case "delivered":
      return "success";

    case "pending":
    case "preparing":
      return "warning";

    case "delivering":
      return "info";

    case "cancelled":
      return "error";

    default:
      return "neutral";
  }
}

function formatOrderDate(date: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function OrdersPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center px-4 sm:h-16 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Retour"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="ml-2">
            <h1 className="text-lg font-semibold text-gray-900">
              Mes commandes
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Consulte tes commandes et leur statut.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        {mockOrders.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-border bg-white px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Package className="h-7 w-7 text-gray-400" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-gray-900">
              Aucune commande
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Tes commandes apparaîtront ici après ton premier achat.
            </p>

            <button
              type="button"
              onClick={() => navigate("/feed")}
              className="mt-6 h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Découvrir les produits
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => {
              const itemCount = order.items.reduce(
                (total, item) => total + item.quantity,
                0,
              );

              const firstItem = order.items[0];

              return (
                <Card
                  key={order.id}
                  variant="interactive"
                  className="overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="w-full text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                  >
                    <div className="p-4 sm:p-5">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {order.number}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {formatOrderDate(order.createdAt)}
                          </p>
                        </div>

                        <Badge variant={getStatusVariant(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>

                      {/* Order preview */}
                      <div className="mt-5 flex items-center gap-4">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          {firstItem?.imageUrl ? (
                            <img
                              src={firstItem.imageUrl}
                              alt={firstItem.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {firstItem?.name}
                          </p>

                          {order.items.length > 1 ? (
                            <p className="mt-1 text-sm text-gray-500">
                              + {order.items.length - 1} autre
                              {order.items.length - 1 > 1 ? "s" : ""}
                            </p>
                          ) : (
                            <p className="mt-1 text-sm text-gray-500">
                              {itemCount} article
                              {itemCount > 1 ? "s" : ""}
                            </p>
                          )}
                        </div>

                        <ChevronRight
                          className="h-5 w-5 shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>

                      {/* Total */}
                      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                        <span className="text-sm text-gray-500">Total</span>

                        <span className="text-base font-bold text-gray-900">
                          {order.total.toLocaleString("fr-FR")} FCFA
                        </span>
                      </div>
                    </div>
                  </button>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
