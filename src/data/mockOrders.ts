import type { Order } from "@/types/order";

export const mockOrders: Order[] = [
  {
    id: "order-1",
    number: "MK-2026-0001",
    status: "confirmed",

    items: [
      {
        id: "order-item-1",
        productId: "1",
        name: "Robe élégante",
        price: 15000,
        quantity: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
        sellerName: "Boutique Nova",
      },
      {
        id: "order-item-2",
        productId: "2",
        name: "Sac à main tendance",
        price: 12000,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        sellerName: "Style House",
      },
    ],

    customer: {
      name: "Awa Mensah",
      phone: "+228 90 00 00 00",
      address: "Agoè, près du marché",
    },

    subtotal: 42000,
    deliveryFee: 0,
    total: 42000,

    createdAt: "2026-09-04T10:30:00.000Z",
  },

  {
    id: "order-2",
    number: "MK-2026-0002",
    status: "delivered",

    items: [
      {
        id: "order-item-3",
        productId: "3",
        name: "Ensemble femme",
        price: 18000,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
        sellerName: "Fashion Lomé",
      },
    ],

    customer: {
      name: "Awa Mensah",
      phone: "+228 90 00 00 00",
      address: "Agoè, près du marché",
    },

    subtotal: 18000,
    deliveryFee: 0,
    total: 18000,

    createdAt: "2026-08-28T14:15:00.000Z",
  },
];
