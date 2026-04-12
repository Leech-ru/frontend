import {
  maxLength,
  minLength,
  PathKind,
  pattern,
  required,
  SchemaPath,
  SchemaPathRules,
} from "@angular/forms/signals";
import { USER_EMAIL_MAX_LENGTH, USER_EMAIL_MIN_LENGTH } from "../config/email";

export const userEmail = <TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
) => {
  required(path, { message: "Введите адрес электронной почты" });
  pattern(path, new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"), {
    message: "Некорректный адрес электронной почты",
  });
  minLength(path, USER_EMAIL_MIN_LENGTH, {
    message: "Слишком короткий адрес электронной почты",
  });
  maxLength(path, USER_EMAIL_MAX_LENGTH, {
    message: "Слишком длинный адрес электронной почты",
  });
};
