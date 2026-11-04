import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PhoneInput, {
  isValidPhoneNumber,
} from "react-phone-number-input";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { authService } from "@/services/auth.service";

import type { IdentityNavigationState } from "@/types/identity";

export function AccountLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as IdentityNavigationState | null;

  const [phone, setPhone] = useState<string | undefined>();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!phone) {
      setError("Entre ton numéro de téléphone.");
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      setError("Entre un numéro de téléphone valide.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await authService.requestOtp(phone);

      navigate("/account/verify", {
        state: {
          from: state?.from,
          purpose: state?.purpose ?? "login",
          phone,
        },
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Impossible d'envoyer le code de vérification.",
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
            Entre ton numéro
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Nous allons t’envoyer un code pour vérifier ton numéro.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="w-full">
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-slate-900"
            >
              Numéro de téléphone
            </label>

            <PhoneInput
              id="phone"
              international
              defaultCountry="TG"
              countryCallingCodeEditable={false}
              placeholder="90 00 00 00"
              value={phone}
              onChange={(value) => {
                setPhone(value);
                setError("");
              }}
              className="phone-input"
            />

            {error && (
              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Recevoir un code
          </Button>
        </form>
      </Card>
    </section>
  );
}
