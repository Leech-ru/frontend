export enum CosmeticCategory {
  Clean = "Clean",
  Face = "Face",
  Body = "Body",
  Hair = "Hair",
  Man = "Man",
  Intensive = "Intensive",
  Lux = "Lux",
  Exclusive = "Exclusive",
  Leech = "Leech",
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
  features: CosmeticFeatures;
  buy_links: CosmeticLinks;
  image_link: string;
}
