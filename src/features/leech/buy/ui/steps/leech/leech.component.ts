import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { tuiMarkControlAsTouchedAndValidate } from "@taiga-ui/cdk/utils/miscellaneous";
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiNotification,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiFieldErrorPipe, TuiRadioList } from "@taiga-ui/kit";
import { TuiCardLarge, TuiForm, TuiHeader } from "@taiga-ui/layout";

import { LEECH_BUY_MIN_COUNT, LEECH_BUY_PACKAGES } from "../../../config";
import { LeechBuyForm } from "../../../model/form";
import { LeechBuyPackage } from "../../../model/types";

@Component({
  selector: "app-leech-buy-form-steps-leech",
  templateUrl: "leech.component.html",
  styleUrl: "leech.component.less",
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiError,
    TuiFieldErrorPipe,
    TuiForm,
    TuiHeader,
    TuiNotification,
    TuiRadioList,
    TuiTextfield,
    TuiTitle,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechBuyFormStepsLeechComponent {
  protected readonly form = inject(LeechBuyForm);
  protected readonly leechBuyMinCount = LEECH_BUY_MIN_COUNT;

  protected readonly packages = LEECH_BUY_PACKAGES;

  protected comparePackages(item1?: LeechBuyPackage, item2?: LeechBuyPackage) {
    return item1?.id === item2?.id;
  }

  protected next() {
    // TODO: когда будет добавлена функциональность выбора количества
    // пиявок, то нужно тут также проверять новые элементы формы для UX
    // (например this.form.leech1, this.form.leech2, this.form.leech3)
    // при помощи tuiMarkControlAsTouchedAndValidate

    tuiMarkControlAsTouchedAndValidate(this.form.package);

    if (this.form.package.valid) {
      this.form.next();
    }
  }
}
