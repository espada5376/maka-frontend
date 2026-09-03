import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useIdentity } from "@/contexts/IdentityContext";

import type { IdentityNavigationState } from "@/types/identity";

function maskPhone(phone: string) {
  if (phone.length <= 4) {
    return phone;
  }

  return `${phone.slice(0, 3)} •••• ${phone.slice(-2)}`;
}

export function AccountVerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { setStatus } = useIdentity();

  const state = location.state as IdentityNavigationState | null;

  const phone = state?.phone ?? "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => current - 1);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [secondsLeft]);

  function handleCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 6) {
      setCode(value);
      setError("");
    }
  }

  function handleVerify() {
    if (code.length !== 6) {
      setError("Entre les 6 chiffres du code.");
      return;
    }

    setIsVerifying(true);

    // Simulation temporaire du backend.
    window.setTimeout(() => {
      if (code !== "123456") {
        setError("Code incorrect. Vérifie le code reçu.");
        setIsVerifying(false);
        return;
      }

      setIsVerifying(false);

      const purpose = state?.purpose;

      if (purpose === "view_orders") {
        setStatus("verified");

        navigate(state?.from ?? "/orders", {
          replace: true,
        });

        return;
      }

      if (purpose === "become_seller") {
        setStatus("verified");

        navigate("/account/create", {
          replace: true,
          state: {
            from: state?.from,
            purpose: "become_seller",
            phone,
          },
        });

        return;
      }

      setStatus("authenticated");

      navigate(state?.from ?? "/profile", {
        replace: true,
      });
    }, 400);
  }

  function handleResend() {
    if (secondsLeft > 0) {
      return;
    }

    setSecondsLeft(30);
    setCode("");
    setError("");
  }

  function handleChangeNumber() {
    navigate("/account/login", {
      replace: true,
      state: {
        from: state?.from,
        purpose: state?.purpose,
      },
    });
  }

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <Card variant="default" padding="lg" className="w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary">Mk</p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Vérifie ton numéro
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Entre le code à 6 chiffres envoyé au{" "}
            <span className="font-medium text-slate-900">
              {maskPhone(phone)}
            </span>
            .
          </p>
        </div>

        <div className="space-y-6">
          <Input
            id="otp"
            label="Code de vérification"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={handleCodeChange}
            error={error}
            className="text-center text-2xl font-semibold tracking-[0.45em]"
          />

          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            disabled={code.length !== 6 || isVerifying}
            loading={isVerifying}
            onClick={handleVerify}
          >
            Vérifier
          </Button>

          <div className="flex items-center justify-between gap-4 text-sm">
            <button
              type="button"
              onClick={handleChangeNumber}
              className="font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              Modifier le numéro
            </button>

            <button
              type="button"
              disabled={secondsLeft > 0}
              onClick={handleResend}
              className={[
                "font-medium transition-colors",
                secondsLeft > 0
                  ? "cursor-not-allowed text-slate-400"
                  : "text-primary hover:text-primary-hover",
              ].join(" ")}
            >
              {secondsLeft > 0
                ? `Renvoyer dans ${secondsLeft}s`
                : "Renvoyer le code"}
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
}
