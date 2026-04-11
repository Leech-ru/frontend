import { NgOptimizedImage } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiAppearance } from "@taiga-ui/core";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";
import { CosmeticItemCard } from "../../model/cosmetics.model";

@Component({
  selector: "app-cosmetics-item-card",
  templateUrl: "item.html",
  styleUrl: "item.less",
  imports: [NgOptimizedImage, TuiHeader, RouterLink],
  hostDirectives: [
    { directive: TuiCardLarge },
    { directive: TuiAppearance, inputs: ["tuiAppearance: appearance"] },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCosmeticItemCardComponent {
  public readonly data = input<CosmeticItemCard>({} as CosmeticItemCard);
  protected readonly itemName = computed(() =>
    this.data().name.length >= 40
      ? this.data().name.slice(0, 40) + "..."
      : this.data().name,
  );
}
