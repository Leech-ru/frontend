import {
  CATEGORIES_RESOURCE,
  CategoryDto,
  getImageUrlById,
} from "@/entities/cosmetic";
import { AppCosmeticCategoryFormComponent } from "@/entities/cosmetic/ui/category-form";
import { CosmeticDeleteCategoryService } from "@/features/(cosmetic)/delete-category";
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
} from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import {
  TuiDropdownSheet,
  TuiResponsiveDialogService,
} from "@taiga-ui/addon-mobile";
import {
  TuiButton,
  TuiDataList,
  TuiDialogService,
  TuiDropdown,
  TuiOption,
  TuiTitle,
} from "@taiga-ui/core";
import { TUI_CONFIRM, TuiAvatar, type TuiConfirmData } from "@taiga-ui/kit";
import { TuiBlockStatusComponent, TuiHeader } from "@taiga-ui/layout";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import { EMPTY, switchMap } from "rxjs";

interface CategoryFormData {
  id?: string;
  name: string;
  image_id?: string;
}

@Component({
  templateUrl: "./page.html",
  styleUrl: "./page.less",
  imports: [
    RouterLink,
    TuiAvatar,
    TuiBlockStatusComponent,
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiDropdownSheet,
    TuiHeader,
    TuiOption,
    TuiTitle,
  ],
  providers: [
    {
      provide: TuiDialogService,
      useExisting: TuiResponsiveDialogService,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAdminCategoryPageComponent {
  private readonly router = inject(Router);
  private readonly dialogs = inject(TuiResponsiveDialogService);
  private readonly deleteService = inject(CosmeticDeleteCategoryService);
  private readonly categoriesResource = inject(CATEGORIES_RESOURCE);

  protected readonly category = input.required<CategoryDto>();
  protected readonly openActions = signal(false);
  protected readonly notificationOpen = signal(false);
  protected readonly loadedCategory = signal<CategoryDto | null>(null);

  constructor() {
    effect(() => {
      this.loadedCategory.set(this.category());
    });
  }

  protected toggleActions() {
    this.openActions.update((open) => !open);
  }

  protected closeActions() {
    this.openActions.set(false);
  }

  protected editCategory() {
    const cat = this.loadedCategory();
    if (!cat) return;

    this.dialogs
      .open<CategoryFormData>(
        new PolymorpheusComponent(AppCosmeticCategoryFormComponent),
        {
          label: $localize`Редактирование категории`,
          data: {
            id: cat.id,
            name: cat.name,
            image_id: cat.image_id,
          },
        },
      )
      .subscribe((result) => {
        if (result) {
          this.loadedCategory.set(result as unknown as CategoryDto);
          this.categoriesResource.reload();
        }
      });
  }

  protected deleteCategory() {
    this.closeActions();

    const category = this.loadedCategory();

    if (!category) {
      return;
    }

    const confirmData: TuiConfirmData = {
      content: $localize`Вы уверены, что хотите удалить эту категорию?`,
      yes: $localize`Удалить`,
      no: $localize`Отмена`,
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: $localize`Удалить категорию?`,
        size: "s",
        data: confirmData,
      })
      .pipe(
        switchMap((confirmed) =>
          confirmed ? this.deleteService.delete(category.id) : EMPTY,
        ),
      )
      .subscribe({
        next: () => {
          this.categoriesResource.reload();
          this.router.navigate(["/admin/cosmetics"]);
        },
      });
  }

  protected getImageUrl(imageId: string | undefined): string {
    if (!imageId) return "";
    return getImageUrlById(imageId);
  }
}
