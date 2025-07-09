import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiIcon,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiFieldErrorPipe, TuiPassword } from "@taiga-ui/kit";
import { TuiCardLarge, TuiForm, TuiHeader } from "@taiga-ui/layout";

import { UserRegistrationForm } from "../model/form";

@Component({
  selector: "app-register-page",
  templateUrl: "page.component.html",
  styleUrl: "page.component.less",
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
    TuiIcon,
    TuiPassword,
    TuiTextfield,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AppRegisterPageComponent {
  protected readonly form = inject(UserRegistrationForm);
}
