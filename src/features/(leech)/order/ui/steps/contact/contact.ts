import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FormField } from "@angular/forms/signals";
import { MaskitoDirective } from "@maskito/angular";
import {
  TuiAppearance,
  TuiCheckbox,
  TuiError,
  TuiInput,
  TuiLink,
  TuiTextfield,
} from "@taiga-ui/core";
import { TuiInputPhoneDirective, TuiTextarea } from "@taiga-ui/kit";
import { TuiForm } from "@taiga-ui/layout";
import { LeechOrderForm } from "../../../model/form";

@Component({
  selector: "app-leech-order-form-steps-contact",
  templateUrl: "contact.html",
  styleUrl: "contact.less",
  imports: [
    FormField,
    FormsModule,
    MaskitoDirective,
    TuiAppearance,
    TuiCheckbox,
    TuiError,
    TuiForm,
    TuiInput,
    TuiInputPhoneDirective,
    TuiLink,
    TuiTextarea,
    TuiTextfield,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechOrderFormStepsContactComponent {
  protected readonly form = inject(LeechOrderForm);
}
