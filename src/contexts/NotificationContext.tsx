// src/contexts/NotificationContext.tsx

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { mockNotifications } from "@/data/mockNotifications";

import type { Notification } from "@/types/notification";

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
  markAsUnread: (notificationId: string) => void;
  toggleRead: (notificationId: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext =
  createContext<NotificationContextValue | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({
  children,
}: NotificationProviderProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  }, []);

  const markAsUnread = useCallback((notificationId: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: false }
          : notification,
      ),
    );
  }, []);

  const toggleRead = useCallback((notificationId: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              isRead: !notification.isRead,
            }
          : notification,
      ),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    );
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      markAsRead,
      markAsUnread,
      toggleRead,
      markAllAsRead,
    }),
    [
      notifications,
      unreadCount,
      markAsRead,
      markAsUnread,
      toggleRead,
      markAllAsRead,
    ],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }

  return context;
}
