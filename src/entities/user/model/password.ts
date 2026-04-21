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
  required(path, { message: $localize`Введите пароль` });
  minLength(path, USER_PASSWORD_MIN_LENGTH, {
    message: $localize`Слишком короткий пароль`,
  });
  maxLength(path, USER_PASSWORD_MAX_LENGTH, {
    message: $localize`Слишком длинный пароль`,
  });
};
