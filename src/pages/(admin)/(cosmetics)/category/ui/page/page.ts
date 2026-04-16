import {
  CATEGORIES_RESOURCE,
  CategoryDto,
  CategoryService,
  getImageUrlById,
} from "@/entities/cosmetic";
import { AppCosmeticCategoryFormComponent } from "@/entities/cosmetic/ui/category-form";
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
import {
  TUI_CONFIRM,
  TuiAvatar,
  TuiNotificationMiddleService,
  type TuiConfirmData,
} from "@taiga-ui/kit";
import { TuiBlockStatusComponent, TuiHeader } from "@taiga-ui/layout";
import { PolymorpheusComponent } from "@taiga-ui/polymorpheus";
import {
  EMPTY,
  bufferTime,
  first,
  lastValueFrom,
  startWith,
  switchMap,
} from "rxjs";

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
  private readonly categoryService = inject(CategoryService);
  private readonly dialogs = inject(TuiResponsiveDialogService);
  private readonly notification = inject(TuiNotificationMiddleService);
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
          label: "Редактирование категории",
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

    const confirmData: TuiConfirmData = {
      content: "Вы уверены, что хотите удалить эту категорию?",
      yes: "Удалить",
      no: "Отмена",
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: "Удалить категорию?",
        size: "s",
        data: confirmData,
      })
      .pipe(switchMap((confirmed) => (confirmed ? this.doDelete() : EMPTY)))
      .subscribe({
        next: () => {
          this.categoriesResource.reload();
          this.router.navigate(["/admin/cosmetics"]);
        },
      });
  }

  private doDelete() {
    const cat = this.loadedCategory();
    if (!cat) return EMPTY;

    return this.notification.open("Удаление категории…").pipe(
      startWith(null),
      switchMap(() => lastValueFrom(this.categoryService.delete(cat.id))),
      bufferTime(600),
      first(),
    );
  }

  protected getImageUrl(imageId: string | undefined): string {
    if (!imageId) return "";
    return getImageUrlById(imageId);
  }
}
