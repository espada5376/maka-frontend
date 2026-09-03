import { Minus, Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useCart } from "@/contexts/CartContext";

import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem, isLoading } = useCart();

  const isUnavailable = item.state === "unavailable";

  const lineTotal = item.product.price * item.quantity;

  const handleDecrease = async () => {
    if (item.quantity <= 1) {
      return;
    }

    await updateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrease = async () => {
    await updateQuantity(item.id, item.quantity + 1);
  };

  const handleRemove = async () => {
    await removeItem(item.id);
  };

  return (
    <Card
      padding="md"
      className={isUnavailable ? "opacity-70" : undefined}
    >
      <div className="flex gap-4">
        {/* Image */}
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
          {item.product.imageUrl ? (
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
              Pas d'image
            </div>
          )}
        </div>

        {/* Informations */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
                {item.product.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {item.product.price.toLocaleString("fr-FR")} FCFA
              </p>

              {isUnavailable && (
                <Badge variant="warning" className="mt-2">
                  Indisponible
                </Badge>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              aria-label={`Supprimer ${item.product.name}`}
              onClick={handleRemove}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4 text-slate-500" />
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            {/* Quantité */}
            <div className="flex items-center rounded-lg border border-slate-200">
              <Button
                variant="ghost"
                size="sm"
                aria-label="Diminuer la quantité"
                onClick={handleDecrease}
                disabled={isLoading || item.quantity <= 1 || isUnavailable}
                className="h-9 w-9 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="flex h-9 min-w-9 items-center justify-center text-sm font-medium text-slate-900">
                {item.quantity}
              </span>

              <Button
                variant="ghost"
                size="sm"
                aria-label="Augmenter la quantité"
                onClick={handleIncrease}
                disabled={isLoading || isUnavailable}
                className="h-9 w-9 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Total */}
            <p className="text-sm font-semibold text-slate-900 sm:text-base">
              {lineTotal.toLocaleString("fr-FR")} FCFA
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
