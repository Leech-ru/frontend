import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaskitoDirective } from "@maskito/angular";
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiLink,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import {
  TuiCheckbox,
  TuiFieldErrorPipe,
  TuiTextarea,
  TuiTextareaLimit,
} from "@taiga-ui/kit";
import { TuiForm, TuiHeader } from "@taiga-ui/layout";

import { phoneMaskito } from "@/shared/lib/forms/mask/phone";

import { LeechBuyForm } from "../../../model/form";
import { TuiStepperStepState } from "../../../model/types";

@Component({
  selector: "app-leech-buy-form-steps-contact",
  templateUrl: "contact.component.html",
  styleUrl: "contact.component.less",
  imports: [
    AsyncPipe,
    MaskitoDirective,
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiCheckbox,
    TuiError,
    TuiFieldErrorPipe,
    TuiForm,
    TuiHeader,
    TuiLink,
    TuiTextarea,
    TuiTextareaLimit,
    TuiTextfield,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechBuyFormStepsContactComponent {
  @Output()
  public stateChange = new EventEmitter<TuiStepperStepState>();

  public get invalid(): boolean {
    return (
      this.form.name.invalid ||
      this.form.phone.invalid ||
      this.form.email.invalid ||
      this.form.address.invalid ||
      this.form.comment.invalid ||
      this.form.agreement.invalid
    );
  }

  constructor() {
    this.form.group.statusChanges.subscribe(() => {
      this.stateChange.emit(this.invalid ? "error" : "pass");
    });
  }

  protected readonly form = inject(LeechBuyForm);
  protected readonly phoneMaskito = phoneMaskito;
}
