import type { Seller } from "@/components/seller";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl?: string;
  seller: Seller;
  isAvailable: boolean;
}
