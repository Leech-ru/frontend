import {
  AppCosmeticCategoryCardComponent,
  CATEGORIES_RESOURCE,
  CategoriesPagination,
} from "@/entities/cosmetic";
import { AppHeroComponent } from "@/shared/ui";
import { Component, inject, linkedSignal } from "@angular/core";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  imports: [AppHeroComponent, AppCosmeticCategoryCardComponent],
})
export class AppCosmeticsCatalogPageComponent {
  private readonly categoriesResource = inject(CATEGORIES_RESOURCE);

  protected readonly heading = $localize`Каталог косметики`;
  protected readonly description = $localize`Линия «bioenergy, antistress, antiage» (ВАА) — максимальная степень активности БАВ и чистоты слюны пиявок, подчеркнутые оригинальной композицией косметических средств. Эта линия обладает биоэнергетическим, антистрессорным и омолаживающим действием`;

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
}
