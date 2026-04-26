import {
  CATEGORIES_RESOURCE,
  CategoryDto,
  CategoryService,
} from "@/entities/cosmetic";
import { inject, Injectable } from "@angular/core";
import { TuiNotificationService } from "@taiga-ui/core";
import { lastValueFrom } from "rxjs";

interface CategoryFormData {
  id?: string;
  name: string;
  image_id?: string;
}

@Injectable({ providedIn: "root" })
export class CosmeticCreateCategoryService {
  private readonly categoriesResource = inject(CATEGORIES_RESOURCE);
  private readonly categoryService = inject(CategoryService);
  private readonly notifications = inject(TuiNotificationService);

  public async create({ name, image_id }: CategoryFormData) {
    const newCategory = await lastValueFrom(
      this.categoryService.create({ name, image_id: image_id! }),
    );

    this.createOptimistic(newCategory);
    this.categoriesResource.reload();

    this.notifications
      .open($localize`Категория создана!`, {
        appearance: "positive",
        block: "end",
        inline: "end",
      })
      .subscribe();
  }

  public createOptimistic(category: CategoryDto) {
    this.categoriesResource.update((value) => {
      if (!value) return value;

      const params = this.categoriesResource.params();
      const limit = params.limit;
      const offset = params.offset;

      if (offset === 0) {
        const updatedItems = [...value.items, category];

        return {
          ...value,
          items: updatedItems.slice(0, limit),
          pagination: {
            ...value.pagination,
            total_items: value.pagination.total_items + 1,
          },
        };
      }

      return {
        ...value,
        pagination: {
          ...value.pagination,
          total_items: value.pagination.total_items + 1,
        },
      };
    });
  }
}
