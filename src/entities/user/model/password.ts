import {
  maxLength,
  minLength,
  PathKind,
  required,
  SchemaPath,
  SchemaPathRules,
} from "@angular/forms/signals";
import {
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from "../config/password";

export const userPassword = <TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
) => {
  required(path, { message: "Введите пароль" });
  minLength(path, USER_PASSWORD_MIN_LENGTH, {
    message: "Слишком короткий пароль",
  });
  maxLength(path, USER_PASSWORD_MAX_LENGTH, {
    message: "Слишком длинный пароль",
  });
};
