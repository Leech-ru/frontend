import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiCurrencyPipe } from "@taiga-ui/addon-commerce";
import {
  TuiAppearance,
  TuiFormatNumberPipe,
  TuiLink,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiDataListWrapper, TuiInputNumber, TuiRadio } from "@taiga-ui/kit";
import { TuiCell } from "@taiga-ui/layout";

import { LEECH_BUY_PACKAGES } from "../../../config";
import { LeechBuyForm } from "../../../model/form";

@Component({
  selector: "app-leech-buy-form-steps-finish",
  templateUrl: "finish.component.html",
  styleUrl: "finish.component.less",
  imports: [
    AsyncPipe,
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
export class AppLeechBuyFormStepsFinishComponent {
  protected readonly form = inject(LeechBuyForm);

  protected readonly package = LEECH_BUY_PACKAGES.find(
    ({ id }) => id === this.form.package.value,
  )!;
}
