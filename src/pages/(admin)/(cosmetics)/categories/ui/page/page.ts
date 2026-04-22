import {
  CATEGORIES_RESOURCE,
  CATEGORIES_RESOURCE_PAGINATION_SIZES,
} from "@/entities/cosmetic";
import { AppCosmeticCategoryCardComponent } from "@/entities/cosmetic/ui/category";
import { AppCosmeticCategoryFormComponent } from "@/entities/cosmetic/ui/category-form";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TuiResponsiveDialogService } from "@taiga-ui/addon-mobile";
import {
  TuiTablePagination,
  TuiTablePaginationEvent,
} from "@taiga-ui/addon-table";
import { TuiButton, TuiLoader, TuiTitle } from "@taiga-ui/core";
import { TuiAvatar } from "@taiga-ui/kit";
import { TuiBlockStatusComponent, TuiHeader } from "@taiga-ui/layout";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";

interface CategoryFormData {
  id?: string;
  name: string;
  image_id?: string;
}

@Component({
  templateUrl: "./page.html",
  styleUrl: "./page.less",
  imports: [
    AppCosmeticCategoryCardComponent,
    TuiAvatar,
    TuiBlockStatusComponent,
    TuiButton,
    TuiHeader,
    TuiLoader,
    TuiTablePagination,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAdminCategoriesPageComponent {
  protected readonly dialogs = inject(TuiResponsiveDialogService);
  protected readonly categoriesResource = inject(CATEGORIES_RESOURCE);
  protected readonly sizes = CATEGORIES_RESOURCE_PAGINATION_SIZES;

  constructor() {
    this.categoriesResource.reload();
  }

  protected create() {
    this.dialogs
      .open<CategoryFormData>(
        new PolymorpheusComponent(AppCosmeticCategoryFormComponent),
        {
          label: $localize`Создание категории`,
          data: { name: "", image_id: undefined },
        },
      )
      .subscribe();
  }

  protected paginate({ page, size }: TuiTablePaginationEvent) {
    this.categoriesResource.params.update((params) => ({
      ...params,
      limit: size,
      offset: page * size,
    }));
  }
}
