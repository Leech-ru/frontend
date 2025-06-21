import { Component, computed, input } from "@angular/core";
import { RouterLink } from "@angular/router";

import { AppCosmeticsItemCardComponent } from "@/entities/cosmetic";
import { TEST_ITEM_CARDS_STH_CATEGORY } from "@/pages/cosmetics/category/mock";
import { CosmeticCategories } from "@/shared/config";

@Component({
  selector: "app-category-page",
  styleUrl: "category.component.less",
  templateUrl: "category.component.html",
  imports: [AppCosmeticsItemCardComponent, RouterLink],
})
export class AppCosmeticsCategoryPageComponent {
  protected readonly id = input.required<string>();
  protected readonly categoryName = computed(
    () => CosmeticCategories[Number(this.id())],
  );
  protected readonly items = TEST_ITEM_CARDS_STH_CATEGORY;
}
