import { CategoryService } from "@/entities/cosmetic";
import { CategoryDto } from "@/entities/cosmetic/api/types";
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { lastValueFrom } from "rxjs";

export const categoryResolver: ResolveFn<CategoryDto> = async (route) => {
  const categoryService = inject(CategoryService);
  const id = route.paramMap.get("categoryId");
  if (!id) {
    throw new Error("Category ID not found");
  }
  return lastValueFrom(categoryService.getById(id));
};
