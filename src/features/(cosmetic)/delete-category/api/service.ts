import { CATEGORIES_RESOURCE, CategoryService } from "@/entities/cosmetic";
import { inject, Injectable } from "@angular/core";
import { TuiNotificationMiddleService } from "@taiga-ui/kit";
import { bufferTime, first, startWith, switchMap, tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class CosmeticDeleteCategoryService {
  private readonly notification = inject(TuiNotificationMiddleService);
  private readonly categoryService = inject(CategoryService);
  private readonly categoriesResource = inject(CATEGORIES_RESOURCE);

  public delete(id: string) {
    return this.notification.open($localize`Удаление категории…`).pipe(
      startWith(null),
      switchMap(() => this.categoryService.delete(id)),
      tap(() => {
        this.deleteOptimistic(id);
        this.categoriesResource.reload();
      }),
      bufferTime(600),
      first(),
    );
  }

  public deleteOptimistic(id: string) {
    this.categoriesResource.update((value) => {
      if (!value) return value;
      return {
        ...value,
        items: value.items.filter((item) => item.id !== id),
      };
    });
  }
}
