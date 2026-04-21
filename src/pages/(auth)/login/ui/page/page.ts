import { userEmail, userPassword } from "@/entities/user";
import { LoginService } from "@/features/(auth)/login";
import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { form, FormField, FormRoot } from "@angular/forms/signals";
import { RouterLink } from "@angular/router";
import { TuiAutoFocus } from "@taiga-ui/cdk";
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiIcon,
  TuiInput,
  TuiLink,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiButtonLoading, TuiPassword } from "@taiga-ui/kit";
import { TuiForm, TuiHeader } from "@taiga-ui/layout";

@Component({
  imports: [
    FormField,
    FormRoot,
    RouterLink,
    TuiAppearance,
    TuiAutoFocus,
    TuiButton,
    TuiButtonLoading,
    TuiError,
    TuiForm,
    TuiHeader,
    TuiIcon,
    TuiInput,
    TuiLink,
    TuiPassword,
    TuiTitle,
  ],
  templateUrl: "page.html",
  styleUrl: "page.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLoginPageComponent {
  private readonly loginService = inject(LoginService);

  private readonly serverErrorMap: Record<number, string> = {
    [HttpStatusCode.Unauthorized]: $localize`Неверный адрес электронной почты или пароль`,
  };

  protected readonly form = form(
    signal({
      email: "",
      password: "",
    }),
    (schema) => {
      userEmail(schema.email);
      userPassword(schema.password);
    },
    {
      submission: {
        action: async (form) => {
          try {
            await this.loginService.login(form().value());
          } catch (error) {
            return {
              kind: "server",
              message:
                error instanceof HttpErrorResponse
                  ? this.serverErrorMap[error.status]
                  : $localize`Произошла неизвестная ошибка, попробуйте ещё раз`,
            };
          }
          return null;
        },
      },
    },
  );
}
