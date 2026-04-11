import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { TuiCurrencyPipe } from "@taiga-ui/addon-commerce";
import { TuiFormatNumberPipe } from "@taiga-ui/core";

@Component({
  selector: "app-leech-price",
  templateUrl: "price.html",
  styleUrl: "price.less",
  imports: [TuiCurrencyPipe, TuiFormatNumberPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechPriceComponent {
  public price = input.required<number>();
}
