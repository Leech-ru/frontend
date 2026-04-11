import { CosmeticItem } from "@/entities/cosmetic";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { TuiCell, TuiTitle } from "@taiga-ui/core";
import { TuiAccordion } from "@taiga-ui/kit";

@Component({
  selector: "app-cosmetic-item-accorditions",
  templateUrl: "accordions.html",
  styleUrl: "accordions.less",
  imports: [TuiAccordion, TuiCell, TuiTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCosmeticItemAccordionsComponent {
  public data = input<CosmeticItem>({} as CosmeticItem);
}
