import { Component, input } from "@angular/core";
import { TuiTitle } from "@taiga-ui/core";
import { TuiAccordion } from "@taiga-ui/experimental";
import { TuiCell } from "@taiga-ui/layout";

import { CosmeticItem } from "@/entities/cosmetic";

@Component({
  selector: "app-cosmetic-item-accorditions",
  templateUrl: "accorditions.component.html",
  imports: [TuiAccordion, TuiTitle, TuiCell],
})
export class AppCosmeticItemAccorditionsComponent {
  public data = input<CosmeticItem>({} as CosmeticItem);
}
