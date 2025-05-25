import { Injectable, signal } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { tuiMarkControlAsTouchedAndValidate } from "@taiga-ui/cdk/utils/miscellaneous";

import * as z from "@/shared/lib/forms/validation";

import { LEECH_BUY_COMMENT_MAX_LENGTH } from "../config";

@Injectable({ providedIn: "root" })
export class LeechBuyForm {
  public readonly index = signal<number>(0);

  public readonly small = new FormControl(0);
  public readonly medium = new FormControl(0);
  public readonly large = new FormControl(0);

  public readonly package = new FormControl("", [
    z.required("Пожалуйста, укажите тип упаковки"),
  ]);

  public readonly name = new FormControl("", [
    z.required("Пожалуйста, укажите ФИО (например, Иванов Иван Иванович)"),
    z.name("Пожалуйста, укажите корректное ФИО"),
  ]);

  public readonly phone = new FormControl("", [
    z.required("Пожалуйста, укажите номер телефона"),
    z.minLength(18, "Пожалуйста, укажите корректный номер телефона"),
  ]);

  public readonly email = new FormControl("", [
    z.required("Пожалуйста, укажите электронную почту"),
    z.email("Пожалуйста, укажите корректную электронную почту"),
  ]);

  public readonly address = new FormControl("", [
    z.required("Пожалуйста, укажите адрес"),
  ]);

  public readonly comment = new FormControl("", [
    z.maxLength(
      LEECH_BUY_COMMENT_MAX_LENGTH,
      `Максимальная длина комментария — ${LEECH_BUY_COMMENT_MAX_LENGTH} символов`,
    ),
  ]);

  public readonly agreement = new FormControl(false, [
    z.requiredTrue("Необходимо дать согласие"),
  ]);

  public readonly group = new FormGroup({
    small: this.small,
    medium: this.medium,
    large: this.large,
    package: this.package,
    name: this.name,
    phone: this.phone,
    email: this.email,
    address: this.address,
    comment: this.comment,
    agreement: this.agreement,
  });

  public next(): void {
    this.index.update((prev) => prev + 1);
  }

  public previous(): void {
    this.index.update((prev) => prev - 1);
  }

  public submit(): void {
    tuiMarkControlAsTouchedAndValidate(this.group);

    if (this.group.valid) {
      alert(JSON.stringify(this.group.value, null, 2));
    }
  }
}
