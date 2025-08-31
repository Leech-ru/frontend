import { Links } from "@/entities/cosmetic";

interface CosmeticFeatures {
  /**
   * @summary Категория косметики
   */
  category: string;

  /**
   * @summary Размер в миллитрах
   */
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
  image_link: string;
}
