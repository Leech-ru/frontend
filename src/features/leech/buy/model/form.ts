import { Injectable, signal } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { tuiMarkControlAsTouchedAndValidate } from "@taiga-ui/cdk/utils/miscellaneous";

import mask from "@/shared/lib/phone";
import { fullNameValidator } from "@/shared/lib/validators";

@Injectable({ providedIn: "root" })
export class LeechBuyForm {
  public readonly index = signal<number>(0);

  public readonly package = new FormControl("");

  public readonly name = new FormControl("", [
    Validators.required,
    fullNameValidator,
  ]);

  public readonly phone = Object.assign(
    new FormControl("", [Validators.required, Validators.minLength(18)]),
    {
      mask: mask,
    },
  );

  public readonly email = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);

  public readonly address = new FormControl("", Validators.required);

  public readonly comment = new FormControl("", Validators.maxLength(512));

  public readonly agreement = new FormControl(false, Validators.requiredTrue);

  public readonly group = new FormGroup({
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
