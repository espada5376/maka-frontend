import { Check } from "lucide-react";
import type { Seller } from "./seller.types";

interface SellerCardProps {
  seller: Seller;
  onClick?: () => void;
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function SellerCard({ seller, onClick }: SellerCardProps) {
  const initials = getInitials(seller.name);

  const content = (
    <>
      {/* Avatar */}
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100">
        {seller.avatarUrl ? (
          <img
            src={seller.avatarUrl}
            alt={seller.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-600">
            {initials}
          </div>
        )}
      </div>

      {/* Informations vendeur */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <span className="truncate text-sm font-medium text-gray-900">
            {seller.name}
          </span>

          {seller.isVerified && (
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white"
              aria-label="Vendeur vérifié"
            >
              <Check size={10} strokeWidth={3} />
            </span>
          )}
        </div>

        {seller.username && (
          <p className="truncate text-xs text-gray-500">
            @{seller.username}
          </p>
        )}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center gap-3 rounded-lg text-left transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {content}
      </button>
    );
  }

  return (
    <div className="flex w-full items-center gap-3">
      {content}
    </div>
  );
}
