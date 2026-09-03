import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useCart } from "@/contexts/CartContext";

export function CartSummary() {
  const navigate = useNavigate();

  const { items, itemCount, subtotal } = useCart();

  const hasItems = items.length > 0;

  const hasAvailableItems = items.some(
    (item) => item.state === "available",
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Card padding="lg">
      <div className="space-y-4">
        {/* Titre */}
        <h2 className="text-lg font-semibold text-slate-900">
          Récapitulatif
        </h2>

        {/* Articles */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">
            Articles ({itemCount})
          </span>

          <span className="font-medium text-slate-900">
            {subtotal.toLocaleString("fr-FR")} FCFA
          </span>
        </div>

        {/* Sous-total */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="font-semibold text-slate-900">
            Sous-total
          </span>

          <span className="text-lg font-bold text-slate-900">
            {subtotal.toLocaleString("fr-FR")} FCFA
          </span>
        </div>

        {/* Information */}
        <p className="text-xs leading-5 text-slate-500">
          Les frais de livraison seront indiqués lors de la commande.
        </p>

        {/* CTA */}
        <Button
          fullWidth
          size="lg"
          onClick={handleCheckout}
          disabled={!hasItems || !hasAvailableItems}
        >
          Commander
        </Button>
      </div>
    </Card>
  );
}
