import { Component, computed } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiButton, TuiLink, TuiTitle } from "@taiga-ui/core";
import { TuiAccordion, TuiExpand } from "@taiga-ui/experimental";
import { TuiBreadcrumbs } from "@taiga-ui/kit";
import { TuiCell } from "@taiga-ui/layout";

import { TEST_ITEM_INFO } from "@/pages/cosmetics/item/mock";
import { CosmeticCategories } from "@/shared/config";

@Component({
  selector: "app-cosmetics-item-page",
  templateUrl: "item.component.html",
  styleUrl: "item.component.less",
  imports: [
    TuiBreadcrumbs,
    TuiLink,
    RouterLink,
    TuiButton,
    TuiAccordion,
    TuiExpand,
    TuiCell,
    TuiTitle,
  ],
})
export class AppCosmeticsItemPageComponent {
  protected readonly data = computed(() => TEST_ITEM_INFO);
  protected readonly categoryId = computed(() => {
    return CosmeticCategories.findIndex(
      (c) => c === this.data().features.category,
    );
  });
}
