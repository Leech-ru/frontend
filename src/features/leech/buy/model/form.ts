import { Injectable, signal } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { tuiMarkControlAsTouchedAndValidate } from "@taiga-ui/cdk/utils/miscellaneous";

import * as z from "@/shared/lib/forms/validation";

@Injectable({ providedIn: "root" })
export class LeechBuyForm {
  public readonly index = signal<number>(0);

  public readonly group = new FormGroup({
    package: new FormControl("", [
      z.required("Пожалуйста, укажите тип упаковки"),
    ]),
    name: new FormControl("", [
      z.required("Пожалуйста, укажите ФИО (например, Иванов Иван Иванович)"),
      z.name("Пожалуйста, укажите корректное ФИО"),
    ]),
    phone: new FormControl("", [
      z.required("Пожалуйста, укажите номер телефона"),
      z.minLength(18, "Пожалуйста, укажите корректный номер телефона"),
    ]),
    email: new FormControl("", [
      z.required("Пожалуйста, укажите электронную почту"),
      z.email("Пожалуйста, укажите корректную электронную почту"),
    ]),
    address: new FormControl("", [z.required("Пожалуйста, укажите адрес")]),
    comment: new FormControl("", [
      z.maxLength(
        512,
        ({ maxlength }) =>
          `Максимальная длина комментария — ${maxlength["requiredLength"]} символов`,
      ),
    ]),
    agreement: new FormControl(false, [
      z.requiredTrue("Необходимо дать согласие"),
    ]),
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
