import { Component, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { TuiBreakpointService, TuiButton, TuiLink } from "@taiga-ui/core";
import { TuiAccordion } from "@taiga-ui/experimental";
import { TuiBreadcrumbs } from "@taiga-ui/kit";
import { TuiAppBarDirective } from "@taiga-ui/layout";

import { TEST_ITEM_INFO } from "@/pages/cosmetics/item/mock";
import { AppCosmeticItemAccorditionsComponent } from "@/pages/cosmetics/item/ui/accorditions/accorditions.component";
import { ShopsComponent } from "@/pages/cosmetics/item/ui/shop/shops.component";
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
    TuiAppBarDirective,
    ShopsComponent,
    AppCosmeticItemAccorditionsComponent,
  ],
})
export class AppCosmeticsItemPageComponent {
  protected readonly breakpoint = toSignal(inject(TuiBreakpointService));
  protected readonly data = computed(() => TEST_ITEM_INFO);
  protected readonly categoryId = computed(() => {
    return CosmeticCategories.findIndex(
      (c) => c === this.data().features.category,
    );
  });
}
