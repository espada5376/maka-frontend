import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { userService } from "@/services/user.service";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useIdentity } from "@/contexts/IdentityContext";

import type { IdentityNavigationState } from "@/types/identity";

export function AccountCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();

  
  const state = location.state as IdentityNavigationState | null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const trimmedName = name.trim();

  if (!trimmedName) {
    setError("Entre ton nom.");
    return;
  }

  if (trimmedName.length < 2) {
    setError("Ton nom doit contenir au moins 2 caractères.");
    return;
  }

  if (trimmedName.length > 100) {
    setError("Ton nom ne peut pas dépasser 100 caractères.");
    return;
  }

  setError("");
  setIsSubmitting(true);

  try {
    await userService.updateMe({ name: trimmedName });

    

    if (state?.purpose === "become_seller") {
      navigate("/seller/onboarding/store", {
        replace: true,
        state: {
          phone: state.phone,
        },
      });

      return;
    }

    navigate(state?.from ?? "/profile", {
      replace: true,
    });
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Impossible d'enregistrer ton nom.",
    );
  } finally {
    setIsSubmitting(false);
  }
}

  

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <Card variant="default" padding="lg" className="w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary">Mk</p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Crée ton compte
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Ton numéro est vérifié. Il ne reste plus qu’à indiquer ton nom.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="name"
            label="Nom"
            type="text"
            autoComplete="name"
            placeholder="Ex. Boutique Nova"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setError("");
            }}
            error={error}
          />

          <Button type="submit" variant="primary" size="lg" fullWidth>
            Continuer
          </Button>
        </form>
      </Card>
    </section>
  );
}
