import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

import * as z from "@/shared/lib/forms/validation";

import {
  LEECH_BUY_COMMENT_MAX_LENGTH,
  LEECH_BUY_MIN_COUNT,
  LEECH_LARGE_PRICE,
  LEECH_MEDIUM_PRICE,
  LEECH_SMALL_PRICE,
} from "../config";

@Injectable({ providedIn: "root" })
export class LeechBuyForm {
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

  public readonly leech = new FormGroup(
    {
      small: this.small,
      medium: this.medium,
      large: this.large,
    },
    {
      validators: [
        () => (this.count < LEECH_BUY_MIN_COUNT ? { invalid: true } : null),
      ],
    },
  );

  public readonly contact = new FormGroup({
    name: this.name,
    phone: this.phone,
    email: this.email,
    address: this.address,
    comment: this.comment,
    agreement: this.agreement,
  });

  public readonly group = new FormGroup({
    leech: this.leech,
    package: this.package,
    contact: this.contact,
  });

  public get price(): number {
    return (
      (this.small.value ?? 0) * LEECH_SMALL_PRICE +
      (this.medium.value ?? 0) * LEECH_MEDIUM_PRICE +
      (this.large.value ?? 0) * LEECH_LARGE_PRICE
    );
  }

  public get count(): number {
    return (
      (this.small.value ?? 0) +
      (this.medium.value ?? 0) +
      (this.large.value ?? 0)
    );
  }

  public submit(): void {
    alert(JSON.stringify(this.group.value, null, 2));
  }
}
