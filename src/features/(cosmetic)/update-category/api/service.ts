import { CATEGORIES_RESOURCE, CategoryService } from "@/entities/cosmetic";
import { inject, Injectable } from "@angular/core";
import { TuiNotificationService } from "@taiga-ui/core";
import { lastValueFrom } from "rxjs";

interface CategoryFormData {
  name: string;
  image_id?: string;
}

@Injectable({ providedIn: "root" })
export class CosmeticUpdateCategoryService {
  private readonly categoriesResource = inject(CATEGORIES_RESOURCE);
  private readonly categoryService = inject(CategoryService);
  private readonly notifications = inject(TuiNotificationService);

  public async update(id: string, data: CategoryFormData) {
    const updatedCategory = await lastValueFrom(
      this.categoryService.update(id, data),
    );

    this.updateOptimistic(id, updatedCategory);
    this.categoriesResource.reload();

    this.notifications
      .open($localize`Категория изменена!`, {
        appearance: "positive",
        block: "end",
        inline: "end",
      })
      .subscribe();
  }

  public async updateOptimistic(id: string, data: CategoryFormData) {
    this.categoriesResource.update((value) => {
      if (!value) return value;
      return {
        ...value,
        items: value.items.map((item) =>
          item.id === id
            ? {
                ...item,
                ...data,
              }
            : item,
        ),
      };
    });
  }
}
