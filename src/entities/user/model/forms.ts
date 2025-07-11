import { FormControl } from "@angular/forms";

import {
  USER_EMAIL_MAX_LENGTH,
  USER_EMAIL_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
  USER_SURNAME_MAX_LENGTH,
  USER_SURNAME_MIN_LENGTH,
} from "@/shared/api/user";
import * as z from "@/shared/lib/forms/validation";

export const createUserNameFormControl = () => {
  return new FormControl("", [
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
};

export const createUserSurnameFormControl = () => {
  return new FormControl("", [
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
};

export const createUserEmailFormControl = () => {
  return new FormControl("", [
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
};

export const createUserPasswordFormControl = () => {
  return new FormControl("", [
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
};
