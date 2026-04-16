import { InjectionToken, inject, resource, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { CategoryService } from "../cosmetic.service";

export const CATEGORIES_RESOURCE = new InjectionToken("Categories Resource", {
  providedIn: "root",
  factory: () => {
    const categoryService = inject(CategoryService);

    const limit = signal(96);
    const offset = signal(0);

    return Object.assign(
      resource({
        params: () => ({
          limit: limit(),
          offset: offset(),
        }),
        loader: async ({ params }) => {
          try {
            return (await lastValueFrom(categoryService.getAll(params))) ?? [];
          } catch {
            return null;
          }
        },
        defaultValue: null,
      }),
      { params: { limit, offset } },
    );
  },
});
