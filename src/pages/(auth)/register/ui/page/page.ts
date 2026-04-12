import { userEmail, userName, userPassword, userSurame } from "@/entities/user";
import { RegisterService } from "@/features/(auth)/register";
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
  TuiTextfield,
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
    TuiTextfield,
    TuiTitle,
  ],
  templateUrl: "page.html",
  styleUrl: "page.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRegisterPageComponent {
  private readonly registerService = inject(RegisterService);

  private readonly serverErrorMap: Record<number, string> = {
    [HttpStatusCode.Conflict]:
      "Пользователь с таким адресом электронной почты уже существует",
  };

  protected readonly form = form(
    signal({
      name: "",
      surname: "",
      email: "",
      password: "",
    }),
    (schema) => {
      userName(schema.name);
      userSurame(schema.surname);
      userEmail(schema.email);
      userPassword(schema.password);
    },
    {
      submission: {
        action: async (form) => {
          try {
            await this.registerService.register(form().value());
          } catch (error) {
            return {
              kind: "server",
              message:
                error instanceof HttpErrorResponse
                  ? this.serverErrorMap[error.status]
                  : "Произошла неизвестная ошибка, попробуйте ещё раз",
            };
          }
          return null;
        },
      },
    },
  );
}
