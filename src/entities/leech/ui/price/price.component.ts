import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { TuiCurrencyPipe } from "@taiga-ui/addon-commerce";
import { TuiFormatNumberPipe } from "@taiga-ui/core";
import { TuiBadge } from "@taiga-ui/kit";

@Component({
  selector: "app-leech-price",
  templateUrl: "price.component.html",
  styleUrl: "price.component.less",
  imports: [AsyncPipe, TuiBadge, TuiCurrencyPipe, TuiFormatNumberPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechPriceComponent {
  public price = input.required<number>();
}
