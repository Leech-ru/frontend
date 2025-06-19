export enum CosmeticCategory {
  Clean = "Очищение",
  Face = "Лицо и декольте",
  Body = "Тело",
  Hair = "Волосы",
  Man = "Мужская линия",
  Intensive = "Интенсивный уход",
  Lux = "Люкс",
  Exclusive = "Эксклюзив",
  Leech = "Косметика на пиявках",
}

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
  image_link: string;
}

export interface CosmeticCategoryCard {
  id: string;
  name: `${CosmeticCategory}`;
  image_link: string;
}
