import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaskitoDirective } from "@maskito/angular";
import { TuiAppearance, TuiError, TuiLink, TuiTextfield } from "@taiga-ui/core";
import {
  TuiCheckbox,
  TuiFieldErrorPipe,
  TuiTextarea,
  TuiTextareaLimit,
} from "@taiga-ui/kit";
import { TuiForm } from "@taiga-ui/layout";

import { phoneMaskito } from "@/shared/lib/forms/mask/phone";

import { LeechBuyForm } from "../../../model/form";

@Component({
  selector: "app-leech-buy-form-steps-contact",
  templateUrl: "contact.component.html",
  styleUrl: "contact.component.less",
  imports: [
    AsyncPipe,
    MaskitoDirective,
    ReactiveFormsModule,
    TuiAppearance,
    TuiCheckbox,
    TuiError,
    TuiFieldErrorPipe,
    TuiForm,
    TuiLink,
    TuiTextarea,
    TuiTextareaLimit,
    TuiTextfield,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechBuyFormStepsContactComponent {
  protected readonly form = inject(LeechBuyForm);
  protected readonly phoneMaskito = phoneMaskito;
}
