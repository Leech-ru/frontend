import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  TuiAppearance,
  TuiGroup,
  TuiRadio,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import {
  TuiAvatar,
  TuiBlock,
  TuiDataListWrapper,
  TuiInputNumber,
} from "@taiga-ui/kit";
import { TuiForm } from "@taiga-ui/layout";
import { LEECH_ORDER_PACKAGES } from "../../../config";
import { LeechOrderForm } from "../../../model/form";

@Component({
  selector: "app-leech-order-form-steps-package",
  templateUrl: "package.html",
  styleUrl: "package.less",
  imports: [
    ReactiveFormsModule,
    TuiAppearance,
    TuiAvatar,
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
export class AppLeechOrderFormStepsPackageComponent {
  protected readonly form = inject(LeechOrderForm);
  protected readonly packages = LEECH_ORDER_PACKAGES;
}
