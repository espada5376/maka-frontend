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
