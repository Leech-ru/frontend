import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  TuiAppearance,
  TuiGroup,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import {
  TuiAvatar,
  TuiBlock,
  TuiDataListWrapper,
  TuiInputNumber,
  TuiRadio,
} from "@taiga-ui/kit";
import { TuiForm } from "@taiga-ui/layout";

import { LEECH_BUY_PACKAGES } from "../../../config";
import { LeechBuyForm } from "../../../model/form";

@Component({
  selector: "app-leech-buy-form-steps-package",
  templateUrl: "package.component.html",
  styleUrl: "package.component.less",
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
export class AppLeechBuyFormStepsPackageComponent {
  protected readonly form = inject(LeechBuyForm);
  protected readonly packages = LEECH_BUY_PACKAGES;
}
