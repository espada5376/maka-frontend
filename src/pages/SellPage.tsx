import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useIdentity } from "@/contexts/IdentityContext";

export function SellPage() {
  const navigate = useNavigate();

  const { isAuthenticated, isSeller } = useIdentity();

  function handleStart() {
    if (isSeller) {
      navigate("/seller");
      return;
    }

    if (isAuthenticated) {
      navigate("/seller/onboarding/store");
      return;
    }

    navigate("/account/login", {
      state: {
        from: "/seller/onboarding/store",
        purpose: "become_seller",
      },
    });
  }

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <Card
        variant="default"
        padding="lg"
        className="w-full max-w-lg text-center"
      >
        <div className="mx-auto max-w-md">
          <p className="text-sm font-semibold text-primary">
            Mk pour les vendeurs
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Commence à vendre simplement.
          </h1>

          <p className="mt-3 text-base leading-7 text-slate-500">
            Mets ton premier produit en vente, partage-le avec tes clients et
            commence à recevoir des commandes.
          </p>

          <div className="mt-8">
            <Button
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleStart}
            >
              Commencer à vendre
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
