import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { CategoryService } from "@/entities/cosmetic";
import { CategoryDto } from "@/entities/cosmetic/api/cosmetic.service.types";

export const categoryResolver: ResolveFn<CategoryDto> = async (route) => {
  const categoryService = inject(CategoryService);
  const id = route.paramMap.get("id");
  if (!id) {
    throw new Error("Category ID not found");
  }
  return lastValueFrom(categoryService.getById(id));
};
