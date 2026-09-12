import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useCart } from "@/contexts/CartContext";
import { useIdentity } from "@/contexts/IdentityContext";
import { useNotifications } from "@/contexts/NotificationContext";

export function PublicHeader() {
  const navigate = useNavigate();

  const { isAuthenticated, isSeller } = useIdentity();
  const { itemCount } = useCart();
  const { unreadCount } = useNotifications();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleProfileClick() {
    setIsProfileMenuOpen((open) => !open);
  }

  function handleProfileNavigation() {
    setIsProfileMenuOpen(false);

    navigate(isAuthenticated ? "/profile" : "/account/login");
  }

  function handleOrdersNavigation() {
    setIsProfileMenuOpen(false);

    navigate("/orders");
  }

  function handleSellerNavigation() {
    setIsProfileMenuOpen(false);

    navigate("/seller");
  }

  function handleNotificationsNavigation() {
    setIsProfileMenuOpen(false);

    navigate("/notifications");
  }

  function handleCartNavigation() {
    navigate("/cart");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 text-xl font-bold tracking-tight text-primary"
          aria-label="Maka - Accueil"
        >
          Maka
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-6 md:flex"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              [
                "text-sm font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-slate-600 hover:text-slate-900",
              ].join(" ")
            }
          >
            Découvrir
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              [
                "text-sm font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-slate-600 hover:text-slate-900",
              ].join(" ")
            }
          >
            Rechercher
          </NavLink>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Search */}
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => navigate("/search")}
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          {isSeller && (
            <button
              type="button"
              onClick={handleNotificationsNavigation}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={
                unreadCount > 0
                  ? `${unreadCount} notification${
                      unreadCount > 1 ? "s" : ""
                    } non lue${unreadCount > 1 ? "s" : ""}`
                  : "Notifications"
              }
            >
              <Bell className="h-5 w-5" />

              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          )}

          {/* Cart */}
          <button
            type="button"
            onClick={handleCartNavigation}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={
              itemCount > 0
                ? `Ouvrir le panier, ${itemCount} article${
                    itemCount > 1 ? "s" : ""
                  }`
                : "Ouvrir le panier"
            }
          >
            <ShoppingCart className="h-5 w-5" />

            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>

          {/* Sell */}
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => navigate("/sell")}
          >
            Vendre
          </Button>

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={handleProfileClick}
              className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={
                isAuthenticated
                  ? "Ouvrir mon espace"
                  : "Ouvrir le menu utilisateur"
              }
              aria-expanded={isProfileMenuOpen}
              aria-haspopup="menu"
            >
              {isAuthenticated ? (
                <Avatar size="md" fallback="M" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200">
                  <User className="h-5 w-5" />
                </div>
              )}
            </button>

            {isProfileMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleProfileNavigation}
                  className="flex w-full items-center px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  {isAuthenticated ? "Mon profil" : "Se connecter"}
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleOrdersNavigation}
                  className="flex w-full items-center px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Mes commandes
                </button>

                {isSeller && (
                  <>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleNotificationsNavigation}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <span>Notifications</span>

                      {unreadCount > 0 && (
                        <span className="flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold leading-none text-white">
                          {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleSellerNavigation}
                      className="flex w-full items-center px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      Mon espace vendeur
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 md:hidden">
          {/* Search */}
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => navigate("/search")}
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          {isSeller && (
            <button
              type="button"
              onClick={handleNotificationsNavigation}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={
                unreadCount > 0
                  ? `${unreadCount} notification${
                      unreadCount > 1 ? "s" : ""
                    } non lue${unreadCount > 1 ? "s" : ""}`
                  : "Notifications"
              }
            >
              <Bell className="h-5 w-5" />

              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          )}

          {/* Cart */}
          <button
            type="button"
            onClick={handleCartNavigation}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={
              itemCount > 0
                ? `Ouvrir le panier, ${itemCount} article${
                    itemCount > 1 ? "s" : ""
                  }`
                : "Ouvrir le panier"
            }
          >
            <ShoppingCart className="h-5 w-5" />

            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={handleProfileClick}
              className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={
                isAuthenticated
                  ? "Ouvrir mon espace"
                  : "Ouvrir le menu utilisateur"
              }
              aria-expanded={isProfileMenuOpen}
              aria-haspopup="menu"
            >
              {isAuthenticated ? (
                <Avatar size="md" fallback="M" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  <User className="h-5 w-5" />
                </div>
              )}
            </button>

            {isProfileMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleProfileNavigation}
                  className="flex w-full items-center px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  {isAuthenticated ? "Mon profil" : "Se connecter"}
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleOrdersNavigation}
                  className="flex w-full items-center px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Mes commandes
                </button>

                {isSeller && (
                  <>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleNotificationsNavigation}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <span>Notifications</span>

                      {unreadCount > 0 && (
                        <span className="flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold leading-none text-white">
                          {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleSellerNavigation}
                      className="flex w-full items-center px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      Mon espace vendeur
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
