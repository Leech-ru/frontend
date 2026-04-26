import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiAppearance } from "@taiga-ui/core";
import { TuiCardLarge } from "@taiga-ui/layout";
import { CosmeticItemCard } from "../../model/cosmetics.model";

@Component({
  selector: "app-cosmetics-item-card",
  templateUrl: "item.html",
  styleUrl: "item.less",
  imports: [RouterLink, TuiCardLarge, TuiAppearance],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCosmeticItemCardComponent {
  public readonly data = input.required<CosmeticItemCard>();
}
