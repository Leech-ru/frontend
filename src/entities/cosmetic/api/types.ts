import { Pagination } from "@/shared/api";

export interface Links {
  ozon?: string;
  wildberries?: string;
}

export interface CategoryDto {
  id: string;
  name: string;
  image_id: string;
}

export interface CategoriesPagination {
  items: CategoryDto[];
  pagination: Pagination;
}

export interface CategoryFiltersDto {
  limit: number;
  offset: number;
}

export interface CreateCategoryRequestDto {
  name: string;
  image_id: string;
}

export interface UpdateCategoryRequestDto {
  id: string;
  name?: string;
  image_id?: string;
}

export interface CosmeticDto {
  id: string;
  category: CategoryDto;
  title: string;
  description?: string;
  application_method?: string;
  volume?: number;
  image_id: string;
  is_hidden: boolean;
  links?: Links;
}

export interface CosmeticsFiltersDto {
  limit?: number;
  offset?: number;
  category_id?: string;
  titlePrefix?: string;
  volume?: number;
}

export interface CreateCosmeticsRequestDto {
  category_id: string;
  image_id: string;
  is_hidden: boolean;
  title: string;
  application_method?: string;
  description?: string;
  links?: Links;
  volume?: number;
}

export interface UpdateCosmeticsRequestDto {
  category_id?: string;
  image_id?: string;
  is_hidden?: boolean;
  title?: string;
  application_method?: string;
  description?: string;
  links?: Links;
  volume?: number;
}
