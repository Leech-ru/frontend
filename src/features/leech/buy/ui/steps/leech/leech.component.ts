import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiCurrencyPipe } from "@taiga-ui/addon-commerce";
import {
  TuiAppearance,
  TuiFormatNumberPipe,
  tuiHeightCollapse,
  TuiNotification,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiInputNumber } from "@taiga-ui/kit";
import { TuiCell, TuiForm, TuiHeader } from "@taiga-ui/layout";

import {
  AppLeechPriceComponent,
  AppLeechSizeComponent,
  LEECH_LARGE_PRICE,
  LEECH_MEDIUM_PRICE,
  LEECH_SMALL_PRICE,
} from "@/entities/leech";

import { LEECH_BUY_MIN_COUNT } from "../../../config";
import { LeechBuyForm } from "../../../model/form";

@Component({
  selector: "app-leech-buy-form-steps-leech",
  templateUrl: "leech.component.html",
  styleUrl: "leech.component.less",
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TuiAppearance,
    TuiCell,
    TuiCurrencyPipe,
    TuiForm,
    TuiFormatNumberPipe,
    TuiHeader,
    TuiInputNumber,
    TuiNotification,
    TuiTextfield,
    TuiTitle,
    AppLeechPriceComponent,
    AppLeechSizeComponent,
  ],
  animations: [tuiHeightCollapse],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechBuyFormStepsLeechComponent {
  protected readonly form = inject(LeechBuyForm);
  protected readonly leechBuyMinCount = LEECH_BUY_MIN_COUNT;

  protected readonly items = [
    {
      title: "Малые пиявки",
      price: LEECH_SMALL_PRICE,
      sizes: {
        max: 0.6,
      },
      formControlName: "small",
    },
    {
      title: "Средние пиявки",
      price: LEECH_MEDIUM_PRICE,
      sizes: {
        min: 0.6,
        max: 2,
      },
      formControlName: "medium",
    },
    {
      title: "Крупные пиявки",
      price: LEECH_LARGE_PRICE,
      sizes: {
        min: 2,
      },
      formControlName: "large",
    },
  ];
}
