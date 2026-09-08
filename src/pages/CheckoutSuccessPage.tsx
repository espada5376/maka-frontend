import { CheckCircle2, Package } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { Order } from "@/types/order";

interface CheckoutLocationState {
  order?: Order;
}

export function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as CheckoutLocationState | null;
  const order = state?.order;

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
          Les informations de cette commande ne sont plus disponibles.
        </p>

        <Button className="mt-6" size="lg" onClick={() => navigate("/feed")}>
          Découvrir les produits
        </Button>
      </div>
    );
  }

  const itemCount = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleViewOrder = () => {
    navigate(`/orders/${order.id}`, {
      state: {
        order,
      },
    });
  };

  const handleContinue = () => {
    navigate("/feed");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full">
          {/* Confirmation */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 className="h-9 w-9 text-success" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Commande confirmée
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Merci pour ta commande. Le vendeur pourra maintenant la traiter.
            </p>
          </div>

          {/* Numéro de commande */}
          <Card className="mt-8" padding="lg">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Numéro de commande
              </p>

              <p className="mt-2 text-xl font-bold text-gray-900">
                {order.number}
              </p>
            </div>
          </Card>

          {/* Articles */}
          <Card className="mt-4" padding="lg">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                Ta commande
              </h2>

              <span className="text-sm text-gray-500">
                {itemCount} article{itemCount > 1 ? "s" : ""}
              </span>
            </div>

            <div className="mt-5 divide-y divide-border">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.quantity} × {item.price.toLocaleString("fr-FR")}{" "}
                      FCFA
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-gray-900">
                    {(item.price * item.quantity).toLocaleString("fr-FR")} FCFA
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total</span>

                <span className="text-lg font-bold text-gray-900">
                  {order.total.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="mt-6 space-y-3">
            <Button fullWidth size="lg" onClick={handleViewOrder}>
              Voir ma commande
            </Button>

            <Button
              fullWidth
              size="lg"
              variant="outline"
              onClick={handleContinue}
            >
              Continuer mes achats
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
