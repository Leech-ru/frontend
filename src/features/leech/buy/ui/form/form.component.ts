import { NgSwitch, NgSwitchCase, NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { tuiGetCurrencySymbol } from "@taiga-ui/addon-commerce";
import {
  TuiAppearance,
  TuiBreakpointService,
  TuiButton,
  tuiFormatNumber,
  TuiTitle,
} from "@taiga-ui/core";
import {
  TuiElasticContainer,
  TuiFloatingContainer,
  TuiStepper,
} from "@taiga-ui/kit";
import { TuiAppBar, TuiCardLarge, TuiHeader } from "@taiga-ui/layout";

import { LeechBuyForm } from "../../model/form";
import { AppLeechBuyFormStepsContactComponent } from "../steps/contact/contact.component";
import { AppLeechBuyFormStepsLeechComponent } from "../steps/leech/leech.component";
import { AppLeechBuyFormStepsPackageComponent } from "../steps/package/package.component";

@Component({
  standalone: true,
  selector: "app-leech-buy-form",
  templateUrl: "form.component.html",
  styleUrl: "form.component.less",
  imports: [
    AppLeechBuyFormStepsContactComponent,
    AppLeechBuyFormStepsLeechComponent,
    AppLeechBuyFormStepsPackageComponent,
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
    TuiAppBar,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiElasticContainer,
    TuiFloatingContainer,
    TuiHeader,
    TuiStepper,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechBuyFormComponent {
  protected readonly form = inject(LeechBuyForm);
  protected readonly router = inject(Router);
  protected readonly breakpoint = toSignal(inject(TuiBreakpointService).pipe());

  protected readonly index = signal<number>(0);

  protected readonly steps = [
    {
      title: "Выбор пиявок",
      description: "Сроки доставки уточняйте у менеджера",
      next: () => this.next(),
      getNextLabel: () => "Далее",
      back: () => this.router.navigateByUrl("/"),
      getBackLabel: () => "Назад",
      control: this.form.leech,
      get state() {
        return this.control.touched
          ? this.control.invalid
            ? "error"
            : "pass"
          : "normal";
      },
    },
    {
      title: "Выбор упаковки",
      description: "Стоимость упаковок уточняйте у менеджера",
      next: () => this.next(),
      getNextLabel: () => "Далее",
      back: () => this.previous(),
      getBackLabel: () => "Назад",
      control: this.form.package,
      get state() {
        return this.control.touched
          ? this.control.invalid
            ? "error"
            : "pass"
          : "normal";
      },
      disabled: () => this.form.leech.invalid,
    },
    {
      title: "Контактная информация",
      description:
        "Подтверждение и уточнение заказа производится менеджером по телефону или электронной почте",
      next: () => this.form.submit(),
      getNextLabel: () =>
        `Оформить заказ на ${tuiFormatNumber(this.form.price)} ${tuiGetCurrencySymbol("RUB")}`,
      back: () => this.previous(),
      getBackLabel: () => "Назад",
      control: this.form.contact,
      get state() {
        return this.control.touched
          ? this.control.invalid
            ? "error"
            : "pass"
          : "normal";
      },
      disabled: () => this.form.leech.invalid || this.form.package.invalid,
    },
  ];

  protected get step() {
    return this.steps[this.index()];
  }

  protected next(): void {
    this.index.update((prev) => prev + 1);
  }

  protected previous(): void {
    this.index.update((prev) => prev - 1);
  }
}
