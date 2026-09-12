// src/pages/NotificationsPage.tsx

import { ArrowLeft, Bell, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { NotificationItem } from "@/components/notification";
import { useNotifications } from "@/contexts/NotificationContext";

export function NotificationsPage() {
  const navigate = useNavigate();

  const {
    notifications,
    unreadCount,
    markAsRead,
    toggleRead,
    markAllAsRead,
  } = useNotifications();

  function handleOpen(notification: (typeof notifications)[number]) {
    markAsRead(notification.id);

    if (notification.link) {
      navigate(notification.link);
    }
  }

  return (
    <section className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-2xl">
        <header className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center px-4 sm:px-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Retour"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="ml-2 min-w-0 flex-1">
              <h1 className="text-lg font-semibold text-gray-900">
                Notifications
              </h1>

              {unreadCount > 0 && (
                <p className="text-xs text-gray-500">
                  {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
                </p>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-primary transition-colors hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <CheckCheck size={17} />

                <span className="hidden sm:inline">
                  Tout marquer comme lu
                </span>
              </button>
            )}
          </div>
        </header>

        {notifications.length === 0 ? (
          <div className="flex min-h-[60vh] items-center justify-center px-6">
            <div className="max-w-sm text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-gray-400">
                <Bell size={24} />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-gray-900">
                Aucune notification
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Tu recevras ici les informations importantes concernant ton
                activité sur Maka.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onOpen={handleOpen}
                onToggleRead={(item) => toggleRead(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

