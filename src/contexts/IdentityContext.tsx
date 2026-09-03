import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type IdentityStatus =
  | "anonymous"
  | "verified"
  | "authenticated"
  | "seller";

interface IdentityContextValue {
  status: IdentityStatus;
  isPhoneVerified: boolean;
  isAuthenticated: boolean;
  isSeller: boolean;

  setStatus: (status: IdentityStatus) => void;
  logout: () => void;
}

const IdentityContext = createContext<IdentityContextValue | null>(null);

interface IdentityProviderProps {
  children: ReactNode;
}

export function IdentityProvider({ children }: IdentityProviderProps) {
  const [status, setStatus] = useState<IdentityStatus>("anonymous");

  const value = useMemo<IdentityContextValue>(
    () => ({
      status,

      isPhoneVerified:
        status === "verified" ||
        status === "authenticated" ||
        status === "seller",

      isAuthenticated: status === "authenticated" || status === "seller",

      isSeller: status === "seller",

      setStatus,

      logout: () => {
        setStatus("anonymous");
      },
    }),
    [status],
  );

  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  );
}

export function useIdentity() {
  const context = useContext(IdentityContext);

  if (!context) {
    throw new Error("useIdentity must be used within an IdentityProvider");
  }

  return context;
}
