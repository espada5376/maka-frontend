import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function SellerOnboardingStorePage() {
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!storeName.trim()) {
      setError("Entre le nom de ta boutique.");
      return;
    }

    if (!category) {
      setError("Choisis une catégorie.");
      return;
    }

    if (!city.trim()) {
      setError("Entre ta ville.");
      return;
    }

    setError("");

    navigate("/seller/onboarding/first-product");
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">Étape 1 sur 3</p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Commençons par ta boutique
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          Quelques informations suffisent pour commencer à vendre.
        </p>
      </div>

      <Card variant="default" padding="lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="storeName"
            label="Nom de la boutique"
            placeholder="Ex. Boutique Nova"
            value={storeName}
            onChange={(event) => {
              setStoreName(event.target.value);
              setError("");
            }}
          />

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-slate-900"
            >
              Catégorie
            </label>

            <select
              id="category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setError("");
              }}
              className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="mode">Mode</option>
              <option value="beaute">Beauté</option>
              <option value="cosmetiques">Cosmétiques</option>
              <option value="accessoires">Accessoires</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <Input
            id="city"
            label="Ville"
            placeholder="Lomé"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              setError("");
            }}
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" fullWidth>
              Continuer
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}
