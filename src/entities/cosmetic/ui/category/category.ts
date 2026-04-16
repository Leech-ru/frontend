import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiTitle } from "@taiga-ui/core";
import { TuiAvatar } from "@taiga-ui/kit";
import { TuiCardLarge, TuiHeader, TuiSurface } from "@taiga-ui/layout";
import { getImageUrlById } from "../../model/imagesUrl";

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
  public readonly id = input.required<string>();
  public readonly name = input.required<string>();
  public readonly routerLink = input.required<string>();
  public readonly imageId = input.required<string>();

  protected readonly imageUrl = () =>
    this.imageId() ? getImageUrlById(this.imageId()) : "";
}
