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

import { CosmeticItemCard } from "@/entities/cosmetic";

@Component({
  selector: "app-cosmetics-item-card",
  templateUrl: "item.component.html",
  styleUrl: "item.component.less",
  imports: [NgOptimizedImage, TuiHeader, RouterLink],
  hostDirectives: [
    { directive: TuiCardLarge },
    { directive: TuiAppearance, inputs: ["tuiAppearance: appearance"] },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCosmeticsItemCardComponent {
  public readonly data = input<CosmeticItemCard>({} as CosmeticItemCard);
  protected readonly itemName = computed(() =>
    this.data().name.length >= 40
      ? this.data().name.slice(0, 40) + "..."
      : this.data().name,
  );
}
