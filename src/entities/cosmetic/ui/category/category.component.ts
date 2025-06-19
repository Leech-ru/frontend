import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiSurface, TuiTitle } from "@taiga-ui/core";
import { TuiAvatar } from "@taiga-ui/kit";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";

import { CosmeticCategoryCard } from "@/entities/cosmetic";

@Component({
  selector: "app-cosmetics-category-card",
  templateUrl: "category.component.html",
  styleUrl: "category.component.less",
  imports: [
    TuiCardLarge,
    RouterLink,
    TuiSurface,
    TuiAvatar,
    TuiTitle,
    TuiHeader,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCategoryCardComponent {
  public readonly data = input({} as CosmeticCategoryCard);
}
