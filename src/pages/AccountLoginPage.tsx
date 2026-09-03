import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import type { IdentityNavigationState } from "@/types/identity";

export function AccountLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as IdentityNavigationState | null;

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedPhone = phone.replace(/\s/g, "");

    if (!normalizedPhone) {
      setError("Entre ton numéro de téléphone.");
      return;
    }

    if (!/^\+?[0-9]{8,15}$/.test(normalizedPhone)) {
      setError("Entre un numéro de téléphone valide.");
      return;
    }

    setError("");

    navigate("/account/verify", {
      state: {
        from: state?.from,
        purpose: state?.purpose ?? "login",
        phone: normalizedPhone,
      },
    });
  }

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <Card variant="default" padding="lg" className="w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary">Mk</p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Entre ton numéro
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Nous allons t’envoyer un code pour vérifier ton numéro.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="phone"
            label="Numéro de téléphone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+228 90 00 00 00"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
              setError("");
            }}
            error={error}
          />

          <Button type="submit" variant="primary" size="lg" fullWidth>
            Recevoir un code
          </Button>
        </form>
      </Card>
    </section>
  );
}
