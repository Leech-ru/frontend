import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaskitoPipe } from "@maskito/angular";
import { MaskitoOptions } from "@maskito/core";
import { TuiCurrencyPipe } from "@taiga-ui/addon-commerce";
import {
  TuiAppearance,
  TuiCell,
  TuiFormatNumberPipe,
  TuiLink,
  TuiRadio,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiDataListWrapper, TuiInputNumber } from "@taiga-ui/kit";
import { LEECH_ORDER_PACKAGES } from "../../../config";
import { LeechOrderForm } from "../../../model/form";

@Component({
  selector: "app-leech-order-form-steps-finish",
  templateUrl: "finish.html",
  styleUrl: "finish.less",
  imports: [
    MaskitoPipe,
    ReactiveFormsModule,
    TuiAppearance,
    TuiCell,
    TuiCurrencyPipe,
    TuiDataListWrapper,
    TuiFormatNumberPipe,
    TuiInputNumber,
    TuiLink,
    TuiRadio,
    TuiTextfield,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechOrderFormStepsFinishComponent {
  protected readonly form = inject(LeechOrderForm);

  protected readonly phoneMaskitoOptions: MaskitoOptions = {
    mask: [
      "+",
      "7",
      " ",
      "(",
      /\d/,
      /\d/,
      /\d/,
      ")",
      " ",
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
    ],
  };

  protected readonly package = LEECH_ORDER_PACKAGES.find(
    ({ id }) => id === this.form.package.value,
  )!;
}
