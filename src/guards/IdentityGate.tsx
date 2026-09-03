import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useIdentity } from "@/contexts/IdentityContext";
import type { IdentityPurpose } from "@/types/identity";

interface IdentityGateProps {
  purpose: IdentityPurpose;
}

export function IdentityGate({ purpose }: IdentityGateProps) {
  const { isPhoneVerified } = useIdentity();
  const location = useLocation();

  if (!isPhoneVerified) {
    return (
      <Navigate
        to="/account/verify"
        replace
        state={{
          from: location.pathname,
          purpose,
        }}
      />
    );
  }

  return <Outlet />;
}
