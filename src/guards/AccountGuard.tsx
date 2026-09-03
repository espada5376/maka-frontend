import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useIdentity } from "@/contexts/IdentityContext";

export function AccountGuard() {
  const { isAuthenticated } = useIdentity();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/account/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
}
