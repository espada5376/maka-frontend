export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "delivering"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  sellerName: string;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  number: string;
  status: OrderStatus;
  items: OrderItem[];
  customer: OrderCustomer;
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
}
