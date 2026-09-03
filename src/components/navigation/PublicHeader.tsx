import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useIdentity } from "@/contexts/IdentityContext";

export function PublicHeader() {
  const navigate = useNavigate();
  const { isAuthenticated, isSeller } = useIdentity();

  function handleProfileClick() {
    navigate(isAuthenticated ? "/profile" : "/account/login");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/feed"
          className="shrink-0 text-xl font-bold tracking-tight text-primary"
          aria-label="Mk - Accueil"
        >
          Maka
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-6 md:flex"
        >
          <NavLink
            to="/feed"
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
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => navigate("/search")}
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => navigate("/sell")}
          >
            Vendre
          </Button>

          <button
            type="button"
            onClick={handleProfileClick}
            className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={isAuthenticated ? "Ouvrir mon profil" : "Se connecter"}
          >
            {isAuthenticated ? (
              <Avatar size="md" fallback="M" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200">
                <User className="h-5 w-5" />
              </div>
            )}
          </button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 md:hidden">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => navigate("/search")}
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5" />
          </Button>

          <button
            type="button"
            onClick={handleProfileClick}
            className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={isAuthenticated ? "Ouvrir mon profil" : "Se connecter"}
          >
            {isAuthenticated ? (
              <Avatar size="md" fallback="M" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                <User className="h-5 w-5" />
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
