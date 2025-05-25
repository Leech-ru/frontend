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
  tuiHeightCollapse,
  TuiNotification,
  TuiTextfield,
} from "@taiga-ui/core";
import { TuiInputNumber } from "@taiga-ui/kit";
import { TuiForm } from "@taiga-ui/layout";

import { LEECH_BUY_MIN_COUNT } from "../../../config";
import { LeechBuyForm } from "../../../model/form";
import { TuiStepperStepState } from "../../../model/types";

@Component({
  selector: "app-leech-buy-form-steps-leech",
  templateUrl: "leech.component.html",
  styleUrl: "leech.component.less",
  imports: [
    ReactiveFormsModule,
    TuiAppearance,
    TuiForm,
    TuiInputNumber,
    TuiNotification,
    TuiTextfield,
  ],
  animations: [tuiHeightCollapse],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechBuyFormStepsLeechComponent {
  @Output()
  public stateChange = new EventEmitter<TuiStepperStepState>();

  public get count(): number {
    return (
      (this.form.small.value ?? 0) +
      (this.form.medium.value ?? 0) +
      (this.form.large.value ?? 0)
    );
  }

  public get invalid(): boolean {
    return (
      this.form.small.invalid ||
      this.form.medium.invalid ||
      this.form.large.invalid ||
      this.count < this.leechBuyMinCount
    );
  }

  constructor() {
    this.form.group.statusChanges.subscribe(() => {
      this.stateChange.emit(this.invalid ? "error" : "pass");
    });
  }

  protected readonly form = inject(LeechBuyForm);
  protected readonly leechBuyMinCount = LEECH_BUY_MIN_COUNT;
}
