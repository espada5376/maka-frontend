// src/components/notification/NotificationItem.tsx

import {
  Bell,
  Check,
  Package,
  ShoppingBag,
  Store,
} from "lucide-react";

import type { Notification } from "@/types/notification";

interface NotificationItemProps {
  notification: Notification;
  onOpen: (notification: Notification) => void;
  onToggleRead: (notification: Notification) => void;
}

function getNotificationIcon(type: Notification["type"]) {
  switch (type) {
    case "order":
      return ShoppingBag;

    case "order_status":
      return Package;

    case "product":
      return Store;

    default:
      return Bell;
  }
}

function formatNotificationDate(date: string) {
  const notificationDate = new Date(date);
  const now = new Date();

  const diffInSeconds = Math.floor(
    (now.getTime() - notificationDate.getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return "À l'instant";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `Il y a ${diffInMinutes} min`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `Il y a ${diffInHours} h`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) {
    return `Il y a ${diffInDays} j`;
  }

  return notificationDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

export function NotificationItem({
  notification,
  onOpen,
  onToggleRead,
}: NotificationItemProps) {
  const Icon = getNotificationIcon(notification.type);

  return (
    <article
      className={[
        "flex gap-3 border-b border-border px-4 py-4 transition-colors",
        notification.isRead ? "bg-white" : "bg-primary/5",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => onOpen(notification)}
        className="flex min-w-0 flex-1 gap-3 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
      >
        <div
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            notification.isRead
              ? "bg-gray-100 text-gray-500"
              : "bg-primary/10 text-primary",
          ].join(" ")}
        >
          <Icon size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <h2
              className={[
                "min-w-0 flex-1 text-sm leading-5",
                notification.isRead
                  ? "font-medium text-gray-800"
                  : "font-semibold text-gray-900",
              ].join(" ")}
            >
              {notification.title}
            </h2>

            {!notification.isRead && (
              <span
                className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary"
                aria-label="Non lue"
              />
            )}
          </div>

          <p className="mt-1 text-sm leading-5 text-gray-500">
            {notification.message}
          </p>

          <p className="mt-2 text-xs text-gray-400">
            {formatNotificationDate(notification.createdAt)}
          </p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onToggleRead(notification)}
        aria-label={
          notification.isRead
            ? "Marquer comme non lue"
            : "Marquer comme lue"
        }
        title={notification.isRead ? "Marquer comme non lue" : "Marquer comme lue"}
        className="flex h-9 w-9 shrink-0 items-center justify-center self-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <Check size={17} />
      </button>
    </article>
  );
}
