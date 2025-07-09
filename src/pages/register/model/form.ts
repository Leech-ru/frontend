import { inject, Injectable, signal } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { tuiMarkControlAsTouchedAndValidate } from "@taiga-ui/cdk";
import { finalize } from "rxjs";

import {
  USER_EMAIL_MAX_LENGTH,
  USER_EMAIL_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
  USER_SURNAME_MAX_LENGTH,
  USER_SURNAME_MIN_LENGTH,
  UserAPIService,
} from "@/entities/user";
import * as z from "@/shared/lib/forms/validation";

@Injectable({ providedIn: "root" })
export class UserRegistrationForm {
  protected readonly api = inject(UserAPIService);

  public readonly pending = signal<boolean>(false);

  public readonly name = new FormControl("", [
    z.required("Пожалуйста, укажите своё имя (например, Иван)"),
    z.pattern(
      /^[а-яА-ЯёЁa-zA-Z\-]+$/,
      "Имя может содержать только буквы и дефис",
    ),
    z.minLength(
      USER_NAME_MIN_LENGTH,
      `Имя должно содержать минимум ${USER_NAME_MIN_LENGTH} символа`,
    ),
    z.maxLength(
      USER_NAME_MAX_LENGTH,
      `Имя должно содержать максимум ${USER_NAME_MAX_LENGTH} символов`,
    ),
  ]);

  public readonly surname = new FormControl("", [
    z.required("Пожалуйста, укажите свою фамилию (например, Иванов)"),
    z.pattern(
      /^[а-яА-ЯёЁa-zA-Z\-]+$/,
      "Фамилия может содержать только буквы и дефис",
    ),
    z.minLength(
      USER_SURNAME_MIN_LENGTH,
      `Фамилия должна содержать минимум ${USER_SURNAME_MIN_LENGTH} символа`,
    ),
    z.maxLength(
      USER_SURNAME_MAX_LENGTH,
      `Фамилия должна содержать максимум ${USER_SURNAME_MAX_LENGTH} символов`,
    ),
  ]);

  public readonly email = new FormControl("", [
    z.required("Пожалуйста, укажите свой адрес электронной почты"),
    z.email("Пожалуйста, укажите корректный адрес электронной почты"),
    z.minLength(
      USER_EMAIL_MIN_LENGTH,
      `Адрес электронной почты должен содержать минимум ${USER_EMAIL_MIN_LENGTH} символов`,
    ),
    z.maxLength(
      USER_EMAIL_MAX_LENGTH,
      `Адрес электронной почты должен содержать максимум ${USER_EMAIL_MAX_LENGTH} символов`,
    ),
  ]);

  public readonly password = new FormControl("", [
    z.required("Пожалуйста, укажите пароль"),
    z.minLength(
      USER_PASSWORD_MIN_LENGTH,
      `Пароль должен содержать минимум ${USER_PASSWORD_MIN_LENGTH} символов`,
    ),
    z.maxLength(
      USER_PASSWORD_MAX_LENGTH,
      `Пароль должен содержать максимум ${USER_PASSWORD_MAX_LENGTH} символов`,
    ),
  ]);

  public readonly group = new FormGroup({
    name: this.name,
    surname: this.surname,
    email: this.email,
    password: this.password,
  });

  public submit(): void {
    tuiMarkControlAsTouchedAndValidate(this.group);

    if (this.group.invalid) {
      return;
    }

    this.pending.set(true);

    this.api
      .register({
        name: this.name.value!,
        surname: this.surname.value!,
        email: this.email.value!,
        password: this.password.value!,
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
        error: (error) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (typeof error.status === "number" && error.status === 409) {
            this.email.setErrors({
              message:
                "Пользователь с таким адресом электронной почты уже существует",
            });
          }
        },
      });
  }
}
