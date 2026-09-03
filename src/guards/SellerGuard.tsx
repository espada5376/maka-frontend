import { Navigate, Outlet } from "react-router-dom";
import { useIdentity } from "@/contexts/IdentityContext";

export function SellerGuard() {
  const { isSeller } = useIdentity();

  if (isSeller) {
    return <Navigate to="/sell" replace />;
  }

  return <Outlet />;
}
