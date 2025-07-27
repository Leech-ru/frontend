import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { tuiMarkControlAsTouchedAndValidate } from "@taiga-ui/cdk";
import { finalize } from "rxjs";

import {
  createUserEmailFormControl,
  createUserNameFormControl,
  createUserPasswordFormControl,
  createUserSurnameFormControl,
  UserService,
} from "@/entities/user";

@Injectable({ providedIn: "root" })
export class UserRegistrationForm {
  public readonly pending = signal<boolean>(false);
  public readonly group = new FormGroup({
    name: createUserNameFormControl(),
    surname: createUserSurnameFormControl(),
    email: createUserEmailFormControl(),
    password: createUserPasswordFormControl(),
  });
  protected readonly userService = inject(UserService);

  public submit(): void {
    tuiMarkControlAsTouchedAndValidate(this.group);

    if (this.group.invalid) {
      return;
    }

    this.pending.set(true);

    this.userService
      .register({
        name: this.group.controls.name.value!,
        surname: this.group.controls.surname.value!,
        email: this.group.controls.email.value!,
        password: this.group.controls.password.value!,
        role: 0,
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
            case HttpStatusCode.Conflict:
              return this.group.controls.email.setErrors({
                message:
                  "Пользователь с таким адресом электронной почты уже существует",
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
