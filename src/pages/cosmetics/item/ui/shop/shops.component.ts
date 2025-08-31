import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiButton } from "@taiga-ui/core";

import { Links } from "@/entities/cosmetic";

@Component({
  selector: "app-cosmetic-item-shops",
  templateUrl: "shops.component.html",
  styleUrl: "shops.component.less",
  imports: [TuiButton, RouterLink],
})
export class ShopsComponent {
  public data = input<Links>({} as Links);
}
