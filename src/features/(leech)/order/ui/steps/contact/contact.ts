import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
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
    MaskitoDirective,
    ReactiveFormsModule,
    TuiAppearance,
    TuiCheckbox,
    TuiInput,
    TuiError,
    TuiForm,
    TuiLink,
    TuiTextarea,
    TuiTextfield,
    TuiInputPhoneDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechOrderFormStepsContactComponent {
  protected readonly form = inject(LeechOrderForm);
}
