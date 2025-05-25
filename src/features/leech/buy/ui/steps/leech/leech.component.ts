import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiCurrencyPipe } from "@taiga-ui/addon-commerce";
import {
  TuiAppearance,
  TuiFormatNumberPipe,
  tuiHeightCollapse,
  TuiNotification,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiBadge, TuiInputNumber } from "@taiga-ui/kit";
import { TuiCell, TuiForm, TuiHeader } from "@taiga-ui/layout";

import { AppLeechSizeComponent } from "@/entities/leech";

import {
  LEECH_BUY_MIN_COUNT,
  LEECH_LARGE_PRICE,
  LEECH_MEDIUM_PRICE,
  LEECH_SMALL_PRICE,
} from "../../../config";
import { LeechBuyForm } from "../../../model/form";
import { TuiStepperStepState } from "../../../model/types";

@Component({
  selector: "app-leech-buy-form-steps-leech",
  templateUrl: "leech.component.html",
  styleUrl: "leech.component.less",
  imports: [
    AppLeechSizeComponent,
    AsyncPipe,
    ReactiveFormsModule,
    TuiAppearance,
    TuiBadge,
    TuiCell,
    TuiCurrencyPipe,
    TuiForm,
    TuiFormatNumberPipe,
    TuiHeader,
    TuiInputNumber,
    TuiNotification,
    TuiTextfield,
    TuiTitle,
  ],
  animations: [tuiHeightCollapse],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechBuyFormStepsLeechComponent {
  @Output()
  public stateChange = new EventEmitter<TuiStepperStepState>();

  public get count(): number {
    return (
      (this.form.small.value ?? 0) +
      (this.form.medium.value ?? 0) +
      (this.form.large.value ?? 0)
    );
  }

  public get invalid(): boolean {
    return (
      this.form.small.invalid ||
      this.form.medium.invalid ||
      this.form.large.invalid ||
      this.count < this.leechBuyMinCount
    );
  }

  constructor() {
    this.form.group.statusChanges.subscribe(() => {
      this.stateChange.emit(this.invalid ? "error" : "pass");
    });
  }

  protected readonly form = inject(LeechBuyForm);
  protected readonly leechBuyMinCount = LEECH_BUY_MIN_COUNT;

  protected readonly items = [
    {
      title: "Малые пиявки",
      price: LEECH_SMALL_PRICE,
      sizes: {
        max: 0.6,
      },
      formControlName: "small",
    },
    {
      title: "Средние пиявки",
      price: LEECH_MEDIUM_PRICE,
      sizes: {
        min: 0.6,
        max: 2,
      },
      formControlName: "medium",
    },
    {
      title: "Крупные пиявки",
      price: LEECH_LARGE_PRICE,
      sizes: {
        min: 2,
      },
      formControlName: "large",
    },
  ];
}
