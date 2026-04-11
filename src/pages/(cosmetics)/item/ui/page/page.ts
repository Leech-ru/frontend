import { COSMETIC_CATEGORIES, CosmeticItem } from "@/entities/cosmetic";
import { Component, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TUI_BREAKPOINT, TuiButton, TuiLink } from "@taiga-ui/core";
import { TuiAccordion, TuiBreadcrumbs } from "@taiga-ui/kit";
import { TuiAppBarDirective } from "@taiga-ui/layout";
import { map } from "rxjs";
import { AppCosmeticItemAccordionsComponent } from "../accordions";
import { AppCosmeticsItemShopsComponent } from "../shops";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  imports: [
    TuiBreadcrumbs,
    TuiLink,
    RouterLink,
    TuiButton,
    TuiAccordion,
    TuiAppBarDirective,
    AppCosmeticsItemShopsComponent,
    AppCosmeticItemAccordionsComponent,
  ],
})
export class AppCosmeticsItemPageComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly breakpoint = inject(TUI_BREAKPOINT);

  protected readonly data = toSignal(
    this.route.data.pipe(map((data) => (data as { item: CosmeticItem }).item)),
    { requireSync: true },
  );

  protected readonly categoryId = computed(() => {
    return COSMETIC_CATEGORIES.findIndex(
      (c) => c === this.data().features.category,
    );
  });
}
