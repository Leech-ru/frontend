import { Component, input } from "@angular/core";
import { TuiButton } from "@taiga-ui/core";

import { CosmeticShops } from "@/entities/cosmetic";

@Component({
  selector: "app-cosmetic-item-shops",
  templateUrl: "shops.component.html",
  styleUrl: "shops.component.less",
  imports: [TuiButton],
})
export class ShopsComponent {
  public data = input<CosmeticShops>({} as CosmeticShops);
}
