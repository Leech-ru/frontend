import {
  PathKind,
  required,
  SchemaPath,
  SchemaPathRules,
} from "@angular/forms/signals";

export const userSurame = <TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
) => {
  required(path, { message: "Введите фамилию" });
};
