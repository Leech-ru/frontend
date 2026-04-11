import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiTitle } from "@taiga-ui/core";
import { TuiAvatar } from "@taiga-ui/kit";
import { TuiCardLarge, TuiHeader, TuiSurface } from "@taiga-ui/layout";
import { CosmeticCategoryCard } from "../../model/cosmetics.model";

@Component({
  selector: "app-cosmetics-category-card",
  templateUrl: "category.html",
  styleUrl: "category.less",
  imports: [
    RouterLink,
    TuiAvatar,
    TuiCardLarge,
    TuiHeader,
    TuiSurface,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCosmeticCategoryCardComponent {
  public readonly data = input({} as CosmeticCategoryCard);
}
