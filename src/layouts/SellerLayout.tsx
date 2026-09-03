import { NavLink, Outlet } from "react-router-dom";
import {
  BarChart3,
  Bell,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Store,
} from "lucide-react";

const navigation = [
  {
    label: "Accueil",
    to: "/seller",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Produits",
    to: "/seller/products",
    icon: Package,
  },
  {
    label: "Commandes",
    to: "/seller/orders",
    icon: ShoppingBag,
  },
  {
    label: "Analytics",
    to: "/seller/analytics",
    icon: BarChart3,
  },
  {
    label: "Boutique",
    to: "/seller/store",
    icon: Store,
  },
];

export function SellerLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <NavLink
            to="/seller"
            className="text-xl font-bold tracking-tight text-primary"
          >
            Mk
          </NavLink>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  ].join(" ")
                }
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <NavLink
            to="/seller/settings"
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-600 hover:bg-slate-100",
              ].join(" ")
            }
          >
            Paramètres
          </NavLink>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="lg:hidden">
              <NavLink
                to="/seller"
                className="text-xl font-bold tracking-tight text-primary"
              >
                Mk
              </NavLink>
            </div>

            <div className="ml-auto">
              <button
                type="button"
                aria-label="Notifications"
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="pb-24 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white lg:hidden">
        <div className="grid grid-cols-5">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    "flex flex-col items-center gap-1 px-2 py-2 text-[11px] font-medium",
                    isActive ? "text-primary" : "text-slate-500",
                  ].join(" ")
                }
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
