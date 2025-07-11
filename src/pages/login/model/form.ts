import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { tuiMarkControlAsTouchedAndValidate } from "@taiga-ui/cdk";
import { finalize } from "rxjs";

import {
  createUserEmailFormControl,
  createUserPasswordFormControl,
} from "@/entities/user";
import { UserService } from "@/shared/api/user";

@Injectable({ providedIn: "root" })
export class UserLoginForm {
  protected readonly userService = inject(UserService);

  public readonly pending = signal<boolean>(false);

  public readonly group = new FormGroup({
    email: createUserEmailFormControl(),
    password: createUserPasswordFormControl(),
  });

  public submit(): void {
    tuiMarkControlAsTouchedAndValidate(this.group);

    if (this.group.invalid) {
      return;
    }

    this.pending.set(true);

    this.userService
      .login({
        email: this.group.controls.email.value!,
        password: this.group.controls.password.value!,
      })
      .pipe(
        finalize(() => {
          this.pending.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          switch (error.status) {
            case HttpStatusCode.Unauthorized:
              return this.group.setErrors({
                message: "Неверный адрес электронной почты или пароль",
              });

            default:
              return this.group.setErrors({
                message: "Неизвестная ошибка",
              });
          }
        },
      });
  }
}
