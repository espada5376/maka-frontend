import { Outlet } from "react-router-dom";

import { PublicHeader } from "@/components/navigation/PublicHeader";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PublicHeader />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
