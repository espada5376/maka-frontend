import type { Seller } from "@/components/seller";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  seller: Seller;
  isAvailable: boolean;
}

export interface ProductDraft {
  image: File | null;
  name: string;
  price: string;
  description: string;
}
