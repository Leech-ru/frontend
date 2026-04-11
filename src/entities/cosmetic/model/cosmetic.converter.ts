import { CategoryDto, CosmeticDto } from "../api/cosmetic.service.types";
import {
  CosmeticCategoryCard,
  CosmeticItem,
  CosmeticItemCard,
} from "./cosmetics.model";
import { getImageUrlById } from "./imagesUrl";

export function getCosmeticCardsFromDto(
  cosmeticsDtoList: CosmeticDto[],
): CosmeticItemCard[] {
  return cosmeticsDtoList.map((cosmeticDto) => ({
    id: cosmeticDto.id,
    name: cosmeticDto.title,
    desc: cosmeticDto.description ?? "",
    image_link: getImageUrlById(cosmeticDto.image_id),
    category: cosmeticDto.category.name,
  }));
}

export function getSelectedCosmeticFromDto(
  cosmeticDto: CosmeticDto,
): CosmeticItem {
  return {
    id: cosmeticDto.id,
    name: cosmeticDto.title,
    description: cosmeticDto.description ?? "",
    buy_links: cosmeticDto.links,
    guide: cosmeticDto.application_method ?? "",
    features: {
      category: cosmeticDto.category.name,
      size: cosmeticDto.volume,
    },
    image_link: getImageUrlById(cosmeticDto.image_id),
  };
}

export function getCategoriesCardsFromDto(
  categoryDtoList: CategoryDto[],
): CosmeticCategoryCard[] {
  return categoryDtoList.map((categoryDto) => ({
    id: categoryDto.id,
    name: categoryDto.name,
    image_link: "",
  }));
}
