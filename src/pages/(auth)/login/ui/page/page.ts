import { UserService, UserStore } from "@/entities/user";
import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  email,
  form,
  FormField,
  FormRoot,
  required,
} from "@angular/forms/signals";
import { Router, RouterLink } from "@angular/router";
import { TuiAutoFocus } from "@taiga-ui/cdk";
import {
  TUI_BREAKPOINT,
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
import { lastValueFrom } from "rxjs";

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
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);
  private readonly userService = inject(UserService);

  protected readonly breakpoint = inject(TUI_BREAKPOINT);

  protected readonly form = form(
    signal({
      email: "",
      password: "",
    }),
    (schema) => {
      required(schema.email, { message: "Введите адрес электронной почты" });
      email(schema.email, { message: "Некорректный адрес электронной почты" });
      required(schema.password, { message: "Введите пароль" });
    },
    {
      submission: {
        action: async (form) => {
          try {
            const user = await lastValueFrom(
              this.userService.login(form().value()),
            );
            this.userStore.setUser(user);
            this.router.navigateByUrl("/");
          } catch (error) {
            if (error instanceof HttpErrorResponse) {
              return {
                kind: "server",
                message:
                  error.status === HttpStatusCode.Unauthorized
                    ? "Неверный адрес электронной почты или пароль"
                    : "Неизвестная ошибка, попробуйте ещё раз",
              };
            }
          }
          return null;
        },
      },
    },
  );
}
