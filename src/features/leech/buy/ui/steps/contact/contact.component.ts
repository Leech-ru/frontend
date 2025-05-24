import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
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
import { TuiCardLarge, TuiForm, TuiHeader } from "@taiga-ui/layout";

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
    TuiButton,
    TuiCardLarge,
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
  protected readonly form = inject(LeechBuyForm);
  protected readonly phoneMaskito = phoneMaskito;
}
