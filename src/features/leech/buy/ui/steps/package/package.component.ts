import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  TuiAppearance,
  TuiGroup,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import {
  TuiBlock,
  TuiDataListWrapper,
  TuiInputNumber,
  TuiRadio,
} from "@taiga-ui/kit";
import { TuiForm } from "@taiga-ui/layout";

import { LEECH_BUY_PACKAGES } from "../../../config";
import { LeechBuyForm } from "../../../model/form";
import { TuiStepperStepState } from "../../../model/types";

@Component({
  selector: "app-leech-buy-form-steps-package",
  templateUrl: "package.component.html",
  styleUrl: "package.component.less",
  imports: [
    ReactiveFormsModule,
    TuiAppearance,
    TuiBlock,
    TuiDataListWrapper,
    TuiForm,
    TuiGroup,
    TuiInputNumber,
    TuiRadio,
    TuiTextfield,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechBuyFormStepsPackageComponent {
  @Output()
  public stateChange = new EventEmitter<TuiStepperStepState>();

  public get invalid(): boolean {
    return this.form.package.invalid;
  }

  constructor() {
    this.form.group.statusChanges.subscribe(() => {
      this.stateChange.emit(this.invalid ? "error" : "pass");
    });
  }

  protected readonly form = inject(LeechBuyForm);
  protected readonly packages = LEECH_BUY_PACKAGES;
}
