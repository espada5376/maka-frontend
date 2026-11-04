export type IdentityPurpose =
  | "login"
  | "view_orders"
  | "become_seller"
  | "sensitive_action";

export interface IdentityNavigationState {
  from?: string;
  purpose?: IdentityPurpose;
  phone?: string;
}

export interface User {
  id: string;
  phone: string;
  phone_verified_at: string | null;
  name: string | null;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}
