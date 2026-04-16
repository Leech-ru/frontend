import { Links } from "../api/cosmetic.service.types";

interface CosmeticFeatures {
  category: string;
  size?: number;
}

export interface CosmeticItem {
  id: string;
  name: string;
  description: string;
  guide: string;
  image_link: string;
  features: CosmeticFeatures;
  buy_links?: Links;
}

export interface CosmeticItemCard {
  id: string;
  name: string;
  desc: string;
  image_link: string;
  category: string;
}

export interface CosmeticCategoryCard {
  id: string;
  name: string;
  routerLink: string;
  imageId: string;
}
