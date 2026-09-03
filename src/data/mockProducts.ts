import type { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "robe-elegante",
    name: "Robe élégante",
    price: 15000,
    description:
      "Une robe élégante et confortable, idéale pour les sorties et les occasions spéciales.",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
    seller: {
      id: "seller-1",
      name: "Boutique Nova",
      username: "boutiquenova",
      isVerified: true,
    },
    isAvailable: true,
  },
  {
    id: "2",
    slug: "sac-a-main",
    name: "Sac à main tendance",
    price: 12000,
    description:
      "Un sac à main moderne et pratique pour accompagner tes tenues au quotidien.",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    seller: {
      id: "seller-2",
      name: "Style House",
      username: "stylehouse",
    },
    isAvailable: true,
  },
  {
    id: "3",
    slug: "ensemble-femme",
    name: "Ensemble femme",
    price: 18000,
    description:
      "Un ensemble féminin et tendance pensé pour un style élégant au quotidien.",
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    seller: {
      id: "seller-3",
      name: "Fashion Lomé",
      username: "fashionlome",
      isVerified: true,
    },
    isAvailable: true,
  },
  {
    id: "4",
    slug: "chaussures-femme",
    name: "Chaussures femme",
    price: 10000,
    description:
      "Des chaussures élégantes et polyvalentes pour compléter différentes tenues.",
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
    seller: {
      id: "seller-4",
      name: "Chic Store",
      username: "chicstore",
    },
    isAvailable: false,
  },
];
