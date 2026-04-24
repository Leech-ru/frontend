import {
  AppLeechPriceComponent,
  AppLeechSizeComponent,
  LEECH_LARGE_PRICE,
  LEECH_MEDIUM_PRICE,
  LEECH_SMALL_PRICE,
} from "@/entities/leech";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TuiCurrencyPipe } from "@taiga-ui/addon-commerce";
import {
  TuiAppearance,
  TuiCell,
  TuiFormatNumberPipe,
  TuiNotification,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiInputNumber } from "@taiga-ui/kit";
import { TuiForm, TuiHeader } from "@taiga-ui/layout";
import { LEECH_ORDER_MIN_COUNT } from "../../../config";
import { LeechOrderForm } from "../../../model/form";

@Component({
  selector: "app-leech-order-form-steps-leech",
  templateUrl: "leech.html",
  styleUrl: "leech.less",
  imports: [
    AppLeechPriceComponent,
    AppLeechSizeComponent,
    FormsModule,
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechOrderFormStepsLeechComponent {
  protected readonly form = inject(LeechOrderForm);
  protected readonly leechOrderMinCount = LEECH_ORDER_MIN_COUNT;

  protected readonly items = [
    {
      key: "small" as const,
      title: $localize`Малые пиявки`,
      price: LEECH_SMALL_PRICE,
      sizes: {
        max: 0.6,
      },
    },
    {
      key: "medium" as const,
      title: $localize`Средние пиявки`,
      price: LEECH_MEDIUM_PRICE,
      sizes: {
        min: 0.6,
        max: 2,
      },
    },
    {
      key: "large" as const,
      title: $localize`Крупные пиявки`,
      price: LEECH_LARGE_PRICE,
      sizes: {
        min: 2,
      },
    },
  ];

  update(key: "small" | "medium" | "large", value: unknown) {
    this.form.model.update((model) => ({
      ...model,
      leech: { ...model.leech, [key]: value },
    }));
  }
}
