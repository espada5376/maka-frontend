import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Phone,
  User,
} from "lucide-react";
import { useLocation, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { mockOrders } from "@/data/mockOrders";
import type { Order, OrderStatus } from "@/types/order";

interface OrderLocationState {
  order?: Order;
}

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
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function getStatusDescription(status: OrderStatus): string {
  switch (status) {
    case "pending":
      return "Ta commande est en attente de confirmation.";

    case "confirmed":
      return "Ta commande a été confirmée par le vendeur.";

    case "preparing":
      return "Le vendeur prépare actuellement ta commande.";

    case "delivering":
      return "Ta commande est actuellement en cours de livraison.";

    case "delivered":
      return "Ta commande a été livrée.";

    case "cancelled":
      return "Cette commande a été annulée.";

    default:
      return "";
  }
}

function StatusIcon({ status }: { status: OrderStatus }) {
  if (status === "delivered") {
    return (
      <CheckCircle2
        className="mt-0.5 h-5 w-5 shrink-0 text-success"
        aria-hidden="true"
      />
    );
  }

  if (status === "cancelled") {
    return (
      <Package
        className="mt-0.5 h-5 w-5 shrink-0 text-error"
        aria-hidden="true"
      />
    );
  }

  return (
    <Clock3
      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
      aria-hidden="true"
    />
  );
}

export function OrderDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = useParams<{ orderId: string }>();

  const order = useMemo(() => {
    const state = location.state as OrderLocationState | null;

    /*
     * Commande créée pendant le checkout.
     *
     * Elle est transmise temporairement via React Router state
     * puisque nous sommes encore en mock frontend.
     */
    if (state?.order && state.order.id === orderId) {
      return state.order;
    }

    /*
     * Commandes existantes dans les données mockées.
     */
    return mockOrders.find((item) => item.id === orderId);
  }, [location.state, orderId]);

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <Package className="h-7 w-7 text-gray-400" />
        </div>

        <h1 className="mt-5 text-xl font-semibold text-gray-900">
          Commande introuvable
        </h1>

        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
          Cette commande n'existe pas ou n'est plus disponible.
        </p>

        <button
          type="button"
          onClick={() => navigate("/orders")}
          className="mt-6 h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Retour aux commandes
        </button>
      </div>
    );
  }

  const itemCount = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center px-4 sm:h-16 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/orders")}
            aria-label="Retour aux commandes"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="ml-2">
            <h1 className="text-lg font-semibold text-gray-900">
              Détail de la commande
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              {order.number}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="space-y-4">
          {/* Informations principales */}
          <Card padding="lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">Commande</p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {order.number}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {formatOrderDate(order.createdAt)}
                </p>
              </div>

              <Badge variant={getStatusVariant(order.status)}>
                {getStatusLabel(order.status)}
              </Badge>
            </div>

            {/* Statut */}
            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <StatusIcon status={order.status} />

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {getStatusLabel(order.status)}
                  </p>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {getStatusDescription(order.status)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Articles */}
          <Card padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Articles
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {itemCount} article{itemCount > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="mt-5 divide-y divide-border">
              {order.items.map((item) => {
                const lineTotal = item.price * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    {/* Image */}
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Informations */}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>

                      <p className="mt-1 text-sm text-gray-500">
                        Vendu par {item.sellerName}
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        {item.quantity} × {item.price.toLocaleString("fr-FR")}{" "}
                        FCFA
                      </p>
                    </div>

                    {/* Total article */}
                    <div className="shrink-0 text-right">
                      <p className="font-semibold text-gray-900">
                        {lineTotal.toLocaleString("fr-FR")} FCFA
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Livraison */}
          <Card padding="lg">
            <h2 className="text-base font-semibold text-gray-900">
              Informations de livraison
            </h2>

            <div className="mt-5 space-y-4">
              {/* Nom */}
              <div className="flex items-start gap-3">
                <User
                  className="mt-0.5 h-5 w-5 shrink-0 text-gray-400"
                  aria-hidden="true"
                />

                <div>
                  <p className="text-xs text-gray-500">Nom</p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {order.customer.name}
                  </p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-gray-400"
                  aria-hidden="true"
                />

                <div>
                  <p className="text-xs text-gray-500">Téléphone</p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {order.customer.phone}
                  </p>
                </div>
              </div>

              {/* Adresse */}
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-gray-400"
                  aria-hidden="true"
                />

                <div>
                  <p className="text-xs text-gray-500">Adresse</p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {order.customer.address}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Résumé */}
          <Card padding="lg">
            <h2 className="text-base font-semibold text-gray-900">Résumé</h2>

            <div className="mt-5 space-y-3">
              {/* Sous-total */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Sous-total</span>

                <span className="font-medium text-gray-900">
                  {order.subtotal.toLocaleString("fr-FR")} FCFA
                </span>
              </div>

              {/* Livraison */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Livraison</span>

                <span className="font-medium text-gray-900">
                  {order.deliveryFee === 0
                    ? "À définir"
                    : `${order.deliveryFee.toLocaleString("fr-FR")} FCFA`}
                </span>
              </div>

              {/* Total */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Total</span>

                  <span className="text-lg font-bold text-gray-900">
                    {order.total.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Retour */}
          <button
            type="button"
            onClick={() => navigate("/feed")}
            className="flex h-11 w-full items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Continuer mes achats
          </button>
        </div>
      </main>
    </div>
  );
}
