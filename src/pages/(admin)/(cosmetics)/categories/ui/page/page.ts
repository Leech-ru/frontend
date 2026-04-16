import { CATEGORIES_RESOURCE, CategoriesPagination } from "@/entities/cosmetic";
import { AppCosmeticCategoryCardComponent } from "@/entities/cosmetic/ui/category";
import { AppCosmeticCategoryFormComponent } from "@/entities/cosmetic/ui/category-form";
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  linkedSignal,
  signal,
} from "@angular/core";
import { TuiResponsiveDialogService } from "@taiga-ui/addon-mobile";
import {
  TUI_TABLE_PAGINATION_TEXTS,
  TuiTablePagination,
} from "@taiga-ui/addon-table";
import {
  TuiButton,
  TuiDialogService,
  TuiLoader,
  TuiTitle,
} from "@taiga-ui/core";
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
  providers: [
    {
      provide: TUI_TABLE_PAGINATION_TEXTS,
      useValue: signal({
        linesPerPage: undefined,
        of: "из",
        pages: "Страниц",
      }),
    },
    {
      provide: TuiDialogService,
      useExisting: TuiResponsiveDialogService,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAdminCategoriesPageComponent {
  private readonly dialogs = inject(TuiResponsiveDialogService);

  protected readonly categoriesResource = inject(CATEGORIES_RESOURCE);

  protected readonly categories = linkedSignal<
    CategoriesPagination | null,
    CategoriesPagination
  >({
    source: () => this.categoriesResource.value(),
    computation: (next, previous) =>
      next ??
      previous?.value ?? {
        items: [],
        pagination: {
          current_page: 0,
          has_next: false,
          has_previous: false,
          total_items: 0,
          total_pages: 0,
        },
      },
  });

  protected readonly loaded = signal(false);

  constructor() {
    this.categoriesResource.reload();

    effect(() => {
      if (this.categoriesResource.status() === "resolved") {
        this.loaded.set(true);
      }
    });
  }

  protected createCategory(): void {
    this.dialogs
      .open<CategoryFormData>(
        new PolymorpheusComponent(AppCosmeticCategoryFormComponent),
        {
          label: "Создание категории",
          data: { name: "", image_id: undefined },
        },
      )
      .subscribe();
  }

  protected handlePagination(pagination: { page: number; size: number }): void {
    this.categoriesResource.params.offset.set(
      pagination.page * pagination.size,
    );
    this.categoriesResource.params.limit.set(pagination.size);
    this.categoriesResource.reload();
  }
}
