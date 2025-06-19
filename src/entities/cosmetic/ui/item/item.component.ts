import { NgOptimizedImage } from "@angular/common";
import { Component, input } from "@angular/core";
import { TuiTitle } from "@taiga-ui/core";
import { TuiHeader } from "@taiga-ui/layout";

import { CosmeticItemCard } from "@/entities/cosmetic";

@Component({
  selector: "app-cosmetics-item-card",
  templateUrl: "item.component.html",
  styleUrl: "item.component.less",
  imports: [NgOptimizedImage, TuiTitle, TuiHeader],
})
export class AppCosmeticsItemCardComponent {
  protected readonly data = input<CosmeticItemCard>({} as CosmeticItemCard);
}
