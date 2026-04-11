import {
  AppCosmeticItemCardComponent,
  COSMETIC_CATEGORIES,
} from "@/entities/cosmetic";
import { AppHeroComponent } from "@/shared/ui";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiItem } from "@taiga-ui/cdk";
import { TUI_BREAKPOINT, TuiButton, TuiLink } from "@taiga-ui/core";
import { TuiBreadcrumbs } from "@taiga-ui/kit";
import { TuiAppBar } from "@taiga-ui/layout";
import { TEST_ITEM_CARDS_STH_CATEGORY } from "../../mock";

@Component({
  styleUrl: "page.less",
  templateUrl: "page.html",
  imports: [
    AppCosmeticItemCardComponent,
    RouterLink,
    TuiAppBar,
    TuiBreadcrumbs,
    TuiButton,
    TuiItem,
    TuiLink,
    AppHeroComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCosmeticsCategoryPageComponent {
  protected readonly breakpoint = inject(TUI_BREAKPOINT);
  protected readonly id = input.required<string>();
  protected readonly categoryName = computed(
    () => COSMETIC_CATEGORIES[Number(this.id())],
  );
  protected readonly items = TEST_ITEM_CARDS_STH_CATEGORY;

  protected breadcrumbs = [
    {
      title: "Разделы косметики",
      routerLink: "/cosmetic/category",
    },
  ];
}
