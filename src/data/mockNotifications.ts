// src/data/mockNotifications.ts

import type { Notification } from "@/types/notification";

export const mockNotifications: Notification[] = [
  {
    id: "notification-1",
    type: "order",
    title: "Nouvelle commande",
    message: "Ta commande MK-2026-0001 a été confirmée.",
    createdAt: "2026-09-11T10:30:00Z",
    isRead: false,
    link: "/orders/order-1",
  },
  {
    id: "notification-2",
    type: "order_status",
    title: "Commande livrée",
    message: "Ta commande MK-2026-0002 a été livrée.",
    createdAt: "2026-09-10T15:20:00Z",
    isRead: false,
    link: "/orders/order-2",
  },
  {
    id: "notification-3",
    type: "system",
    title: "Bienvenue sur Maka",
    message: "Ton compte Maka est prêt. Tu peux maintenant suivre tes commandes.",
    createdAt: "2026-09-09T09:00:00Z",
    isRead: true,
  },
];
