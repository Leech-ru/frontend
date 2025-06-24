import { CosmeticCategories } from "@/shared/config";

export type CosmeticCategory = (typeof CosmeticCategories)[number];

export interface CosmeticShops {
  wildberries?: string;
  ozon?: string;
}

interface CosmeticFeatures {
  category: CosmeticCategory;
  size: number; // в мл всегда
}

export interface CosmeticItem {
  id: string;
  name: string;
  description: string;
  guide: string;
  image_link: string;
  features: CosmeticFeatures;
  buy_links: CosmeticShops;
}

export interface CosmeticItemCard {
  id: string;
  name: string;
  desc: string;
  image_link: string;
}

export interface CosmeticCategoryCard {
  id: string;
  name: CosmeticCategory;
  image_link: string;
}
