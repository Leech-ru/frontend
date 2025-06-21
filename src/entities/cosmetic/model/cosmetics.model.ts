import { CosmeticCategories } from "@/shared/config";

export type CosmeticCategory = (typeof CosmeticCategories)[number];

interface CosmeticLinks {
  wildberries?: string[];
  ozon?: string[];
}

interface CosmeticFeatures {
  category: CosmeticCategory;
  size: string;
}

export interface CosmeticItem {
  name: string;
  description: string;
  guide: string;
  image_link: string;
  features: CosmeticFeatures;
  buy_links: CosmeticLinks;
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
