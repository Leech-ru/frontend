import {
  CategoryDto,
  CosmeticCategoryCard,
  CosmeticDto,
  CosmeticItem,
  CosmeticItemCard,
} from "@/entities/cosmetic";
import { getImageUrlById } from "@/shared/model";

/**
 * @summary Преобразует список DTO косметики в карточки для отображения.
 * @param {CosmeticDto[]} cosmeticsDtoList Список DTO косметики.
 * @returns {CosmeticItemCard[]} Массив карточек косметики.
 */
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

/**
 * @summary Формирует детальную модель косметики из DTO.
 * @param {CosmeticDto} cosmeticDto DTO косметики.
 * @returns {CosmeticItem} Детальная модель косметики.
 */
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

/**
 * @summary Преобразует список DTO категорий в карточки категорий.
 * @param {CategoryDto[]} categoryDtoList Список DTO категорий.
 * @returns {CosmeticCategoryCard[]} Массив карточек категорий.
 */
export function getCategoriesCardsFromDto(
  categoryDtoList: CategoryDto[],
): CosmeticCategoryCard[] {
  return categoryDtoList.map((categoryDto) => ({
    id: categoryDto.id,
    name: categoryDto.name,
    image_link: "",
  }));
}
