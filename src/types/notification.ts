// src/types/notification.ts

export type NotificationType =
  | "order"
  | "order_status"
  | "product"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  link?: string;
}
