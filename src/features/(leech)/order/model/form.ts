import {
  LEECH_LARGE_PRICE,
  LEECH_MEDIUM_PRICE,
  LEECH_SMALL_PRICE,
} from "@/entities/leech";
import { effect, Injectable, signal } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CreateOrderRequest, PackageType } from "../api/types";
import {
  LEECH_ORDER_COMMENT_MAX_LENGTH,
  LEECH_ORDER_MIN_COUNT,
} from "../config";
import {
  ExtractFormGroupValue,
  markValidControlsAsTouched,
} from "../lib/forms";
import * as z from "../lib/forms/validation";
import {
  clearLeechOrderFormValue,
  getLeechOrderFormValue,
  saveLeechOrderFormValue,
} from "./storage";

@Injectable({ providedIn: "root" })
export class LeechOrderForm {
  public readonly submitted = signal<boolean>(false);
  public readonly small = new FormControl(0);
  public readonly medium = new FormControl(0);
  public readonly large = new FormControl(0);
  public readonly package = new FormControl(1, [
    z.required($localize`Пожалуйста, укажите тип упаковки`),
  ]);
  public readonly name = new FormControl("", [
    z.required(
      $localize`Пожалуйста, укажите ФИО (например, Иванов Иван Иванович)`,
    ),
    z.name($localize`Пожалуйста, укажите корректное ФИО`),
  ]);
  public readonly phone = new FormControl("", [
    z.required($localize`Пожалуйста, укажите номер телефона`),
    z.minLength(12, $localize`Пожалуйста, укажите корректный номер телефона`),
  ]);
  public readonly email = new FormControl("", [
    z.required($localize`Пожалуйста, укажите электронную почту`),
    z.email($localize`Пожалуйста, укажите корректную электронную почту`),
  ]);
  public readonly address = new FormControl("", [
    z.required($localize`Пожалуйста, укажите адрес`),
  ]);
  public readonly comment = new FormControl("", [
    z.maxLength(
      LEECH_ORDER_COMMENT_MAX_LENGTH,
      $localize`Максимальная длина комментария — ${LEECH_ORDER_COMMENT_MAX_LENGTH} символов`,
    ),
  ]);
  public readonly agreement = new FormControl(false, [
    z.requiredTrue($localize`Необходимо дать согласие`),
  ]);
  public readonly leech = new FormGroup(
    {
      small: this.small,
      medium: this.medium,
      large: this.large,
    },
    {
      validators: [
        () => (this.count < LEECH_ORDER_MIN_COUNT ? { invalid: true } : null),
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
  public readonly value = signal<ExtractFormGroupValue<
    typeof this.group
  > | null>(getLeechOrderFormValue());

  public constructor() {
    const value = this.value();

    if (value) {
      this.group.setValue(value);
      markValidControlsAsTouched(this.group);
    } else {
      this.group.reset();
    }

    this.group.valueChanges.subscribe((value) => {
      this.value.set(value as ExtractFormGroupValue<typeof this.group>);
    });

    effect(() => {
      const value = this.value();

      if (value) {
        saveLeechOrderFormValue(value);
      } else {
        this.reset();
      }
    });
  }

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

  public get remains(): number {
    return Math.max(0, LEECH_ORDER_MIN_COUNT - this.count);
  }

  public submit(): void {
    this.submitted.set(true);

    const data: CreateOrderRequest = {
      customer_info: {
        fio: this.contact.get("name")?.value || "",
        address: this.contact.get("address")?.value || "",
        comment: this.contact.get("comment")?.value || undefined,
        email: this.contact.get("email")?.value || "",
        phone_number: this.contact.get("phone")?.value || "",
      },
      order_details: {
        leech_size_1: this.leech.get("small")?.value || 0,
        leech_size_2: this.leech.get("medium")?.value || 0,
        leech_size_3: this.leech.get("large")?.value || 0,
        package_type: this.group.get("package")
          ?.value as unknown as PackageType,
      },
    };

    console.log(data);
  }

  public reset(): void {
    clearLeechOrderFormValue();
    this.group.reset();
    this.submitted.set(false);

    this.small.setValue(0);
    this.medium.setValue(0);
    this.large.setValue(0);
  }
}
