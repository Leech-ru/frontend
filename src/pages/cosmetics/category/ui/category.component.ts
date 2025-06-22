import { Component, computed, inject, input } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { TuiItem } from "@taiga-ui/cdk";
import { TuiBreakpointService, TuiButton, TuiLink } from "@taiga-ui/core";
import { TuiBreadcrumbs } from "@taiga-ui/kit";
import { TuiAppBar } from "@taiga-ui/layout";

import { AppCosmeticsItemCardComponent } from "@/entities/cosmetic";
import { TEST_ITEM_CARDS_STH_CATEGORY } from "@/pages/cosmetics/category/mock";
import { CosmeticCategories } from "@/shared/config";
import { AppCalloutComponent } from "@/shared/ui/callout";

@Component({
  selector: "app-category-page",
  styleUrl: "category.component.less",
  templateUrl: "category.component.html",
  imports: [
    AppCosmeticsItemCardComponent,
    RouterLink,
    TuiBreadcrumbs,
    TuiLink,
    AppCalloutComponent,
    TuiItem,
    TuiAppBar,
    TuiButton,
  ],
})
export class AppCosmeticsCategoryPageComponent {
  protected readonly breakpoint = toSignal(inject(TuiBreakpointService));
  protected readonly id = input.required<string>();
  protected readonly categoryName = computed(
    () => CosmeticCategories[Number(this.id())],
  );
  protected readonly items = TEST_ITEM_CARDS_STH_CATEGORY;

  protected breadcrumbs = [
    {
      title: "Разделы косметики",
      routerLink: "/cosmetic/category",
    },
  ];
}
