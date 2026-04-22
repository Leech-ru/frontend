import { EMPTY_PAGINATION } from "@/shared/api";
import {
  InjectionToken,
  effect,
  inject,
  linkedSignal,
  resource,
  signal,
} from "@angular/core";
import { lastValueFrom } from "rxjs";
import { CategoryService } from "../service";
import { CategoriesPagination, CategoryFiltersDto } from "../types";

export const CATEGORIES_RESOURCE_PAGINATION_SIZES = [12, 24, 48, 96];

export const CATEGORIES_RESOURCE = new InjectionToken("Categories Resource", {
  providedIn: "root",
  factory: () => {
    const categoryService = inject(CategoryService);

    const params = signal<CategoryFiltersDto>({
      limit: CATEGORIES_RESOURCE_PAGINATION_SIZES[3],
      offset: 0,
    });

    const categoriesResource = resource({
      params,
      loader: async ({ params }) => {
        try {
          return (await lastValueFrom(categoryService.getAll(params))) ?? [];
        } catch {
          return null;
        }
      },
      defaultValue: null,
    });

    const placeholder = linkedSignal<
      CategoriesPagination | null,
      CategoriesPagination
    >({
      source: categoriesResource.value,
      computation: (next, previous) =>
        next ??
        previous?.value ?? {
          items: [],
          pagination: EMPTY_PAGINATION,
        },
    });

    const loaded = signal(false);

    effect(() => {
      if (categoriesResource.status() === "resolved") {
        loaded.set(true);
      }
    });

    return Object.assign(categoriesResource, {
      placeholder,
      loaded,
      params,
    });
  },
});
