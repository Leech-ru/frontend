import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiButton } from "@taiga-ui/core";

import { CosmeticShops } from "@/entities/cosmetic";

@Component({
  selector: "app-cosmetic-item-shops",
  templateUrl: "shops.component.html",
  styleUrl: "shops.component.less",
  imports: [TuiButton, RouterLink],
})
export class ShopsComponent {
  public data = input<CosmeticShops>({} as CosmeticShops);
}
